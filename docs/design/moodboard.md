# AIRSA Europe — Design Mood Board

## Design Direction

AIRSA Europe communicates **strategic confidence** through restraint. The visual language draws from Apple keynote cinematography, Stripe editorial clarity, Linear motion discipline, and Vercel technical elegance.

### Reference DNA

| Reference               | What We Borrow                                              | What We Reject                   |
| ----------------------- | ----------------------------------------------------------- | -------------------------------- |
| Apple WWDC / Vision Pro | Cinematic black stages, slow reveals, large typography      | Product UI chrome, skeuomorphism |
| Stripe                  | Editorial hierarchy, confident whitespace, subtle gradients | Dense documentation layouts      |
| Linear                  | Purposeful motion, dark UI, minimal chrome                  | App-like navigation patterns     |
| Vercel                  | Technical sophistication, fluid typography                  | Developer-tool aesthetic         |
| OpenAI                  | Philosophical tone, statement-driven copy                   | Chat interface patterns          |
| Awwwards winners        | Scroll choreography, immersive pacing                       | Gimmicky parallax overload       |

## Visual Language

### Color Philosophy

- **Deep black** (`#000000` to `#0A0A0F`) as the primary canvas
- **Electric blue** (`#3B82F6` to `#60A5FA`) as the single accent
- **Neutral hierarchy** — white at 95% opacity for headlines, 60% for body, 40% for captions
- **No rainbow gradients** — single-hue subtle gradients only

### Typography

- **Display**: Instrument Serif for headlines (large, 4–8rem)
- **Body**: Geist Sans for supporting text
- **Monospace**: Geist Mono for technical callouts
- Generous letter-spacing on display type (-0.02em tracking)
- Line height 1.1 for headlines, 1.6 for body

### Spacing and Grid

- 8px base grid
- Section padding: 120px vertical on desktop, 80px on tablet, 48px on mobile
- Max content width: 1200px for text, full-bleed for 3D/visual sections
- Generous whitespace — if it feels empty, it is probably right

### Imagery

- **No stock photography**
- **No AI-generated business people**
- Custom SVG illustrations and abstract technical visualizations only
- 3D globe and particle systems as primary visual anchors

## Acceptance Criteria

- Every screen communicates a single idea
- Typography is the primary design element
- Motion reinforces narrative, never decorates
- Dark mode is the only mode in v1
- No horizontal scrolling at any breakpoint
- Contrast ratios meet WCAG AA minimum

## Rejection Criteria

- Generic card grids for strategic content
- Decorative bounce/spring animations
- Stock imagery or clipart
- Rainbow or multi-hue gradients
- Icon clutter without semantic purpose
- Bullet lists in narrative sections
- Corporate cliches
- Navigation bars or hamburger menus in prototype
- Loading spinners — use skeleton states or progressive reveal instead
