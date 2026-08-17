# MeshSense / RuView Status

**Deployment provenance and runtime-observability surface for the MeshSense ecosystem.**

MeshSense / RuView Status is a deliberately small Node.js service that provides a controlled, auditable runtime surface around the larger MeshSense / Acoustic-Mesh work. Its primary role is **deployment verification, runtime observability, and evidence classification**—not acoustic inference itself.

## Why this project exists

Larger experimental systems can make it difficult to distinguish between:

- code that exists;
- code that passes local/CI checks;
- code that successfully deploys;
- code that actually responds in production; and
- capabilities that have been experimentally validated.

This repository isolates the deployment/runtime layer so those states can be tested independently and reported without overstating what the evidence proves.

## Current verified state

As of **2026-08-17**, the production runtime has been verified through the canonical Vercel deployment surface.

- **Repository:** `ndrorchestration/Meshsense`
- **Branch:** `main`
- **Verified deployment commit:** `dbd9f13141b14f06357f99323710bfd0fd994013`
- **Production deployment:** `dpl_6j1pZBaagPvYdrPNYngR6Tt4yWnW`
- **Deployment state:** READY
- `/` returns HTTP 200
- `/health` returns HTTP 200
- `/api/status` returns HTTP 200
- `/health` and `/api/status` expose the deployed Git commit SHA
- Query-string routing has been verified
- Source → commit → deployment → canonical runtime provenance is verified

The runtime provenance surface uses Vercel's `VERCEL_GIT_COMMIT_SHA` when available, with `GIT_COMMIT_SHA` as a fallback.

## What the service provides

### `/`

A minimal browser-facing status surface.

### `/health`

A machine-readable deployment/health response containing service identity, operational state, evidence level, source repository, deployed commit, and generation timestamp.

### `/api/status`

A machine-readable runtime status endpoint with the same provenance information. Responses are marked `no-store` to avoid stale operational status being treated as current evidence.

### Routing behavior

Routes are resolved from `URL.pathname` rather than the raw request URL. This prevents query parameters used for probes, cache-busting, or observability from producing false 404 responses.

## Evidence model

The project uses the following progression:

`CODED → CI VERIFIED → DEPLOYED → RUNTIME VERIFIED → EVIDENCE CLASSIFIED`

The final state does not mean that the underlying MeshSense scientific/engineering claims are proven. It means that the **deployment and runtime surface itself has been observed and its evidence boundaries are explicit**.

## What this repository does establish

- A reproducible Node.js HTTP entrypoint.
- Explicit health and status endpoints.
- Production deployment observability.
- Source-to-deployment provenance.
- Runtime exposure of the deployed commit SHA.
- A small independent surface for testing Vercel routing and deployment behavior.
- Clear separation between operational evidence and capability claims.

## What this repository does not establish

A successful deployment or healthy runtime does **not** establish:

- acoustic localization accuracy;
- spatial reconstruction accuracy;
- modal-analysis validity;
- WebRTC mesh performance;
- sensor-fusion accuracy;
- ASIS capability or field performance;
- PDMAL superiority;
- DGAF/governance effectiveness; or
- any broader scientific claim made by the surrounding ecosystem.

Those claims require their own implementation, benchmark, experiment, and/or audit evidence.

## Relationship to the larger ecosystem

This repository is a **runtime verification companion**, not a replacement for the larger acoustic-engineering implementation. The primary acoustic implementation remains in [`Acoustic-mesh`](https://github.com/ndrorchestration/Acoustic-mesh).

The separation is intentional: deployment infrastructure can be verified without treating deployment success as evidence that the underlying acoustic, spatial, sensing, or governance hypotheses are correct.

## Local validation

```bash
npm run check
npm start
```

Then inspect:

```text
/
/health
/api/status
```

Query-string probes should also preserve routing, for example:

```text
/health?probe=1
/api/status?probe=1
```

## Audit posture

The project is intentionally conservative about claims. A production HTTP 200 is evidence of an operational endpoint; it is not evidence of scientific correctness. The runtime commit identifier exists specifically to make the deployment provenance chain inspectable.

Future quality work should prioritize automated regression tests for the health/status contract and preservation of source-to-runtime provenance in CI/CD.
