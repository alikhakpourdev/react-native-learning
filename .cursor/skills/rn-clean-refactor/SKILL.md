---
name: rn-clean-refactor
description: Safely refactor existing React Native or TypeScript code using Clean Code, DRY and SOLID while preserving behavior.
---
# Behavior-preserving refactor
1. Read the target code, call sites and tests before editing. Record expected observable behavior.
2. Identify *specific* smells: repeated business rules, coupled API/UI, complex conditionals, oversized components, unclear types or mutation.
3. Propose the 2-4 smallest high-value changes; explicitly reject abstractions that add more indirection than value.
4. Make incremental edits. Prefer simple extracts, local helpers, reusable hooks and composition; introduce adapters only for genuine changing dependencies.
5. Keep public props/routes/API payload shapes stable unless change is requested. Avoid unrelated formatting churn.
6. Run typecheck, lint and relevant tests when available, then review the diff for regressions.
7. Report before/after improvements, files changed, test evidence and residual risks.
