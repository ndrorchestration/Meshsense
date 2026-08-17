#!/usr/bin/env node

/**
 * FM-01 simulation harness.
 *
 * IMPORTANT: This is a deterministic pipeline-validation fixture, not RuView
 * hardware/CSI evidence. It exists to prove that the paired reference /
 * compensation measurement pipeline, thresholds, manifests, and output
 * schema behave as intended before physical or recorded-CSI trials.
 */

import { mkdir, writeFile } from "node:fs/promises";

const SEEDS = [101, 202, 303];
const SAMPLE_COUNT = 1200;
const SAMPLE_RATE_HZ = 100;
const PERTURBATION_START = 400;
const PERTURBATION_END = 800;
const MOVING_AVG_RADIUS = 51;
const IMPROVEMENT_THRESHOLD_PCT = 20;
const CLEAN_DEGRADATION_LIMIT_PCT = 10;

function gaussian(seedState) {
  let u = 0;
  let v = 0;
  do {
    seedState.value = (1664525 * seedState.value + 1013904223) >>> 0;
    u = (seedState.value + 1) / 4294967297;
  } while (u <= 0);
  do {
    seedState.value = (1664525 * seedState.value + 1013904223) >>> 0;
    v = (seedState.value + 1) / 4294967297;
  } while (v <= 0);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function mse(actual, expected, start, end) {
  let total = 0;
  for (let i = start; i < end; i += 1) {
    const error = actual[i] - expected[i];
    total += error * error;
  }
  return total / (end - start);
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function pctImprovement(referenceError, compensatedError) {
  return ((referenceError - compensatedError) / referenceError) * 100;
}

function pctDegradation(cleanReferenceError, cleanCompensatedError) {
  return ((cleanCompensatedError - cleanReferenceError) / cleanReferenceError) * 100;
}

function generateTrial(seed) {
  const rng = { value: seed >>> 0 };
  const target = [];
  const reference = [];

  for (let i = 0; i < SAMPLE_COUNT; i += 1) {
    const t = i / SAMPLE_RATE_HZ;
    const targetSignal =
      0.8 * Math.sin(2 * Math.PI * 0.9 * t) +
      0.25 * Math.sin(2 * Math.PI * 2.1 * t);
    const ambientClutter =
      0.9 * Math.sin(2 * Math.PI * 0.18 * t + 0.7) +
      0.35 * Math.sin(2 * Math.PI * 0.47 * t) +
      0.08 * gaussian(rng);
    const perturbation =
      i >= PERTURBATION_START && i < PERTURBATION_END
        ? 1.2 * Math.sin(2 * Math.PI * 0.32 * t) +
          0.6 * Math.sin(2 * Math.PI * 0.08 * t)
        : 0;

    target.push(targetSignal);
    reference.push(targetSignal + ambientClutter + perturbation);
  }

  const compensated = reference.map((value, i) => {
    const start = Math.max(0, i - MOVING_AVG_RADIUS);
    const end = Math.min(SAMPLE_COUNT, i + MOVING_AVG_RADIUS + 1);
    let sum = 0;
    for (let j = start; j < end; j += 1) sum += reference[j];
    return value - sum / (end - start);
  });

  const perturbationReferenceError = mse(
    reference,
    target,
    PERTURBATION_START,
    PERTURBATION_END
  );
  const perturbationCompensatedError = mse(
    compensated,
    target,
    PERTURBATION_START,
    PERTURBATION_END
  );
  const cleanReferenceError = mse(reference, target, 0, PERTURBATION_START);
  const cleanCompensatedError = mse(compensated, target, 0, PERTURBATION_START);

  const improvementPct = pctImprovement(
    perturbationReferenceError,
    perturbationCompensatedError
  );
  const cleanDegradationPct = pctDegradation(
    cleanReferenceError,
    cleanCompensatedError
  );

  const pass =
    improvementPct >= IMPROVEMENT_THRESHOLD_PCT &&
    cleanDegradationPct <= CLEAN_DEGRADATION_LIMIT_PCT;

  return {
    seed,
    sampleCount: SAMPLE_COUNT,
    sampleRateHz: SAMPLE_RATE_HZ,
    perturbation: {
      startSample: PERTURBATION_START,
      endSample: PERTURBATION_END,
      type: "synthetic ambient-clutter injection"
    },
    reference: {
      perturbedMse: perturbationReferenceError,
      cleanMse: cleanReferenceError
    },
    compensated: {
      perturbedMse: perturbationCompensatedError,
      cleanMse: cleanCompensatedError
    },
    improvementPct,
    cleanDegradationPct,
    decision: pass ? "PASS" : "FAIL"
  };
}

async function main() {
  const trials = SEEDS.map(generateTrial);
  const meanImprovementPct = mean(trials.map((trial) => trial.improvementPct));
  const worstCleanDegradationPct = Math.max(
    ...trials.map((trial) => trial.cleanDegradationPct)
  );
  const aggregatePass =
    trials.length >= 3 &&
    trials.every((trial) => trial.decision === "PASS") &&
    meanImprovementPct >= IMPROVEMENT_THRESHOLD_PCT &&
    worstCleanDegradationPct <= CLEAN_DEGRADATION_LIMIT_PCT;

  const result = {
    experiment: "FM-01",
    mode: "simulation-pipeline-validation",
    evidenceClass: "synthetic-pipeline",
    notPhysicalEvidence: true,
    referenceSystem: "ruvnet/RuView",
    experimentalSystem: "ndrorchestration/Meshsense",
    metric: "MSE against known synthetic target trace; lower is better",
    thresholds: {
      improvementPctMin: IMPROVEMENT_THRESHOLD_PCT,
      cleanDegradationPctMax: CLEAN_DEGRADATION_LIMIT_PCT,
      minimumRepeatedTrials: 3
    },
    trials,
    aggregate: {
      meanImprovementPct,
      worstCleanDegradationPct,
      decision: aggregatePass ? "PASS" : "FAIL"
    }
  };

  await mkdir("artifacts/fm01-sim", { recursive: true });
  await writeFile(
    "artifacts/fm01-sim/trial_results.json",
    `${JSON.stringify(result, null, 2)}\n`,
    "utf8"
  );

  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
