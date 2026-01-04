# Project Context

## Purpose
On Device AI Website is the public marketing site for the On Device AI application on iOS, macOS, and visionOS.

- Explain the app's core value: private, on-device AI assistants for voice notes, document analysis, and multi-agent workflows.
- Drive installs via App Store links and smart app banners.
- Communicate privacy and offline-processing guarantees clearly and consistently.
- Provide SEO-friendly content, FAQs, and structured data so search engines and AI systems understand the product.
- Host legal and policy pages (Terms of Service / Terms of Use, Privacy Policy) for compliance and user trust.

## Tech Stack
- Static site: HTML5, CSS3, and vanilla ES6+ JavaScript (no build step or frontend framework).
- Layout and content:
  - `index.html` as the primary landing page with anchored sections (`#home`, `#features`, `#technology`, `#privacy`, `#platforms`, `#faq`, `#contact`).
  - Additional static legal pages under `pages/` (e.g., `terms.html`, `terms-of-use.html`, `privacy-policy.html`).
- Styling:
  - Single global stylesheet `css/styles.css` using CSS custom properties (`:root` variables) for colors, spacing, and shadows.
  - Responsive layout using flexbox and CSS grid; no CSS framework.
- Interactivity and animations:
  - Custom scroll, hover, and animation logic in `js/main.js` using a centralized `MotionController` pattern.
  - Motion tokens (durations, easings) defined in CSS custom properties and mirrored in JS for consistency.
  - Reduced motion support via `prefers-reduced-motion` media query detection.
  - IntersectionObserver for scroll-triggered reveal and stagger animations.
  - Anime.js via CDN for enhanced motion effects (glow orbs, floating particles, SVG path animations).
  - Single rAF-batched scroll listener for parallax and header effects to avoid performance issues.
- Visual enhancements:
  - Hero glow orbs with animated opacity and floating movement.
  - Floating particle effects with multi-color palette (blue, purple, indigo).
  - SVG flow arrows in privacy section with stroke-dashoffset drawing animation.
  - Icon hover effects with scale and wiggle animations.
- Icons and assets:
  - Font Awesome 6 via CDN for icons.
  - App Store badge, screenshots, and marketing images under `images/` and `screenshots/`.
- SEO and rich snippets:
  - Meta tags for Open Graph and Twitter cards.
  - JSON-LD structured data for `SoftwareApplication`, `FAQPage`, `Organization`, and `WebPage`.
  - Smart App Banner meta tag for iOS (`apple-itunes-app`).
- Hosting:
  - Deployed as a static site to `https://ondevice-ai.app/` (no server-side rendering or backend code).

## Project Conventions

### Code Style
HTML

- Use semantic elements (`header`, `main`, `section`, `footer`) for page structure.
- Use descriptive IDs only where needed for in-page navigation (e.g., `#features`, `#privacy`).
- Keep content order in the DOM aligned with the visual reading order to preserve accessibility.

CSS

- All styles live in `css/styles.css`.
- Use CSS custom properties in `:root` for theme colors, radii, shadows, and transitions.
- Prefer section- or component-scoped class names (e.g., `.hero-*`, `.feature-*`, `.privacy-*`, `.platform-*`).
- Use kebab-case for class names.
- Favor modern layout primitives (flexbox, grid) over absolute positioning where possible.

JavaScript

- All behavior is initialized inside a single `DOMContentLoaded` listener in `js/main.js`.
- Group logic into `init*`-prefixed functions by feature (e.g., `initSmoothScrolling`, `initHeaderScroll`, `initTechnologyAnimations`).
- Prefer `const`/`let` over `var` and arrow functions for callbacks; use named functions for top-level initializers.
- Avoid adding globals; keep state scoped to the relevant initializer or callback.

Formatting

- Prefer 4-space indentation in HTML, CSS, and JS.
- Use single quotes for JS strings where practical.
- End JS statements with semicolons and keep trailing commas consistent within objects/arrays.

### Architecture Patterns
Overall structure

- Static, client-side marketing site with no backend and no API calls from the website.
- `index.html` is a long-form single page with section-based navigation; legal pages live as separate HTML files under `pages/`.
- All dynamic behavior is presentational (scroll animations, parallax, active nav states) and should not be required to access core content.

Patterns and organization

- Progressive enhancement: the site should remain readable and navigable even if JavaScript fails or is disabled; JS only enhances UX.
- External libraries (Anime.js, Font Awesome) are pulled in via CDN `<script>`/`<link>` tags instead of a bundler.
- Assets (screenshots, icons, badges) live under `images/` and `screenshots/` and are referenced via relative paths.
- No client-side persistence (no localStorage/indexedDB) unless there is a strong UX reason and it aligns with the privacy story.

### Testing Strategy
Current state

- There is no automated test suite for the website today; testing is primarily manual.

Manual regression checks (minimum before shipping changes)

- Verify `index.html` loads without JS errors in:
  - Latest Safari on macOS and iOS.
  - Latest Chrome on desktop.
  - (When possible) Latest Firefox on desktop.
- Confirm navigation links scroll smoothly to the correct sections and highlight the active section.
- Check that critical CTAs work:
  - App Store badge opens the correct App Store listing.
  - Email/contact links open the default mail client with the correct address.
  - Legal pages under `pages/` are reachable and render correctly.
- Confirm layout and typography look correct on:
  - Small mobile viewport (iPhone-sized).
  - Tablet-sized viewport.

### Git Workflow
Branches

- Long-lived branches: `main` and `development`.
- `main` is the production branch and only contains release-ready code.
- `development` is the integration branch where ongoing work lives until it is stable enough to be merged into `main`.
- Optional: use short-lived feature branches off `development` for non-trivial work:
  - `feature/...` for new sections, major layout changes, or new interactive behavior.
  - `fix/...` for bug fixes, visual tweaks, or copy changes.

Commits

- Write commit messages in the imperative and be specific about the change (e.g., `Update FAQ copy for offline mode`, not `misc fixes`).
- Keep commits reasonably small and focused on a single topic (one section or feature at a time).

Pull requests / reviews

- Prefer opening a PR for anything beyond small copy/typo edits, even when working solo, so changes remain reviewable and linked to OpenSpec tasks when relevant.
- Reference related OpenSpec changes (if any) in PR descriptions.

Other

- Do not add new OS- or editor-specific files (e.g., `.DS_Store`, local IDE configs) to version control.
- Keep large binary assets (screenshots, images) under the existing `images/` and `screenshots/` folders.

## Domain Context
Product overview

- On Device AI is a privacy-first AI assistant that runs large language models locally on supported Apple devices.
- Core features highlighted on the site include:
  - Voice notes and transcription.
  - Collaborative AI teams (multi-agent workflows).
  - Knowledge Libraries / project-based AI memory.
  - Professional-quality text-to-speech.
  - Document and image analysis (vision support).
  - Built-in web search with AI-powered summarization.

Privacy model

- Key marketing promise: core AI processing (chat, transcription, document analysis) happens on the user's device for supported hardware; data does not need to leave the device.
- Users can optionally connect cloud AI providers (e.g., OpenAI, Anthropic Claude, Google Gemini, Groq, OpenRouter, LM Studio, Ollama) when they explicitly choose to, but the default story is 'offline first'.
- Website copy should reinforce privacy and offline capabilities without overpromising beyond what the app actually supports.

Models and engines

- The app supports leading open-source models including Llama 3, Gemma 3, Qwen 3, DeepSeek, Phi-4, Mistral, and custom GGUF models.
- The app uses both llama.cpp and MLX inference engines for optimal performance on Apple Silicon.
- Website copy should treat specific model names as examples rather than exhaustive lists, since supported models may evolve.

Platforms and audience

- Target devices include modern iPhones, iPads, Apple Silicon Macs, and Apple Vision Pro.
- Audience: privacy-conscious users, professionals, and power users who want strong AI capabilities without giving up data control.

Copy and tone

- Emphasize privacy, local processing, and practical workflows over hype.
- Avoid claims that imply medical, legal, or financial guarantees; keep language focused on productivity and assistance.

## Important Constraints
- Static-only architecture: the site must remain a static HTML/CSS/JS site without custom backend code or server-side rendering.
- Performance:
  - Keep page weight low (especially JavaScript) to maintain fast load times on mobile networks.
  - Optimize and compress images and screenshots where possible.
- Privacy alignment:
  - Google Analytics is used for basic traffic analysis; configure it to minimize data collection and ensure it is clearly disclosed in `privacy-policy.html`.
  - Avoid adding additional tracking pixels or third-party analytics that would undermine the app's privacy story without an explicit decision and corresponding Privacy Policy updates.
- SEO and discoverability:
  - Preserve and update JSON-LD structured data and meta tags carefully; avoid breaking the schema.org types already in use.
  - Maintain a valid `sitemap.xml` and `robots.txt` so search engines and AI crawlers can discover pages.
- Store / policy alignment:
  - Marketing claims on the site must remain consistent with the actual app behavior and App Store listing.
  - Legal pages (Terms / Privacy) must remain accessible from the main site navigation or footer.

## External Dependencies
- Apple App Store listing for On Device AI:
  - `https://apps.apple.com/us/app/on-device-ai/id6497060890`
- External libraries loaded via CDN:
  - Font Awesome 6 for icons (`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`).
  - Anime.js for animations (`https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js`).
- Analytics:
  - Google Analytics for website traffic metrics.
- Search engines and crawlers:
  - `sitemap.xml`, `robots.txt` for indexing guidance.
  - `BingSiteAuth.xml` and Google site verification HTML (`google*.html`) for search console ownership.
- Contact and support:
  - Public contact email `developer@ondevice-ai.app` used in structured data and contact sections.
- OpenSpec:
  - This repository uses OpenSpec for spec-driven changes; see `openspec/AGENTS.md` and `openspec/specs/` / `openspec/changes/` for capabilities and active change proposals.
