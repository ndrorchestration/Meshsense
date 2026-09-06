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
              │ Provenance          │
              └──────────┬──────────┘
                         │
                         ▼
                  measurable evidence
```

The companion layer is evaluated separately from the underlying sensing system. A successful MeshSense deployment does **not** establish that RuView or any sensing hypothesis is scientifically correct.

## The six-failure-mode experiment

The authoritative experimental specification is frozen in [`docs/experiment/FAILURE_MODE_MATRIX.md`](docs/experiment/FAILURE_MODE_MATRIX.md).

The six modes are currently frozen as **provisional experimental hypotheses**, not established defects in RuView:

1. **FM-01 — Multi-path interference & ambient clutter**
2. **FM-02 — Sensor hardware mismatch**
3. **FM-03 — WiFi channel hopping / interference**
4. **FM-04 — Low-SNR environment**
5. **FM-05 — Multi-person occlusion / target entanglement**
6. **FM-06 — Latency / real-time constraint**

Each mode is pre-specified with a failure definition, observable, proposed compensation, test procedure, quantitative pass/fail criterion, and required evidence artifact.

### Critical experimental rule

These modes are **hypotheses to test**, not claims that RuView necessarily fails in every circumstance. A mode is not considered a demonstrated defect, and a compensation is not considered effective, until its dedicated evidence criteria are satisfied.

A failure-mode mitigation is also **not considered demonstrated** merely because the companion service is deployed or returns HTTP 200. Compensation effectiveness requires a dedicated experiment with a measurable criterion and an independent reference condition.

## MeshSense runtime verification surface

The repository contains a deliberately small Node.js service used to verify the companion-layer deployment boundary. Its role is **deployment verification, runtime observability, and evidence classification**.

- `/` — browser-facing status surface.
- `/health` — machine-readable runtime/deployment status including source repository and deployed commit.
- `/api/status` — machine-readable runtime status with `no-store` semantics.

The runtime provenance surface uses Vercel's `VERCEL_GIT_COMMIT_SHA` when available, with `GIT_COMMIT_SHA` as a fallback.

## Current verified deployment state

Freshly reconciled **2026-09-06**:

- **Repository:** `ndrorchestration/Meshsense`
- **Branch:** `main`
- **Current GitHub main:** `594ac6c4ba85cd7ac5cb332a7cc1d2167e3e4967`
- **Current production deployment:** `dpl_93qbVTmHzTY5NpTBPSJzcxx25hSf`
- **Vercel project:** `meshsense-ruview-status`
- **Deployment state:** `READY`
- **Deployment target:** `production`
- **Deployment Git SHA:** `594ac6c4ba85cd7ac5cb332a7cc1d2167e3e4967`
- **Source/deployment identity:** **VERIFIED — exact SHA match**
- `/` observed HTTP 200 on 2026-09-06
- `/health` observed HTTP 200 and reported commit `594ac6c4ba85cd7ac5cb332a7cc1d2167e3e4967`
- `/api/status` observed HTTP 200 with `cache-control: no-store` and reported the same commit
- **Current runtime/source binding:** **VERIFIED for this runtime status surface**

This verification establishes that the current status service is deployed from the current `main` revision and that the observed runtime endpoints expose that identity. It does **not** establish sensing correctness or failure-mode compensation effectiveness.

## Evidence model

Deployment/runtime evidence:

`CODED → CI/STATIC CHECKS → DEPLOYED → SOURCE-BOUND → RUNTIME OBSERVED → EVIDENCE CLASSIFIED`

Experimental evidence for each failure mode:

`HYPOTHESIS → BASELINE → COMPENSATION → MECHANISTIC EVIDENCE → OUTCOME EVIDENCE → GENERALIZATION`

The two tracks must remain separate. Runtime health is not experimental efficacy.

## What this project currently establishes

- An independent companion-layer experiment around a third-party sensing system.
- A frozen six-mode failure-compensation hypothesis set.
- A reproducible Node.js runtime verification surface.
- Explicit health and status contracts.
- A current production deployment exactly bound to current GitHub `main` as verified on 2026-09-06.
- Runtime exposure of the deployed commit SHA.
- Quantitative experiment criteria for proposed compensations.
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
- ASIS field performance;
- PDMAL superiority;
- DGAF/governance effectiveness; or
- broader scientific claims made by the surrounding ecosystem.

Those claims require their own implementation, benchmark, experiment, and/or audit evidence.

## Relationship to the wider ecosystem

MeshSense is an **independent experimental companion**, not a fork or replacement for RuView.

- **RuView:** external reference system maintained by `ruvnet`.
- **MeshSense:** experimental companion/failure-mode compensation layer.
- **Runtime status surface:** deployment/provenance verification infrastructure.
- **Six-failure-mode matrix:** experimental evidence track for determining whether compensation actually works.

Cross-repository relationships do not transfer validation.

## Local validation

```bash
npm run check
npm start
```

Then inspect `/`, `/health`, and `/api/status`. Query-string probes should preserve route behavior as defined by the implementation.

## Audit posture

A production HTTP 200 is evidence of an operational endpoint. Exact Git/deployment SHA agreement is evidence of source binding. Neither is evidence of sensing correctness or compensation effectiveness.

## Next experimental priorities

1. Implement or instrument one compensation mechanism at a time.
2. Establish matched baseline and compensated trial fixtures.
3. Capture the measurements required by the frozen matrix.
4. Run repeated pre-registered trials and preserve negative results.
5. Add automated regression tests around experiment instrumentation.
6. Evaluate generalization under conditions not used to tune the compensation.
7. Preserve source-to-runtime and source-to-experiment provenance for every evidence artifact.

## Attribution

RuView is an independent open-source project by ruvnet. This repository references RuView as an external experimental reference point and does not represent itself as the RuView project or as an official RuView extension.
