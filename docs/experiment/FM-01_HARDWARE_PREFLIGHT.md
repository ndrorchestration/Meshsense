# FM-01 — Hardware & Collection Preflight

## Purpose

This checklist converts the frozen FM-01 collection protocol into a fail-closed physical setup gate. It records what must be verified before any causal trial is eligible for the primary analysis.

## Hardware target

Preferred first configuration:

- RuView-compatible ESP32-S3 CSI capture hardware, or
- compatible WiFi NIC capable of lossless CSI capture at a documented fixed configuration.

The exact hardware model, firmware version, radio configuration, channel/bandwidth, antenna configuration, and receiver count must be recorded before collection.

## Preflight gates

### H1 — Capture capability

- [ ] CSI capture works continuously for the planned trial duration.
- [ ] Raw CSI or a lossless derived representation is retained.
- [ ] Frame/packet-loss counters are available.
- [ ] Timestamps are recorded with sufficient resolution for perturbation alignment.

### H2 — Fixed radio configuration

- [ ] Channel is fixed or a documented deterministic channel schedule is used.
- [ ] Bandwidth is fixed.
- [ ] Transmit/receive geometry is measured and recorded.
- [ ] Antenna/receiver configuration is recorded.
- [ ] Firmware/software versions are recorded.

### H3 — Scene control

- [ ] Receiver/transmitter locations are marked.
- [ ] Target movement script is prepared.
- [ ] Clutter locations are marked.
- [ ] Clean baseline scene is reproducible.
- [ ] Perturbation sequence is scripted.

### H4 — Paired replay

- [ ] The same recorded CSI trial can be replayed through the reference path.
- [ ] The same recorded CSI trial can be replayed through the compensated path.
- [ ] Compensation configuration is versioned and fixed before formal analysis.

### H5 — Ground truth

- [ ] Target behavior annotation method is defined independently of compensation output.
- [ ] Perturbation start/stop events can be timestamped.
- [ ] Operator notes capture protocol deviations.

### H6 — Provenance

- [ ] MeshSense commit SHA recorded.
- [ ] Hardware identifiers recorded.
- [ ] Firmware identifiers recorded.
- [ ] Raw-data file hashes generated.
- [ ] Processing configuration hash generated.

## Eligibility rule

No trial may enter the primary FM-01 pass/fail calculation unless all H1–H6 gates are satisfied. Failed preflight conditions may be retained as setup/debug evidence but must be classified separately.

## Current state

**PHYSICAL HARDWARE NOT VERIFIED IN THIS CHAT EXECUTION ENVIRONMENT.** No hardware availability claim is being made. The repository is prepared for physical setup, but causal collection remains blocked pending actual capture hardware and controlled-scene access.
