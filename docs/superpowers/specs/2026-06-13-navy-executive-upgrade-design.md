# Navy Executive Upgrade — Design Spec
**Date:** 2026-06-13
**Scope:** Full site redesign — all pages, global shell components
**Theme:** Navy Executive (deep navy + electric blue)
**Animation feel:** Polished & Professional
**Libraries:** Framer Motion + Swiper

---

## 1. Global Theme

### Color System
Replace all existing light-theme CSS variables in `src/styles/global.css` with the following dark navy palette (add alongside existing variables, then override body/background references):

| Variable | Value | Usage |
|---|---|---|
| `--bg-deep` | `#080f1e` | Page background |
| `--bg-card` | `#0d2240` | Cards & panels |
| `--bg-elevated` | `#1a3a6b` | Hover / active states |
| `--accent` | `#4da3ff` | Primary accent, links |
| `--accent-gradient` | `linear-gradient(135deg, #4da3ff, #0056b3)` | CTAs, highlights |
| `--text-primary` | `#e8f2ff` | Body text |
| `--text-secondary` | `#8899bb` | Subtext, captions |
| `--text-muted` | `#4a6a9a` | Labels, metadata |
| `--border-subtle` | `rgba(77, 163, 255, 0.15)` | Card borders |
| `--glass-bg` | `rgba(255, 255, 255, 0.05)` | Glassmorphism fills |
| `--glass-border` | `rgba(77, 163, 255, 0.2)` | Glassmorphism borders |

### Background Pattern
All page heroes get a subtle CSS grid overlay and ambient radial glow blobs (pure CSS, no JS):
```css
background-image:
  linear-gradient(rgba(77,163,255,0.04) 1px, transparent 1px),
  linear-gradient(90deg, rgba(77,163,255,0.04) 1px, transparent 1px);
background-size: 32px 32px;
```

### Typography
No changes. Poppins (headings) and Crimson Pro (body) are already loaded via Google Fonts.

---

## 2. Dependencies

```bash
npm install framer-motion swiper
```

- **framer-motion** ~80KB gzipped — animation engine
- **swiper** ~30KB gzipped — service carousel
- No other additions. Total new bundle impact ≈ +110KB.

---

## 3. New Shared Files

### `src/utils/motion.js`
Single source of truth for all Framer Motion variants. Exports:

- `fadeUp` — `{ hidden: { opacity:0, y:30 }, visible: { opacity:1, y:0, transition:{ duration:0.6, ease:'easeOut' } } }`
- `staggerContainer` — container variant that staggers children with `staggerChildren: 0.1`
- `slideInLeft` / `slideInRight` — `x: ±60` to `x: 0`
- `scaleIn` — `scale: 0.85` to `scale: 1`
- `tiltCard` — mouse-tracking 3D rotate values (used by TiltCard component)
- `shouldAnimate` — checks `window.matchMedia('(prefers-reduced-motion: reduce)')` and returns instant transition config if true. All variants apply this.

### `src/components/common/TiltCard/TiltCard.jsx`
Reusable wrapper component. Takes `children` and optional `intensity` prop (default `15` degrees max tilt). Uses `useMotionValue` + `useTransform` for `rotateX`/`rotateY` based on mouse position relative to element bounds. Used on Kevin's photo in Home and About.

### `src/components/common/AnimatedCounter/AnimatedCounter.jsx`
Accepts `target` (number), `suffix` (string, e.g. `"+"`, `"+"`, `"yr"`), and `duration` (default `2s`). Uses Framer Motion's `useInView` to trigger and `animate` to count from 0 to target. Used for stats in Home hero, About, and Services overview.

### `src/components/common/ServiceSlider/ServiceSlider.jsx`
Swiper carousel for the Home page services section. Config:
- `loop: true`, `autoplay: { delay: 3000, pauseOnMouseEnter: true }`
- Breakpoints: 1 slide (mobile) / 2 slides (tablet 640px+) / 3 slides (desktop 1024px+)
- Navigation arrows and pagination dots styled to navy theme
- Each slide is a dark glassmorphism card with service icon, title, short description, and "Learn More" link

---

## 4. Scroll Reveal Pattern

Applied universally across all sections on all pages:

```jsx
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
>
```

`once: true` — animation fires once and stays. Does not re-trigger on scroll back up.

For grids of cards, the parent gets `staggerContainer` and each child gets `fadeUp` — children cascade in with 0.1s delay between them.

---

## 5. Page-by-Page Spec

### Home (`/`)

**Hero section:**
- FCA badge fades in first (delay 0)
- Name stagger: "Kevin" → "Graham" → "Karimi" cascade (delay 0.1s each word)
- Tagline slides up (delay 0.4s)
- Stat row animates: each `AnimatedCounter` triggers on enter
- CTA buttons fade in last (delay 0.6s)
- Kevin's photo wrapped in `TiltCard` — 3D mouse parallax
- Ambient glow blobs in background (CSS only, no JS)

**Services section:**
- Section heading `fadeUp`
- Replace current static grid with `ServiceSlider` (Swiper carousel)

**Expertise section:**
- `staggerContainer` wrapping expertise cards — cascade fade-up

**Bio/Timeline section:**
- Bio text `slideInLeft`, photo `slideInRight`
- Milestone items stagger in sequentially

---

### About (`/about`)

- Page hero heading `fadeUp`
- Bio paragraph `slideInLeft`, photo `slideInRight` (same split-reveal pattern as Home bio)
- Experience badges (`15+ Years`, `40+ Countries`) use `AnimatedCounter`
- Philosophy cards grid: `staggerContainer` → 6 cards cascade in with `fadeUp`, 0.1s stagger
- CTA section `scaleIn`

---

### Services Overview (`/services`)

- Quick-nav pills stagger in as a row
- Each service block alternates `slideInLeft` / `slideInRight` (preserves existing alternating layout)
- Service card hover: `whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(77,163,255,0.15)" }}`
- "Why Choose Kevin" stats: `AnimatedCounter` on each figure
- Final CTA: `fadeUp`

---

### All 8 Service Detail Pages

Consistent pattern applied to every service detail page (ProjectFunding, InternationalFinancialAdvisor, RiskCompliance, DocumentAlignment, BusinessFunding, BusinessConsultant, GrantsDonations, ProjectFundersInvestors):

1. **Hero**: full-width dark hero, `fadeUp` headline, glassmorphism stat strip below
2. **Sector/feature grid**: `staggerContainer` → cards `scaleIn` in cascade
3. **Process steps**: sequential `slideInLeft` with increasing delay (`i * 0.15s`)
4. **Target audiences / benefits**: `staggerContainer` → `fadeUp`
5. **CTA section**: `fadeUp` last
6. **Hover on all cards**: `whileHover={{ y: -4 }}` + left-edge accent border glows to `--accent`

---

### Global Shell Components

| Component | Changes |
|---|---|
| **Header** | Background `--bg-deep` + `backdrop-filter: blur(12px)`; on scroll past 60px, adds `border-bottom: 1px solid var(--border-subtle)` via Framer Motion `animate` |
| **Footer** | Background `--bg-deep`, same grid pattern, text updated to `--text-secondary` |
| **FloatingContact** | Button backgrounds updated to navy theme; modal becomes glassmorphism dark card |
| **Contact panel** | Full dark glassmorphism card with `--glass-bg` background and `--glass-border` |
| **Partners marquee** | Background `--bg-card`; partner logos get `filter: brightness(0) invert(1) opacity(0.6)` for contrast on dark background |
| **Reviews** | Dark card wrapper `--bg-card` around existing Trustpilot widget |

---

## 6. Accessibility

- All Framer Motion variants check `prefers-reduced-motion` via `shouldAnimate()` in `motion.js`. If reduced motion is preferred, transitions are replaced with `{ duration: 0 }` (instant, no movement).
- No animation removes content or hides information — animations are purely presentational.
- Existing ARIA labels and semantic HTML are unchanged.

---

## 7. File Change Summary

**New files:**
- `src/utils/motion.js`
- `src/components/common/TiltCard/TiltCard.jsx` + `TiltCard.css`
- `src/components/common/AnimatedCounter/AnimatedCounter.jsx` + `AnimatedCounter.css`
- `src/components/common/ServiceSlider/ServiceSlider.jsx` + `ServiceSlider.css`
- `docs/superpowers/specs/2026-06-13-navy-executive-upgrade-design.md`

**Modified files:**
- `src/styles/global.css` — new dark CSS variables
- `src/App.js` — no structural changes; possibly add global dark body class
- `src/components/layout/Header/Header.jsx` + `Header.css`
- `src/components/layout/Footer/Footer.jsx` + `Footer.css`
- `src/components/Contact/Contact.jsx` + `Contact.css`
- `src/components/Partners/Partners.jsx` + `Partners.css`
- `src/components/Reviews/Reviews.jsx` + `Reviews.css`
- `src/components/common/FloatingContact/FloatingContact.jsx` + `FloatingContact.css`
- `src/pages/Home/Home.jsx` + all Home CSS files
- `src/pages/About/About.jsx` + `About.css`
- `src/pages/Services/Services.jsx` + `Services.css`
- All 8 service detail page `.jsx` and `.css` files
