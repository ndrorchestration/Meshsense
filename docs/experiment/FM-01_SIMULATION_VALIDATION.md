# FM-01 Synthetic Pipeline Validation

**Status:** Simulation pipeline validation only  
**Physical/recorded-CSI evidence:** NOT ESTABLISHED  
**Reference system:** RuView (`ruvnet/RuView`)  
**Experimental system:** MeshSense (`ndrorchestration/Meshsense`)

## Purpose

This record documents the first deterministic execution of the FM-01 measurement pipeline using a synthetic CSI-like signal model. It validates the harness, metric calculation, paired-condition logic, and threshold handling before physical or recorded-CSI trials.

It is **not** evidence that RuView exhibits the modeled failure under real conditions, and it is **not** evidence that the candidate compensation works in the real system.

## Synthetic trial design

- 3 independent deterministic seeds: `101`, `202`, `303`
- 1,200 samples per trial
- 100 Hz nominal sample rate
- Perturbation window: samples `400–799`
- Synthetic target: two deterministic sinusoidal components
- Background: low-frequency clutter plus seeded Gaussian noise
- Perturbation: additional synthetic clutter during the predefined window
- Candidate compensation: centered moving-average background estimate and subtraction
- Primary metric: MSE to the known synthetic target trace; lower is better

## Results

| Trial | Perturbed MSE — reference | Perturbed MSE — compensated | Improvement | Clean MSE — reference | Clean MSE — compensated | Clean degradation |
|---|---:|---:|---:|---:|---:|---:|
| Seed 101 | 1.048622 | 0.121959 | 88.37% | 0.628145 | 0.089616 | -85.73% |
| Seed 202 | 1.043173 | 0.121670 | 88.34% | 0.638294 | 0.092610 | -85.49% |
| Seed 303 | 1.050079 | 0.124031 | 88.19% | 0.640262 | 0.089326 | -86.05% |

Aggregate mean improvement: **88.30%**  
Worst clean-baseline degradation: **-85.49%**

The simulation therefore satisfies the frozen numerical gate on the synthetic fixture.

## Evidence classification

**Classification: MECHANISTIC/PIPELINE SYNTHETIC EVIDENCE**

What this demonstrates:

- the paired reference/compensated harness executes deterministically;
- the predefined MSE formulas execute correctly;
- the ≥20% improvement threshold is enforced;
- the ≤10% clean-baseline degradation threshold is enforced;
- repeated-trial aggregation works.

What this does not demonstrate:

- real RuView/ESP32-S3 or NIC behavior;
- real CSI multipath/clutter characteristics;
- validity of the synthetic perturbation model;
- real-world target/background separability;
- real-world compensation effectiveness;
- generalization to physical or recorded CSI.

## Reproducibility

Run:

```bash
npm run experiment:fm01
```

The workflow `.github/workflows/fm01-simulation.yml` runs the same deterministic harness and uploads `artifacts/fm01-sim/trial_results.json` as a CI artifact.

## Decision

**PIPELINE VALIDATION: PASS**  
**FM-01 REAL-WORLD MITIGATION: NOT EVALUATED**

The expert panel's no-overclaim rule remains active: synthetic success cannot be promoted to physical or RuView performance evidence.
