#!/usr/bin/env python3
"""Generate data-api/pricing.mdx from pricing sections and endpoint metadata."""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
METADATA_PATH = ROOT / "data-api" / "endpoint-metadata.js"
PRICING_SECTIONS_PATH = ROOT / "data-api" / "pricing-sections.js"
PRICING_PAGE_PATH = ROOT / "data-api" / "pricing.mdx"
METADATA_EXPORT_RE = re.compile(
    r"^export const endpointMetadata = (?P<metadata>\{.*\});\s*$",
    re.S,
)
PRICING_SECTIONS_EXPORT_RE = re.compile(
    r"^export const pricingSections = (?P<sections>\{.*\});\s*$",
    re.S,
)

SECTION_TITLES = [
    (
        "universalApiComputeUnits",
        "Universal API Compute Units",
        "These endpoints support both EVM and Solana chains.",
        [
            ("tokenDiscoveryAnalytics", "Token Discovery & Analytics"),
            ("entityApi", "Entity API"),
            ("volumeMarketData", "Volume & Market Data"),
        ],
    ),
    (
        "evmApiComputeUnits",
        "EVM API Compute Units",
        None,
        [
            ("walletApi", "Wallet API"),
            ("tokenApi", "Token API"),
            ("nftApi", "NFT API"),
            ("priceApi", "Price API"),
            ("defiApi", "DeFi API"),
            ("blockchainApi", "Blockchain API"),
        ],
    ),
    (
        "solanaApiComputeUnits",
        "Solana API Compute Units",
        None,
        [
            ("walletApi", "Wallet API"),
            ("tokenApi", "Token API"),
            ("nftApi", "NFT API"),
            ("priceApi", "Price API"),
        ],
    ),
]


def load_exported_object(path: Path, pattern: re.Pattern[str], label: str) -> dict[str, Any]:
    text = path.read_text()
    match = pattern.match(text)
    if not match:
        raise ValueError(f"Could not parse {label} from {path}")

    raw = match.group(1 if pattern.groups == 1 else "metadata")
    raw = re.sub(r"([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:", r'\1"\2":', raw)
    raw = re.sub(r",(\s*[}\]])", r"\1", raw)
    obj = json.loads(raw)
    if not isinstance(obj, dict):
        raise ValueError(f"{path} did not export an object")
    return obj


def load_endpoint_metadata() -> dict[str, Any]:
    return load_exported_object(METADATA_PATH, METADATA_EXPORT_RE, "endpointMetadata")


def load_pricing_sections() -> dict[str, Any]:
    return load_exported_object(PRICING_SECTIONS_PATH, PRICING_SECTIONS_EXPORT_RE, "pricingSections")


def format_cost(entry: dict[str, Any]) -> str:
    return f"{entry['cus']} per {entry['cusUnit']}" if "cusUnit" in entry else str(entry["cus"])


def render_table(rows: list[dict[str, str]], metadata: dict[str, Any]) -> list[str]:
    lines = ["| Method | CU Cost |", "| --- | --- |"]
    for row in rows:
        entry = metadata[row["operation"]]
        lines.append(f"| [{row['label']}]({row['href']}) | {format_cost(entry)} |")
    return lines


def render_pricing_page(sections: dict[str, Any], metadata: dict[str, Any]) -> str:
    lines = [
        "---",
        'title: "Data API Pricing"',
        'sidebarTitle: "Pricing"',
        'description: "Detailed pricing information for our Data API."',
        "---",
        "",
        "For a detailed explanation of Compute Units (CUs) and how they work, check out our [Compute Units section](/get-started/pricing).",
        "",
        "---",
        "",
    ]

    for index, (section_key, section_title, description, categories) in enumerate(SECTION_TITLES):
        lines.append(f"## {section_title}")
        lines.append("")
        if description:
            lines.append(description)
            lines.append("")

        for category_key, category_title in categories:
            rows = sections[section_key][category_key]
            lines.append(f"### {category_title}")
            lines.append("")
            lines.extend(render_table(rows, metadata))
            lines.append("")

        if index < len(SECTION_TITLES) - 1:
            lines.extend(["---", ""])

    return "\n".join(lines).rstrip() + "\n"


def main() -> int:
    metadata = load_endpoint_metadata()
    sections = load_pricing_sections()
    content = render_pricing_page(sections, metadata)
    PRICING_PAGE_PATH.write_text(content)
    print(f"Updated {PRICING_PAGE_PATH.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
