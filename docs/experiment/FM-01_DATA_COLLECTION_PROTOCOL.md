# FM-01 Controlled Clutter Data Collection Protocol

## Purpose

This protocol defines the physical/recorded-data collection required to test the FM-01 hypothesis: **multi-path interference & ambient clutter**.

This is the causal evidence tier. Public datasets such as Exposing the CSI S1 are compatibility/transfer datasets and must not be treated as matched clutter-control evidence.

## Experimental requirement

Every causal trial must use the same sensing hardware, radio configuration, node placement, target behavior, and acquisition settings across a matched clean/perturbed pair. Only the predefined clutter perturbation may change.

## Minimum setup

- One fixed WiFi transmitter/access-point configuration.
- At least one fixed CSI receiver; multiple receivers are preferred where available.
- Fixed receiver/transmitter geometry with measured distances.
- Stable room and furniture layout.
- A target actor following a scripted motion sequence.
- Timestamp synchronization sufficient to align acquisition and perturbation events.
- A machine capable of recording raw CSI/derived CSI without dropping frames silently.

## Conditions

### C0 — Clean control

Room in the declared baseline configuration. No introduced clutter event during the target window.

### C1 — Object introduction

Introduce a predefined non-target object or group of objects at a marked location between matched trials.

### C2 — Non-target movement

Introduce scripted movement in a marked region outside the target's path. Movement duration and trajectory must be recorded.

### C3 — Background occupancy

Introduce a non-target person into a marked region using a scripted stationary or low-motion behavior.

A study may use all conditions or a pre-registered subset. The selected subset must be fixed before formal outcome analysis.

## Trial design

Minimum initial design:

- 3 independent repetitions per condition;
- clean and perturbed trials paired by target behavior;
- randomized order of perturbation conditions where practical;
- one clean baseline check before and after each trial block.

For each repetition, record:

1. hardware identifiers;
2. radio/channel/bandwidth configuration;
3. receiver/transmitter positions;
4. target script identifier;
5. clutter condition and perturbation parameters;
6. perturbation start/stop timestamps;
7. acquisition timestamps;
8. raw CSI or lossless derived representation;
9. packet/frame loss counters;
10. software commit SHA;
11. operator/environment notes.

## Primary FM-01 metrics

The primary metric must be selected before the first formal collection run and held fixed throughout the experiment.

Recommended metric family:

- target/background separability or a predefined target-error measure derived from independently annotated target windows.

Secondary diagnostics:

- baseline drift;
- false-positive rate;
- false-negative rate;
- confidence stability;
- rejected/degraded/unknown rate;
- recovery/recalibration latency;
- frame-loss rate.

## Ground truth

Ground truth must identify the target behavior and the exact perturbation state. Video may be used by the researchers for annotation, but published evidence should prefer anonymized/derived annotations where practical.

Ground-truth labels must be created independently of the compensation output.

## Anti-confounding rules

Do not simultaneously change:

- target behavior;
- receiver/transmitter geometry;
- channel/bandwidth;
- sampling or preprocessing configuration;
- evaluation thresholds;
- hardware or firmware;
- compensation settings.

If any such change occurs, mark the trial as protocol-deviant and exclude it from the primary pass/fail calculation while retaining it as exploratory evidence.

## Reference and compensated processing

The same recorded CSI trial must be replayed through:

1. **Reference path:** unmitigated processing.
2. **Compensated path:** candidate adaptive background compensation.

This guarantees paired input data and removes acquisition noise from the reference-vs-compensated comparison.

## Evidence package

Each collection block must produce a manifest containing:

- dataset identifier;
- collection date/time;
- hardware IDs;
- experimental condition;
- trial IDs;
- raw-data file hashes;
- software commit SHA;
- processing configuration hash;
- annotation version;
- excluded/deviant trials and reasons.

No raw data should be committed to GitHub unless licensing and size are appropriate. Store hashes and durable external references instead.

## Decision boundary

A successful collection run establishes **usable causal data** only. It does not establish compensation effectiveness until the reference/compensated analysis satisfies the frozen FM-01 criterion.

The existing frozen criterion remains:

- improvement >= 20% across >= 3 independent repeated trials;
- clean-baseline degradation <= 10%.

Otherwise classify the result as FAIL or INCONCLUSIVE according to the FM-01 experiment protocol.

## Initial recommended collection matrix

| Condition | Repetitions | Target behavior | Purpose |
|---|---:|---|---|
| C0 clean | 3 | fixed script | clean reference/control |
| C1 object introduction | 3 | same script | controlled multipath/clutter perturbation |
| C2 non-target movement | 3 | same script | dynamic ambient clutter |
| C3 background occupancy | 3 | same script | human ambient clutter |

Expand only after the initial data-quality gate passes.

## Status

**Protocol drafted — expert review required before physical collection.**
