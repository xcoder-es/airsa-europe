# AIRSA Europe — Component Hierarchy

## Page Structure

```
RootLayout
└── Home (page.tsx)
    └── Experience
        ├── ErrorBoundary
        ├── SmoothScrollProvider
        └── main
            ├── Scene01CosmicIntro
            ├── Scene02ContinentLink
            └── Scene03Thesis
```

## Scene Component Pattern

Each scene follows this structure:

```
SceneSection (pinned via GSAP ScrollTrigger)
├── Background layer (black / gradient)
├── Visual layer (EarthCanvas or typography)
├── Narrative layer (StatementReveal components)
└── Scroll indicator (optional)
```

## Shared Primitives

| Component              | Location                    | Purpose                  |
| ---------------------- | --------------------------- | ------------------------ |
| `Experience`           | `components/experience.tsx` | Top-level orchestrator   |
| `SmoothScrollProvider` | `components/system/`        | Lenis + GSAP integration |
| `ErrorBoundary`        | `components/system/`        | Graceful error recovery  |
| `StatementReveal`      | `components/narrative/`     | Text choreography        |
| `EarthCanvas`          | `three/globe/`              | 3D globe with fallback   |
| `Starfield`            | `three/effects/`            | Particle background      |
| `ConnectionLines`      | `three/effects/`            | Europe-Africa links      |
| `Earth`                | `three/globe/`              | 3D Earth mesh            |

## Hooks

| Hook               | Purpose                              |
| ------------------ | ------------------------------------ |
| `useSceneProgress` | Maps scroll position to 0–1 progress |
| `useReducedMotion` | Detects `prefers-reduced-motion`     |

## Extension Pattern (Scenes 4–13)

New scenes should:

1. Create `src/sections/scene-XX-name.tsx`
2. Export from `src/lib/performance/lazy-scenes.ts`
3. Add to `Experience` component
4. Add scene config to `src/lib/animation/tokens.ts`
5. Document in `docs/narrative/scene-map.md`

No architectural changes required — scenes are additive.
