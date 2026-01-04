# Change: Refactor website motion system and visual style

## Why
The site already uses a mix of CSS keyframes, CSS transitions, IntersectionObserver-driven class toggles, and Anime.js calls. This produces good motion in places, but it is not centralized or consistently themed, which makes it harder to evolve toward an Apple-like glassy minimal aesthetic (upgraded).

Observed issues/opportunities:
- Motion logic is scattered across multiple initializers in `js/main.js`.
- There are multiple motion mechanisms (CSS animation, CSS transition, direct `style` mutations, Anime.js) without a shared vocabulary (durations/easings).
- The parallax implementation registers scroll handlers repeatedly (risking performance regressions over time).
- The visual style is already modern and glassy, but can be pushed further (controlled glow, richer gradients, consistent “tech” accents) while preserving readability and performance.

## What Changes
- Establish a small, explicit motion system:
  - Motion tokens (duration/easing) shared between CSS and Anime.js.
  - Standard animation patterns (reveal, stagger, hover, loop/decorative).
  - Centralized reduced-motion gating.
  - Centralized event listener ownership (no duplicate scroll handlers).
- Refactor existing animations to use the motion system:
  - Section reveal animations (features, technology, privacy, platforms).
  - Hover micro-interactions (feature cards, CTA buttons).
  - Hero intro timeline and subtle decorative loops.
- Update visual styling toward an upgraded Apple-like glassy minimal look:
  - Stronger but controlled gradient accents.
  - Consistent glow/highlight treatment.
  - Subtle decorative background motion (e.g., gentle gradient/glow movement) as progressive enhancement.
  - More intentional section transitions/dividers.

## Impact
- Affected code:
  - `index.html` (data attributes / hooks for motion groups; minimal markup changes)
  - `css/styles.css` (motion tokens + refreshed visuals)
  - `js/main.js` (central motion controller + refactor existing init functions)
  - `pages/*.html` (keep mostly static; align only shared base styles as needed, avoid adding motion hooks)
- Affected specs:
  - `motion-system`
  - `visual-style`

## Notes / Constraints
- Static-only architecture (no build step).
- Progressive enhancement (content usable without JS).
- Respect `prefers-reduced-motion` and keep the page lightweight.
- Keep Anime.js via CDN unless there is a strong reason to change.
