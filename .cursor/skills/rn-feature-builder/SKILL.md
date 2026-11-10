---
name: rn-feature-builder
description: Implement a new feature in an Expo React Native app with clear boundaries, typed data, lean routes, Gluestack UI and appropriate validation.
---
# Build a React Native feature
1. Inspect the relevant feature, route, UI component locations, package.json, TypeScript aliases and current code conventions.
2. Clarify acceptance criteria only if a material unknown blocks implementation; otherwise write down reasonable assumptions.
3. Sketch the minimal file plan and data flow: route -> feature UI -> hook -> external service (only when needed).
4. Implement a small vertical slice using existing Gluestack UI components and tokens. Keep screens thin and code typed.
5. Use SRP, composition and DRY only where they remove *real* complexity. Avoid speculative generic abstractions.
6. Cover loading, empty, error, success, accessibility, safe area and platform cases relevant to the task.
7. Run available lint/type/test checks, inspect the changed diff and report any unverified behavior.

Deliverable: changed files + concise rationale + validation results.
