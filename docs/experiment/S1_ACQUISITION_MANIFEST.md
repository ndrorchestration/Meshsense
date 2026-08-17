# Phase 2a — S1 Acquisition Manifest

## Dataset

**Exposing the CSI — S1**

- Publisher: Zenodo
- DOI: `10.5281/zenodo.7732595`
- Record: `https://zenodo.org/records/7732595`
- Archive: `S1.zip`
- Published archive size: ~11.1 GB
- Published MD5: `3e7d17df775762e9703ca818b1256c86`

The dataset provides CSI sequences for indoor activities, collected with 160-MHz 802.11ax devices and 4 antennas, using three receivers at different locations; the associated project also publishes anonymized ground-truth keypoints. citeturn333451search0turn333451search1

## Purpose in MeshSense

S1 is a **recorded-CSI compatibility/transfer dataset**, not the causal FM-01 clutter dataset. The Phase 2a objective is to verify that the file-based adapter can consume real CSI and produce valid non-constant metrics without claiming mitigation effectiveness.

## Acquisition target

Do not commit the 11.1-GB archive to this repository.

Acquire a small, documented subset locally, with the following manifest fields:

- source DOI;
- source record URL;
- source archive name;
- archive checksum;
- selected member-file paths;
- member-file checksums;
- acquisition timestamp;
- preprocessing description;
- adapter commit SHA;
- processing configuration hash.

## Suggested initial subset

Select five files that provide coverage across different activity types while preserving a clean/static example where available. Selection must be based on archive contents and recorded in this manifest before outcome analysis.

Do not substitute simulated files for the real-CSI compatibility gate.

## Current acquisition state

**NOT ACQUIRED IN THIS EXECUTION ENVIRONMENT.** The current execution environment has no direct outbound DNS/network access to Zenodo, so the archive could not be downloaded here. This is an infrastructure limitation, not a dataset failure.

The repository therefore records the exact acquisition target and checksum without fabricating a downloaded subset or an adapter result.

## Evidence boundary

A successful S1 adapter run may establish:

- file-format compatibility;
- parser correctness;
- numeric stability;
- real-CSI pipeline execution.

It does **not** establish:

- FM-01 causal failure;
- compensation effectiveness;
- RuView defect status;
- generalization to other hardware or environments.
