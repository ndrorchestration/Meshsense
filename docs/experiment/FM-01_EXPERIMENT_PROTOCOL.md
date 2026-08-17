# FM-01 — Multi-Path Interference & Ambient Clutter

## Purpose

Define the first controlled experiment for the frozen MeshSense six-mode hypothesis set.

**Reference system:** RuView (`ruvnet/RuView`)  
**Experimental system:** MeshSense (`ndrorchestration/Meshsense`)

This protocol tests whether a companion-layer compensation mechanism can reduce target-signal degradation caused by controlled environmental perturbations. It does **not** establish that RuView has a universal defect.

## Panel review status

The expert panel approved progression to fixture/instrumentation design with the following safeguards:

- Preserve a clean-scene control.
- Keep an unmitigated reference condition paired with every compensated condition.
- Measure raw/derived signals before and after compensation.
- Distinguish suppression/rejection from actual improvement.
- Predefine metrics before data collection.
- Preserve negative and null results.
- Do not alter the frozen pass criterion after observing results.

## Candidate compensation

**Adaptive background model / baseline subtraction with recalibration detection and bounded update rate.**

This is a candidate intervention, not a proven solution. Alternative mechanisms may be evaluated only as separately versioned interventions.

## Experimental units

A trial consists of a matched pair:

1. **Reference:** unmitigated processing path.
2. **Compensated:** identical input data passed through the candidate compensation path.

The same hardware, sensor placement, scene geometry, acquisition settings, target behavior, and trial duration must be used for each pair.

## Controlled perturbations

Use repeatable environmental changes that alter background conditions without intentionally changing the target behavior. Examples include:

- controlled furniture displacement;
- controlled non-target movement;
- controlled background occupancy changes;
- repeatable object introduction/removal.

Record exact perturbation start/stop timestamps and a short scene-state description.

## Primary measurements

At minimum capture:

- raw acquisition/CSI-derived signal trace where available;
- target-presence or target-window annotations;
- baseline/background estimate;
- compensated signal trace;
- signal-quality indicator used by the system;
- confidence/output state;
- rejected/degraded/unknown events;
- trial timestamps;
- hardware identity;
- software commit identifier.

## Primary outcome

The frozen matrix defines success as:

> **At least 20% improvement in the predefined error/confidence metric versus the unmitigated reference across at least 3 repeated trials, with no more than 10% degradation in the clean baseline.**

The exact metric must be selected and documented **before** the first formal trial. The metric cannot be chosen after inspecting compensated results.

## Secondary diagnostics

Track:

- target/background separability;
- baseline drift;
- false-positive and false-negative changes where labels permit;
- confidence calibration;
- amount of signal rejected by the compensation layer;
- clean-scene performance;
- recovery/recalibration events.

## Anti-gaming rules

A compensation does not count as successful merely because it produces fewer outputs.

A result is invalid as a mitigation demonstration when improvement is caused by:

- suppressing difficult samples;
- changing the evaluation population;
- changing the scene between paired trials;
- changing thresholds after seeing results;
- using the compensation's own score as the sole success measure.

## Trial structure

For each repetition:

1. Establish clean baseline.
2. Record target behavior.
3. Introduce the predefined clutter perturbation.
4. Continue target behavior under perturbation.
5. Restore the clean condition where applicable.
6. Record recovery behavior.
7. Repeat the same sequence through reference and compensated paths.

Use at least 3 independent repeated trials for the initial gate.

## Evidence package

Each completed trial package should contain:

- `trial_manifest.json`
- raw/derived measurement files;
- reference outputs;
- compensated outputs;
- metric calculation;
- plots or machine-readable summaries;
- hardware/software identifiers;
- timestamps;
- MeshSense commit SHA;
- deployment identity when the experiment uses the deployed runtime;
- pass/fail decision;
- limitations and anomalous observations.

## Decision states

- **PASS:** frozen criterion satisfied.
- **FAIL:** criterion not satisfied.
- **INCONCLUSIVE:** instrumentation or protocol invalidated interpretation.
- **NOT RUN:** fixture/data unavailable.

No state other than PASS with preserved evidence may be described as demonstrated mitigation.

## Current status

**Design complete. Data collection not yet demonstrated.**

The MeshSense runtime/provenance layer is operational, but this document records an experimental protocol rather than an experimental result.
