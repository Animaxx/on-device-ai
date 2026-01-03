## 1. Foundations
- [x] 1.1 Add motion tokens to `css/styles.css` (durations/easings) and align existing transitions to use them
- [x] 1.2 Add JS reduced-motion detection and a single motion "kill switch" used by all initializers
- [x] 1.3 Fix parallax implementation to avoid repeated scroll listener registration and to use a single rAF-batched handler

## 2. Motion system refactor (no visual redesign yet)
- [x] 2.1 Implement a small motion controller pattern in `js/main.js` (reveal / stagger / hover / loop helpers)
- [x] 2.2 Refactor feature card reveal + hover animations to use the controller and shared tokens
- [x] 2.3 Refactor technology section workflow animations to use a timeline + stagger
- [x] 2.4 Refactor privacy section animations to use controller patterns and explicit cleanup (where relevant)
- [x] 2.5 Refactor platforms section animations to use controller patterns

## 3. Visual style refresh (glassy minimal, upgraded)
- [x] 3.1 Update background treatments (gradients, subtle glow accents) while preserving readability/contrast
- [x] 3.2 Update section transitions/dividers to feel more intentional and modern
- [x] 3.3 Polish CTA/button micro-interactions (hover + focus) for a premium feel

## 4. Validation and QA
- [x] 4.1 Manual regression: Safari (macOS/iOS), Chrome desktop (minimum)
- [x] 4.2 Validate reduced motion behavior (no parallax/loops; transitions minimized)
- [x] 4.3 Performance smoke test: scroll through page for 30+ seconds; confirm no growing listener counts and no obvious frame drops
- [x] 4.4 Ensure all CTAs, anchors, and legal page links still work
- [x] 4.5 Confirm legal pages under `pages/` remain mostly static (no new scroll-triggered animations, parallax, or looping decorative motion)
