#!/usr/bin/env python3
"""Validate Data API endpoint pricing metadata.

The pricing registry is keyed by OpenAPI operation so page renames do not
require duplicated CU edits. This check keeps visible endpoint pages, their
frontmatter, and the registry in sync.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DOCS_CONFIG_PATH = ROOT / "docs.json"
METADATA_PATH = ROOT / "data-api" / "endpoint-metadata.js"
VISIBLE_ENDPOINT_PREFIXES = (
    "data-api/evm/",
    "data-api/solana/",
    "data-api/universal/",
)
ALLOWED_METADATA_KEYS = {"cus", "cusUnit", "mainnetOnly", "premium"}
FRONTMATTER_RE = re.compile(r"^---\n(?P<frontmatter>.*?)\n---", re.S)
OPENAPI_RE = re.compile(r'^openapi:\s*"(?P<operation>[^"]+)"', re.M)
ENDPOINT_META_RE = re.compile(r"<EndpointMeta\b(?P<attrs>[^>]*)/>", re.S)
OPERATION_RE = re.compile(
    r"^(?P<spec>/[^\s]+\.json)\s+(?P<method>[A-Z]+)\s+(?P<path>/.*)$"
)
METADATA_EXPORT_RE = re.compile(
    r"^export const endpointMetadata = (?P<metadata>\{.*\});\s*$",
    re.S,
)


def load_json(path: Path) -> Any:
    with path.open() as file:
        return json.load(file)


def load_endpoint_metadata(path: Path) -> dict[str, Any]:
    text = path.read_text()
    match = METADATA_EXPORT_RE.match(text)
    if not match:
        raise ValueError(
            f"{path.relative_to(ROOT)} must export `endpointMetadata` as a JSON object"
        )

    metadata = json.loads(match.group("metadata"))
    if not isinstance(metadata, dict):
        raise ValueError(f"{path.relative_to(ROOT)} must export an object")

    return metadata


def collect_visible_pages(node: Any) -> set[str]:
    pages: set[str] = set()

    if isinstance(node, list):
        for item in node:
            if isinstance(item, str):
                pages.add(item)
            else:
                pages.update(collect_visible_pages(item))
        return pages

    if isinstance(node, dict):
        for key, value in node.items():
            if key == "pages":
                pages.update(collect_visible_pages(value))
            elif isinstance(value, (dict, list)):
                pages.update(collect_visible_pages(value))
        return pages

    return pages


def page_path_for_slug(slug: str) -> Path:
    direct_path = ROOT / f"{slug}.mdx"
    if direct_path.exists():
        return direct_path

    overview_path = ROOT / slug / "overview.mdx"
    if overview_path.exists():
        return overview_path

    index_path = ROOT / slug / "index.mdx"
    if index_path.exists():
        return index_path

    return direct_path


def read_openapi_operation(path: Path) -> str | None:
    text = path.read_text()
    frontmatter_match = FRONTMATTER_RE.search(text)
    if not frontmatter_match:
        return None

    openapi_match = OPENAPI_RE.search(frontmatter_match.group("frontmatter"))
    if not openapi_match:
        return None

    return openapi_match.group("operation")


def parse_operation(operation: str) -> tuple[Path, str, str] | None:
    match = OPERATION_RE.match(operation)
    if not match:
        return None

    spec_path = ROOT / match.group("spec").lstrip("/")
    method = match.group("method").lower()
    api_path = match.group("path")
    return spec_path, method, api_path


def parse_endpoint_meta_attrs(attrs: str) -> tuple[str | None, dict[str, Any]]:
    operation_match = re.search(r'operation="([^"]+)"', attrs)
    operation = operation_match.group(1) if operation_match else None

    props: dict[str, Any] = {}
    premium_string_match = re.search(r'(?<![\w-])premium="([^"]+)"', attrs)
    if premium_string_match:
        props["premium"] = premium_string_match.group(1)
    elif re.search(r"(?<![\w-])premium(?![\w=-])", attrs):
        props["premium"] = True

    cus_match = re.search(r"(?<![\w-])cus=\{(\d+)\}", attrs)
    if cus_match:
        props["cus"] = int(cus_match.group(1))

    cus_unit_match = re.search(r'(?<![\w-])cusUnit="([^"]+)"', attrs)
    if cus_unit_match:
        props["cusUnit"] = cus_unit_match.group(1)

    if re.search(r"(?<![\w-])mainnetOnly(?![\w=-])", attrs):
        props["mainnetOnly"] = True

    return operation, props


def operation_exists(operation: str, spec_cache: dict[Path, dict[str, Any]]) -> bool:
    parsed = parse_operation(operation)
    if not parsed:
        return False

    spec_path, method, api_path = parsed
    if not spec_path.exists():
        return False

    if spec_path not in spec_cache:
        spec_cache[spec_path] = load_json(spec_path)

    methods = spec_cache[spec_path].get("paths", {}).get(api_path, {})
    return method in methods


def validate_metadata_shape(metadata: dict[str, Any], errors: list[str]) -> None:
    for operation, entry in metadata.items():
        if not isinstance(entry, dict):
            errors.append(f"{METADATA_PATH}: entry for {operation!r} must be an object")
            continue

        unknown_keys = sorted(set(entry) - ALLOWED_METADATA_KEYS)
        if unknown_keys:
            errors.append(
                f"{METADATA_PATH}: entry for {operation!r} has unknown keys: "
                f"{', '.join(unknown_keys)}"
            )

        cus = entry.get("cus")
        if "cus" in entry and (not isinstance(cus, int) or cus < 0):
            errors.append(f"{METADATA_PATH}: {operation!r} has invalid cus value")

        if "cusUnit" in entry and not isinstance(entry["cusUnit"], str):
            errors.append(f"{METADATA_PATH}: {operation!r} has non-string cusUnit")

        if "mainnetOnly" in entry and not isinstance(entry["mainnetOnly"], bool):
            errors.append(f"{METADATA_PATH}: {operation!r} has non-boolean mainnetOnly")

        premium = entry.get("premium")
        if "premium" in entry and not isinstance(premium, (bool, str)):
            errors.append(f"{METADATA_PATH}: {operation!r} has invalid premium value")


def validate_visible_page(
    slug: str,
    metadata: dict[str, Any],
    errors: list[str],
) -> None:
    path = page_path_for_slug(slug)
    if not path.exists():
        errors.append(f"docs.json references missing page: {slug}")
        return

    operation = read_openapi_operation(path)
    if operation is None:
        return

    text = path.read_text()
    endpoint_meta_matches = list(ENDPOINT_META_RE.finditer(text))
    if len(endpoint_meta_matches) != 1:
        errors.append(
            f"{path.relative_to(ROOT)}: expected exactly one <EndpointMeta /> "
            f"for visible endpoint page, found {len(endpoint_meta_matches)}"
        )
        return

    attrs = endpoint_meta_matches[0].group("attrs")
    component_operation, props = parse_endpoint_meta_attrs(attrs)
    if not component_operation:
        errors.append(f"{path.relative_to(ROOT)}: EndpointMeta is missing operation")
        return

    if component_operation != operation:
        errors.append(
            f"{path.relative_to(ROOT)}: EndpointMeta operation does not match "
            f"frontmatter openapi ({component_operation!r} != {operation!r})"
        )

    entry = metadata.get(operation)
    if entry is None:
        errors.append(
            f"{path.relative_to(ROOT)}: missing metadata for visible operation "
            f"{operation!r}"
        )
        return

    if "cus" not in entry:
        errors.append(
            f"{path.relative_to(ROOT)}: visible operation {operation!r} has no cus "
            f"value in {METADATA_PATH.relative_to(ROOT)}"
        )

    if props != entry:
        errors.append(
            f"{path.relative_to(ROOT)}: EndpointMeta props do not match "
            f"{METADATA_PATH.relative_to(ROOT)} for {operation!r}; run "
            "`python3 scripts/sync-endpoint-metadata.py`"
        )


def main() -> int:
    docs_config = load_json(DOCS_CONFIG_PATH)
    try:
        metadata = load_endpoint_metadata(METADATA_PATH)
    except (OSError, ValueError, json.JSONDecodeError) as error:
        print(error, file=sys.stderr)
        return 1

    visible_pages = collect_visible_pages(docs_config)
    visible_endpoint_candidates = sorted(
        slug
        for slug in visible_pages
        if slug.startswith(VISIBLE_ENDPOINT_PREFIXES)
    )

    errors: list[str] = []
    validate_metadata_shape(metadata, errors)

    spec_cache: dict[Path, dict[str, Any]] = {}
    for operation in sorted(metadata):
        if not operation_exists(operation, spec_cache):
            errors.append(
                f"{METADATA_PATH.relative_to(ROOT)}: operation does not exist in "
                f"OpenAPI specs: {operation!r}"
            )

    checked_endpoint_count = 0
    for slug in visible_endpoint_candidates:
        path = page_path_for_slug(slug)
        if path.exists() and read_openapi_operation(path) is not None:
            checked_endpoint_count += 1
        validate_visible_page(slug, metadata, errors)

    if errors:
        print("Endpoint metadata validation failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print(
        "Endpoint metadata validation passed "
        f"({checked_endpoint_count} visible endpoint pages, "
        f"{len(metadata)} metadata entries)."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
