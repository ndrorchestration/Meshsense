# MeshSense / RuView Status

Experimental deployment and runtime status surface for the MeshSense ecosystem.

## Purpose

This repository exists to provide a small, explicit runtime surface for deployment health and operational observation. It is intentionally separate from the acoustic-engineering implementation in [`Acoustic-mesh`](https://github.com/ndrorchestration/Acoustic-mesh).

### What this repository does

- Provides an explicit Node.js HTTP entrypoint.
- Exposes `/health` for deployment health checks.
- Exposes `/api/status` for machine-readable runtime status.
- Provides a minimal browser status surface.
- Defines evidence boundaries so deployment status is not confused with acoustic or governance validation.

### What it does not claim

A successful deployment does **not** establish:

- acoustic localization accuracy;
- spatial reconstruction accuracy;
- modal-analysis validity;
- WebRTC mesh performance;
- sensor-fusion accuracy;
- PDMAL superiority; or
- DGAF/governance effectiveness.

Those claims belong to their respective implementation and experimental evidence streams.

## Evidence progression

`CODED → CI VERIFIED → DEPLOYED → RUNTIME VERIFIED → EVIDENCE CLASSIFIED`

The repository is deliberately small so that Vercel entrypoint behavior can be tested independently of the larger Acoustic-Mesh codebase.

## Local validation

```bash
npm run check
npm start
```

Then inspect `/health`, `/api/status`, and `/`.
