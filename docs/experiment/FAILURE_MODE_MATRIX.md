# MeshSense Failure-Mode Compensation Experiment

## Status

**Matrix state:** Frozen as a provisional experimental hypothesis set  
**Date:** 2026-08-17  
**Reference system:** [RuView](https://github.com/ruvnet/RuView), an independently maintained open-source project by `ruvnet`  
**Experimental system:** `ndrorchestration/Meshsense`

> These six modes are **experimental hypotheses**, not established defects in RuView. They were selected as high-value stressors for a companion-layer compensation experiment. Each mode must be validated empirically before any claim of mitigation is made.

## Experiment objective

Determine whether an independently developed companion layer can detect, compensate for, and make observable six high-impact failure modes relevant to RF/CSI-based sensing workflows without modifying or claiming ownership of the underlying RuView application.

The experiment separates three evidence classes:

1. **Operational evidence** — deployment, routing, runtime, and provenance.
2. **Compensation evidence** — whether MeshSense changes the measured outcome under a defined failure condition.
3. **Capability evidence** — whether any improvement generalizes to the intended sensing task.

A passing operational gate does not imply a passing compensation or capability gate.

## Matrix

| ID | Failure mode / hypothesis | Failure definition | Trigger / observable | Impact | Compensation mechanism | Expected improvement | Test procedure | Pass/fail criterion | Evidence artifact |
|---|---|---|---|---|---|---|---|---|---|
| FM-01 | Multi-path interference & ambient clutter | Environmental changes introduce CSI components unrelated to the target subject and degrade signal separability. | Controlled environment perturbation: furniture movement, non-target motion, or background occupancy change; monitor baseline drift and target-signal stability. | Increased false positives/negatives, pose instability, vital-signal contamination, or confidence collapse. | Adaptive background model / baseline subtraction with recalibration detection and bounded update rate. | Lower background-induced variance and improved target-vs-background separation without suppressing true subject motion. | Record a fixed baseline scene, introduce controlled clutter, then compare reference vs companion-layer outputs over matched trials. | **PASS:** predefined error/confidence metric improves by ≥20% versus the unmitigated reference across ≥3 repeated trials, with no >10% degradation in the clean baseline. Otherwise **FAIL**. | Raw CSI or derived traces, trial metadata, baseline/compensated metrics, plots, reproducibility manifest. |
| FM-02 | Sensor hardware mismatch | Different ESP32-S3 devices or compatible NICs produce materially different CSI amplitude/phase characteristics for equivalent physical conditions. | Cross-device calibration runs; compare distributions and feature statistics under the same scene. | Device-dependent bias, unstable thresholds, poor transferability, inconsistent confidence. | Per-device normalization and calibration profile with explicit calibration state. | Reduced between-device variance while preserving within-device signal structure. | Collect matched trials on ≥3 sensors; evaluate raw and normalized feature distributions and downstream metric variance. | **PASS:** between-device variance decreases by ≥30% while downstream task metric does not degrade by >10%. Otherwise **FAIL**. | Calibration profiles, device inventory, matched-trial dataset, variance report, commit-linked experiment record. |
| FM-03 | WiFi channel hopping / interference | Non-target network activity or channel changes interrupt, corrupt, or destabilize CSI acquisition. | Inject controlled competing traffic and/or channel transitions; record packet gaps, channel changes, dropped frames, and timestamp discontinuities. | Missing observations, burst errors, stale state, confidence oscillation, or incorrect continuity assumptions. | Channel-aware filtering, acquisition-state detection, bounded retry/reacquisition, and explicit gap handling. | Faster and safer recovery from interference with fewer corrupted sequences presented to downstream inference. | Run controlled interference trials with known start/stop events; compare packet continuity and downstream error before/after compensation. | **PASS:** ≥50% reduction in unusable/corrupted windows and recovery to nominal acquisition within a predefined recovery bound in ≥3 trials. Otherwise **FAIL**. | Interference timeline, packet-loss logs, acquisition-state traces, recovery measurements. |
| FM-04 | Low-SNR environment | Weak or noisy CSI reduces usable signal-to-noise ratio below the level needed for stable inference. | Controlled distance/wall/attenuation changes; estimate SNR or equivalent signal-quality indicator. | Confidence collapse, missed detections, unstable pose/vital estimates, increased latency from repeated retries. | Adaptive quality gating, multi-node aggregation where available, and graceful degraded-mode behavior. | More stable detection and fewer false confident outputs under degraded signal quality. | Sweep controlled attenuation/SNR conditions and compare reference vs compensation at matched operating points. | **PASS:** usable-operating-range extension of ≥20% or ≥20% reduction in task error within the same low-SNR band, without increasing false-confidence rate by >5 percentage points. Otherwise **FAIL**. | SNR/quality traces, operating-point table, error/confidence curves, trial manifest. |
| FM-05 | Multi-person occlusion / target entanglement | Multiple people produce overlapping RF responses that make target separation ambiguous or unstable. | Two-person and three-person trials with controlled spacing, crossing, and partial occlusion. | Missed person, identity swaps, merged poses, unstable counts, or incorrect activity attribution. | Temporal separation, multi-node diversity, track continuity constraints, and ambiguity/uncertainty signalling. | Better identity/count stability and fewer merged detections under controlled overlap. | Repeat multi-person scenarios at predefined spacing and motion patterns; compare count/identity continuity against reference. | **PASS:** ≥25% relative reduction in identity/count errors across ≥3 scenarios, with uncertainty correctly raised in genuinely ambiguous cases. Otherwise **FAIL**. | Video-free trial protocol, estimated tracks/counts, error annotations, uncertainty events, metric report. |
| FM-06 | Latency / real-time constraint | Processing, transport, or queueing delay causes outputs to represent stale scene state. | Inject controlled load or measure end-to-end event-to-output latency under nominal and stressed conditions. | Stale pose/activity state, delayed alerts, temporal mismatch, queue growth, or dropped updates. | Stream prioritization, bounded queues, load shedding, lightweight fallback path, and explicit staleness detection. | Lower tail latency and reduced stale-output rate while maintaining minimum acceptable task quality. | Measure end-to-end latency over nominal and stressed workloads; compare p50/p95/p99 latency and stale-output rate. | **PASS:** p95 latency reduced by ≥25% and stale-output rate reduced by ≥30%, with task quality degradation ≤10%. Otherwise **FAIL**. | Timestamped input/output traces, queue-depth telemetry, latency distributions, task-quality comparison. |

## Pre-registration rules

### 1. Reference condition

Each experiment must include an unmitigated reference condition using the same hardware, scene, workload, trial duration, and evaluation metrics as the compensated condition.

### 2. Repetition

Single successful demonstrations are insufficient. Unless a mode specifies a stronger requirement, use at least **3 independent repeated trials** per condition.

### 3. Measurement integrity

Instrumentation must distinguish:

- missing data;
- degraded-but-valid data;
- compensated data;
- rejected data; and
- genuinely improved task outcomes.

A reduction in reported output caused merely by suppressing difficult cases does not count as successful compensation.

### 4. No circular evidence

The compensation layer must not use its own pass/fail output as the sole evidence that compensation succeeded. External measurements or independently derived metrics are required.

### 5. Fail-closed behavior

When signal quality, calibration validity, acquisition continuity, or temporal freshness is outside the tested operating envelope, the system should expose degraded/unknown state rather than silently presenting normal-confidence output.

### 6. Provenance

Every experiment artifact should record the MeshSense commit, runtime/deployment identity where applicable, trial configuration, hardware identity, and test timestamp.

## Evidence classification

| Evidence class | Meaning |
|---|---|
| Operational | The service or experiment infrastructure ran as intended. |
| Mechanistic | The compensation mechanism changed the targeted intermediate condition as expected. |
| Outcome | The intended sensing/task metric improved against the reference. |
| Generalization | The improvement persists across additional conditions not used to tune the compensation. |
| Negative | The hypothesis was not supported, the effect was insufficient, or the compensation introduced an unacceptable trade-off. |

## Current status

The six-mode matrix is **frozen as a hypothesis set**. No failure mode is marked as mitigated until its experimental pass criterion is met and its evidence artifact is preserved.

The existing MeshSense deployment/provenance work establishes only the **operational evidence layer**. It does not establish success for FM-01 through FM-06.

## Next experimental phase

1. Implement or instrument one compensation mechanism at a time.
2. Create baseline and compensated trial fixtures.
3. Capture the required raw/derived measurements.
4. Run the pre-registered trials.
5. Preserve negative results as first-class evidence.
6. Update this matrix with observed results without silently changing the pre-registered criteria.
