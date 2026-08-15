# MeshSense / RuView Status — Repository Quality Baseline

**Audit date:** 2026-08-15  
**Epistemic status:** experimental runtime-status surface; production route behavior currently failing

## Verified source state

- README defines `/health` and `/api/status` as intended machine-readable runtime endpoints and explicitly separates this repository from `Acoustic-mesh`. fileciteturn106file0
- `package.json` defines Node >=20 and `npm run check` as `node --check server.js`. fileciteturn107file0
- `server.js` implements `/health` and `/api/status` with HTTP 200 responses and an explicit `evidenceLevel: runtime-surface`. fileciteturn108file0
- `vercel.json` explicitly builds `server.js` with `@vercel/node` and routes all paths to that entrypoint. fileciteturn115file0

## Production runtime finding — 2026-08-15

The current Vercel production deployment `dpl_uZdP6uzH1puxtZkPPdq5pwfEjJWJ` is **READY**, but its production endpoints are incorrect.

Direct production checks returned:

- `GET /health` → **HTTP 404**
- `GET /api/status` → **HTTP 404**

Vercel runtime logs for the deployment independently confirm both requests reached production and returned 404. The runtime log reports `Legacy server listening...`, which does not match the current repository `server.js` startup message (`MeshSense status listening on ...`).

The Vercel build log reports that the build completed using `server.js` as the root entrypoint. This makes the runtime discrepancy especially important: deployment completed successfully, but the observed runtime behavior does not match the current source implementation.

## Vercel project provenance finding

The current Vercel project `meshsense-ruview-status` reports:

- framework: `node`;
- Node runtime: `24.x`;
- latest production deployment: `dpl_uZdP6uzH1puxtZkPPdq5pwfEjJWJ`;
- production aliases: `meshsense-ruview-status.vercel.app` and `meshsense-ruview-status-ndrorchestration.vercel.app`.

The project metadata inspected through the available Vercel connector does **not expose a GitHub repository/branch binding**. Therefore the exact GitHub commit used for the production deployment remains unresolved.

This is sufficient to classify the deployment/runtime evidence as failed, not merely unobserved.

## Evidence classification

| Layer | State |
|---|---|
| Repository source implementation | **VERIFIED** |
| Local syntax-check definition | **VERIFIED** |
| Vercel deployment configuration in source | **VERIFIED** |
| Vercel project existence | **VERIFIED** |
| Production deployment existence | **VERIFIED** |
| Production build completion | **VERIFIED** |
| Documented route behavior in production | **FAILED** |
| GitHub source → production commit equivalence | **UNRESOLVED** |
| Runtime status surface | **FAILED** |
| Acoustic validation | **NOT CLAIMED** |
| Spatial/sensor validation | **NOT CLAIMED** |

## Required remediation

1. Establish the GitHub-to-Vercel source binding for `meshsense-ruview-status`, preferably with an explicit repository/branch configuration.
2. If the project is intentionally manually deployed, record the exact source commit as deployment provenance.
3. Reconcile the production deployment with canonical `ndrorchestration/Meshsense` `main`.
4. Redeploy the intended source through the verified binding.
5. Re-test `/health`, `/api/status`, and `/` after deployment.
6. Retain deployment ID, source commit, timestamps, HTTP responses, build logs, and runtime logs as the reproducibility artifact.
7. Do not classify MeshSense as runtime verified until those checks pass.

## Closure boundary

GitHub issue #1 remains open because its required evidence chain is not satisfied: `canonical source → CI → production deployment → endpoint verification → runtime/source equivalence`.

## Normalization rule

A `READY` Vercel deployment proves deployment completion, not intended-source equivalence or route correctness. A successful build also does not prove that the deployed runtime is serving the expected behavior.

*Updated during the 2026-08-15 repository quality normalization pass.*
