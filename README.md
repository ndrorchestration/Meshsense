# MeshSense — RuView Failure-Mode Compensation Experiment

**An independent companion-layer experiment for studying whether six identified high-impact failure modes around an existing WiFi-sensing system can be detected, compensated for, and made measurable without modifying the underlying application.**

## Important attribution and scope

**RuView is an existing open-source project maintained by [ruvnet](https://github.com/ruvnet/ruview).** It uses WiFi Channel State Information (CSI) for camera-free sensing and reports capabilities including presence detection, movement analysis, pose estimation, and vital-sign monitoring.

This repository is **not RuView**, is not the RuView repository, and does not claim ownership of or authorship over RuView. MeshSense was created as an independent experiment using RuView as an external reference point and experimental target.

The experiment asks a narrower systems-engineering question:

> **Can an independently developed companion layer detect, compensate for, and make observable specific failure modes around an existing AI/sensing system without requiring modification of the underlying application?**

The project therefore focuses on **failure-mode analysis, compensation strategies, verification, observability, and reproducible evidence** rather than reimplementing RuView's WiFi-sensing technology.

## Experimental model

```text
                 EXISTING SYSTEM
                 ┌───────────────┐
                 │    RuView     │
                 │    ruvnet     │
                 └───────┬───────┘
                         │
              observed inputs / outputs
                         │
                         ▼
              ┌─────────────────────┐
              │      MeshSense      │
              │  Companion Layer    │
              ├─────────────────────┤
              │ Failure Detection   │
              │ Compensation        │
              │ Verification        │
              │ Runtime Evidence    │
              │ Provenance           │
              └──────────┬──────────┘
                         │
                         ▼
                  measurable evidence
```

The companion layer is evaluated separately from the underlying sensing system. A successful MeshSense deployment does **not** establish that RuView or any sensing hypothesis is scientifically correct.

## The six-failure-mode experiment

The central research artifact is a six-failure-mode compensation study. Each failure mode should be formalized with:

1. **Failure definition** — what can go wrong.
2. **Observable/trigger** — how the failure can be detected.
3. **Impact** — why it matters.
4. **Compensation mechanism** — what MeshSense does in response.
5. **Expected improvement** — what should change if compensation works.
6. **Test procedure** — how the claim is experimentally tested.
7. **Pass/fail criterion** — what constitutes success.
8. **Evidence artifact** — what reproducible evidence supports the result.

The exact six failure modes are intentionally treated as an experimental specification rather than being inferred from this deployment README. Their authoritative definitions belong in the experiment/test documentation so that each claim can be independently audited.

### Evidence rule

A failure-mode mitigation is **not considered demonstrated** merely because the companion service is deployed or returns HTTP 200. Compensation effectiveness requires a dedicated experiment with a measurable criterion.

## MeshSense runtime verification surface

The repository also contains a deliberately small Node.js service used to verify the companion-layer deployment boundary. Its role is **deployment verification, runtime observability, and evidence classification**.

### `/`

A minimal browser-facing status surface.

### `/health`

A machine-readable deployment/health response containing service identity, operational state, evidence level, source repository, deployed commit, and generation timestamp.

### `/api/status`

A machine-readable runtime status endpoint with the same provenance information. Responses use `no-store` so stale operational status is not mistaken for current evidence.

### Routing behavior

Routes are resolved from `URL.pathname` rather than the raw request URL. This prevents query parameters used for probes, cache-busting, or observability from producing false 404 responses.

## Current verified deployment state

As of **2026-08-17**, the production runtime verification surface has been audited through the canonical Vercel deployment.

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

## Evidence model

The deployment layer uses the progression:

`CODED → CI VERIFIED → DEPLOYED → RUNTIME VERIFIED → EVIDENCE CLASSIFIED`

The final deployment state means that the **runtime verification surface itself** has been observed and its evidence boundaries are explicit. It does not mean the six compensation hypotheses have been proven.

## What this project establishes

- An independent companion-layer experiment around an existing third-party sensing system.
- A framework for formalizing six failure modes and their compensation tests.
- A reproducible Node.js runtime verification surface.
- Explicit health and status contracts.
- Production deployment observability.
- Source-to-deployment provenance.
- Runtime exposure of the deployed commit SHA.
- Clear separation between operational evidence and capability claims.

## What this project does not establish

A successful deployment or healthy runtime does **not** establish:

- RuView authorship or ownership;
- replacement or reimplementation of RuView;
- acoustic localization accuracy;
- spatial reconstruction accuracy;
- WiFi/CSI sensing accuracy;
- pose-estimation accuracy;
- vital-sign estimation accuracy;
- effectiveness of any of the six compensations without dedicated experiments;
- ASIS capability or field performance;
- PDMAL superiority;
- DGAF/governance effectiveness; or
- broader scientific claims made by the surrounding ecosystem.

Those claims require their own implementation, benchmark, experiment, and/or audit evidence.

## Relationship to the wider ecosystem

MeshSense is an **independent experimental companion**, not a fork or replacement for RuView.

The external reference system is:

- **RuView:** `ruvnet/RuView` — an existing open-source WiFi-sensing application maintained by another developer.

The local project should be understood as:

- **MeshSense:** experimental companion/failure-mode compensation layer.
- **Runtime status surface:** deployment and provenance verification infrastructure.
- **Six-failure-mode matrix:** the experimental evidence track for determining whether compensation actually works.

This separation is intentional. It allows deployment infrastructure, compensation hypotheses, and underlying sensing capabilities to be evaluated independently rather than conflated.

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

The project is intentionally conservative about claims. A production HTTP 200 is evidence of an operational endpoint; it is not evidence of sensing correctness or compensation effectiveness.

The runtime commit identifier exists specifically to make the deployment provenance chain inspectable.

### Next quality priorities

1. Formalize the authoritative six-failure-mode matrix.
2. Add automated regression tests for each compensation contract.
3. Define quantitative pass/fail thresholds for each mitigation.
4. Preserve source-to-runtime provenance in CI/CD.
5. Produce reproducible evidence artifacts for successful and unsuccessful compensation trials.

## Attribution

RuView is an independent open-source project by ruvnet. This repository references RuView as an external experimental reference point and does not represent itself as the RuView project or as an official RuView extension.
