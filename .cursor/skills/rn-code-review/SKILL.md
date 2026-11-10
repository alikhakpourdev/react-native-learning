---
name: rn-code-review
description: Review a React Native Expo change for correctness, security, maintainability, SOLID, DRY, accessibility and performance.
---
# Review checklist
1. Inspect the diff and relevant surrounding files; ask what user-visible behavior the change should preserve.
2. Prioritize concrete issues by severity: **Blocker**, **High**, **Medium**, **Low**; cite exact file/line locations.
3. Check correctness: state transitions, race conditions, stale requests, errors, list keys, cross-platform behavior.
4. Check security: token exposure, public ENV, storage, unsafe logging, trust of remote data.
5. Check maintainability: types, responsibility boundaries, API coupling, meaningful duplication, readability, unnecessary abstractions.
6. Check UI: Gluestack API/version usage, semantic tokens, a11y labels and touch areas.
7. Check performance only for plausible hotspots; distinguish measured defects from speculative tuning.
8. Give minimal actionable fixes and available validation evidence. If no significant issue exists, state that clearly.

Output findings first, then short overall assessment; avoid a generic wall of praise.
