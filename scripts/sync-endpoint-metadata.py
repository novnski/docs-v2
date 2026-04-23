#!/usr/bin/env python3
"""Write EndpointMeta props from the central endpoint metadata registry."""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
METADATA_PATH = ROOT / "data-api" / "endpoint-metadata.js"
FRONTMATTER_RE = re.compile(r"^(---\n.*?\n---\n)", re.S)
OPENAPI_RE = re.compile(r'^openapi:\s*"(?P<operation>[^"]+)"', re.M)
ENDPOINT_META_RE = re.compile(r"<EndpointMeta\b[^>]*/>", re.S)
METADATA_EXPORT_RE = re.compile(
    r"^export const endpointMetadata = (?P<metadata>\{.*\});\s*$",
    re.S,
)


def load_endpoint_metadata() -> dict[str, Any]:
    text = METADATA_PATH.read_text()
    match = METADATA_EXPORT_RE.match(text)
    if not match:
        raise ValueError(
            f"{METADATA_PATH.relative_to(ROOT)} must export endpointMetadata"
        )
    metadata = json.loads(match.group("metadata"))
    if not isinstance(metadata, dict):
        raise ValueError(f"{METADATA_PATH.relative_to(ROOT)} must export an object")
    return metadata


def endpoint_meta_tag(operation: str, entry: dict[str, Any]) -> str:
    attrs = [f'operation="{operation}"']

    premium = entry.get("premium")
    if isinstance(premium, str):
        attrs.append(f'premium="{premium}"')
    elif premium is True:
        attrs.append("premium")

    if "cus" in entry:
        attrs.append(f'cus={{{entry["cus"]}}}')

    if "cusUnit" in entry:
        attrs.append(f'cusUnit="{entry["cusUnit"]}"')

    if entry.get("mainnetOnly") is True:
        attrs.append("mainnetOnly")

    return f"<EndpointMeta {' '.join(attrs)} />"


def page_openapi_operation(text: str) -> str | None:
    frontmatter = FRONTMATTER_RE.search(text)
    if not frontmatter:
        return None
    openapi = OPENAPI_RE.search(frontmatter.group(1))
    return openapi.group("operation") if openapi else None


def main() -> int:
    metadata = load_endpoint_metadata()
    changed: list[Path] = []

    for path in sorted((ROOT / "data-api").rglob("*.mdx")):
        text = path.read_text()
        if "<EndpointMeta" not in text:
            continue

        operation = page_openapi_operation(text)
        if operation is None or operation not in metadata:
            continue

        replacement = endpoint_meta_tag(operation, metadata[operation])
        updated = ENDPOINT_META_RE.sub(replacement, text, count=1)
        if updated != text:
            path.write_text(updated)
            changed.append(path)

    if changed:
        print(f"Updated {len(changed)} endpoint pages:")
        for path in changed:
            print(f"- {path.relative_to(ROOT)}")
    else:
        print("Endpoint pages are already in sync.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
