# PFI Navy Executive Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `ProjectFundersInvestors.jsx`/`.css` on the site's real Navy Executive design tokens (removing the old ink+gold theme and the broken `!important` override patch), and add a Track Record section and a no-upfront-fees banner.

**Architecture:** Two files only (`ProjectFundersInvestors.jsx`, `ProjectFundersInvestors.css`), no new shared components — reuses `AnimatedCounter` and `motion.js` utilities that already exist in the codebase. CSS migrates from page-scoped hardcoded tokens (`--ink`, `--gold`, etc.) directly to the global tokens defined in `src/styles/global.css` (`--bg-deep`, `--accent`, `--text-primary`, etc.) — no aliasing layer, no override block.

**Tech Stack:** React (CRA/react-scripts 5), Framer Motion, Jest + React Testing Library.

## Global Constraints

- Scope is limited to `src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.jsx` and `.css` only. Do not modify `global.css`, other service pages, or shared components.
- Two content pieces ship as literal placeholders, not invented copy: Track Record figures (`[X]`) and the no-upfront-fees banner body text (`[PLACEHOLDER — confirm fee policy wording with Kevin]`). Never replace these with fabricated numbers or invented fee-policy wording.
- `AnimatedCounter` takes `{ target: number, suffix: string, duration?: number, className?: string }` — no prefix prop. Any `$` or other prefix renders as a separate literal string next to it.
- All Poppins typography (no Libre Baskerville) — matches sitewide convention.
- Preserve all existing ARIA attributes, `aria-labelledby`/`role` usage, and the existing responsive breakpoints (1000px, 768px, 580px).

---

## Task 1: Test infrastructure + hero stats data restructuring

**Files:**
- Modify: `src/setupTests.js`
- Modify: `src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.jsx`
- Create: `src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.test.jsx`

**Interfaces:**
- Consumes: `AnimatedCounter` from `src/components/common/AnimatedCounter/AnimatedCounter.jsx` (existing, props `target`/`suffix`/`className`/`duration`)
- Produces: `STATS` array reshaped to `{ prefix: string, value: number, suffix: string, l: string }[]` — consumed by no later task (hero stats are self-contained), but the same shape pattern is reused by `TRACK_RECORD` in Task 4.

No existing tests cover any page in this codebase (only the unmaintained CRA-boilerplate `App.test.js` exists), and this page uses Framer Motion's `whileInView`, which needs `IntersectionObserver` — undefined in jsdom by default. This step adds a minimal global mock so any test in the suite can render `motion.div` components without crashing.

- [ ] **Step 1: Add an `IntersectionObserver` mock to the global test setup**

Open `src/setupTests.js` and add to the end of the file:

```js
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = window.IntersectionObserver || IntersectionObserverMock;
```

- [ ] **Step 2: Write the failing test for restructured hero stats**

Create `src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProjectFundersInvestors from './ProjectFundersInvestors';

jest.mock('../../../components/common/AnimatedCounter/AnimatedCounter', () => (
  ({ target, suffix }) => <span data-testid="animated-counter">{target}{suffix}</span>
));

function renderPage() {
  return render(
    <BrowserRouter>
      <ProjectFundersInvestors />
    </BrowserRouter>
  );
}

test('hero stats render through AnimatedCounter with correct prefix, value, and suffix', () => {
  const { container } = renderPage();
  const counters = screen.getAllByTestId('animated-counter');
  expect(counters.map(el => el.textContent)).toEqual(['1M+', '40+', '48hr', '100+']);
  const statNumbers = container.querySelectorAll('.pfi-hs-n');
  const values = Array.from(statNumbers).map(el => el.textContent);
  expect(values).toEqual(['$1M+', '40+', '48hr', '100+']);
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test -- --testPathPattern=ProjectFundersInvestors --watchAll=false`
Expected: FAIL — no elements with `data-testid="animated-counter"` exist yet, since the hero still renders `{s.n}` as a plain string.

- [ ] **Step 4: Restructure `STATS` and update hero stats rendering in `ProjectFundersInvestors.jsx`**

Add the import near the top of the file, alongside the existing `SEO` import:

```js
import AnimatedCounter from '../../../components/common/AnimatedCounter/AnimatedCounter';
```

Replace the `STATS` constant:

```js
const STATS = [
  { n: '$1M+',  l: 'Minimum project size' },
  { n: '40+',   l: 'Countries covered' },
  { n: '48hr',  l: 'Enquiry response' },
  { n: '100+',  l: 'Capital relationships' },
];
```

with:

```js
const STATS = [
  { prefix: '$', value: 1,   suffix: 'M+', l: 'Minimum project size' },
  { prefix: '',  value: 40,  suffix: '+',  l: 'Countries covered' },
  { prefix: '',  value: 48,  suffix: 'hr', l: 'Enquiry response' },
  { prefix: '',  value: 100, suffix: '+',  l: 'Capital relationships' },
];
```

Find the hero stats rendering block:

```jsx
<motion.div variants={staggerItem} className="pfi-hero-stats" aria-label="Key statistics">
  {STATS.map((s) => (
    <div key={s.n}>
      <div className="pfi-hs-n">{s.n}</div>
      <div className="pfi-hs-l">{s.l}</div>
    </div>
  ))}
</motion.div>
```

Replace with:

```jsx
<motion.div variants={staggerItem} className="pfi-hero-stats" aria-label="Key statistics">
  {STATS.map((s) => (
    <div key={s.l}>
      <div className="pfi-hs-n">{s.prefix}<AnimatedCounter target={s.value} suffix={s.suffix} /></div>
      <div className="pfi-hs-l">{s.l}</div>
    </div>
  ))}
</motion.div>
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test -- --testPathPattern=ProjectFundersInvestors --watchAll=false`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/setupTests.js src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.jsx src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.test.jsx
git commit -m "test: add IntersectionObserver mock and restructure PFI hero stats for AnimatedCounter"
```

---

## Task 2: CSS rebuild — tokens, hero, enquiry panel, trust bar, shared section utilities

**Files:**
- Modify: `src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.css`

**Interfaces:**
- Consumes: global tokens from `src/styles/global.css` (`--bg-deep`, `--bg-card`, `--bg-elevated`, `--accent`, `--accent-gradient`, `--text-primary`, `--text-secondary`, `--border-subtle`, `--glass-bg`, `--glass-border`) — all already defined, no changes needed there.
- Produces: nothing consumed by later tasks directly (CSS classnames are unchanged, only their color values change) — Task 3 continues the same mechanical rebuild on the rest of the file.

This task is not run through TDD in the classic sense — it's a CSS color rebuild with no new behavior. Verification is a plain-text regression check on the CSS source (jsdom doesn't apply external stylesheets, so computed-style assertions aren't meaningful here) plus visual confirmation via the dev server at the end of Task 3, once the whole file is done.

- [ ] **Step 1: Replace the page-scoped token block and remove the Libre Baskerville import**

Replace:

```css
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

/* ── Page-scoped tokens ────────────────────────────────────────────────── */
.pfi-page {
  --ink:      #0b1120;
  --ink2:     #1a2640;
  --ink3:     #253650;
  --gold:     #b5922e;
  --gold2:    #d4af55;
  --gold3:    #ecdaa0;
  --gold-dim: rgba(181, 146, 46, 0.14);
  --ash:      #f6f7f9;
  --fog:      #eef0f4;
  --white:    #ffffff;
  --mid:      #6b7a8d;
  --lt:       #9aa5b4;
  --bd:       rgba(11, 17, 32, 0.09);
  --bds:      rgba(11, 17, 32, 0.16);
  --navy:     #0D1B4E;
  --blue:     #1565C0;
  --r:        3px;
  --rl:       8px;
  color: var(--ink);
  font-family: 'Poppins', sans-serif;
}
```

with:

```css
/* ── Page-scoped tokens ────────────────────────────────────────────────── */
.pfi-page {
  --r:  3px;
  --rl: 8px;
  color: var(--text-primary);
  background: var(--bg-deep);
  font-family: 'Poppins', sans-serif;
}
```

- [ ] **Step 2: Rebuild the HERO section**

In the `HERO` block:
- `.pfi-hero { background: var(--ink); padding: ...; }` → change `background: var(--ink);` to `background: var(--bg-deep);` and add, on the next line, the grid-overlay pattern:
```css
  background-image:
    linear-gradient(rgba(77,163,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(77,163,255,0.04) 1px, transparent 1px);
  background-size: 32px 32px;
```
- Delete the entire `.pfi-hero-lines` and `.pfi-hero-lines svg` rules (the bespoke gold SVG grid is being replaced by the CSS grid-overlay above; the matching JSX is removed in Task 4).
- `.pfi-hero::after` — change `background: radial-gradient(circle, rgba(181, 146, 46, 0.08) 0%, transparent 65%);` to `background: radial-gradient(circle, rgba(77, 163, 255, 0.08) 0%, transparent 65%);`
- `.pfi-eyebrow-line { background: var(--gold); }` → `background: var(--accent);`
- `.pfi-eyebrow-text { color: var(--gold); }` → `color: var(--accent);`
- `.pfi-hero h1 { font-family: 'Libre Baskerville', serif; ... color: var(--white); ... }` → delete the `font-family` line entirely (inherits Poppins from `.pfi-page`); change `color: var(--white);` to `color: var(--text-primary);`
- `.pfi-hero h1 em { color: var(--gold2); }` → `color: var(--accent);`
- `.pfi-hero-rule { background: var(--gold); }` → `background: var(--accent);`
- `.pfi-qual-icon { border: 0.5px solid var(--gold); }` → `border: 0.5px solid var(--accent);`
- `.pfi-qual-icon::after { background: var(--gold); }` → `background: var(--accent);`
- `.pfi-hs-n { font-family: 'Libre Baskerville', serif; ... color: var(--white); }` → delete the `font-family` line; change `color: var(--white);` to `color: var(--text-primary);`

- [ ] **Step 3: Rebuild the ENQUIRY PANEL section**

- `.pfi-enquiry-panel`:
```css
.pfi-enquiry-panel {
  background: var(--white);
  border-radius: var(--rl);
  overflow: hidden;
  border: 0.5px solid rgba(255, 255, 255, 0.10);
  border-top: 4px solid var(--gold);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
  top: 88px;
}
```
becomes:
```css
.pfi-enquiry-panel {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--rl);
  overflow: hidden;
  border: 1px solid var(--glass-border);
  border-top: 4px solid var(--accent);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
  top: 88px;
}
```
- `.pfi-ep-head { background: var(--ink2); ... }` → `background: var(--bg-card);`
- `.pfi-ep-head-title { font-family: 'Libre Baskerville', serif; ... color: var(--white); ... }` → delete the `font-family` line; change `color: var(--white);` to `color: var(--text-primary);`
- `.pfi-ep-dot { background: var(--gold); }` → `background: var(--accent);`
- `.pfi-ef label { color: var(--mid); }` → `color: var(--text-secondary);`
- `.pfi-ef input, .pfi-ef select, .pfi-ef textarea`:
```css
  border: 0.5px solid var(--bds);
  ...
  color: var(--ink);
  background: var(--white);
```
becomes:
```css
  border: 0.5px solid var(--border-subtle);
  ...
  color: var(--text-primary);
  background: var(--bg-elevated);
```
- `.pfi-ef input:focus, .pfi-ef select:focus, .pfi-ef textarea:focus`:
```css
  border-color: var(--ink3);
  box-shadow: 0 0 0 3px rgba(181, 146, 46, 0.08);
```
becomes:
```css
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(77, 163, 255, 0.15);
```
- `.pfi-conf-row span { color: var(--lt); }` → `color: var(--text-secondary);`
- `.pfi-ep-submit`:
```css
  background: var(--gold);
  color: var(--ink);
```
becomes:
```css
  background: var(--accent-gradient);
  color: #fff;
```
- `.pfi-ep-submit:hover`:
```css
.pfi-ep-submit:hover {
  background: var(--gold2);
  transform: translateY(-1px);
}
```
becomes:
```css
.pfi-ep-submit:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}
```
- `.pfi-ep-foot`:
```css
  background: var(--ash);
  border-top: 0.5px solid var(--bd);
  font-size: 10px;
  color: var(--lt);
```
becomes:
```css
  background: var(--bg-card);
  border-top: 0.5px solid var(--border-subtle);
  font-size: 10px;
  color: var(--text-secondary);
```

- [ ] **Step 4: Rebuild the TRUST BAR and SHARED SECTION UTILITIES**

- `.pfi-trust-bar`:
```css
  border-top: 0.5px solid var(--bd);
  border-bottom: 0.5px solid var(--bd);
  padding: 30px 28px;
  background: var(--white);
```
becomes:
```css
  border-top: 0.5px solid var(--border-subtle);
  border-bottom: 0.5px solid var(--border-subtle);
  padding: 30px 28px;
  background: var(--bg-card);
```
- `.pfi-ti { ... border-right: 0.5px solid var(--bd); }` → `border-right: 0.5px solid var(--border-subtle);`
- `.pfi-ti-n { font-family: 'Libre Baskerville', serif; ... color: var(--ink); }` → delete the `font-family` line; change `color: var(--ink);` to `color: var(--text-primary);`
- `.pfi-ti-l { color: var(--lt); ... }` → `color: var(--text-secondary);`
- `.pfi-sec { padding: 80px 28px; background: var(--white); }` → `background: var(--bg-deep);`
- `.pfi-sec-alt { padding: 80px 28px; background: var(--ash); }` → `background: var(--bg-card);`
- `.pfi-stag { ... color: var(--gold); ... }` → `color: var(--accent);`
- `.pfi-stitle { font-family: 'Libre Baskerville', serif; ... color: var(--ink); ... }` → delete the `font-family` line; change `color: var(--ink);` to `color: var(--text-primary);`
- `.pfi-ssub { ... color: var(--mid); ... }` → `color: var(--text-secondary);`

- [ ] **Step 5: Write a CSS regression test for what this task has migrated so far**

Add to `src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.test.jsx`:

```jsx
import fs from 'fs';
import path from 'path';

test('hero and enquiry-panel CSS no longer reference Libre Baskerville', () => {
  const css = fs.readFileSync(
    path.join(__dirname, 'ProjectFundersInvestors.css'),
    'utf8'
  );
  expect(css).not.toMatch(/Libre Baskerville/);
});

test('hero and shared-section CSS reference the real Navy Executive tokens', () => {
  const css = fs.readFileSync(
    path.join(__dirname, 'ProjectFundersInvestors.css'),
    'utf8'
  );
  expect(css).toMatch(/var\(--bg-deep\)/);
  expect(css).toMatch(/var\(--accent\)/);
  expect(css).toMatch(/var\(--text-primary\)/);
});
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test -- --testPathPattern=ProjectFundersInvestors --watchAll=false`
Expected: PASS (all tests, including Task 1's)

- [ ] **Step 7: Commit**

```bash
git add src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.css src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.test.jsx
git commit -m "style: rebuild PFI hero, enquiry panel, and trust bar on Navy Executive tokens"
```

---

## Task 3: CSS rebuild — remaining sections, delete the override block

**Files:**
- Modify: `src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.css`

**Interfaces:**
- Consumes: same global tokens as Task 2.
- Produces: nothing new — this completes the token migration started in Task 2.

- [ ] **Step 1: Rebuild ADVISORY ADVANTAGE**

- `.pfi-value-grid { ... border: 0.5px solid var(--bd); ... background: var(--bd); }` → both `var(--bd)` become `var(--border-subtle)`
- `.pfi-vc { background: var(--white); ... }` → `background: var(--bg-card);`
- `.pfi-vc:hover { background: #fdfbf6; }` → `background: var(--bg-elevated);`
- `.pfi-vc-num { ... color: rgba(11, 17, 32, 0.06); ... }` → `color: rgba(255, 255, 255, 0.06);`
- `.pfi-vc-t { ... color: var(--ink); ... }` → `color: var(--accent);`
- `.pfi-vc-d { color: var(--mid); ... }` → `color: var(--text-secondary);`

- [ ] **Step 2: Rebuild ELIGIBILITY CRITERIA**

- `.pfi-crit-card { background: var(--white); border: 0.5px solid var(--bd); border-top: 3px solid var(--gold); ... }` → `background: var(--bg-card); border: 0.5px solid var(--border-subtle); border-top: 3px solid var(--accent);`
- `.pfi-crit-card:hover { ... box-shadow: 0 10px 28px rgba(11, 17, 32, 0.08); }` → `box-shadow: 0 10px 28px rgba(77, 163, 255, 0.12);`
- `.pfi-crit-icon { ... background: var(--gold-dim); ... color: var(--gold); ... }` → `background: var(--border-subtle); color: var(--accent);`
- `.pfi-crit-t { ... color: var(--ink); ... }` → `color: var(--accent);`
- `.pfi-crit-d { color: var(--mid); ... }` → `color: var(--text-secondary);`

- [ ] **Step 3: Rebuild SECTORS COVERED**

- `.pfi-sector-pill { border: 0.5px solid var(--bd); ... background: var(--white); ... }` → `border: 0.5px solid var(--border-subtle); background: var(--bg-card);`
- `.pfi-sector-pill:hover { border-color: var(--gold); background: rgba(181, 146, 46, 0.04); ... }` → `border-color: var(--accent); background: rgba(77, 163, 255, 0.06);`
- `.pfi-sp-icon { ... color: var(--gold); }` → `color: var(--accent);`
- `.pfi-sp-name { ... color: var(--ink); ... }` → `color: var(--text-primary);`
- `.pfi-sp-desc { color: var(--lt); ... }` → `color: var(--text-secondary);`

- [ ] **Step 4: Rebuild PROCESS STEPS**

- `.pfi-steps::before { ... background: linear-gradient(90deg, var(--gold), var(--gold2)); ... }` → `background: linear-gradient(90deg, var(--accent), var(--accent-dark));`
- `.pfi-step-circle { border: 0.5px solid var(--bds); background: var(--white); ... color: var(--ink); ... }` → `border: 0.5px solid var(--border-subtle); background: var(--bg-card); color: var(--text-primary);`
- `.pfi-step-circle.active { background: var(--ink); color: var(--white); border-color: var(--ink); }` → `background: var(--accent-gradient); color: #fff; border-color: transparent;`
- `.pfi-step:hover .pfi-step-circle { ... background: var(--gold); color: var(--ink); border-color: var(--gold); box-shadow: 0 6px 20px rgba(181, 146, 46, 0.3); }` → `background: var(--accent); color: #fff; border-color: var(--accent); box-shadow: 0 6px 20px rgba(77, 163, 255, 0.3);`
- `.pfi-step-t { ... color: var(--ink); ... }` → `color: var(--text-primary);`
- `.pfi-step-d { color: var(--lt); ... }` → `color: var(--text-secondary);`

- [ ] **Step 5: Rebuild CAPITAL SOURCES**

- `.pfi-source-card { border: 0.5px solid var(--bd); ... background: var(--white); ... }` → `border: 0.5px solid var(--border-subtle); background: var(--bg-card);`
- `.pfi-source-card::before { ... background: linear-gradient(90deg, var(--gold), transparent); ... }` → `background: linear-gradient(90deg, var(--accent), transparent);`
- `.pfi-source-card:hover { border-color: rgba(181, 146, 46, 0.45); ... box-shadow: 0 12px 32px rgba(11, 17, 32, 0.08); }` → `border-color: rgba(77, 163, 255, 0.45); box-shadow: 0 12px 32px rgba(77, 163, 255, 0.12);`
- `.pfi-sc-type { ... color: var(--gold); ... }` → `color: var(--accent);`
- `.pfi-sc-name { ... color: var(--ink); ... }` → `color: var(--accent);`
- `.pfi-sc-desc { color: var(--mid); ... }` → `color: var(--text-secondary);`

- [ ] **Step 6: Rebuild CTA and CONFIRMATION STATE**

- `.pfi-cta { background: linear-gradient(135deg, var(--ink) 0%, var(--ink2) 100%); ... }` → `background: linear-gradient(135deg, var(--bg-deep) 0%, var(--bg-card) 100%);`
- `.pfi-cta::before { ... background: radial-gradient(circle, rgba(181, 146, 46, 0.06) 0%, transparent 65%); ... }` → `background: radial-gradient(circle, rgba(77, 163, 255, 0.08) 0%, transparent 65%);`
- `.pfi-cta h2 { font-family: 'Libre Baskerville', serif; ... color: var(--white); ... }` → delete the `font-family` line; change `color: var(--white);` to `color: var(--text-primary);`
- `.pfi-btn-gold { ... background: var(--gold); color: var(--ink); ... }` → `background: var(--accent-gradient); color: #fff;` (keep the `.pfi-btn-gold` className as-is in both CSS and JSX — renaming is out of scope)
- `.pfi-btn-gold:hover { background: var(--gold2); transform: translateY(-2px); }` → `filter: brightness(1.08); transform: translateY(-2px);`
- `.pfi-ep-confirm-icon { ... background: linear-gradient(135deg, var(--gold), var(--gold2)); ... color: var(--ink); ... }` → `background: var(--accent-gradient); color: #fff;`
- `.pfi-ep-confirm h4 { font-family: 'Libre Baskerville', serif; ... color: var(--ink); ... }` → delete the `font-family` line; change `color: var(--ink);` to `color: var(--text-primary);`
- `.pfi-ep-confirm p { color: var(--mid); ... }` → `color: var(--text-secondary);`

- [ ] **Step 7: Delete the entire "Dark Navy Override" block**

At the end of the file, delete everything from the `/* ── Dark Navy Override ── */` comment through the end of the file (the whole block of `!important` rules targeting `.pfi-page`, `.pfi-header`, `.pfi-sTitle`, `.pfi-btn-primary`, `.pfi-focus-strip`, etc.). Every rule it was trying to apply has now been built directly into the base rules above — none of it is needed anymore, including the `.pfi-sTitle` selector that had the casing bug.

- [ ] **Step 8: Extend the CSS regression tests to cover the full file**

Replace the two tests added in Task 2 Step 5 with:

```jsx
import fs from 'fs';
import path from 'path';

test('CSS no longer references the old gold/ink token system, Libre Baskerville, or the broken override', () => {
  const css = fs.readFileSync(
    path.join(__dirname, 'ProjectFundersInvestors.css'),
    'utf8'
  );
  expect(css).not.toMatch(/Libre Baskerville/);
  expect(css).not.toMatch(/--gold/);
  expect(css).not.toMatch(/--ink\b/);
  expect(css).not.toMatch(/pfi-sTitle/);
  expect(css).not.toMatch(/Dark Navy Override/);
});

test('CSS references the real Navy Executive tokens', () => {
  const css = fs.readFileSync(
    path.join(__dirname, 'ProjectFundersInvestors.css'),
    'utf8'
  );
  expect(css).toMatch(/var\(--bg-deep\)/);
  expect(css).toMatch(/var\(--accent\)/);
  expect(css).toMatch(/var\(--text-primary\)/);
  expect(css).toMatch(/var\(--accent-gradient\)/);
});
```

- [ ] **Step 9: Run the tests to verify they pass**

Run: `npm test -- --testPathPattern=ProjectFundersInvestors --watchAll=false`
Expected: PASS (all tests)

- [ ] **Step 10: Commit**

```bash
git add src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.css src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.test.jsx
git commit -m "style: complete PFI CSS migration to Navy Executive tokens, delete broken override block"
```

---

## Task 4: Remove hero SVG lines, remove confirm-icon inline style, add Track Record section

**Files:**
- Modify: `src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.jsx`
- Modify: `src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.css`
- Modify: `src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.test.jsx`

**Interfaces:**
- Consumes: `AnimatedCounter` (as in Task 1), `staggerContainer`/`staggerItem` from `src/utils/motion.js` (already imported in this file).
- Produces: `TRACK_RECORD` data array `{ prefix: string, value: number|null, suffix: string, label: string }[]`, `.pfi-tr-grid`/`.pfi-tr-stat`/`.pfi-tr-n`/`.pfi-tr-l` CSS classes — not consumed by any later task.

- [ ] **Step 1: Remove the bespoke gold SVG hero grid from the JSX**

Delete this block entirely (the CSS grid-overlay added in Task 2 Step 2 replaces it visually):

```jsx
<div className="pfi-hero-lines" aria-hidden="true">
  <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <line x1="0"   y1="150" x2="1200" y2="150" stroke="#b5922e" strokeWidth="0.5" />
    <line x1="0"   y1="300" x2="1200" y2="300" stroke="#b5922e" strokeWidth="0.5" />
    <line x1="0"   y1="450" x2="1200" y2="450" stroke="#b5922e" strokeWidth="0.5" />
    <line x1="200" y1="0"   x2="200"  y2="600" stroke="#b5922e" strokeWidth="0.5" />
    <line x1="500" y1="0"   x2="500"  y2="600" stroke="#b5922e" strokeWidth="0.5" />
    <line x1="900" y1="0"   x2="900"  y2="600" stroke="#b5922e" strokeWidth="0.5" />
  </svg>
</div>
```

- [ ] **Step 2: Remove the hardcoded inline gradient on the confirmation icon**

Find:

```jsx
<div className="pfi-ep-confirm-icon" style={{ background: 'linear-gradient(135deg,#1565C0,#0D1B4E)', color: '#fff' }}>
```

Replace with:

```jsx
<div className="pfi-ep-confirm-icon">
```

(The `.pfi-ep-confirm-icon` CSS class was already fixed to `background: var(--accent-gradient); color: #fff;` in Task 3 Step 6, so this element now gets consistent styling from the stylesheet instead of a hardcoded one-off inline override.)

- [ ] **Step 3: Write the failing tests for the Track Record section**

Add to `ProjectFundersInvestors.test.jsx`:

```jsx
test('hero no longer renders the bespoke gold SVG grid lines', () => {
  const { container } = renderPage();
  expect(container.querySelector('.pfi-hero-lines')).not.toBeInTheDocument();
});

test('track record section renders placeholder stats and labels', () => {
  const { container } = renderPage();
  const trNumbers = Array.from(container.querySelectorAll('.pfi-tr-n')).map(el => el.textContent);
  expect(trNumbers).toEqual(['$[X]M+', '[X]', '[X]', '[X]']);
  const trLabels = Array.from(container.querySelectorAll('.pfi-tr-l')).map(el => el.textContent);
  expect(trLabels).toEqual(['Capital placed', 'Deals closed', 'Sectors funded', 'Countries closed in']);
});
```

- [ ] **Step 4: Run the tests to verify they fail**

Run: `npm test -- --testPathPattern=ProjectFundersInvestors --watchAll=false`
Expected: FAIL — `.pfi-hero-lines` still exists, `.pfi-tr-n`/`.pfi-tr-l` don't exist yet.

- [ ] **Step 5: Add the `TRACK_RECORD` data constant**

Add after the `SOURCES` constant in `ProjectFundersInvestors.jsx`:

```js
const TRACK_RECORD = [
  { prefix: '$', value: null, suffix: 'M+', label: 'Capital placed' },
  { prefix: '',  value: null, suffix: '',   label: 'Deals closed' },
  { prefix: '',  value: null, suffix: '',   label: 'Sectors funded' },
  { prefix: '',  value: null, suffix: '',   label: 'Countries closed in' },
];
```

- [ ] **Step 6: Add the Track Record section JSX**

Insert between the closing `</section>` of the PROCESS section and the opening `<section className="pfi-sec" aria-labelledby="pfi-sources-heading">` of CAPITAL SOURCES:

```jsx
{/* TRACK RECORD */}
<section className="pfi-sec" aria-labelledby="pfi-track-record-heading">
  <div className="pfi-inner">
    <span className="pfi-stag">Track record</span>
    <h2 id="pfi-track-record-heading" className="pfi-stitle">Capital placed, deals closed</h2>
    <p className="pfi-ssub">
      A track record built across sectors and geographies — figures reflect
      completed mandates, not aspirational targets.
    </p>
    <motion.div
      className="pfi-tr-grid"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {TRACK_RECORD.map((t) => (
        <motion.div key={t.label} className="pfi-tr-stat" variants={staggerItem}>
          <div className="pfi-tr-n">
            {t.value === null
              ? `${t.prefix}[X]${t.suffix}`
              : <>{t.prefix}<AnimatedCounter target={t.value} suffix={t.suffix} /></>}
          </div>
          <div className="pfi-tr-l">{t.label}</div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>
```

- [ ] **Step 7: Add CSS for the Track Record section**

Add before the `RESPONSIVE` section comment at the end of `ProjectFundersInvestors.css`:

```css
/* ══════════════════════════════════════════════════════════════════════════
   TRACK RECORD  (4-stat grid)
   ══════════════════════════════════════════════════════════════════════════ */
.pfi-tr-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.pfi-tr-stat {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--rl);
  padding: 22px 18px;
  text-align: center;
}

.pfi-tr-n {
  font-size: 24px;
  font-weight: 700;
  color: var(--accent);
}

.pfi-tr-l {
  font-size: 11px;
  color: var(--text-secondary);
  margin-top: 6px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 300;
}
```

In the existing `@media (max-width: 768px)` block, add:

```css
  .pfi-tr-grid {
    grid-template-columns: 1fr 1fr;
  }
```

In the existing `@media (max-width: 580px)` block, add:

```css
  .pfi-tr-grid {
    grid-template-columns: 1fr;
  }
```

- [ ] **Step 8: Run the tests to verify they pass**

Run: `npm test -- --testPathPattern=ProjectFundersInvestors --watchAll=false`
Expected: PASS (all tests)

- [ ] **Step 9: Commit**

```bash
git add src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.jsx src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.css src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.test.jsx
git commit -m "feat: add PFI Track Record section, remove gold hero SVG and inline confirm-icon style"
```

---

## Task 5: Add no-upfront-fees banner, fix section alternation

**Files:**
- Modify: `src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.jsx`
- Modify: `src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.css`
- Modify: `src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.test.jsx`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `NO_FEE_BANNER` data constant `{ heading: string, body: string }`, `.pfi-no-fee-banner`/`.pfi-nfb-inner`/`.pfi-nfb-h`/`.pfi-nfb-p` CSS classes — not consumed elsewhere.

Adding the Track Record section between Process and Capital Sources shifted Capital Sources from the 5th to the 6th section in the page's light/dark background alternation. Its wrapper class needs to flip from `pfi-sec` to `pfi-sec-alt` to keep sections visually distinct from their neighbors (otherwise Track Record and Capital Sources — both currently `pfi-sec`/`var(--bg-deep)` — would render as one undifferentiated block).

- [ ] **Step 1: Write the failing tests**

Add to `ProjectFundersInvestors.test.jsx`:

```jsx
test('no-fee banner renders heading and placeholder body', () => {
  renderPage();
  expect(screen.getByText('No upfront fees.')).toBeInTheDocument();
  expect(
    screen.getByText('[PLACEHOLDER — confirm fee policy wording with Kevin]')
  ).toBeInTheDocument();
});

test('capital sources section uses the alternate background class', () => {
  const { container } = renderPage();
  const sourcesSection = container.querySelector('#pfi-sources-heading').closest('section');
  expect(sourcesSection).toHaveClass('pfi-sec-alt');
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- --testPathPattern=ProjectFundersInvestors --watchAll=false`
Expected: FAIL — no-fee banner text doesn't exist yet, Capital Sources section still has `pfi-sec`.

- [ ] **Step 3: Add the `NO_FEE_BANNER` data constant**

Add after `TRACK_RECORD` in `ProjectFundersInvestors.jsx`:

```js
const NO_FEE_BANNER = {
  heading: 'No upfront fees.',
  body: '[PLACEHOLDER — confirm fee policy wording with Kevin]',
};
```

- [ ] **Step 4: Flip Capital Sources to `pfi-sec-alt`**

Find:

```jsx
<section className="pfi-sec" aria-labelledby="pfi-sources-heading">
```

Replace with:

```jsx
<section className="pfi-sec-alt" aria-labelledby="pfi-sources-heading">
```

- [ ] **Step 5: Add the no-fee banner JSX**

Insert between the closing `</section>` of CAPITAL SOURCES and the opening `<motion.section className="pfi-cta" ...>` of the CTA section:

```jsx
{/* NO UPFRONT FEES */}
<div className="pfi-no-fee-banner" role="region" aria-label="Fee policy">
  <div className="pfi-nfb-inner">
    <div className="pfi-nfb-h">{NO_FEE_BANNER.heading}</div>
    <p className="pfi-nfb-p">{NO_FEE_BANNER.body}</p>
  </div>
</div>
```

- [ ] **Step 6: Add CSS for the no-fee banner**

Add directly after the Track Record CSS block added in Task 4 Step 7:

```css
/* ══════════════════════════════════════════════════════════════════════════
   NO-UPFRONT-FEES BANNER
   ══════════════════════════════════════════════════════════════════════════ */
.pfi-no-fee-banner {
  border-top: 0.5px solid var(--border-subtle);
  border-bottom: 0.5px solid var(--border-subtle);
  background: var(--bg-card);
  padding: 40px 28px;
  text-align: center;
}

.pfi-nfb-inner {
  max-width: 640px;
  margin: 0 auto;
}

.pfi-nfb-h {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.pfi-nfb-p {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 300;
  line-height: 1.7;
}
```

- [ ] **Step 7: Run the tests to verify they pass**

Run: `npm test -- --testPathPattern=ProjectFundersInvestors --watchAll=false`
Expected: PASS (all tests)

- [ ] **Step 8: Commit**

```bash
git add src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.jsx src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.css src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.test.jsx
git commit -m "feat: add PFI no-upfront-fees banner, fix section background alternation"
```

---

## Task 6: Heading regression guard, full suite run, manual visual verification

**Files:**
- Modify: `src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.test.jsx`

**Interfaces:**
- Consumes: all sections rendered by prior tasks.
- Produces: nothing — this is the final verification task.

This closes the loop on the original bug that triggered this whole redesign (`.pfi-sTitle`/`.pfi-stitle` casing mismatch) with a permanent regression test, then confirms the whole page visually in a real browser.

- [ ] **Step 1: Write the heading regression test**

Add to `ProjectFundersInvestors.test.jsx`:

```jsx
test('every section heading except the CTA uses the pfi-stitle class', () => {
  const { container } = renderPage();
  const headings = container.querySelectorAll('h2');
  expect(headings.length).toBeGreaterThan(0);
  headings.forEach((h) => {
    if (h.id !== 'pfi-cta-heading') {
      expect(h).toHaveClass('pfi-stitle');
    }
  });
});
```

- [ ] **Step 2: Run the full test file**

Run: `npm test -- --testPathPattern=ProjectFundersInvestors --watchAll=false`
Expected: PASS (every test added across Tasks 1–6)

- [ ] **Step 3: Run the full test suite to confirm no regressions elsewhere**

Run: `npm test -- --watchAll=false`
Expected: PASS (aside from the pre-existing, unrelated `App.test.js` boilerplate failure if it was already failing before this plan — do not fix that file, it's out of scope)

- [ ] **Step 4: Manual visual verification**

Run: `npm start`
Open `http://localhost:3000/services/project-funders-and-investors` in a browser and confirm:
- All text is legible (no dark-on-dark or light-on-light regressions)
- Hero renders with the grid-overlay background (no visible SVG line artifacts)
- Enquiry panel reads as a glass panel over the dark hero, not a white card
- Track Record section appears between Process and Capital Sources, showing `[X]` placeholders
- No-upfront-fees banner appears between Capital Sources and the final CTA
- Trust bar, Advantage, Eligibility, Sectors, Process, and Capital Sources sections alternate visibly distinct dark backgrounds
- Hover states on cards and buttons show the blue accent, not gold
- Resize to mobile width (<580px) and confirm the form still appears first, and the Track Record grid collapses to a single column

- [ ] **Step 5: Commit**

```bash
git add src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.test.jsx
git commit -m "test: add PFI section-heading regression guard"
```

---

## Task 7: Fill in real content (blocked on Kevin)

**Files:**
- Modify: `src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.jsx`

This task cannot be completed as part of this plan — it requires information only Kevin can provide (per the design spec's Open Items). Do not invent figures or fee-policy wording to close this out.

- [ ] **Step 1: Get real Track Record figures from Kevin**

Replace the four `value: null` entries in `TRACK_RECORD` with real numbers (capital placed in $M, deals closed, sectors funded, countries closed in). Once `value` is a number, the placeholder `[X]` rendering branch added in Task 4 Step 6 automatically stops being used and the figure renders through `AnimatedCounter` instead — no other code changes needed.

- [ ] **Step 2: Get real fee-policy wording from Kevin**

Replace `NO_FEE_BANNER.body`'s placeholder string with Kevin's actual fee/engagement policy, in his own words.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.jsx
git commit -m "content: add real PFI track record figures and fee policy wording"
```
