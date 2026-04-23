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

5. Run repo verification.
Run:

```bash
python3 -m json.tool docs.json >/dev/null
find openapi-files -name '*.json' -print0 | xargs -0 -n1 python3 -m json.tool >/dev/null
node --check data-api/endpoint-metadata.js
git diff --check
```

## Pricing Rules

- Treat [data-api/endpoint-metadata.js](../../../data-api/endpoint-metadata.js) as the authoritative editable file.
- Treat generated per-page `EndpointMeta` props as derived output.
- Use `cusUnit` for dynamic pricing such as `chain` or `wallet`.
- Prefer billed usage deltas over assumptions when verifying a new price.
- Treat `200` billed results as authoritative.
- Treat `404` results as ambiguous unless the user explicitly confirms the expected billed value.
- Treat plan-restricted responses carefully: they may still bill.

## Billing Verification

Use the billing audit first when actual cost matters:

```bash
python3 scripts/audit-endpoint-billing.py --only '/wallets/{address}/chains'
python3 scripts/audit-endpoint-billing.py --include-side-effecting
```

Required environment variables:
- `MORALIS_API_KEY`
- `MORALIS_BILLING_BEARER`

Why this script exists:
- `curl` works reliably against Moralis/Cloudflare from this repo environment
- billed delta confirms whether `x-request-weight` matches actual usage

Use the header audit for quick spot checks or cross-checking:

```bash
python3 scripts/audit-endpoint-weights.py --only '/wallets/{address}/chains'
```

## Fixture Guidance

Both audit scripts already include working default fixtures for common EVM and Solana cases.
If an endpoint returns `404` or an unsupported-resource error, override the fixture instead of
changing pricing immediately.

Example:

```bash
python3 scripts/audit-endpoint-billing.py \
  --only '/nft/{network}/{address}/metadata' \
  --fixture sol_nft=Byg4PiNLvME2zi3fv8eb99mCKmvS6yxe64v2B55stqY5
```

## New Page Checklist

When adding a new visible endpoint page under `data-api/evm/`, `data-api/solana/`, or
`data-api/universal/`:

1. Add the page with correct `openapi:` frontmatter.
2. Add the operation to `data-api/endpoint-metadata.js`.
3. Run `python3 scripts/sync-endpoint-metadata.py`.
4. Run `python3 scripts/check-endpoint-metadata.py`.
5. If the price is new or suspicious, verify it with `scripts/audit-endpoint-billing.py`.

Never report a new endpoint page as complete if it renders without a price card because the
coverage check is specifically meant to prevent that failure mode.
