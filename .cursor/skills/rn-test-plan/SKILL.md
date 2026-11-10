---
name: rn-test-plan
description: Plan or implement targeted quality checks for Expo React Native features, fixes and refactors without introducing new test tooling unnecessarily.
---
# RN quality gate
1. Identify the app's current test, lint and typecheck scripts from package.json; inspect related test conventions.
2. List the observable acceptance cases, including error/empty/loading and mobile interactions.
3. Prefer small pure-function tests, then behavior-focused component/hook tests where dependencies support them.
4. Add regression coverage for bug fixes. Avoid brittle snapshots and testing implementation internals.
5. Run existing checks (`npx tsc --noEmit`, `npx expo lint`, configured tests) as applicable.
6. Report precisely which checks ran, what passed/failed and which cases require a device/emulator.
