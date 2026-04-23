#!/usr/bin/env python3
"""Audit Moralis endpoint request weights against the docs metadata.

The script calls Data API operations from `data-api/endpoint-metadata.js`,
captures the `x-request-weight` response header, and reports mismatches with
the documented CU metadata. It intentionally reads the API key from the
environment so secrets are never written to source control or shell history.
"""

from __future__ import annotations

import argparse
import csv
import json
import os
import re
import subprocess
import sys
import time
import urllib.parse
import tempfile
from dataclasses import dataclass
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
METADATA_PATH = ROOT / "data-api" / "endpoint-metadata.js"
REPORT_PATH = ROOT / "tmp" / "endpoint-weight-audit.csv"
METADATA_EXPORT_RE = re.compile(
    r"^export const endpointMetadata = (?P<metadata>\{.*\});\s*$",
    re.S,
)
OPERATION_RE = re.compile(
    r"^(?P<spec>/[^\s]+\.json)\s+(?P<method>[A-Z]+)\s+(?P<path>/.*)$"
)
PATH_PARAM_RE = re.compile(r"\{([^}]+)\}")


FIXTURES = {
    "evm_chain": "eth",
    "evm_wallet": "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e",
    "evm_wallet_alt": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    "evm_token": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "evm_token_alt": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "evm_nft": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    "evm_nft_token_id": "1",
    "evm_pair": "0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc",
    "evm_transaction": (
        "0x1ed85b3757a6d31d01a4d6677fc52fd3911d649a0af21fe5ca3f886b153773ed"
    ),
    "evm_block": "12386788",
    "ens_domain": "vitalik.eth",
    "defi_protocol": "uniswap-v2",
    "entity_id": "1",
    "entity_category_id": "1",
    "search_query": "Coinbase",
    "sol_network": "mainnet",
    "sol_wallet": "GThUX1AtkoK7cGevE6XzS4qK4MDkVVxH2hS1K6h5xUXZ",
    "sol_token": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    "sol_pair": "8HoQnePLqPj4M7PUDzfw8e3Ymdwgc7NLGnaTUapubyvu",
    "sol_nft": "HYPERfwdTjyJ2SCaKHmpF2MtrXqWxrsotYDsTrshHWq8",
    "sol_exchange": "pumpfun",
}


SIDE_EFFECTING_PATHS = {
    "/nft/{address}/traits/resync",
    "/nft/{address}/{token_id}/metadata/resync",
}


@dataclass(frozen=True)
class Operation:
    key: str
    spec_path: Path
    method: str
    path: str
    metadata: dict[str, Any]
    spec_operation: dict[str, Any]
    base_url: str


def load_endpoint_metadata() -> dict[str, dict[str, Any]]:
    text = METADATA_PATH.read_text()
    match = METADATA_EXPORT_RE.match(text)
    if not match:
        raise ValueError(f"Could not parse {METADATA_PATH.relative_to(ROOT)}")
    metadata = json.loads(match.group("metadata"))
    if not isinstance(metadata, dict):
        raise ValueError("endpointMetadata must be an object")
    return metadata


def load_json(path: Path) -> Any:
    with path.open() as file:
        return json.load(file)


def parse_operation_key(key: str) -> tuple[Path, str, str]:
    match = OPERATION_RE.match(key)
    if not match:
        raise ValueError(f"Invalid operation key: {key}")
    return (
        ROOT / match.group("spec").lstrip("/"),
        match.group("method").lower(),
        match.group("path"),
    )


def collect_operations(metadata: dict[str, dict[str, Any]]) -> list[Operation]:
    specs: dict[Path, dict[str, Any]] = {}
    operations: list[Operation] = []
    for key, entry in sorted(metadata.items()):
        spec_path, method, path = parse_operation_key(key)
        spec = specs.setdefault(spec_path, load_json(spec_path))
        try:
            spec_operation = spec["paths"][path][method]
        except KeyError as error:
            raise ValueError(f"{key} does not exist in OpenAPI specs") from error
        base_url = spec.get("servers", [{}])[0].get("url")
        if not base_url:
            raise ValueError(f"{spec_path.relative_to(ROOT)} has no server URL")
        operations.append(
            Operation(
                key=key,
                spec_path=spec_path,
                method=method.upper(),
                path=path,
                metadata=entry,
                spec_operation=spec_operation,
                base_url=base_url.rstrip("/"),
            )
        )
    return operations


def resolve_schema_ref(schema: dict[str, Any], spec: dict[str, Any]) -> dict[str, Any]:
    ref = schema.get("$ref")
    if not ref:
        return schema
    prefix = "#/components/schemas/"
    if not ref.startswith(prefix):
        return schema
    return spec.get("components", {}).get("schemas", {}).get(ref[len(prefix) :], schema)


def path_value(operation: Operation, name: str) -> str:
    path = operation.path
    if operation.spec_path.name == "solana-api.json":
        if name == "network":
            return FIXTURES["sol_network"]
        if name == "exchange":
            return FIXTURES["sol_exchange"]
        if name == "pairAddress":
            return FIXTURES["sol_pair"]
        if name == "address":
            if path.startswith("/account/"):
                return FIXTURES["sol_wallet"]
            if path.startswith("/nft/"):
                return FIXTURES["sol_nft"]
            return FIXTURES["sol_token"]

    if name == "chain":
        return FIXTURES["evm_chain"]
    if name in {"address", "tokenAddress", "token_address", "walletAddress"}:
        if path.startswith("/wallets/") or path.startswith("/{address}"):
            return FIXTURES["evm_wallet"]
        if path.startswith("/v1/wallets/"):
            return FIXTURES["evm_wallet"]
        if path.startswith("/nft/"):
            return FIXTURES["evm_nft"]
        if path.startswith("/pairs/"):
            return FIXTURES["evm_pair"]
        return FIXTURES["evm_token"]
    if name == "token_id":
        return FIXTURES["evm_nft_token_id"]
    if name == "block_number_or_hash":
        return FIXTURES["evm_block"]
    if name == "transaction_hash":
        return FIXTURES["evm_transaction"]
    if name == "domain":
        return FIXTURES["ens_domain"]
    if name == "protocol":
        return FIXTURES["defi_protocol"]
    if name == "entityId":
        return FIXTURES["entity_id"]
    if name == "categoryId":
        return FIXTURES["entity_category_id"]
    raise KeyError(f"No fixture for path parameter {name!r} in {operation.key}")


def query_value(operation: Operation, name: str, schema: dict[str, Any]) -> Any:
    if name in {"chain", "chains"}:
        return FIXTURES["evm_chain"]
    if name == "wallet_addresses":
        return [FIXTURES["evm_wallet"]]
    if name == "addresses":
        return [FIXTURES["evm_token"]]
    if name == "query":
        return FIXTURES["search_query"]
    if name == "timeframe":
        return "1d"
    if name == "timeFrame":
        return "1d"
    if name == "currency":
        return "usd"
    if name == "interval":
        return "1d"
    if name == "fromDate":
        return "2025-01-01T00:00:00.000Z"
    if name == "toDate":
        return "2025-01-02T00:00:00.000Z"
    if name == "date":
        return "2025-01-01T00:00:00.000Z"
    if name in {"limit", "offset"}:
        return 1
    if name in {"includeSpam", "excludeSpam", "nft_metadata", "media_items"}:
        return "false"
    if name == "include_internal_transactions":
        return "false"

    if "default" in schema:
        return schema["default"]
    if "example" in schema:
        return schema["example"]
    if schema.get("enum"):
        return schema["enum"][0]
    if schema.get("type") == "integer":
        return 1
    if schema.get("type") == "boolean":
        return "false"
    if schema.get("type") == "array":
        return []
    return None


def request_body(operation: Operation) -> dict[str, Any] | None:
    path = operation.path
    if operation.spec_path.name == "solana-api.json":
        if path == "/token/{network}/metadata":
            return {"addresses": [FIXTURES["sol_token"]]}
        if path == "/token/{network}/prices":
            return {"addresses": [FIXTURES["sol_token"]]}

    if path == "/discovery/tokens":
        return {"chain": FIXTURES["evm_chain"], "limit": 1}
    if path == "/erc20/prices":
        return {"tokens": [{"token_address": FIXTURES["evm_token"]}]}
    if path == "/nft/getMultipleNFTs":
        return {
            "tokens": [
                {
                    "token_address": FIXTURES["evm_nft"],
                    "token_id": FIXTURES["evm_nft_token_id"],
                }
            ]
        }
    if path == "/nft/metadata":
        return {"addresses": [FIXTURES["evm_nft"]]}
    if path == "/nft/{address}/nfts-by-traits":
        return {"traits": {}}
    if path == "/tokens/analytics":
        return {
            "tokens": [
                {"chain": FIXTURES["evm_chain"], "tokenAddress": FIXTURES["evm_token"]}
            ]
        }
    if path == "/tokens/analytics/timeseries":
        return {
            "tokens": [
                {"chain": FIXTURES["evm_chain"], "tokenAddress": FIXTURES["evm_token"]}
            ]
        }
    return None


def build_request(operation: Operation) -> tuple[str, dict[str, Any] | None]:
    spec = load_json(operation.spec_path)
    path = operation.path
    for name in PATH_PARAM_RE.findall(path):
        path = path.replace("{" + name + "}", urllib.parse.quote(path_value(operation, name)))

    query: dict[str, Any] = {}
    for param in operation.spec_operation.get("parameters", []):
        if param.get("in") != "query":
            continue
        schema = resolve_schema_ref(param.get("schema", {}), spec)
        required = param.get("required") is True
        if required or param.get("name") in {"chain", "limit"}:
            value = query_value(operation, param["name"], schema)
            if value is not None and value != []:
                query[param["name"]] = value

    encoded_query = urllib.parse.urlencode(query, doseq=True)
    url = f"{operation.base_url}{path}"
    if encoded_query:
        url = f"{url}?{encoded_query}"
    return url, request_body(operation)


def call_operation(
    operation: Operation,
    api_key: str,
    timeout: float,
) -> dict[str, Any]:
    url, body = build_request(operation)

    status = None
    weight = None
    error = ""
    with tempfile.TemporaryDirectory() as temp_dir:
        header_path = Path(temp_dir) / "headers.txt"
        body_path = Path(temp_dir) / "body.txt"
        cmd = [
            "curl",
            "--silent",
            "--show-error",
            "--location",
            "--request",
            operation.method,
            "--url",
            url,
            "--dump-header",
            str(header_path),
            "--output",
            str(body_path),
            "--header",
            "Accept: application/json",
            "--header",
            f"X-API-Key: {api_key}",
        ]

        if body is not None:
            cmd.extend(
                [
                    "--header",
                    "Content-Type: application/json",
                    "--data-binary",
                    json.dumps(body),
                ]
            )

        try:
            proc = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=timeout,
            )
            header_text = header_path.read_text() if header_path.exists() else ""
            body_text = body_path.read_text() if body_path.exists() else ""
            for line in header_text.splitlines():
                if line.startswith("HTTP/"):
                    parts = line.split()
                    if len(parts) >= 2 and parts[1].isdigit():
                        status = int(parts[1])
                if line.lower().startswith("x-request-weight:"):
                    weight = line.split(":", 1)[1].strip()
            if proc.returncode != 0:
                error = (proc.stderr or proc.stdout or "").strip()
            elif status is not None and status >= 400:
                error = body_text[:500].strip()
        except Exception as exc:  # noqa: BLE001 - report audit failures, do not crash all.
            error = str(exc)

    expected = operation.metadata.get("cus")
    parsed_weight = int(weight) if weight and weight.isdigit() else None
    result = "unknown"
    if parsed_weight is not None and expected is not None:
        result = "match" if parsed_weight == expected else "mismatch"
    elif parsed_weight is None:
        result = "missing-header"

    return {
        "operation": operation.key,
        "method": operation.method,
        "url": redact_url(url),
        "status": status,
        "expected_cus": expected,
        "cus_unit": operation.metadata.get("cusUnit", ""),
        "actual_weight": parsed_weight if parsed_weight is not None else "",
        "result": result,
        "error": error,
    }


def redact_url(url: str) -> str:
    return url


def write_report(rows: list[dict[str, Any]], output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = [
        "operation",
        "method",
        "url",
        "status",
        "expected_cus",
        "cus_unit",
        "actual_weight",
        "result",
        "error",
    ]
    with output_path.open("w", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true", help="print URLs without calling")
    parser.add_argument("--include-side-effecting", action="store_true")
    parser.add_argument("--only", help="substring filter for operation keys")
    parser.add_argument("--limit", type=int, help="maximum number of operations to audit")
    parser.add_argument("--timeout", type=float, default=20.0)
    parser.add_argument("--sleep", type=float, default=0.1, help="delay between calls")
    parser.add_argument("--output", type=Path, default=REPORT_PATH)
    parser.add_argument(
        "--fixture",
        action="append",
        default=[],
        metavar="NAME=VALUE",
        help="override a built-in fixture value, e.g. evm_wallet=0x...",
    )
    parser.add_argument(
        "--api-key-env",
        default="MORALIS_API_KEY",
        help="environment variable containing the API key",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    for fixture in args.fixture:
        if "=" not in fixture:
            print(f"Invalid --fixture value {fixture!r}; expected NAME=VALUE", file=sys.stderr)
            return 2
        name, value = fixture.split("=", 1)
        if name not in FIXTURES:
            print(
                f"Unknown fixture {name!r}. Valid names: {', '.join(sorted(FIXTURES))}",
                file=sys.stderr,
            )
            return 2
        FIXTURES[name] = value

    metadata = load_endpoint_metadata()
    operations = collect_operations(metadata)

    if args.only:
        operations = [operation for operation in operations if args.only in operation.key]
    if not args.include_side_effecting:
        operations = [
            operation for operation in operations if operation.path not in SIDE_EFFECTING_PATHS
        ]
    if args.limit is not None:
        operations = operations[: args.limit]

    if args.dry_run:
        for operation in operations:
            url, body = build_request(operation)
            suffix = f" body={json.dumps(body, sort_keys=True)}" if body else ""
            print(f"{operation.method} {redact_url(url)}{suffix}")
        print(f"Prepared {len(operations)} operations.")
        return 0

    api_key = os.environ.get(args.api_key_env)
    if not api_key:
        print(
            f"Missing API key. Export {args.api_key_env}=... or run with --dry-run.",
            file=sys.stderr,
        )
        return 2

    rows: list[dict[str, Any]] = []
    for index, operation in enumerate(operations, 1):
        row = call_operation(operation, api_key=api_key, timeout=args.timeout)
        rows.append(row)
        print(
            f"[{index}/{len(operations)}] {row['result']} "
            f"expected={row['expected_cus']} actual={row['actual_weight']} "
            f"status={row['status']} {operation.key}"
        )
        if args.sleep:
            time.sleep(args.sleep)

    write_report(rows, args.output)
    mismatches = [row for row in rows if row["result"] == "mismatch"]
    missing = [row for row in rows if row["result"] == "missing-header"]
    print(f"Wrote {args.output}")
    print(f"Audited {len(rows)} operations, {len(mismatches)} mismatches, {len(missing)} missing headers.")
    return 1 if mismatches else 0


if __name__ == "__main__":
    raise SystemExit(main())
