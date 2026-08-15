# Release and Evidence Policy

## Canonical identity

The GitHub repository is **Meshsense**. The Vercel project/deployment identity is **meshsense-ruview-status**. Historical names may be retained in migration records but should not replace the canonical GitHub identity.

## Current software version

`0.1.0` — experimental deployment/runtime status surface.

The software version describes the application artifact and interface evolution. It does not represent acoustic, spatial, sensor-fusion, WebRTC, PDMAL, or governance validation.

## Current posture

Meshsense has a deployed application surface, but direct runtime verification may be constrained by deployment authentication. A READY deployment is evidence that Vercel accepted and built a deployment; it is not by itself evidence that the canonical source is serving the expected runtime behavior.

## Evidence progression

`CODED → CI VERIFIED → DEPLOYED → RUNTIME VERIFIED → SOURCE/DEPLOYMENT EQUIVALENT → BEHAVIORALLY EVALUATED`

Each state requires its own evidence artifact. A later state must not be inferred from an earlier one.

## Release gates

Remain on `0.x.y` while runtime contracts and evidence gates remain under development. A future `1.0.0` candidate requires documented canonical-source/deployment equivalence, directly verified endpoints, stable compatibility expectations, and evidence appropriate to every behavior represented as stable.

## Claim boundary

Keep these claims separate:

- source exists;
- deployment is READY;
- endpoint is directly verified;
- runtime corresponds to canonical source;
- system behavior has been empirically evaluated;
- acoustic/spatial/sensor-fusion performance has been established.

Deployment status cannot substitute for evidence from `Acoustic-mesh` or other research repositories.
