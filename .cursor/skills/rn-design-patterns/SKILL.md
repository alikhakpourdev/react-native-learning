---
name: rn-design-patterns
description: Select the simplest useful React Native design pattern for a feature or code smell without overengineering.
---
# Choose a pattern deliberately
1. Identify the concrete problem and expected change pressure; inspect current architecture.
2. Consider patterns in order of least complexity:
   - Pure functions and composition for reusable UI and predictable transformations.
   - Custom Hook for reusable stateful behavior.
   - Reducer for complex local state transitions.
   - Context for scoped shared dependencies/state where prop threading is truly awkward.
   - Adapter for inconsistent vendor/API/storage interfaces.
   - Repository/service interface for a domain boundary with multiple meaningful consumers/backends/testing needs.
   - State machine only for genuinely complex multi-step workflows.
3. Explain why the chosen pattern is better than a plain function/component here. If not, choose the simpler design.
4. Keep business rules framework-independent where practical and test them in isolation.
5. Provide a small implementation, trade-offs, tests and what *not* to abstract yet.

Do not add factories, DI containers, global stores or repository layers without evidence.
