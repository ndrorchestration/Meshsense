# MeshSense Runtime Contract

This document defines the operational contract that must remain true independent of the six compensation experiments.

## Required routes

- `/` — browser-facing status surface; must return HTTP 200 and contain the MeshSense status title.
- `/health` — machine-readable operational status; must return HTTP 200 and report the expected service identity, `operational` state, and `runtime-surface` evidence level.
- `/api/status` — machine-readable status/provenance endpoint with the same minimum contract.

## Routing invariants

The health and status routes must be resolved from URL pathname, not the raw request target. Query parameters used for cache-busting, probes, or observability must not convert valid routes into 404 responses.

## Failure-closed behavior

Unknown routes must return HTTP 404 rather than silently falling through to a successful status response.

## Provenance invariant

In deployment environments that expose `VERCEL_GIT_COMMIT_SHA`, the runtime status payload should report that SHA. Local execution may report `GIT_COMMIT_SHA` or `unknown` when no commit identity is injected.

## Evidence boundary

Passing this contract establishes operational/runtime integrity only. It does not establish the effectiveness of FM-01 through FM-06, RuView sensing accuracy, or any broader scientific capability.

## Automation

The contract is continuously exercised by `.github/workflows/runtime-contract.yml` on pushes and pull requests targeting `main`.
