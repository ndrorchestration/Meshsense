# MeshSense / RuView Status — Repository Quality Baseline

**Audit date:** 2026-08-15  
**Epistemic status:** experimental runtime-status surface; production route behavior currently failing

## Verified source state

- README defines `/health` and `/api/status` as intended machine-readable runtime endpoints and explicitly separates this repository from `Acoustic-mesh`. fileciteturn106file0
- `package.json` defines Node >=20 and `npm run check` as `node --check server.js`. fileciteturn107file0
- `server.js` implements `/health` and `/api/status` with HTTP 200 responses and an explicit `evidenceLevel: runtime-surface`. fileciteturn108file0
- CI and `vercel.json` remain part of the repository deployment surface.

## Production runtime finding — 2026-08-15

The current Vercel production deployment was inspected directly. Both documented endpoints returned **HTTP 404**:

- `GET /health` → `{"error":"not_found"}`
- `GET /api/status` → `{"error":"not_found"}`

Vercel runtime logs for deployment `dpl_uZdP6uzH1puxtZkPPdq5pwfEjJWJ` confirm both requests reached production and returned 404. The runtime log reports `Legacy server listening...`, which does not match the current repository `server.js` startup message (`MeshSense status listening on ...`).

This is strong evidence that the current production deployment is not serving the inspected repository implementation at the documented routes, or is otherwise bound to a different source/runtime than the current `main` state.

## Evidence classification

| Layer | State |
|---|---|
| Repository source implementation | **VERIFIED** |
| Local syntax-check definition | **VERIFIED** |
| Vercel project existence | **VERIFIED** |
| Production deployment existence | **VERIFIED** |
| Documented route behavior in production | **FAILED** |
| GitHub source → production equivalence | **FAILED / UNRESOLVED** |
| Runtime status surface | **NOT VERIFIED** |
| Acoustic validation | **NOT CLAIMED** |
| Spatial/sensor validation | **NOT CLAIMED** |

## Required remediation

1. Identify the source/build associated with the current Vercel deployment.
2. Reconcile the deployment with canonical `ndrorchestration/Meshsense` `main`.
3. Redeploy from the intended source if the binding is stale.
4. Re-test `/health`, `/api/status`, and `/` after deployment.
5. Retain deployment ID, source commit, timestamps, HTTP responses, and runtime logs as the reproducibility artifact.
6. Do not classify MeshSense as runtime verified until those checks pass.

## Normalization rule

A `READY` Vercel deployment proves deployment completion, not intended-source equivalence or route correctness.

*Updated during the 2026-08-15 repository quality normalization pass.*
