#!/usr/bin/env python3
"""Audit Moralis endpoint pricing using billed compute-unit deltas.

This script measures actual billed usage by:
1. Reading the current `apiTotalComputeUnits` total from the billing
   coordinator.
2. Calling one API endpoint.
3. Waiting/polling for billing usage to settle.
4. Recording the delta as the billed cost for that endpoint.

Secrets are read from environment variables only.
"""

from __future__ import annotations

import argparse
import csv
import importlib.util
import json
import os
import subprocess
import sys
import time
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
REPORT_PATH = ROOT / "tmp" / "endpoint-billing-audit.csv"
BILLING_URL_TEMPLATE = (
    "https://billing-coordinator-api-support.aws-prod-payments-2-vpn.moralis.io"
    "/usages/organization/{org_id}"
)


def load_weight_module():
    module_path = ROOT / "scripts" / "audit-endpoint-weights.py"
    spec = importlib.util.spec_from_file_location("audit_endpoint_weights", module_path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Unable to load {module_path}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


WEIGHT_AUDIT = load_weight_module()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--include-side-effecting", action="store_true")
    parser.add_argument("--only", help="substring filter for operation keys")
    parser.add_argument("--limit", type=int)
    parser.add_argument("--timeout", type=float, default=30.0)
    parser.add_argument("--sleep", type=float, default=0.1, help="delay between endpoint calls")
    parser.add_argument(
        "--settle-seconds",
        type=float,
        default=2.0,
        help="seconds to wait between billing polls",
    )
    parser.add_argument(
        "--max-settle-seconds",
        type=float,
        default=30.0,
        help="maximum seconds to wait for billing to settle after each request",
    )
    parser.add_argument("--output", type=Path, default=REPORT_PATH)
    parser.add_argument("--api-key-env", default="MORALIS_API_KEY")
    parser.add_argument("--billing-bearer-env", default="MORALIS_BILLING_BEARER")
    parser.add_argument("--billing-org-id", default="103389")
    parser.add_argument(
        "--fixture",
        action="append",
        default=[],
        metavar="NAME=VALUE",
        help="override a built-in fixture value, e.g. evm_wallet=0x...",
    )
    return parser.parse_args()


def apply_fixture_overrides(fixture_overrides: list[str]) -> None:
    for fixture in fixture_overrides:
        if "=" not in fixture:
            raise ValueError(f"Invalid --fixture value {fixture!r}; expected NAME=VALUE")
        name, value = fixture.split("=", 1)
        if name not in WEIGHT_AUDIT.FIXTURES:
            valid = ", ".join(sorted(WEIGHT_AUDIT.FIXTURES))
            raise ValueError(f"Unknown fixture {name!r}. Valid names: {valid}")
        WEIGHT_AUDIT.FIXTURES[name] = value


def collect_operations(args: argparse.Namespace):
    metadata = WEIGHT_AUDIT.load_endpoint_metadata()
    operations = WEIGHT_AUDIT.collect_operations(metadata)

    if args.only:
        operations = [operation for operation in operations if args.only in operation.key]
    if not args.include_side_effecting:
        operations = [
            operation
            for operation in operations
            if operation.path not in WEIGHT_AUDIT.SIDE_EFFECTING_PATHS
        ]
    if args.limit is not None:
        operations = operations[: args.limit]
    return operations


def curl_json(
    url: str,
    *,
    headers: list[str],
    method: str = "GET",
    data: dict[str, Any] | None = None,
    timeout: float = 30.0,
) -> tuple[int | None, dict[str, str], str, str]:
    header_args: list[str] = []
    for header in headers:
        header_args.extend(["--header", header])

    cmd = [
        "curl",
        "--silent",
        "--show-error",
        "--location",
        "--request",
        method,
        "--dump-header",
        "-",
        "--url",
        url,
        *header_args,
    ]
    if data is not None:
        cmd.extend(["--header", "Content-Type: application/json", "--data-binary", json.dumps(data)])

    proc = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
    raw = proc.stdout
    header_blocks = raw.split("\r\n\r\n")
    if len(header_blocks) == 1:
        header_blocks = raw.split("\n\n")
    header_text = header_blocks[0] if header_blocks else ""
    body_text = raw[len(header_text) :].lstrip("\r\n")

    status = None
    parsed_headers: dict[str, str] = {}
    for line in header_text.splitlines():
        if line.startswith("HTTP/"):
            parts = line.split()
            if len(parts) >= 2 and parts[1].isdigit():
                status = int(parts[1])
            continue
        if ":" not in line:
            continue
        name, value = line.split(":", 1)
        parsed_headers[name.lower()] = value.strip()

    error = proc.stderr.strip()
    return status, parsed_headers, body_text, error


def get_billing_total(bearer: str, org_id: str, timeout: float) -> tuple[int | None, str]:
    url = BILLING_URL_TEMPLATE.format(org_id=org_id)
    status, _headers, body, error = curl_json(
        url,
        headers=[
            f"Authorization: Bearer {bearer}",
            "Cache-Control: no-cache",
            "If-None-Match:",
        ],
        timeout=timeout,
    )
    if status != 200:
        detail = body.strip() or error or f"billing status {status}"
        return None, detail

    payload = json.loads(body)
    for addon in payload.get("addonUsage", []):
        if addon.get("addon") == "apiTotalComputeUnits":
            return int(addon.get("total", 0)), ""
    return None, "apiTotalComputeUnits missing from billing payload"


def call_endpoint(operation, api_key: str, timeout: float) -> dict[str, Any]:
    url, body = WEIGHT_AUDIT.build_request(operation)
    status, headers, body_text, error = curl_json(
        url,
        headers=[
            "Accept: application/json",
            f"X-API-Key: {api_key}",
        ],
        method=operation.method,
        data=body,
        timeout=timeout,
    )
    weight = headers.get("x-request-weight")
    parsed_weight = int(weight) if weight and weight.isdigit() else None
    detail = body_text[:500].strip() if status and status >= 400 else error
    return {
        "url": url,
        "status": status,
        "request_weight": parsed_weight if parsed_weight is not None else "",
        "error": detail,
    }


def wait_for_billing_settle(
    bearer: str,
    org_id: str,
    before_total: int,
    *,
    settle_seconds: float,
    max_settle_seconds: float,
    timeout: float,
) -> tuple[int | None, str]:
    deadline = time.time() + max_settle_seconds
    observed_change = False
    settled_total: int | None = None
    last_total: int | None = None
    stable_hits = 0
    last_error = ""

    while time.time() < deadline:
        time.sleep(settle_seconds)
        total, error = get_billing_total(bearer, org_id, timeout)
        if total is None:
            last_error = error
            continue

        if total != before_total:
            observed_change = True

        if observed_change:
            if last_total == total:
                stable_hits += 1
            else:
                stable_hits = 0
            last_total = total
            settled_total = total
            if stable_hits >= 1:
                return settled_total, ""

    if settled_total is not None:
        return settled_total, ""
    return before_total, last_error or "billing total did not change before timeout"


def write_report(rows: list[dict[str, Any]], output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = [
        "operation",
        "method",
        "url",
        "status",
        "documented_cus",
        "documented_cus_unit",
        "request_weight",
        "billing_before",
        "billing_after",
        "billed_delta",
        "result",
        "error",
    ]
    with output_path.open("w", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def main() -> int:
    args = parse_args()
    try:
        apply_fixture_overrides(args.fixture)
    except ValueError as error:
        print(error, file=sys.stderr)
        return 2

    operations = collect_operations(args)
    if args.dry_run:
        for operation in operations:
            url, body = WEIGHT_AUDIT.build_request(operation)
            suffix = f" body={json.dumps(body, sort_keys=True)}" if body else ""
            print(f"{operation.method} {url}{suffix}")
        print(f"Prepared {len(operations)} operations.")
        return 0

    api_key = os.environ.get(args.api_key_env)
    bearer = os.environ.get(args.billing_bearer_env)
    if not api_key:
        print(f"Missing {args.api_key_env}", file=sys.stderr)
        return 2
    if not bearer:
        print(f"Missing {args.billing_bearer_env}", file=sys.stderr)
        return 2

    baseline_a, baseline_error = get_billing_total(
        bearer, args.billing_org_id, args.timeout
    )
    if baseline_a is None:
        print(f"Billing baseline failed: {baseline_error}", file=sys.stderr)
        return 2
    time.sleep(args.settle_seconds)
    baseline_b, baseline_error = get_billing_total(
        bearer, args.billing_org_id, args.timeout
    )
    if baseline_b is None:
        print(f"Billing baseline failed: {baseline_error}", file=sys.stderr)
        return 2
    if baseline_a != baseline_b:
        print(
            "Warning: billing total changed before the audit started "
            f"({baseline_a} -> {baseline_b}). Results may include background noise.",
            file=sys.stderr,
        )

    current_total = baseline_b
    rows: list[dict[str, Any]] = []
    mismatches = 0
    no_delta = 0

    for index, operation in enumerate(operations, 1):
        endpoint = call_endpoint(operation, api_key=api_key, timeout=args.timeout)
        after_total, settle_error = wait_for_billing_settle(
            bearer,
            args.billing_org_id,
            current_total,
            settle_seconds=args.settle_seconds,
            max_settle_seconds=args.max_settle_seconds,
            timeout=args.timeout,
        )
        if after_total is None:
            after_total = current_total

        billed_delta = after_total - current_total
        expected = operation.metadata.get("cus")
        result = "match" if billed_delta == expected else "mismatch"
        if billed_delta == 0:
            result = "no-delta"

        if result == "mismatch":
            mismatches += 1
        if result == "no-delta":
            no_delta += 1

        row = {
            "operation": operation.key,
            "method": operation.method,
            "url": endpoint["url"],
            "status": endpoint["status"],
            "documented_cus": expected,
            "documented_cus_unit": operation.metadata.get("cusUnit", ""),
            "request_weight": endpoint["request_weight"],
            "billing_before": current_total,
            "billing_after": after_total,
            "billed_delta": billed_delta,
            "result": result,
            "error": endpoint["error"] or settle_error,
        }
        rows.append(row)
        print(
            f"[{index}/{len(operations)}] {result} "
            f"expected={expected} billed={billed_delta} "
            f"header={endpoint['request_weight']} status={endpoint['status']} "
            f"{operation.key}"
        )
        current_total = after_total
        if args.sleep:
            time.sleep(args.sleep)

    write_report(rows, args.output)
    print(f"Wrote {args.output}")
    print(
        f"Audited {len(rows)} operations, {mismatches} mismatches, {no_delta} no-delta results."
    )
    return 1 if mismatches or no_delta else 0


if __name__ == "__main__":
    raise SystemExit(main())
