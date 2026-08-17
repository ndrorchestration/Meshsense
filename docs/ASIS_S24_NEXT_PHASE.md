# ASIS / Samsung Galaxy S24 — Next Phase

## Objective

Establish the Galaxy S24 as the primary physical sensor platform for the ASIS spatial-intelligence track.

## Phase S24-1 — Sensor capability inventory

Record, at runtime on the target device:

- sensor type/name;
- Android sensor API type;
- vendor/device metadata where exposed;
- nominal sampling rate;
- observed sampling rate;
- availability;
- accuracy field behavior;
- timestamp source and units;
- permission requirements;
- whether the sensor is hardware-backed or a fused/virtual sensor.

No capability should be inferred from model specifications alone when runtime enumeration can verify it.

## Phase S24-2 — Synchronized capture harness

Create an Android capture application that records timestamped streams with a common monotonic clock:

- accelerometer;
- gyroscope;
- magnetometer;
- barometer;
- proximity/light sensors where exposed;
- microphone/audio metadata and waveform only where explicitly required and consented;
- camera-derived metadata only where required;
- location where required;
- Wi-Fi/Bluetooth state relevant to the experiment.

The first objective is deterministic acquisition, not spatial inference.

## Phase S24-3 — Calibration and coordinate frames

Define and test:

- device frame;
- world frame;
- gravity alignment;
- magnetic-heading behavior;
- sensor bias/scale characterization;
- timestamp alignment;
- sample drop detection;
- orientation representation.

All calibration constants must be versioned with the capture session.

## Phase S24-4 — Spatial fusion fixture

Build a controlled fixture that can establish a known device pose and movement trajectory. Compare reconstructed motion against independently recorded ground truth.

The first pass should emphasize reproducibility and error characterization rather than an ambitious autonomous mapping claim.

## Evidence requirements

Every session should preserve:

- device model/build metadata;
- application commit SHA;
- sensor inventory;
- session start/end time;
- configuration hash;
- raw data file hashes;
- calibration version;
- environmental notes;
- excluded/degraded streams;
- analysis commit SHA.

## Relationship to MeshSense / RuView

S24 sensor experiments are independent evidence. They must not be described as Wi-Fi CSI capture or RuView compensation evidence unless a separately verified CSI-capable acquisition path exists.

ESP32-S3/RuView hardware remains an optional external instrument for the FM-01 causal experiment only.

## Immediate deliverable

The next ASIS implementation artifact should be an Android sensor-inventory/capture harness for the Galaxy S24, followed by a controlled calibration session.
