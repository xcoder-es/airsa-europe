# Contributing to AIRSA Europe

## Development Setup

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Create a feature branch from `main`

## Code Standards

- TypeScript strict mode
- ESLint + Prettier enforced via pre-commit hooks
- No decorative animations — motion must communicate narrative intent
- All new scenes follow the section component pattern in `src/sections/`

## Pull Request Process

1. Ensure `npm run lint`, `npm run typecheck`, and `npm run build` pass
2. Test with `prefers-reduced-motion: reduce` enabled
3. Document new scenes in `docs/narrative/scene-map.md`
4. Keep PRs focused on a single scene or system concern

## Scene Development

See [docs/architecture/component-hierarchy.md](docs/architecture/component-hierarchy.md) for the extension pattern.
