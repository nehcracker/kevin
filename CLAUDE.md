# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server on http://localhost:3000
npm run build      # Production build → /build
npm test           # Run all tests (Jest / React Testing Library)
npm test -- --testPathPattern=ComponentName  # Run a single test file
```

This project uses **Create React App** (react-scripts 5). There is no Vite, Webpack config, or custom bundler configuration.

## Architecture

### App Shell (`src/App.js`)

The app renders a fixed shell that wraps all pages:

```
<BrowserRouter>
  <Header />              ← always visible, fixed top nav
  <Routes>...</Routes>    ← page-level content swaps here
  <Reviews />             ← Trustpilot widget (below every page)
  <Contact />             ← multi-stage contact panel (below every page)
  <Partners />            ← marquee carousel (below every page)
  <Footer />
  <FloatingContact />     ← fixed-position Email button
</BrowserRouter>
```

`<Reviews>`, `<Contact>`, `<Partners>`, and `<Footer>` are **not inside the route tree** — they render on every page below the main content.

### Routing

All routes are flat (no dynamic params). Service detail pages live under `/services/<slug>`. To add a new service page: create the component, add a `<Route>` in `App.js`, and add a link in `src/pages/Services/Services.jsx` and the `<Footer>`.

### SEO (`src/components/common/SEO/SEO.jsx`)

`react-helmet-async` is installed but **not used**. SEO is handled by a custom component that directly manipulates `document.head` via `useEffect`. Every page should render `<SEO title="..." description="..." canonical="..." schema={...} />` as its first child. The component manages title, meta description, keywords, canonical, Open Graph, Twitter Card, and JSON-LD (injected as `<script data-seo-jsonld>`).

### Service Detail Pages Pattern

All 8 service detail pages follow an identical pattern:
1. **Constants block** at the top of the file — all page data (stats, sectors, process steps, benefits, etc.) defined as `const` arrays/objects
2. **`<SEO>`** as first rendered element with service-specific schema
3. Sections rendered from the constants (no API calls — all static)
4. Each page has a paired `.css` file in the same directory

When adding a new service page, copy the structure of an existing one (e.g. `ProjectFundersInvestors.jsx`).

### Contact Flow

WhatsApp, IMO, Telegram and the "Call Direct" `tel:` link have been removed from the site on purpose: they can't be tracked as Google Ads conversions and attracted unqualified leads. Don't re-add them, and don't show Kevin's phone number in visible UI (form placeholders use the fictional `+44 7700 900000`). The number stays only in JSON-LD `telephone` fields for search. Tracked leads come only from the service-page enquiry forms (Worker POST → `/thank-you`); the Home hero's primary CTA links to the Project Funding form.

- `src/components/Contact/Contact.jsx` — inline panel (global shell): Calendly, email card, LinkedIn/Facebook pills, and a service picker that opens a pre-filled `mailto:`
- `src/components/common/FloatingContact/FloatingContact.jsx` — fixed-position Email button

### Styling

- `src/styles/global.css` — CSS custom properties (design tokens). Extend here first before adding one-off values.
- Each component/page has a colocated `.css` file.
- Key tokens: `--primary-color: #0056b3`, `--font-heading: 'Poppins'`, spacing scale `--spacing-xs` through `--spacing-xxl`, shadow scale `--shadow-sm/md/lg`.
- The `<main>` element has `padding-top: 80px` to clear the fixed header — don't remove this.

### No Global State

There is no Context, Redux, Zustand, or other state manager. Components are self-contained with local `useState`/`useRef`. Shared data (service lists, contact info) is duplicated across files by design.

### External Integrations

| Integration | Where configured |
|---|---|
| Google Tag Manager (AW-18234308546) | `public/index.html` |
| Trustpilot widget | `src/components/Reviews/Reviews.jsx` (script injected via useEffect) |
| Calendly | `https://calendly.com/kevingraham` — hardcoded in service pages |
| Cloudflare Worker (PFI enquiry form) | `WORKER_URL` in `ProjectFundersInvestors.jsx` |
| Google Fonts | Preloaded in `public/index.html` |
