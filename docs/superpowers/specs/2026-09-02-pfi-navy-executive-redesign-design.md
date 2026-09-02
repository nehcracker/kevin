# Project Funders & Investors — Navy Executive Redesign

**Date:** 2026-09-02
**Scope:** `src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.jsx` + `.css` only
**Theme:** Unify with sitewide Navy Executive theme (see `docs/superpowers/specs/2026-06-13-navy-executive-upgrade-design.md`)

---

## 1. Background

The PFI page currently uses a bespoke "ink + gold" premium palette (Libre Baskerville serif, hardcoded `#0b1120`/`#b5922e` colors) predating the sitewide Navy Executive redesign. A later patch bolted a `!important` override block onto the bottom of the CSS to retrofit the navy theme, but it's incomplete and buggy — e.g. a `.pfi-sTitle` / `.pfi-stitle` casing mismatch (already fixed separately) left all five section headings unreadable.

This redesign replaces the patch with a clean rebuild directly on the site's real design tokens, and adds two new trust-building content sections identified in an earlier audit of this page against its target audience (project sponsors and funding-seekers, including from Africa and other continents, in a space known for advance-fee scams).

---

## 2. Page Structure (final order)

1. **Hero** — headline, stats, sticky enquiry form (unchanged position/behavior, restyled)
2. **Trust bar** — capital source categories (unchanged content, restyled)
3. **Advisory Advantage** — 4-card grid (unchanged content, restyled)
4. **Eligibility** — 3-card grid (unchanged content, restyled)
5. **Sectors** — pill grid (unchanged content, restyled)
6. **Process** — 5-step stepper (unchanged content, restyled)
7. **Track Record** *(new)* — stat grid, placeholder figures
8. **Capital Sources** — 6-card grid (unchanged content, restyled)
9. **No-upfront-fees banner** *(new)* — placeholder copy, pending Kevin's actual fee policy wording
10. **CTA** (unchanged content, restyled)

No sections are removed or reordered relative to today except the two additions.

---

## 3. Visual System

Replace the page's local hardcoded tokens and the broken override block with the site's real Navy Executive tokens (already defined in `src/styles/global.css`, no changes needed there):

| Use | Token |
|---|---|
| Page/section background | `var(--bg-deep)` |
| Card/panel background | `var(--bg-card)` |
| Hover/active surface | `var(--bg-elevated)` |
| Primary accent (icons, numbers, links, active states) | `var(--accent)` |
| CTA buttons | `var(--accent-gradient)` |
| Body text | `var(--text-primary)` |
| Secondary/muted text | `var(--text-secondary)` |
| Card/section borders | `var(--border-subtle)` |
| Glassmorphism fill (enquiry panel) | `var(--glass-bg)` + `var(--glass-border)` |

**Typography:** Drop the Libre Baskerville import and all serif headings; use Poppins throughout (sitewide standard, already loaded).

**Hero background:** Replace the bespoke thin gold-line SVG grid with the sitewide CSS grid-overlay + radial-glow pattern already spec'd for other pages:
```css
background-image:
  linear-gradient(rgba(77,163,255,0.04) 1px, transparent 1px),
  linear-gradient(90deg, rgba(77,163,255,0.04) 1px, transparent 1px);
background-size: 32px 32px;
```

**Enquiry panel:** Currently a solid white card (`--white` background, gold top border) — becomes a dark glassmorphism panel (`--glass-bg` background, `--glass-border` border, `backdrop-filter: blur(...)`), consistent with the Contact panel treatment elsewhere on the site. Form inputs get dark-theme styling (dark fill, light text, `--accent` focus ring) instead of the current light-theme inputs.

**Component reuse (already implemented elsewhere in the codebase, no new components needed):**
- `src/utils/motion.js` — `fadeUp`, `staggerContainer`, `slideInLeft` (already imported in this file; usage extended to the two new sections)
- `src/components/common/AnimatedCounter/AnimatedCounter.jsx` — replaces static stat numbers

**Stat data restructuring for `AnimatedCounter`:** `AnimatedCounter` takes `{ target: number, suffix: string, duration?: number, className?: string }` — no prefix support. The current `STATS`/`TRUST` arrays store fully-formatted strings (e.g. `'$1M+'`, `'48hr'`). These must be restructured to `{ prefix?: string, value: number, suffix: string, label: string }`, e.g.:

```js
const STATS = [
  { prefix: '$', value: 1,   suffix: 'M+', l: 'Minimum project size' },
  { value: 40,  suffix: '+',  l: 'Countries covered' },
  { value: 48,  suffix: 'hr', l: 'Enquiry response' },
  { value: 100, suffix: '+',  l: 'Capital relationships' },
];
```
Rendered as `{s.prefix}<AnimatedCounter target={s.value} suffix={s.suffix} />`. `TRUST` is unaffected — its entries (`DFIs`, `Private`, `Sovereign`, etc.) are category labels, not numbers, so it keeps rendering as plain text. Only `STATS` and the new `TRACK_RECORD` use `AnimatedCounter`.

---

## 4. New Section: Track Record

Position: between Process and Capital Sources.

```js
const TRACK_RECORD = [
  { prefix: '$', value: null, suffix: 'M+', label: 'Capital placed' },   // placeholder — real figure needed
  { value: null, suffix: '',  label: 'Deals closed' },                    // placeholder — real figure needed
  { value: null, suffix: '',  label: 'Sectors funded' },                  // placeholder — real figure needed
  { value: null, suffix: '',  label: 'Countries closed in' },             // placeholder — real figure needed
];
```

**Rendering rule:** while `value` is `null` (i.e. real figures haven't been supplied), render the literal placeholder text `[X]` in place of the number and do NOT wrap it in `AnimatedCounter` (there is nothing meaningful to count up to). Once Kevin supplies real numbers, replace `null` with the actual value and the stat automatically renders through `AnimatedCounter` like the hero/trust-bar stats.

Layout: 4-column stat grid on desktop (same visual language as the existing hero-stats/trust-bar strip) → 2×2 on tablet → single column on mobile, matching the trust-bar's existing responsive pattern.

This section ships visibly incomplete (literal `[X]` placeholders) rather than with invented numbers. **Action needed from Kevin:** real figures for capital placed, deals closed, sectors funded, and countries closed in.

---

## 5. New Section: No-Upfront-Fees Banner

Position: between Capital Sources and CTA, full-width banner strip (same visual weight/pattern as the trust bar).

```
Headline: "No upfront fees."
Body: "[PLACEHOLDER — confirm fee policy wording with Kevin]"
```

This is a factual claim about business practice (how/when Kevin charges), not a cosmetic placeholder — it must not be invented copy. **Action needed from Kevin:** his actual fee/engagement policy in his own words, to be written into this banner before launch. Until supplied, the banner ships with the literal placeholder text visible, not fabricated wording.

---

## 6. Interaction, Responsive, Accessibility

**Animation:** Existing `fadeUp`/`staggerContainer` scroll-reveal pattern (`initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}`), already used throughout this file, extended to the two new sections. Card hover states match the sitewide pattern (`translateY(-4px)`, border brightens to `--accent`). `prefers-reduced-motion` handling (already implemented in this file) is preserved unchanged.

**Responsive:** Existing breakpoints preserved (form-first ordering under 1000px width, single-column stacking under 580px). Track Record grid follows the trust-bar's existing responsive collapse (4 → 2×2 → 1 column). No-fee banner has no new breakpoint logic — it's a text block that reflows naturally.

**Accessibility:** Existing ARIA conventions in this file (`aria-labelledby` on sections, `role="list"`/`role="listitem"` on grids) extended to the two new `<section>` elements with their own heading IDs.

---

## 7. File Change Summary

**Modified:**
- `src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.jsx`
  - Restructure `STATS` data to `{prefix?, value, suffix, label}` shape
  - Add `TRACK_RECORD` data (placeholder values) and its section JSX
  - Add no-fee banner JSX (placeholder copy)
  - Replace static stat number rendering with `AnimatedCounter`
  - Remove Libre Baskerville-specific className usage where it was purely typographic (none of the functional classNames change — only the CSS backing them)
- `src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.css`
  - Full rebuild: remove local hardcoded tokens (`--ink`, `--gold`, `--gold2`, `--gold3`, `--gold-dim`, `--ash`, `--fog`, etc.) and the Libre Baskerville `@import`
  - Rebuild every rule against `var(--bg-deep)`, `var(--bg-card)`, `var(--accent)`, `var(--text-primary)`, `var(--text-secondary)`, `var(--border-subtle)`, `var(--glass-bg)`, `var(--glass-border)`
  - Delete the entire "Dark Navy Override" block at the bottom of the file (no longer needed — nothing left to override)
  - Add styles for `.pfi-track-record` grid and `.pfi-no-fee-banner`
  - Preserve existing responsive breakpoint structure, extending it to the two new sections

**Not modified:** `src/styles/global.css` (tokens already exist), any other page, `App.js`, shared components.

---

## 8. Open Items (must be resolved before this ships)

1. Real figures for the Track Record section (capital placed, deals closed, sectors funded, countries closed in) — currently `[X]` placeholders.
2. Real fee-policy wording for the no-upfront-fees banner — currently a placeholder string.

Both are flagged inline in code as `[PLACEHOLDER]` and will render visibly as such until replaced — no fabricated business claims ship silently.
