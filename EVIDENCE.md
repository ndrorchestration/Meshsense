# Evidence Boundary

## Purpose

MeshSense / RuView Status is a deployment and runtime observation surface. It is not the Acoustic-Mesh signal-processing implementation and is not a governance engine.

## Evidence levels

- **CODED** — source exists in this repository.
- **CI VERIFIED** — automated syntax/build checks pass.
- **DEPLOYED** — Vercel has accepted a deployment.
- **RUNTIME VERIFIED** — `/health` and `/api/status` return successful responses from the deployed runtime.
- **EVIDENCE CLASSIFIED** — operational observations have been recorded with their limits.

A deployment alone does not establish acoustic localization, spatial reconstruction, modal-analysis validity, WebRTC performance, or governance effectiveness.

## Relationship to other systems

- `Acoustic-mesh` remains the canonical acoustic/WebRTC engineering repository.
- This repository provides status/runtime observation for MeshSense/RuView.
- DGAF, PDMAL, and related governance/control research remain separate systems unless an explicit integration is implemented and tested.
