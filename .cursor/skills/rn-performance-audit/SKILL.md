---
name: rn-performance-audit
description: Diagnose and improve React Native Expo rendering, list performance, memory pressure and JS responsiveness.
---
# Performance audit procedure
1. Identify symptom and measurement conditions (device, dev/release build, screen, dataset, gesture).
2. Inspect actual component tree, state ownership, effects, network, image sizes and lists.
3. Profile with suitable available tools; avoid treating dev-only re-renders as proof of production lag.
4. Prioritize likely bottlenecks: unvirtualized long lists, unnecessary global state updates, heavy synchronous work, giant images, leaked listeners.
5. Make one low-risk optimization at a time. Use FlatList/SectionList and stable keys where appropriate; avoid automatic blanket React.memo/useMemo/useCallback.
6. Validate functional behavior, loading/empty/accessibility states and before/after performance when observable.
7. Summarize hypothesis, evidence, change and any measurements still missing.
