## ADDED Requirements

### Requirement: Progressive enhancement for motion
The website SHALL remain readable and navigable when JavaScript is disabled or when animations do not run.

#### Scenario: JavaScript disabled
- **WHEN** a user loads the site with JavaScript disabled
- **THEN** all core content (headings, copy, CTAs, legal links) remains visible and usable

### Requirement: Reduced motion support
The website SHALL respect `prefers-reduced-motion: reduce` by disabling non-essential motion, including parallax and looping decorative animations.

#### Scenario: Reduced motion enabled
- **WHEN** the user agent indicates `prefers-reduced-motion: reduce`
- **THEN** parallax and looping decorative animations do not run and transitions are minimized

### Requirement: Centralized motion triggers
The website SHALL centralize motion triggers (scroll/hover/loop) to avoid duplicate event listeners and inconsistent animation behavior.

#### Scenario: Prolonged scrolling session
- **WHEN** the user scrolls the landing page for at least 30 seconds
- **THEN** scroll-related event listener registration does not grow over time

### Requirement: Consistent motion tokens
The website SHALL define reusable motion timing and easing tokens for both CSS transitions and Anime.js animations.

#### Scenario: Feature reveal motion
- **WHEN** feature cards reveal as they enter the viewport
- **THEN** the reveal uses the standardized duration and easing tokens

### Requirement: Legal pages remain mostly static
Legal pages under `pages/` SHALL remain primarily static content and SHALL NOT add new scroll-triggered animations, parallax, or looping decorative motion.

#### Scenario: Legal page browsing
- **WHEN** a user visits a legal page under `pages/` (e.g., Privacy Policy or Terms)
- **THEN** the page renders without scroll-triggered animations, parallax, or looping decorative motion
