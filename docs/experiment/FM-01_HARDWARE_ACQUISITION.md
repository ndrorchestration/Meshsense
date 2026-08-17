# FM-01 Hardware Acquisition & Firmware Strategy

## Objective
Acquire the minimum reproducible physical CSI setup for the FM-01 controlled clutter experiment without relying on an unverified pre-built RuView firmware image.

## Recommended hardware

**Reference board:** Espressif ESP32-S3-DevKitC-1, preferably the N8R8 variant (8 MB flash + 8 MB PSRAM).

RuView's current documentation identifies the ESP32-S3-DevKitC-1 as a supported/reference board. Espressif documents the board as an ESP32-S3-WROOM development platform. Current Dutch distributor listings show the N8R8 board around €13 per unit, with availability varying by distributor.

## Minimum acquisition

- 2 identical ESP32-S3-DevKitC-1 boards for the first capture topology.
- 3 boards preferred for additional spatial diversity / diagnostic comparison.
- 1 known-good USB data cable per board.
- 1 stable 2.4 GHz Wi-Fi access point.
- 1 host PC capable of serial capture, hashing, CSI storage, and RuView/ESP-IDF tooling.

## Firmware strategy — important current constraint

Do **not** treat the latest shipped S3 pre-built binary as automatically valid for a display-less DevKitC-1.

Current RuView issue evidence documents a CSI-yield failure on display-less ESP32-S3-DevKitC-1 boards caused by display-probe behavior and the CSI promiscuous-filter path. A documented source-build workaround is to build with display support disabled (`CONFIG_DISPLAY_ENABLE=n`) so the CSI DATA-frame capture path is enabled.

Therefore H1 firmware acceptance requires a boot log demonstrating:

- successful Wi-Fi association;
- CSI capture enabled;
- non-zero CSI callback/frame yield;
- stable serial output over the preflight observation window;
- recorded firmware source/tag/commit identity.

A board is **not** considered H1-passing merely because it flashes or joins Wi-Fi.

## Suggested source-build path

Pin the RuView source revision used for the experiment. Build with the current ESP-IDF version required by that source tree and explicitly disable display support for display-less DevKitC-1 hardware.

Record:

- RuView Git SHA;
- ESP-IDF version;
- build configuration hash;
- generated binary SHA-256;
- flashing command/configuration;
- board model and flash/PSRAM configuration;
- serial-port identity;
- first successful CSI-yield observation.

Do not silently switch firmware versions between trials.

## Acceptance gates

### H1 — Capture capability
PASS only when real CSI frames are observed and persisted with non-zero yield.

### H2 — Fixed radio configuration
Record SSID/AP identity, band, channel, bandwidth, and any fixed capture parameters.

### H3 — Scene control
Record room geometry, sensor positions, target position, clutter positions, and camera/annotation setup if used.

### H4 — Paired replay
Confirm that the exact same recorded CSI trial can be processed through both reference and compensated paths.

### H5 — Ground truth
Create target/perturbation annotations independently of compensation output.

### H6 — Provenance
Hash every raw CSI file and processing configuration; record hardware and firmware identity with each trial.

## Acquisition status

**Hardware availability in the present execution environment: NOT VERIFIED.**

No purchase or physical-device receipt is claimed by this repository. This document is a procurement and acceptance specification until physical hardware is actually obtained and H1-H6 are executed.

## Evidence boundary

Hardware acquisition and firmware bring-up establish **experimental readiness**. They do not establish FM-01 mitigation effectiveness. Only the controlled C0-C3 dataset and frozen analysis protocol can produce causal FM-01 evidence.
