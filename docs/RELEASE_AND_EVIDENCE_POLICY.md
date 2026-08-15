# Release and Evidence Policy

## Canonical identity

The GitHub repository is **Meshsense**. The Vercel project/deployment identity is **meshsense-ruview-status**. Historical names may be retained in migration records but should not replace the canonical GitHub identity.

## Current posture

Meshsense has a deployed application surface, but direct runtime verification may be constrained by deployment authentication. A READY deployment is evidence that Vercel accepted and built a deployment; it is not by itself evidence that the canonical source is serving the expected runtime behavior.

## Versioning

Use `0.x.y` while runtime contracts and evidence gates remain under development. Promote to `1.0.0` only after canonical-source deployment equivalence, endpoint verification, and compatibility expectations are documented.

## Evidence rule

Keep these claims separate:

- source exists;
- deployment is READY;
- endpoint is directly verified;
- runtime corresponds to canonical source;
- system behavior has been empirically evaluated.

Each requires its own evidence artifact.
