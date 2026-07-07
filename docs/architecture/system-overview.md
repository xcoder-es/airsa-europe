# AIRSA Europe — System Overview

## Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + CSS custom properties
- **Animation**: Framer Motion, GSAP + ScrollTrigger, Lenis
- **3D**: Three.js via React Three Fiber + Drei

## Architecture

```
src/
├── app/              # Next.js routes and layout
├── components/       # Reusable UI and system components
├── sections/         # Narrative scene sections (1 per scene)
├── three/            # R3F 3D components
├── hooks/            # React hooks (scroll, motion)
├── lib/              # Utilities (animation, a11y, perf)
├── content/          # Narrative copy and data
├── styles/           # Design tokens
└── types/            # Shared TypeScript types
```

## Animation Ownership

| Concern                  | Owner                     |
| ------------------------ | ------------------------- |
| Smooth scroll            | Lenis                     |
| Scene pinning + progress | GSAP ScrollTrigger        |
| Text reveals             | Framer Motion             |
| 3D rendering             | React Three Fiber         |
| Reduced motion fallback  | Custom hooks + static SVG |

## Data Flow

1. User scrolls → Lenis smooths scroll position
2. ScrollTrigger maps scroll to scene progress (0–1)
3. Scene components read progress and drive visuals
4. Framer Motion handles text enter/exit choreography
5. R3F renders 3D elements with progress-driven parameters

## Key Decisions

- **No navigation in prototype** — scroll-only storytelling
- **Dark mode only** — no theme toggle in v1
- **Dynamic imports** for 3D and scene modules — code splitting
- **Reduced motion** disables 3D, shows static fallback
- **Health endpoint** at `/api/health` for Render deployment
