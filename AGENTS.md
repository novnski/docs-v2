# Repository Guidelines

## Project Structure & Module Organization

This is a Mintlify documentation repository. `docs.json` controls navigation, theme, and API reference wiring; update it whenever pages are added, moved, or removed. Product docs live in top-level directories such as `get-started/`, `data-api/`, `auth-api/`, `streams/`, `rpc-nodes/`, `datashare/`, and `data-indexer/`. Tutorials are grouped under `get-started/tutorials/`. Reusable MDX/JSX snippets belong in `snippets/`, static assets in `images/` and `logo/`, and OpenAPI sources in `openapi-files/`.

## Build, Test, and Development Commands

- `mint dev`: preview the docs locally from the repository root at `http://localhost:3000`.
- `mint update`: update the Mintlify CLI if local preview behavior is stale or broken.
- `python3 -m json.tool docs.json >/dev/null`: validate the Mintlify config JSON.
- `find openapi-files -name '*.json' -print0 | xargs -0 -n1 python3 -m json.tool >/dev/null`: validate OpenAPI JSON files.
- `git diff --check`: catch trailing whitespace, conflict markers, and whitespace errors before committing.

There are no configured package scripts, build system, or test runner in this repo.

## Coding Style & Naming Conventions

Use MDX with concise headings, short paragraphs, and copy-pasteable examples. Keep filenames and URL slugs lowercase kebab-case, for example `get-erc-20-token-balances-for-a-wallet.mdx`. Prefer stable relative links that match Mintlify navigation paths, and avoid changing existing slugs unless the redirect or migration impact is understood. Follow existing two-space indentation in JSON and JSX snippets. Put reusable examples in `snippets/` instead of duplicating long blocks across pages.

## Testing Guidelines

For content-only edits, run JSON validation and `git diff --check`, then preview the affected pages with `mint dev`. For API reference changes, validate the edited file under `openapi-files/` and confirm the corresponding rendered page loads in the local preview. Check navigation changes by opening the relevant tab or group defined in `docs.json`.

## Commit & Pull Request Guidelines

Recent commits use short, direct messages such as `Add Bitcoin Streams page` and `Escape path params in Bitcoin Streams endpoints table`. Keep commit messages imperative and scoped to one logical change. Pull requests should summarize changed sections, list validation performed, link relevant issues, and include screenshots for visible navigation, layout, or component changes.

## Security & Configuration Tips

Do not commit `.env` files, API keys, generated URL exports, or private customer data. Use placeholders in examples and keep local-only URL lists out of commits as indicated by `.gitignore`.
