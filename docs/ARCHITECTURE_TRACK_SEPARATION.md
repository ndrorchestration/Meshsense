# Architecture Track Separation

## Purpose

MeshSense and the broader ASIS work contain two related but distinct experimental tracks. They must not be conflated.

## Track A — ASIS / Samsung Galaxy S24

The **Samsung Galaxy S24 is the primary target hardware platform** for the ASIS spatial-intelligence work.

The intended S24 sensing stack includes available Android-accessible device sensors and interfaces such as:

- accelerometer
- gyroscope
- magnetometer
- barometer
- proximity/light-related sensors where exposed
- microphones/audio input
- cameras
- location
- Wi-Fi/Bluetooth connectivity

The ASIS software layer is responsible for synchronized acquisition, calibration, coordinate-frame management, sensor fusion, spatial inference, and acoustic/spatial experimentation.

The next physical milestones for ASIS are Android sensor capability verification, synchronized capture, calibration, and spatial-fusion validation.

## Track B — MeshSense / RuView FM-01

MeshSense is an **independent experimental companion layer** around the existing third-party RuView project.

The six failure modes are hypotheses for a compensation experiment. The current FM-01 hypothesis concerns multi-path interference and ambient clutter.

ESP32-S3 hardware is an **optional RuView-specific experimental instrument** for collecting CSI when a controlled causal FM-01 experiment requires it. ESP32 acquisition requirements therefore apply to the RuView/FM-01 track only.

ESP32 hardware is not a prerequisite for the ASIS/S24 architecture.

## Boundary rule

Do not use ESP32/RuView hardware results as evidence that the S24 ASIS sensing stack works. Conversely, do not use S24 sensor measurements as evidence of RuView CSI compensation effectiveness.

Cross-track findings may inform architecture, but evidence remains attributed to the hardware and protocol that generated it.

## Current priorities

### ASIS / S24

1. Enumerate Android-visible sensors and capabilities on the target S24.
2. Build a timestamped multi-sensor capture harness.
3. Establish device/body/world coordinate frames and calibration procedures.
4. Validate synchronized IMU/audio/spatial capture.
5. Build the first spatial-fusion experiment.

### MeshSense / RuView FM-01

1. Preserve the frozen FM-01 protocol and evidence gates.
2. Treat ESP32-S3 acquisition as optional and experiment-specific.
3. Execute H1-H6 only when physical RuView-compatible capture hardware is actually available.
4. Keep synthetic, compatibility, and causal evidence separated.

## Epistemic status

This separation is an architectural/documentation correction. It does not establish new sensing capabilities or experimental results.
