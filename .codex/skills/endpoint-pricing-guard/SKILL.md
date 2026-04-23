---
name: endpoint-pricing-guard
description: Keep Data API endpoint compute-unit pricing in sync for this docs repository. Use when adding or changing visible endpoint pages under `data-api/evm/`, `data-api/solana/`, or `data-api/universal/`; when editing `openapi:` frontmatter; when updating `EndpointMeta`; or when verifying billed endpoint pricing against Moralis usage and `x-request-weight`.
---

# Endpoint Pricing Guard

This repo stores endpoint pricing in one place and generates page-level `EndpointMeta`
props from that registry. Use this workflow instead of editing page prices ad hoc.

## Workflow

1. Identify the operation.
Read the page frontmatter `openapi:` value. That operation key is the source identifier.

2. Update the central registry.
Edit [data-api/endpoint-metadata.js](../../../data-api/endpoint-metadata.js).
Do not hand-edit page `cus`, `cusUnit`, `premium`, or `mainnetOnly` values as the source of truth.

3. Sync generated page props.
Run:

```bash
python3 scripts/sync-endpoint-metadata.py
```

This rewrites `EndpointMeta` props in visible endpoint pages from the registry.

4. Validate coverage and consistency.
Run:

```bash
python3 scripts/check-endpoint-metadata.py
```

This fails when a visible endpoint page:
- has `openapi:` but no endpoint pricing metadata
- has stale `EndpointMeta` props that do not match the registry
- points at an OpenAPI operation missing from the specs
- is missing from `data-api/pricing-sections.js` when it should appear on `/data-api/pricing`
- has a stale generated `data-api/pricing.mdx`

5. Run repo verification.
Run:

```bash
python3 -m json.tool docs.json >/dev/null
find openapi-files -name '*.json' -print0 | xargs -0 -n1 python3 -m json.tool >/dev/null
python3 scripts/sync-pricing-page.py
node --check data-api/endpoint-metadata.js
git diff --check
```

## Pricing Rules

- Treat [data-api/endpoint-metadata.js](../../../data-api/endpoint-metadata.js) as the authoritative editable file.
- Treat generated per-page `EndpointMeta` props as derived output.
- Use `cusUnit` for dynamic pricing such as `chain` or `wallet`.
- Ask the user for the CU value and flags when they are not already known.
- Ask explicitly whether the endpoint is `mainnetOnly`, `premium`, or dynamic via `cusUnit`.
- Do not assume this repo has environment variables or billing access available.
- Do not tell the user to test it manually unless they asked for a testing workflow.

## Fixture Guidance

If the user already knows the price or flags, prefer their answer over inference.
If the user does not know them, stop and ask instead of inventing values.

## New Page Checklist

When adding a new visible endpoint page under `data-api/evm/`, `data-api/solana/`, or
`data-api/universal/`:

1. Add the page with correct `openapi:` frontmatter.
2. Ask the user for:
   the CU value,
   whether it is `mainnetOnly`,
   whether it is `premium`,
   and whether it is dynamic via `cusUnit`.
3. Add the operation to `data-api/endpoint-metadata.js`.
4. Run `python3 scripts/sync-endpoint-metadata.py`.
5. Add the row definition to `data-api/pricing-sections.js` if the endpoint belongs on `/data-api/pricing`.
6. Run `python3 scripts/sync-pricing-page.py`.
7. Run `python3 scripts/check-endpoint-metadata.py`.

When someone asks “I added this endpoint page, what is left?”, answer with this checklist and verify every item rather than summarizing loosely.

Never report a new endpoint page as complete if it renders without a price card because the
coverage check is specifically meant to prevent that failure mode.
