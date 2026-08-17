#!/usr/bin/env python3
"""FM-01 recorded-CSI adapter.

Reads a small, user-supplied recorded CSI array (.npy/.csv/.json), computes a
stable amplitude trace, applies the same bounded moving-background subtraction
family used by the synthetic harness, and emits JSON trial metrics.

This adapter deliberately does not claim that the input dataset is a matched
FM-01 perturbation experiment. Dataset provenance and suitability are recorded
in the output manifest.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
from pathlib import Path
from typing import Any

import numpy as np


def load_array(path: Path) -> np.ndarray:
    suffix = path.suffix.lower()
    if suffix == ".npy":
        arr = np.load(path)
    elif suffix == ".csv":
        with path.open(newline="") as handle:
            rows = list(csv.reader(handle))
        arr = np.asarray([[float(x) for x in row] for row in rows], dtype=float)
    elif suffix == ".json":
        arr = np.asarray(json.loads(path.read_text()), dtype=float)
    else:
        raise ValueError("Supported inputs: .npy, .csv, .json")
    if arr.size == 0 or not np.isfinite(arr).all():
        raise ValueError("Input contains no finite numeric samples")
    return arr


def amplitude_trace(arr: np.ndarray) -> np.ndarray:
    """Collapse complex/feature CSI into one RMS amplitude trace per frame."""
    if np.iscomplexobj(arr):
        amp = np.abs(arr)
    else:
        amp = np.abs(arr.astype(float))
    if amp.ndim == 1:
        return amp
    return np.sqrt(np.mean(np.square(amp), axis=tuple(range(1, amp.ndim))))


def bounded_background_subtract(trace: np.ndarray, window: int = 25, alpha: float = 0.08) -> np.ndarray:
    """Deterministic causal moving-background compensation."""
    if window < 2:
        raise ValueError("window must be >= 2")
    background = np.empty_like(trace, dtype=float)
    state = float(trace[0])
    for i, value in enumerate(trace):
        background[i] = state
        state = (1.0 - alpha) * state + alpha * float(value)
        if i >= window:
            state = min(max(state, float(np.min(trace[i-window:i]))), float(np.max(trace[i-window:i])))
    compensated = trace - background
    return compensated


def summarize(reference: np.ndarray, compensated: np.ndarray) -> dict[str, float]:
    ref_error = float(np.mean(np.abs(reference - np.mean(reference))))
    comp_error = float(np.mean(np.abs(compensated)))
    improvement = 0.0 if ref_error == 0.0 else (ref_error - comp_error) / ref_error * 100.0
    return {
        "reference_error_proxy": ref_error,
        "compensated_error_proxy": comp_error,
        "improvement_percent": improvement,
    }


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--dataset-id", required=True)
    parser.add_argument("--dataset-url", required=True)
    parser.add_argument("--window", type=int, default=25)
    args = parser.parse_args()

    raw = load_array(args.input)
    trace = amplitude_trace(raw)
    compensated = bounded_background_subtract(trace, window=args.window)
    metrics = summarize(trace, compensated)

    result: dict[str, Any] = {
        "experiment": "FM-01",
        "phase": "2a-recorded-csi-adapter",
        "status": "ADAPTER_VALIDATION_ONLY",
        "dataset_id": args.dataset_id,
        "dataset_url": args.dataset_url,
        "input_sha256": sha256(args.input),
        "input_shape": list(raw.shape),
        "window": args.window,
        "metrics": metrics,
        "pass_fail": "NOT_RUN",
        "evidence_boundary": "Real CSI compatibility path; not a causal FM-01 mitigation result unless matched clean/perturbed reference and compensated trials satisfy the frozen protocol.",
    }
    args.output.write_text(json.dumps(result, indent=2) + "\n")
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
