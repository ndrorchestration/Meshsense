# FM-01 Phase 2a — Recorded CSI Data Selection

## Decision

**Primary public-data candidate:** *Exposing the CSI* — Scenario S1, Cominelli, Gringoli & Restuccia, Zenodo DOI `10.5281/zenodo.7732595`.

Source repository: https://github.com/ansresearch/exposing-the-csi  
Dataset record: https://zenodo.org/records/7732595

The dataset is appropriate for a **recorded-CSI compatibility and transfer stage** because it contains indoor CSI sequences, multiple receivers, target activities, an empty-room condition, and anonymized ground-truth keypoints. The dataset documentation describes seven scenarios spanning different people/environments and three receivers collecting the same frames at different locations.

## Why S1 is selected

S1 is the initial acquisition target because it provides a contained lab scenario from the dataset family and preserves the possibility of comparing target-present sequences with an empty-room reference within a consistent collection campaign.

The complete S1 archive is approximately 11.1 GB. The repository must therefore support a user-supplied local dataset path rather than bundling the external dataset.

## Evidence boundary

This dataset does **not** by itself constitute a perfect causal FM-01 experiment. The published scenarios were not collected specifically as matched pairs with and without a controlled clutter intervention. Therefore:

- running the adapter on S1 is **recorded-CSI compatibility evidence**;
- comparing empty-room/background statistics with target-present sequences is **mechanistic diagnostic evidence**;
- a frozen FM-01 PASS requires a properly paired perturbation/reference experiment satisfying the existing protocol.

No result from this phase may be represented as proof that RuView has an FM-01 defect or that the compensation mitigates it in production.

## Adapter contract

`scripts/fm01-file.py` accepts `.npy`, `.csv`, or `.json` numeric arrays and records:

- dataset identity and URL;
- input SHA-256;
- input shape;
- preprocessing/compensation parameters;
- deterministic metric output;
- explicit `NOT_RUN` state unless the full matched experimental protocol is satisfied.

The adapter is intentionally conservative: it is a bridge into the real-data path, not a substitute for the full causal experiment.

## Secondary candidate

**WiMANS** is retained as a secondary candidate for later testing because it contains 11,286 raw CSI samples across 2.4/5 GHz, 0–5 users, synchronized video, and annotations for identity, location, and activity. It is especially useful for multi-person and generalization studies, but its published structure is less directly aligned with a controlled ambient-clutter intervention.

Source: https://github.com/huangshk/WiMANS

## Acquisition status

**Dataset selected:** YES  
**Dataset downloaded into repository:** NO  
**Recorded-data trial executed:** NO  
**FM-01 mitigation demonstrated:** NO

The next physical/data step is to acquire a permitted local S1 subset, record its exact archive/hash and selected files, run `scripts/fm01-file.py`, and only then determine whether the resulting measurements justify a formal paired FM-01 trial.
