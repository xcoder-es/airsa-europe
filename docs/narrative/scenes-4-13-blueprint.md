# Scenes 4-13 Extension Blueprint

## Principle

All future scenes are **additive**. No architectural rewrites required.

## Extension Steps

1. Create `src/sections/scene-XX-name.tsx` following the pinned section pattern
2. Add lazy export to `src/lib/performance/lazy-scenes.ts`
3. Register in `src/components/experience.tsx`
4. Add config to `src/lib/animation/tokens.ts` sceneConfigs array
5. Add narrative copy to `src/content/scenes.ts`
6. Document in `docs/narrative/scene-map.md`

## Scene-Specific Technical Notes

### Scene 4: Spain Gateway

- Reuse EarthCanvas with camera zoom animation via GSAP
- Madrid highlight mesh on globe
- Scroll-driven camera position interpolation

### Scene 5: Why Spain

- Sequential narrative reveals (no bullet lists)
- SVG path animations for EU, Mediterranean, diaspora concepts
- Framer Motion staggered text

### Scene 6: North Star

- Central radial animation system
- CSS/SVG orbital elements revolving around mission statement
- GSAP timeline for system choreography

### Scene 7: Strategic Pillars

- R3F orbital system with 6 capability nodes
- Hover interactions via @react-three/drei Html overlay
- Physics-inspired orbital movement with useFrame

### Scene 8: Ecosystem Network

- Interactive force-directed graph (d3-force or custom)
- Node types: government, university, enterprise, investor, NGO, startup
- Click/hover to explore relationships

### Scene 9: Operating Model

- Layered architecture diagram (SVG + Framer Motion)
- AWS-diagram aesthetic with Apple design polish
- Scroll-driven layer reveals

### Scene 10: Revenue Flywheel

- Circular flywheel SVG with animated arrows
- Infinite loop rotation tied to scroll
- 6 segments: consulting, education, research, innovation, community, partnerships

### Scene 11: Strategic Horizons

- Interactive timeline with 3 horizon bands
- Progressive reveal on scroll
- Future roadmap visualization

### Scene 12: Validation Engineering

- Engineering-inspired grid visualizations
- Subtle data flow animations
- Trust-building narrative copy

### Scene 13: AIRSA Europe Expansion

- Map visualization with chapter nodes
- Spain, Portugal, France, Germany, Italy
- Expansion animation on scroll

### Final Scene

- Black background, two-sentence reveal
- Fade to AIRSA logo
- Cinematic close matching Scene 1 tone
