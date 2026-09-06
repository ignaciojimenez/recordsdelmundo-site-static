# AGENTS.md

Context for coding agents working in this repository (open agents.md standard).
`CLAUDE.md` is a symlink to this file, because Claude Code reads `CLAUDE.md`
rather than `AGENTS.md`.

## Project Overview

Records del Mundo — a Spanish independent record label website. Vanilla SPA (no framework, no build step) with client-side hash routing, hosted on Cloudflare Pages via auto-deploy from GitHub.

**Live site:** https://recordsdelmundo.es

## Development

```bash
# Local dev server (no build step — serve files as-is)
python3 -m http.server 8000

# Deploy (auto on push to main via Cloudflare Pages)
# Manual preview deploy:
wrangler pages deploy ./ --project-name=recordsdelmundo
```

No package.json, no npm, no bundler, and no runtime dependencies at all — the site loads only its own JS and CSS (`script-src 'self'`).

## Architecture

**Routing:** Hash-based (`#tienda`, `#grupos/at`, `#tienda/producto/[slug]`). Router in `js/router.js` listens to `hashchange`, calls render functions in `js/main.js`.

**Data:** Two JSON files fetched at runtime:
- `data/products.json` — product catalog keyed by slug. Fields: `nombre`, `grupo`, `estado` (ok/reedit/preorder/bandcamp/nobandcamp), `bcalbum` (Bandcamp embed ID), `btnppal` (PayPal hosted button ID), `lanzamiento` (Spanish-format date), `precio`, `formato`, `img`
- `data/content.json` — artist/info page content keyed by route (`grupos/at`, `grupos/inc`, `grupos/par`, `info`). Contains HTML in `content` field.

**Rendering:** Template functions in `js/components.js` build HTML strings and inject into `#contenido`. Product states control which purchase buttons appear.

**Page transitions:** `js/main.js` manages header animation (logo/menus slide via inline `margin-top`), content crossfade, and layout class toggling (`is-store`, `is-section`, `is-band`, `is-product`) for CSS hooks. Mobile skips fades to prevent flicker, as do reduced-motion and history/BFCache navigation.

Content visibility is a pure CSS opacity transition driven by one class: `.contenido` is visible by default and `.contenido.is-hidden` takes it away. The polarity matters — every render path *ends* by removing the class, so a suppressed animation degrades to "instant", never to content stranded invisible. Nothing listens for `transitionend` (the `body.no-anim` kill switch means it may never fire); the `setTimeout` that gates rendering is the state machine and the transition is only decoration. Timings live in `:root` motion tokens in `css/common.css` (`--rdm-fade-in/out`, `--rdm-header-move`, `--rdm-ease`); `RDM_FADE_OUT_MS` in `js/main.js` must stay >= `--rdm-fade-out`.

**BFCache handling:** On `pageshow` with `e.persisted`, sets `body.no-anim` to suppress all CSS transitions during browser restore, clears it next frame. Router skips re-routing during restore. Tracks `window.__rdm_last_input` and `window.__rdm_click_nav` to distinguish click vs. swipe navigation.

**Debug mode:** `window.__rdm_debug = true` in browser console enables verbose logging.

## CSS Structure

- `css/common.css` — 3-column desktop layout (20% sidebars + center), typography (Perpetua via `css/fonts.css`), social icon sprites, global transitions (0.25s)
- `css/store.css` — product grid (280px tiles, 660px container), hover effects, PayPal button styles
- `css/mobile.css` — loaded at `max-width: 768px`. Full-width flex layout, safe-area insets for notched devices, fixed social icons at bottom, header behavior changes

## Key Conventions

- All content is in Spanish
- PayPal purchase URLs: `https://www.paypal.com/ncp/payment/{btnppal}`
- Bandcamp embeds: iframe with `bcalbum` ID in URL
- Spanish date parsing for product sort order (newest first)
- Social icons use CSS sprite backgrounds, not icon fonts
- Navigation state: `.is-active` and `aria-current="page"` on active nav links
- Layout classes on `body` or container control page-type-specific styles
