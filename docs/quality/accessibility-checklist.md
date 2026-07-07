# AIRSA Europe — Accessibility Checklist

## WCAG AA Compliance

### Perceivable

- [x] Color contrast ≥ 4.5:1 for body text
- [x] Color contrast ≥ 3:1 for large text (display)
- [x] No information conveyed by color alone
- [x] `prefers-reduced-motion` respected with static fallback
- [x] Text alternatives for 3D visuals (aria-label on fallback)

### Operable

- [x] Keyboard accessible (scroll via keyboard)
- [x] No seizure-inducing flashing
- [x] No time limits on content consumption
- [x] Focus not trapped in pinned sections

### Understandable

- [x] `lang="en"` on html element
- [x] Semantic HTML (`main`, `section`, `p`)
- [x] `aria-label` on each scene section
- [x] `aria-hidden` on decorative elements

### Robust

- [x] Valid HTML structure
- [x] Error boundary for graceful degradation
- [x] Screen reader announcements via semantic structure

## Reduced Motion Pathway

When `prefers-reduced-motion: reduce`:

1. 3D canvas replaced with static SVG globe
2. Scroll pinning disabled
3. Text reveals become instant (0ms duration)
4. All narrative content remains accessible
5. No functionality lost

## Testing

- Test with VoiceOver / NVDA
- Test with keyboard-only navigation
- Test with `prefers-reduced-motion: reduce` enabled
- Test at 200% zoom
