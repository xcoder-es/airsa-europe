# AIRSA Europe — Motion Principles

## Philosophy

Motion is communication. Every animation must answer: **"What does this movement tell the visitor?"**

If the answer is "it looks nice" — remove it.

## Core Rules

### Timing

| Token       | Duration | Use Case                           |
| ----------- | -------- | ---------------------------------- |
| `instant`   | 100ms    | Hover states, focus rings          |
| `fast`      | 300ms    | UI transitions, opacity changes    |
| `medium`    | 600ms    | Section reveals, text choreography |
| `slow`      | 1200ms   | Globe rotations, connection lines  |
| `cinematic` | 2400ms   | Scene transitions, Earth zoom      |

### Easing

- **Primary**: `cubic-bezier(0.25, 0.1, 0.25, 1.0)` — smooth deceleration
- **Enter**: `cubic-bezier(0.0, 0.0, 0.2, 1.0)` — ease-out
- **Exit**: `cubic-bezier(0.4, 0.0, 1.0, 1.0)` — ease-in
- **NEVER**: bounce, elastic, spring overshoot

### Scroll Choreography

- Lenis smooth scroll as the scroll engine
- GSAP ScrollTrigger for scene pinning and progress mapping
- Framer Motion for component-level enter/exit animations
- Scene progress drives all visual state — no independent timers

### 3D Motion

- Earth rotation: 0.05 rad/s constant, no acceleration bursts
- Camera zoom: logarithmic easing over 3s
- Connection lines: draw-on effect using stroke-dashoffset
- Starfield: subtle parallax based on scroll position

## Reduced Motion

When `prefers-reduced-motion: reduce` is active:

- Disable 3D canvas, show static SVG fallback
- Replace scroll-driven animations with instant state changes
- Preserve all narrative content and semantic structure
- Text reveals become instant opacity changes (no stagger)

## Ownership Rules

| Library              | Owns                                             | Does Not Own            |
| -------------------- | ------------------------------------------------ | ----------------------- |
| Lenis                | Scroll smoothing, scroll position                | Element animations      |
| GSAP + ScrollTrigger | Scene pinning, timeline orchestration, 3D camera | Component mount/unmount |
| Framer Motion        | Component enter/exit, hover states, layout       | Scroll-linked progress  |
| R3F                  | 3D rendering, globe, particles                   | DOM text animations     |

## Anti-Patterns

- Parallax on every element
- Staggered fade-in on lists (use for narrative statements only)
- Auto-playing loops without scroll context
- Mouse-follow effects
- Particle explosions
- Loading animations longer than 1s
