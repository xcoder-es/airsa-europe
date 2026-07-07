# AIRSA Europe — Performance Budget

## Lighthouse Targets

| Metric         | Target |
| -------------- | ------ |
| Performance    | ≥ 95   |
| Accessibility  | ≥ 95   |
| Best Practices | ≥ 95   |
| SEO            | ≥ 90   |

## Bundle Budgets

| Asset                 | Budget   |
| --------------------- | -------- |
| Initial JS (gzipped)  | < 150 KB |
| Three.js chunk (lazy) | < 200 KB |
| GSAP chunk (lazy)     | < 50 KB  |
| Total page weight     | < 1 MB   |

## Rendering

- 3D canvas: `dpr={[1, 1.5]}` — cap pixel ratio
- Starfield: 2000 particles max
- Earth geometry: 64 segments (desktop), consider 32 for mobile
- Lazy-load all scene modules via `dynamic()`
- Lazy-load R3F Canvas via `dynamic({ ssr: false })`

## Scroll Performance

- Lenis RAF loop — single requestAnimationFrame
- ScrollTrigger scrub — no independent timers
- No `Date.now()` in render cycle
- GPU-accelerated transforms only (opacity, transform)

## Monitoring

- Run `npm run build` to check bundle sizes
- Lighthouse CI in GitHub Actions (future)
- Health check at `/api/health`
