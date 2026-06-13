# Navy Executive Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the full Kevin Graham site to a dark Navy Executive theme with Framer Motion scroll-reveal animations, a Swiper service carousel, and 3D interactive elements.

**Architecture:** Add `framer-motion` + `swiper` packages; create three shared components (`TiltCard`, `AnimatedCounter`, `ServiceSlider`) and one shared `motion.js` variants file; apply dark CSS variables to `global.css` + each component's CSS; wrap page sections in Framer Motion `motion.div` elements for scroll-triggered reveals.

**Tech Stack:** React 19, Framer Motion, Swiper, CSS custom properties, CRA (react-scripts)

---

## Task 1: Install Dependencies

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Install framer-motion and swiper**

```bash
cd "e:/react project/kevin-graham-profile"
npm install framer-motion swiper
```

Expected output: `added N packages` with no errors.

- [ ] **Step 2: Verify imports resolve**

```bash
node -e "require('./node_modules/framer-motion'); require('./node_modules/swiper'); console.log('OK')"
```

Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install framer-motion and swiper"
```

---

## Task 2: Create Shared Motion Variants

**Files:**
- Create: `src/utils/motion.js`

- [ ] **Step 1: Create the file**

```js
// src/utils/motion.js
const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const instant = { duration: 0 };

export const fadeUp = {
  hidden:  { opacity: 0, y: reduced ? 0 : 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: reduced ? instant : { duration: 0.6, ease: 'easeOut' },
  },
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: reduced ? instant : { duration: 0.5, ease: 'easeOut' },
  },
};

export const slideInLeft = {
  hidden:  { opacity: 0, x: reduced ? 0 : -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: reduced ? instant : { duration: 0.7, ease: 'easeOut' },
  },
};

export const slideInRight = {
  hidden:  { opacity: 0, x: reduced ? 0 : 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: reduced ? instant : { duration: 0.7, ease: 'easeOut' },
  },
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: reduced ? 1 : 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: reduced ? instant : { duration: 0.5, ease: 'easeOut' },
  },
};

export const staggerContainer = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const staggerItem = {
  hidden:  { opacity: 0, y: reduced ? 0 : 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: reduced ? instant : { duration: 0.5, ease: 'easeOut' },
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add src/utils/motion.js
git commit -m "feat: add shared Framer Motion variants"
```

---

## Task 3: Update Global CSS — Dark Navy Theme

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Add dark theme variables to the `:root` block**

Open `src/styles/global.css`. After the existing `:root {` block (which ends around line 56), append the following new variables inside `:root`:

```css
  /* ── Navy Executive Dark Theme ── */
  --bg-deep:        #080f1e;
  --bg-card:        #0d2240;
  --bg-elevated:    #1a3a6b;
  --accent:         #4da3ff;
  --accent-dark:    #0056b3;
  --accent-gradient: linear-gradient(135deg, #4da3ff, #0056b3);
  --text-primary:   #e8f2ff;
  --text-secondary: #8899bb;
  --text-muted:     #4a6a9a;
  --border-subtle:  rgba(77, 163, 255, 0.15);
  --border-glow:    rgba(77, 163, 255, 0.3);
  --glass-bg:       rgba(255, 255, 255, 0.05);
  --glass-border:   rgba(77, 163, 255, 0.2);
  --grid-line:      rgba(77, 163, 255, 0.04);
```

- [ ] **Step 2: Override body defaults for dark theme**

Find the `html { font-size: 16px; }` block and add the body rule after it:

```css
body {
  background-color: var(--bg-deep);
  color: var(--text-primary);
}
```

- [ ] **Step 3: Add utility classes used across pages**

At the bottom of `global.css`, append:

```css
/* ── Dark grid background pattern (used in hero sections) ── */
.dark-grid-bg {
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 32px 32px;
}

/* ── Glassmorphism card ── */
.glass-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--radius-md);
}

/* ── Accent gradient text ── */
.accent-text {
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add dark navy CSS variables and body override"
```

---

## Task 4: Create TiltCard Component

**Files:**
- Create: `src/components/common/TiltCard/TiltCard.jsx`
- Create: `src/components/common/TiltCard/TiltCard.css`

- [ ] **Step 1: Create TiltCard.jsx**

```jsx
// src/components/common/TiltCard/TiltCard.jsx
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './TiltCard.css';

const TiltCard = ({ children, intensity = 12, className = '' }) => {
  const ref = useRef(null);
  const x   = useMotionValue(0);
  const y   = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`tilt-card ${className}`}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

export default TiltCard;
```

- [ ] **Step 2: Create TiltCard.css**

```css
/* src/components/common/TiltCard/TiltCard.css */
.tilt-card {
  perspective: 800px;
  display: inline-block;
  will-change: transform;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/common/TiltCard/
git commit -m "feat: add TiltCard 3D mouse parallax component"
```

---

## Task 5: Create AnimatedCounter Component

**Files:**
- Create: `src/components/common/AnimatedCounter/AnimatedCounter.jsx`

- [ ] **Step 1: Create AnimatedCounter.jsx**

```jsx
// src/components/common/AnimatedCounter/AnimatedCounter.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const AnimatedCounter = ({ target, suffix = '', duration = 2000, className = '' }) => {
  const ref        = useRef(null);
  const isInView   = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    // Extract numeric portion for pages that pass "15+" as target
    const numeric = parseFloat(String(target).replace(/[^0-9.]/g, ''));
    if (isNaN(numeric)) { setCount(target); return; }

    const startTime = performance.now();
    const tick = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numeric));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(numeric);
    };
    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
};

export default AnimatedCounter;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/common/AnimatedCounter/AnimatedCounter.jsx
git commit -m "feat: add AnimatedCounter scroll-triggered count-up component"
```

---

## Task 6: Create ServiceSlider Component

**Files:**
- Create: `src/components/common/ServiceSlider/ServiceSlider.jsx`
- Create: `src/components/common/ServiceSlider/ServiceSlider.css`

- [ ] **Step 1: Create ServiceSlider.jsx**

```jsx
// src/components/common/ServiceSlider/ServiceSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ServiceSlider.css';

const ServiceSlider = ({ services }) => (
  <div className="service-slider">
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      loop
      autoplay={{ delay: 3200, pauseOnMouseEnter: true, disableOnInteraction: false }}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        0:   { slidesPerView: 1, spaceBetween: 16 },
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024:{ slidesPerView: 3, spaceBetween: 24 },
      }}
    >
      {services.map((svc) => (
        <SwiperSlide key={svc.num}>
          <Link to={svc.path} className="ss-card" aria-label={svc.title}>
            <div className="ss-card-icon" style={{ color: svc.color }}>
              <i className={svc.icon} aria-hidden="true" />
            </div>
            <div className="ss-card-num">{svc.num}</div>
            <h3 className="ss-card-title">{svc.title}</h3>
            <p className="ss-card-sub">{svc.sub}</p>
            <p className="ss-card-body">{svc.body}</p>
            <span className="ss-card-link">
              Learn more <i className="fas fa-arrow-right" aria-hidden="true" />
            </span>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default ServiceSlider;
```

- [ ] **Step 2: Create ServiceSlider.css**

```css
/* src/components/common/ServiceSlider/ServiceSlider.css */
.service-slider {
  width: 100%;
  padding: 0 0 48px;
}

.ss-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  text-decoration: none;
  color: var(--text-primary);
  height: 100%;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  border-left: 3px solid var(--accent);
}

.ss-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(77, 163, 255, 0.15);
  border-color: var(--accent);
}

.ss-card-icon {
  font-size: 28px;
  margin-bottom: 12px;
}

.ss-card-num {
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 2px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.ss-card-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 4px;
  font-family: var(--font-heading);
}

.ss-card-sub {
  font-size: 12px;
  color: var(--accent);
  margin: 0 0 12px;
  font-weight: 500;
}

.ss-card-body {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  flex: 1;
  margin: 0 0 16px;
}

.ss-card-link {
  font-size: 12px;
  color: var(--accent);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Swiper theme overrides */
.service-slider .swiper-button-prev,
.service-slider .swiper-button-next {
  color: var(--accent);
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.service-slider .swiper-button-prev::after,
.service-slider .swiper-button-next::after {
  font-size: 14px;
}

.service-slider .swiper-pagination-bullet {
  background: var(--text-muted);
  opacity: 1;
}

.service-slider .swiper-pagination-bullet-active {
  background: var(--accent);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/common/ServiceSlider/
git commit -m "feat: add ServiceSlider Swiper carousel component"
```

---

## Task 7: Update Header — Dark Theme + Scroll Effect

**Files:**
- Modify: `src/components/layout/Header/Header.jsx`
- Modify: `src/components/layout/Header/Header.css`

- [ ] **Step 1: Add scroll-based className to Header.jsx**

Replace the current `Header` function with:

```jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../../assets/images/Graham.png';

const Header = () => {
  const navigate   = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goHomeAndScrollHero = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };

  const goToAboutAndScrollTop = (e) => {
    e.preventDefault();
    if (window.location.pathname === '/about') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      navigate('/about');
    }
  };

  const goToServicesAndScrollTop = (e) => {
    e.preventDefault();
    if (window.location.pathname === '/services') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      navigate('/services');
    }
  };

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/" className="site-logo" onClick={goHomeAndScrollHero}>
              <img src={logo} alt="Kevin Graham Logo" className="site-logo-image" />
            </Link>
          </div>
          <nav className="main-nav">
            <ul>
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/about" className="nav-link" onClick={goToAboutAndScrollTop}>About</Link></li>
              <li><Link to="/services" className="nav-link" onClick={goToServicesAndScrollTop}>Services</Link></li>
              <li><a href="#contact" className="nav-link contact-link">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
```

- [ ] **Step 2: Replace Header.css with dark theme version**

```css
/* src/components/layout/Header/Header.css */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--accent);
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 1001;
  border-radius: 0 0 4px 4px;
  font-size: 14px;
  font-weight: 500;
}
.skip-link:focus { top: 0; }

.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(8, 15, 30, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  z-index: 1000;
  padding: 1rem 0;
  transition: border-color 0.3s ease, background 0.3s ease;
}

.site-header--scrolled {
  background: rgba(8, 15, 30, 0.97);
  border-bottom-color: var(--border-subtle);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo { display: flex; align-items: center; }
.logo a { text-decoration: none; }
.site-logo-image { max-height: 50px; width: auto; display: block; }

.main-nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.main-nav li { margin-left: 2rem; }

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.25s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent-gradient);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.nav-link:hover { color: var(--text-primary); }
.nav-link:hover::after { width: 100%; }

.contact-link {
  background: var(--accent-gradient) !important;
  color: #fff !important;
  padding: 0.5rem 1.25rem !important;
  border-radius: var(--radius-sm);
  transition: opacity 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease !important;
}

.contact-link::after { display: none; }
.contact-link:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(77, 163, 255, 0.35);
}

@media (max-width: 768px) {
  .header-content { flex-direction: column; text-align: center; }
  .main-nav { margin-top: 1rem; }
  .main-nav ul { flex-wrap: wrap; justify-content: center; }
  .main-nav li { margin: 0.5rem 1rem; }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Header/Header.jsx src/components/layout/Header/Header.css
git commit -m "feat: update Header to dark navy theme with scroll effect"
```

---

## Task 8: Update Footer — Dark Theme

**Files:**
- Modify: `src/components/layout/Footer/Footer.css`

- [ ] **Step 1: Append dark overrides to Footer.css**

Open `src/components/layout/Footer/Footer.css`. At the bottom of the file, append:

```css
/* ── Dark Navy Override ── */
.site-footer {
  background: var(--bg-card) !important;
  border-top: 1px solid var(--border-subtle);
  color: var(--text-secondary) !important;
}

.site-footer h3,
.site-footer h4 {
  color: var(--text-primary) !important;
}

.site-footer h3 a {
  color: var(--accent) !important;
  text-decoration: none;
}

.site-footer p,
.site-footer li {
  color: var(--text-secondary) !important;
}

.site-footer a {
  color: var(--text-secondary) !important;
  transition: color 0.2s ease;
}

.site-footer a:hover {
  color: var(--accent) !important;
}

.footer-bottom {
  border-top: 1px solid var(--border-subtle) !important;
  color: var(--text-muted) !important;
}

.social-icon {
  background: var(--glass-bg) !important;
  border: 1px solid var(--border-subtle) !important;
  color: var(--text-secondary) !important;
  transition: background 0.2s, color 0.2s, border-color 0.2s !important;
}

.social-icon:hover {
  background: var(--accent-dark) !important;
  border-color: var(--accent) !important;
  color: #fff !important;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer/Footer.css
git commit -m "feat: update Footer to dark navy theme"
```

---

## Task 9: Update Contact Panel — Dark Glassmorphism

**Files:**
- Modify: `src/components/Contact/Contact.css`

- [ ] **Step 1: Append dark overrides to Contact.css**

Open `src/components/Contact/Contact.css` and append at the bottom:

```css
/* ── Dark Navy Override ── */
#contact,
.contact-section,
.contact-panel,
[class*="contact"] {
  background: var(--bg-card) !important;
  color: var(--text-primary) !important;
}

.contact-section {
  border-top: 1px solid var(--border-subtle) !important;
}

[class*="contact"] h2,
[class*="contact"] h3,
[class*="contact"] h4 {
  color: var(--text-primary) !important;
}

[class*="contact"] p,
[class*="contact"] label,
[class*="contact"] span {
  color: var(--text-secondary) !important;
}

[class*="contact"] select,
[class*="contact"] input,
[class*="contact"] textarea {
  background: var(--bg-elevated) !important;
  border-color: var(--border-subtle) !important;
  color: var(--text-primary) !important;
}

[class*="contact"] select:focus,
[class*="contact"] input:focus {
  border-color: var(--accent) !important;
  outline: none;
}

[class*="contact-btn"],
[class*="btn-wa"],
[class*="btn-email"],
[class*="btn-channel"] {
  background: var(--glass-bg) !important;
  border: 1px solid var(--border-subtle) !important;
  color: var(--text-primary) !important;
  transition: background 0.2s, border-color 0.2s !important;
}

[class*="contact-btn"]:hover,
[class*="btn-wa"]:hover,
[class*="btn-email"]:hover,
[class*="btn-channel"]:hover {
  background: var(--bg-elevated) !important;
  border-color: var(--accent) !important;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Contact/Contact.css
git commit -m "feat: update Contact panel to dark glassmorphism theme"
```

---

## Task 10: Update FloatingContact and Partners + Reviews

**Files:**
- Modify: `src/components/common/FloatingContact/FloatingContact.css`
- Modify: `src/components/Partners/Partners.css`
- Modify: `src/components/Reviews/Reviews.css`

- [ ] **Step 1: Append to FloatingContact.css**

```css
/* ── Dark Navy Override ── */
.floating-btn {
  background: var(--bg-card) !important;
  border: 1px solid var(--border-subtle) !important;
  color: var(--text-primary) !important;
}

.floating-btn.whatsapp:hover { background: #25d366 !important; border-color: #25d366 !important; color: #fff !important; }
.floating-btn.email:hover    { background: var(--accent) !important; border-color: var(--accent) !important; color: #fff !important; }

.wa-overlay { background: rgba(0, 0, 0, 0.7) !important; }

.wa-modal {
  background: var(--bg-card) !important;
  border: 1px solid var(--border-subtle) !important;
  color: var(--text-primary) !important;
}

.wa-modal__title { color: var(--text-primary) !important; }
.wa-modal__subtitle { color: var(--text-secondary) !important; }

.wa-modal__service-item {
  color: var(--text-secondary) !important;
  border-bottom-color: var(--border-subtle) !important;
}

.wa-modal__service-item:hover,
.wa-modal__service-item.selected { color: var(--accent) !important; }

.wa-modal__btn-proceed.active {
  background: #25d366 !important;
  color: #fff !important;
}
```

- [ ] **Step 2: Append to Partners.css**

```css
/* ── Dark Navy Override ── */
[class*="partner"],
.partners-section,
.partners {
  background: var(--bg-card) !important;
  border-top: 1px solid var(--border-subtle) !important;
  border-bottom: 1px solid var(--border-subtle) !important;
}

[class*="partner"] h2,
[class*="partner"] h3 {
  color: var(--text-primary) !important;
}

[class*="partner-logo"] img,
[class*="partner"] img {
  filter: brightness(0) invert(1);
  opacity: 0.55;
  transition: opacity 0.2s;
}

[class*="partner-logo"]:hover img,
[class*="partner"]:hover img {
  opacity: 0.85;
}
```

- [ ] **Step 3: Append to Reviews.css**

```css
/* ── Dark Navy Override ── */
[class*="review"],
.reviews-section,
.reviews {
  background: var(--bg-deep) !important;
  border-top: 1px solid var(--border-subtle) !important;
}

[class*="review"] h2,
[class*="review"] h3 {
  color: var(--text-primary) !important;
}

[class*="review"] p {
  color: var(--text-secondary) !important;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/common/FloatingContact/FloatingContact.css src/components/Partners/Partners.css src/components/Reviews/Reviews.css
git commit -m "feat: update FloatingContact, Partners, Reviews to dark theme"
```

---

## Task 11: Update Home Page — Animations + Dark Theme

**Files:**
- Modify: `src/pages/Home/Home.jsx`
- Modify: `src/pages/Home/Home.css` (and any `Home.hero.css`, `Home.sections.css`)

- [ ] **Step 1: Rewrite Home.jsx with motion wrappers**

Replace the full contents of `src/pages/Home/Home.jsx`:

```jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/common/SEO/SEO';
import TiltCard from '../../components/common/TiltCard/TiltCard';
import AnimatedCounter from '../../components/common/AnimatedCounter/AnimatedCounter';
import ServiceSlider from '../../components/common/ServiceSlider/ServiceSlider';
import Graham from '../../assets/images/Graham.png';
import { fadeUp, fadeIn, slideInLeft, slideInRight, staggerContainer, staggerItem } from '../../utils/motion';
import './Home.css';

const PHONE = '447723339858';
const EMAIL  = 'kevin.uk@grahamkarimi.com';
const IMO_URL = `https://imo.im/${PHONE}?text=${encodeURIComponent(
  "Hi Kevin, I'd like to discuss your financial advisory services. Please let me know your availability."
)}`;

const SERVICES = [
  { number: '01', icon: 'fas fa-landmark',      title: 'International Project Funding',      sub: '& Debt Structuring',                    path: '/services/project-funding',                      accent: '#1565C0' },
  { number: '02', icon: 'fas fa-globe-americas', title: 'Cross Border Financial Advisory',    sub: '& Investment Structuring',              path: '/services/international-financial-advisor',      accent: '#0891b2' },
  { number: '03', icon: 'fas fa-shield-alt',     title: 'Risk Management',                    sub: '& Regulatory Compliance Advisory',      path: '/services/risk-compliance',                      accent: '#7c3aed' },
  { number: '04', icon: 'fas fa-file-contract',  title: 'Document Alignment Services',        sub: 'DAS — Lender-Ready Documentation',      path: '/services/document-alignment-services',          accent: '#b45309' },
  { number: '05', icon: 'fas fa-users',          title: 'Global HR & International',          sub: 'Job Placement Services',                path: '/services/global-hr',                            accent: '#059669' },
  { number: '06', icon: 'fas fa-briefcase',      title: 'Business Consultant',                sub: 'Registration · Accounting · Tax · HR',  path: '/services/business-consultant',                  accent: '#facc15' },
  { number: '07', icon: 'fas fa-search-dollar',  title: 'Grants & Donations',                 sub: 'Sourcing Advisory',                     path: '/services/grants-donations',                     accent: '#D97706' },
];

const STATS = [
  { number: 15,     suffix: '+', label: 'Years Exp.'   },
  { number: 500,    suffix: 'M+', label: 'Transactions' },
  { number: 40,     suffix: '+', label: 'Countries'    },
  { number: 100,    suffix: '+', label: 'Clients'      },
];

const SERVICES_CARDS = [
  { num: '01', icon: 'fas fa-landmark',      color: '#1565C0', title: 'International Project Funding',   sub: '& Debt Structuring',               body: 'Connecting businesses and projects with credible local and international lenders. Structures tailored debt solutions aligned with client goals and regulatory frameworks.',                                                                      path: '/services/project-funding' },
  { num: '02', icon: 'fas fa-globe-americas',color: '#0891b2', title: 'Cross Border Financial Advisory', sub: '& Investment Structuring',          body: 'Strategic financial advisory for cross-border transactions, international investment structuring, and multi-jurisdictional capital deployment.',                                                                      path: '/services/international-financial-advisor' },
  { num: '03', icon: 'fas fa-shield-alt',    color: '#7c3aed', title: 'Risk Management',                 sub: '& Regulatory Compliance Advisory',  body: 'Comprehensive risk frameworks for high-value transactions. Full alignment with international regulatory standards, AML policies, and compliance protocols.',                                            path: '/services/risk-compliance' },
  { num: '04', icon: 'fas fa-file-contract', color: '#b45309', title: 'Document Alignment Services',     sub: 'DAS — Lender-Ready Documentation',  body: 'Strategic oversight ensuring project documents and business proposals meet investor, lender, and statutory expectations — increasing fundability and reducing bottlenecks.',            path: '/services/document-alignment-services' },
  { num: '05', icon: 'fas fa-users',         color: '#059669', title: 'Global HR & International',       sub: 'Job Placement Services',            body: 'End-to-end international HR solutions and job placement services connecting talent with global opportunities across 40+ countries.',                                                              path: '/services/global-hr' },
  { num: '06', icon: 'fas fa-briefcase',     color: '#ca8a04', title: 'Business Consultant',             sub: 'Registration · Accounting · Tax',   body: 'From company formation and accounting to tax planning, HR consulting, management strategy, and specialist advisory — all coordinated by one expert.',                                       path: '/services/business-consultant' },
  { num: '07', icon: 'fas fa-search-dollar', color: '#D97706', title: 'Grants & Donations',              sub: 'Sourcing Advisory',                 body: 'Sourcing grants and donations for NGOs, non-profits, infrastructure developers, and community groups from government, foundation, corporate, and international networks.',       path: '/services/grants-donations' },
];

const MILESTONES = [
  { year: '2008', text: 'Began career in international finance and cross-border investment structuring.' },
  { year: '2013', text: 'Appointed Director of Risk Management & Compliance at InBest Consultant Solutions.' },
  { year: '2017', text: 'Surpassed $200M in managed transactions across 25+ countries.' },
  { year: '2022', text: 'Expanded advisory portfolio to 40+ countries and $500M+ in lifetime transactions.' },
];

const CREDENTIALS = [
  'MBA — Business Administration',
  'Certified Financial Advisor',
  'Director of Risk Management & Compliance',
  'AML & KYC Framework Specialist',
  'Cross-Border Regulatory Expert',
  'International Project Finance Specialist',
];

const Home = () => {
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); }, []);

  return (
    <div className="home-page">
      <SEO
        title="Global Financial Advisor & Project Funding Specialist"
        description="Kevin Graham brings over a decade of strategic insight and execution in global finance, with a focus on risk management, compliance, and debt advisory."
        keywords="Kevin Graham, Graham financial advisor, global financial advisor, director risk management compliance, debt structuring expert, international finance director UK"
        canonical="https://grahamkarimi.com/"
        ogType="profile"
        schema={{
          '@context': 'https://schema.org', '@type': 'Person',
          name: 'Kevin Graham Karimi', url: 'https://grahamkarimi.com/',
          jobTitle: 'Global Financial Advisor & Director of Risk Management',
          worksFor: { '@type': 'Organization', name: 'InBest Consultant Solutions' },
        }}
      />

      <main id="main-content">

        {/* ── HERO ── */}
        <section id="hero" className="hero-section" aria-labelledby="hero-name">
          <div className="hero-glow hero-glow--tr" aria-hidden="true" />
          <div className="hero-glow hero-glow--bl" aria-hidden="true" />
          <div className="hero-grid-texture dark-grid-bg" aria-hidden="true" />
          <div className="hero-inner">

            {/* Left — Identity + CTAs */}
            <motion.div
              className="hero-left"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.span variants={staggerItem} className="hero-eyebrow">
                <span className="hero-eyebrow-dot" aria-hidden="true" />
                Trusted by Global Corporations &amp; HNW Investors
              </motion.span>

              <motion.h1 variants={staggerItem} id="hero-name" className="hero-name">
                Kevin<em className="hero-name-accent"> Graham</em>
              </motion.h1>

              <motion.h2 variants={staggerItem}>
                <p className="hero-role">Global Financial Advisor | Finance Broker | Financial Consultant</p>
              </motion.h2>

              <motion.div variants={staggerItem} className="hero-stats" aria-label="Key statistics">
                {STATS.map((s, i) => (
                  <React.Fragment key={s.label}>
                    <div className="hero-stat">
                      <span className="hero-stat-num">
                        <AnimatedCounter target={s.number} suffix={s.suffix} />
                      </span>
                      <span className="hero-stat-lbl">{s.label}</span>
                    </div>
                    {i < STATS.length - 1 && <div className="hero-stat-sep" aria-hidden="true" />}
                  </React.Fragment>
                ))}
              </motion.div>

              <motion.p variants={staggerItem} className="hero-tagline">
                With over 15 years of global experience, Kevin delivers specialist advisory across
                project funding, international financial strategy, risk &amp; compliance, grants
                &amp; donations sourcing, and document alignment services — serving high-net-worth
                corporations and organisations across 40+ countries.
              </motion.p>

              <motion.div variants={staggerItem} className="hero-cta">
                <a href={IMO_URL} target="_blank" rel="noopener noreferrer" className="hero-btn hero-btn--imo" aria-label="Contact Kevin via IMO">
                  <i className="fas fa-comment-dots" aria-hidden="true" /> IMO Kevin
                </a>
                <a href={`mailto:${EMAIL}`} className="hero-btn hero-btn--email" aria-label="Send Kevin an email">
                  <i className="fas fa-envelope" aria-hidden="true" /> Send an Email
                </a>
              </motion.div>

              <motion.div variants={staggerItem} className="hero-trust" aria-label="Credentials">
                <span className="hero-trust-badge"><i className="fas fa-certificate" aria-hidden="true" /> Certified Financial Advisor</span>
                <span className="hero-trust-badge"><i className="fas fa-shield-alt"  aria-hidden="true" /> Regulatory Expert</span>
                <span className="hero-trust-badge"><i className="fas fa-award"       aria-hidden="true" /> Industry Leader</span>
              </motion.div>
            </motion.div>

            {/* Right — Service cards */}
            <motion.div
              className="hero-right"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <p className="hero-services-label" aria-hidden="true">7 Core Services</p>
              <nav aria-label="Core services">
                {SERVICES.map(svc => (
                  <motion.a
                    key={svc.number}
                    variants={staggerItem}
                    href={svc.path}
                    className="hero-svc-card"
                    style={{ '--svc-accent': svc.accent }}
                    aria-label={`${svc.title} — ${svc.sub}`}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="hero-svc-num" aria-hidden="true">{svc.number}</span>
                    <div className="hero-svc-icon" aria-hidden="true" style={{ background: svc.accent }}>
                      <i className={svc.icon} />
                    </div>
                    <div className="hero-svc-body">
                      <div className="hero-svc-title">{svc.title}</div>
                      <div className="hero-svc-sub">{svc.sub}</div>
                    </div>
                    <i className="fas fa-arrow-right hero-svc-arrow" aria-hidden="true" />
                  </motion.a>
                ))}
              </nav>
            </motion.div>

          </div>
          <div className="hero-scroll" aria-hidden="true">
            <i className="fas fa-chevron-down" /><span>Explore Services</span>
          </div>
        </section>

        {/* ── EXPERTISE / SERVICES SLIDER ── */}
        <section id="expertise" className="exp-section" aria-labelledby="expertise-heading">
          <div className="exp-mesh"             aria-hidden="true" />
          <div className="exp-glow exp-glow--1" aria-hidden="true" />
          <div className="exp-glow exp-glow--2" aria-hidden="true" />
          <div className="exp-inner">
            <motion.div
              className="exp-header"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <span className="exp-eyebrow">What We Offer</span>
              <h2 id="expertise-heading">Global Financial Services</h2>
              <p>Seven specialist disciplines under one advisory roof — from project funding and compliance to business formation, grants sourcing, and HR — deployed across 40+ countries.</p>
            </motion.div>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <ServiceSlider services={SERVICES_CARDS} />
            </motion.div>
          </div>
        </section>

        {/* ── EXPERIENCE / BIO ── */}
        <section id="experience" className="bio-section" aria-labelledby="experience-heading">
          <div className="bio-inner">

            <motion.div
              className="bio-left"
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <span className="exp-eyebrow">Background</span>
              <h2 id="experience-heading">Expertise &amp; Experience</h2>
              <p className="bio-lead">
                Kevin Graham brings over 15 years of strategic insight and execution in global finance with a focus on risk management, compliance, and debt advisory. As Director of Risk Management &amp; Compliance at{' '}
                <a href="https://inbestconsultant.com/" target="_blank" rel="noopener noreferrer">InBest Consultant Solutions</a>
                , he has led high-value transactions across infrastructure, energy, trade finance, and real estate.
              </p>
              <p className="bio-body">
                With over 15 years of global experience, Kevin delivers specialist advisory across project funding, international financial strategy, risk &amp; compliance, and document alignment services, serving high-net-worth corporations across 40+ countries.
              </p>
              <motion.div
                className="bio-timeline"
                aria-label="Career milestones"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                {MILESTONES.map((m) => (
                  <motion.div key={m.year} className="bio-milestone" variants={staggerItem}>
                    <div className="bio-milestone-year">{m.year}</div>
                    <div className="bio-milestone-line" aria-hidden="true"><span className="bio-milestone-dot" /></div>
                    <div className="bio-milestone-text">{m.text}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="bio-right"
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <TiltCard className="bio-photo-wrap">
                <img src={Graham} alt="Kevin Graham Karimi — Global Financial Advisor" className="bio-photo" />
                <div className="bio-chip bio-chip--tl"><i className="fas fa-award" aria-hidden="true" /><span>15+ Years</span></div>
                <div className="bio-chip bio-chip--br"><i className="fas fa-globe" aria-hidden="true" /><span>40+ Countries</span></div>
              </TiltCard>
              <motion.ul
                className="bio-creds"
                aria-label="Credentials"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {CREDENTIALS.map((c) => (
                  <motion.li key={c} className="bio-cred-item" variants={staggerItem}>
                    <i className="fas fa-check-circle" aria-hidden="true" />{c}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;
```

- [ ] **Step 2: Append dark CSS overrides to Home CSS files**

Find the CSS file(s) for the Home page (`Home.css`, and `Home.hero.css` / `Home.sections.css` if they exist). At the bottom of **each** file, append:

```css
/* ── Dark Navy Override ── */
.home-page { background: var(--bg-deep); }

.hero-section {
  background: var(--bg-deep) !important;
  color: var(--text-primary) !important;
}

.hero-glow--tr {
  background: radial-gradient(circle, rgba(77,163,255,0.18), transparent 65%) !important;
}
.hero-glow--bl {
  background: radial-gradient(circle, rgba(0,86,179,0.14), transparent 65%) !important;
}

.hero-name       { color: var(--text-primary)   !important; }
.hero-name-accent{ color: var(--accent)          !important; }
.hero-role       { color: var(--text-secondary)  !important; }
.hero-eyebrow    { color: var(--accent)          !important; background: rgba(77,163,255,0.1) !important; border-color: var(--border-glow) !important; }
.hero-eyebrow-dot{ background: var(--accent)     !important; }
.hero-stat-num   { color: var(--accent)          !important; }
.hero-stat-lbl   { color: var(--text-muted)      !important; }
.hero-stat-sep   { background: var(--border-subtle) !important; }
.hero-tagline    { color: var(--text-secondary)  !important; }

.hero-btn--imo {
  background: var(--accent-gradient) !important;
  color: #fff !important;
  border: none !important;
}
.hero-btn--email {
  background: var(--glass-bg) !important;
  border-color: var(--border-glow) !important;
  color: var(--accent) !important;
}

.hero-trust-badge {
  background: var(--glass-bg)    !important;
  border-color: var(--border-subtle) !important;
  color: var(--text-secondary)   !important;
}

.hero-svc-card {
  background: var(--glass-bg)    !important;
  border-color: var(--border-subtle) !important;
  color: var(--text-primary)     !important;
}
.hero-svc-card:hover {
  background: var(--bg-card)     !important;
  border-color: var(--accent)    !important;
}
.hero-svc-title  { color: var(--text-primary)   !important; }
.hero-svc-sub    { color: var(--text-secondary) !important; }
.hero-svc-num    { color: var(--text-muted)     !important; }
.hero-svc-arrow  { color: var(--accent)         !important; }

.exp-section { background: var(--bg-deep) !important; }
.exp-header h2   { color: var(--text-primary)   !important; }
.exp-header p    { color: var(--text-secondary) !important; }
.exp-eyebrow     { color: var(--accent)         !important; }

.bio-section     { background: var(--bg-card)   !important; border-top: 1px solid var(--border-subtle); }
.bio-lead, .bio-body { color: var(--text-secondary) !important; }
.bio-milestone-year  { color: var(--accent)     !important; }
.bio-milestone-text  { color: var(--text-secondary) !important; }
.bio-milestone-dot   { background: var(--accent) !important; }
.bio-chip {
  background: var(--bg-elevated) !important;
  border-color: var(--border-subtle) !important;
  color: var(--text-primary) !important;
}
.bio-cred-item   { color: var(--text-secondary) !important; }
.bio-cred-item i { color: var(--accent)         !important; }
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home/
git commit -m "feat: animate Home page with Framer Motion and apply dark theme"
```

---

## Task 12: Update About Page

**Files:**
- Modify: `src/pages/About/About.jsx`
- Modify: `src/pages/About/About.css`

- [ ] **Step 1: Rewrite About.jsx with motion wrappers**

Replace the full contents of `src/pages/About/About.jsx`:

```jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/common/SEO/SEO';
import TiltCard from '../../components/common/TiltCard/TiltCard';
import profilePhoto from '../../assets/images/Kevin-kevin.jpg';
import { fadeUp, slideInLeft, slideInRight, staggerContainer, staggerItem } from '../../utils/motion';
import './About.css';

const About = () => {
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); }, []);

  return (
    <div className="about-page">
      <SEO
        title="Financial Advisor & Risk Management Director"
        description="With international experience, he advises corporations & high-net-worth investors on regulatory compliance, risk frameworks, and global financial strategy."
        keywords="Kevin Graham, financial advisor background, risk management director, InBest Consultant Solutions"
        canonical="https://grahamkarimi.com/about"
        ogType="profile"
        schema={{
          '@context': 'https://schema.org', '@type': 'ProfilePage',
          name: 'Kevin Graham', url: 'https://grahamkarimi.com/about',
          mainEntity: { '@type': 'Person', name: 'Kevin Graham', jobTitle: 'Director of Risk Management & Compliance' },
        }}
      />

      <main id="main-content">

        <section className="page-header">
          <div className="container">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.h1 variants={staggerItem}>Financial Advisor &amp; Consultant</motion.h1>
              <motion.h2 variants={staggerItem}>Kevin Graham</motion.h2>
              <motion.p variants={staggerItem}>Learn more about my background, expertise, and professional journey</motion.p>
            </motion.div>
          </div>
        </section>

        <section className="bio-section">
          <div className="container">
            <div className="bio-content">

              <motion.div
                className="bio-image"
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
              >
                <TiltCard>
                  <img src={profilePhoto} alt="Kevin Graham Karimi" className="profile-photo1" />
                  <div className="experience-badge">
                    <span className="experience-years">15+</span>
                    <span className="experience-text">Years Experience</span>
                  </div>
                </TiltCard>
              </motion.div>

              <motion.div
                className="bio-text"
                variants={slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
              >
                <h2>Professional Background</h2>
                <p className="position">Director, Risk Management, global finance, &amp; Compliance</p>
                <p>As Director of Risk Management &amp; Compliance at InBest Consultant Solutions, Kevin Graham Karimi brings a wealth of expertise in safeguarding investments, ensuring regulatory excellence, and structuring high-value financial solutions across global markets.</p>
                <p>Kevin is dedicated to protecting client interests, promoting transparency, and fostering sustainable growth in every transaction.</p>
                <div className="bio-highlights">
                  <h3>Career Highlights</h3>
                  <ul>
                    <li>Led implementation of comprehensive risk assessment frameworks for multinational financial institutions</li>
                    <li>Orchestrated compliance strategies for high-profile international transactions</li>
                    <li>Advised on regulatory matters across diverse global markets</li>
                    <li>Developed innovative approaches to complex financial risk management</li>
                  </ul>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        <section className="philosophy-section">
          <div className="container">
            <motion.div
              className="section-header"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <h2>Professional Philosophy</h2>
              <p>Guiding principles that drive my approach to risk management and compliance</p>
            </motion.div>
            <motion.div
              className="philosophy-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {[
                { title: 'Proactive Risk Management',    body: 'Identifying and addressing potential risks before they materialize is always more effective than reactive management.' },
                { title: 'Regulatory Excellence',        body: 'Viewing compliance not as a constraint but as a foundation for sustainable business growth and stakeholder trust.' },
                { title: 'Transparent Communication',    body: 'Maintaining clear, open dialogue with all stakeholders to ensure alignment and informed decision-making.' },
                { title: 'Collaborative Approach',       body: 'Collaborating with clients, regulators, and stakeholders to understand their needs and challenges.' },
                { title: 'Customer Focus',               body: 'Providing personalized solutions that align with client goals and objectives.' },
                { title: 'Continuous Improvement',       body: 'Constantly evaluating and enhancing risk management processes to adapt to evolving market conditions.' },
              ].map((card, i) => (
                <motion.div key={i} className="philosophy-card" variants={staggerItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <motion.section
          className="about-cta-section"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="container">
            <div className="cta-content">
              <h2>Ready to work together?</h2>
              <p>Let's discuss how my expertise can benefit your organization</p>
              <a href="#contact" className="btn btn-primary">Get in Touch</a>
            </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
};

export default About;
```

- [ ] **Step 2: Append dark overrides to About.css**

```css
/* ── Dark Navy Override ── */
.about-page          { background: var(--bg-deep); }
.page-header         { background: var(--bg-card) !important; border-bottom: 1px solid var(--border-subtle); }
.page-header h1,
.page-header h2      { color: var(--text-primary) !important; }
.page-header p       { color: var(--text-secondary) !important; }

.bio-section         { background: var(--bg-deep) !important; }
.bio-text h2         { color: var(--text-primary) !important; }
.bio-text p          { color: var(--text-secondary) !important; }
.bio-text .position  { color: var(--accent) !important; }
.bio-highlights h3   { color: var(--text-primary) !important; }
.bio-highlights li   { color: var(--text-secondary) !important; }

.experience-badge {
  background: var(--accent-gradient) !important;
  color: #fff !important;
}

.philosophy-section  { background: var(--bg-card) !important; border-top: 1px solid var(--border-subtle); }
.section-header h2   { color: var(--text-primary) !important; }
.section-header p    { color: var(--text-secondary) !important; }

.philosophy-card {
  background: var(--glass-bg) !important;
  border: 1px solid var(--border-subtle) !important;
  color: var(--text-secondary) !important;
}
.philosophy-card h3  { color: var(--accent) !important; }
.philosophy-card:hover { border-color: var(--accent) !important; }

.about-cta-section   { background: var(--bg-elevated) !important; border-top: 1px solid var(--border-subtle); }
.cta-content h2      { color: var(--text-primary) !important; }
.cta-content p       { color: var(--text-secondary) !important; }
.btn.btn-primary     { background: var(--accent-gradient) !important; color: #fff !important; border: none !important; }
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/About/
git commit -m "feat: animate About page with Framer Motion and apply dark theme"
```

---

## Task 13: Update Services Overview Page

**Files:**
- Modify: `src/pages/Services/Services.jsx`
- Modify: `src/pages/Services/Services.css`

- [ ] **Step 1: Add Framer Motion imports and wrap sections in Services.jsx**

At the top of `src/pages/Services/Services.jsx`, add these imports after the existing imports:

```jsx
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, slideInLeft, slideInRight } from '../../utils/motion';
```

Then make these surgical changes to the JSX (keep all data constants and existing structure unchanged):

**a)** Wrap the quick-nav pills container:
```jsx
// Find: <div className="services-nav"> (or similar quick-nav class)
// Replace with:
<motion.div
  className="services-nav"  // keep existing className
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {/* existing pills — wrap each pill anchor in: */}
  {/* <motion.a variants={staggerItem} ...existing props> */}
```

**b)** Wrap each service block — the `services` array `.map()`:
```jsx
// For even-index services (no `reverse`), use slideInLeft.
// For odd-index services (with `reverse`), use slideInRight.
// Wrap the outer div of each service block:
{services.map((svc, idx) => (
  <motion.div
    key={svc.id}
    className={`service-block ${svc.reverse ? 'reverse' : ''} ...existingClasses`}
    variants={idx % 2 === 0 ? slideInLeft : slideInRight}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
  >
    {/* existing card content unchanged */}
  </motion.div>
))}
```

**c)** Wrap the stats section heading and stats grid:
```jsx
<motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
  {/* existing stats heading */}
</motion.div>
<motion.div
  className="why-stats-grid"  // keep existing className
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {/* each stat wrapped in <motion.div variants={staggerItem}> */}
</motion.div>
```

**d)** Wrap final CTA section:
```jsx
<motion.section
  className="services-cta"  // keep existing className
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-60px' }}
>
```

- [ ] **Step 2: Append dark overrides to Services.css**

```css
/* ── Dark Navy Override ── */
.services-page,
[class*="services-"] { background: var(--bg-deep); }

.services-hero,
.services-header     { background: var(--bg-card) !important; border-bottom: 1px solid var(--border-subtle); }

[class*="service-block"],
[class*="service-card"] {
  background: var(--bg-card)    !important;
  border-color: var(--border-subtle) !important;
  color: var(--text-secondary)  !important;
}

[class*="service-block"]:hover,
[class*="service-card"]:hover {
  border-color: var(--accent)   !important;
  box-shadow: 0 12px 32px rgba(77,163,255,0.12) !important;
}

[class*="service"] h2,
[class*="service"] h3 { color: var(--text-primary) !important; }
[class*="service"] p  { color: var(--text-secondary) !important; }
[class*="service"] li { color: var(--text-secondary) !important; }

.services-nav a,
[class*="service-pill"],
[class*="service-nav"] a {
  background: var(--glass-bg)   !important;
  border-color: var(--border-subtle) !important;
  color: var(--text-secondary)  !important;
}

.services-nav a:hover,
[class*="service-pill"]:hover,
[class*="service-nav"] a:hover {
  background: var(--bg-elevated) !important;
  color: var(--accent)          !important;
  border-color: var(--accent)   !important;
}

[class*="why-"] { background: var(--bg-card) !important; border-top: 1px solid var(--border-subtle); }
[class*="why-"] h2 { color: var(--text-primary) !important; }
[class*="stat-num"] { color: var(--accent) !important; }
[class*="stat-label"], [class*="stat-lbl"] { color: var(--text-secondary) !important; }

[class*="services-cta"],
[class*="cta-section"] { background: var(--bg-elevated) !important; border-top: 1px solid var(--border-subtle); }
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/Services/Services.jsx src/pages/Services/Services.css
git commit -m "feat: animate Services overview with Framer Motion and apply dark theme"
```

---

## Task 14: Service Page Dark Theme — Shared CSS Approach

All 8 service detail pages share the same structural CSS pattern. This task creates the shared dark CSS by appending overrides to each page's CSS file, then Tasks 15–21 add the JSX animation wrappers.

**Files:**
- Modify: CSS files for all 8 service pages

For each of the following CSS files, append the block below (replacing `PREFIX` with the actual page prefix):

| Page | CSS file | PREFIX |
|---|---|---|
| ProjectFunding | `ProjectFunding.css` | `pf` |
| InternationalFinancialAdvisor | `InternationalFinancialAdvisor.css` | `ifa` |
| RiskCompliance | `RiskCompliance.css` | `rc` |
| DocumentAlignment | `DocumentAlignment.css` | `das` |
| BusinessFunding | `BusinessFunding.css` | `bf` |
| BusinessConsultant | `BusinessConsultant.css` | `bc` |
| GrantsDonations | `GrantsDonations.css` | `gd` |
| ProjectFundersInvestors | `ProjectFundersInvestors.css` | `pfi` |

- [ ] **Step 1: Append to each CSS file**

For each file, append (substituting the correct prefix):

```css
/* ── Dark Navy Override ── */
.[PREFIX]-page,
.[PREFIX]-header,
.[PREFIX]-hero   { background: var(--bg-deep) !important; color: var(--text-primary) !important; }

.[PREFIX]-header-label,
.[PREFIX]-hero-eyebrow,
.[PREFIX]-eyebrow,
.[PREFIX]-stag   { color: var(--accent) !important; }

.[PREFIX]-header-body h1,
.[PREFIX]-hero h1,
.[PREFIX]-stitle { color: var(--text-primary)   !important; }

.[PREFIX]-header-tagline,
.[PREFIX]-hero-body,
.[PREFIX]-ssub,
.[PREFIX]-overview-text p { color: var(--text-secondary) !important; }

.[PREFIX]-btn-primary {
  background: var(--accent-gradient) !important;
  color: #fff !important;
  border: none !important;
}
.[PREFIX]-btn-outline {
  background: var(--glass-bg) !important;
  border-color: var(--border-glow) !important;
  color: var(--accent) !important;
}

/* Strip / pill bars */
.[PREFIX]-focus-strip,
.[PREFIX]-factors-strip,
.[PREFIX]-pillars-strip,
.[PREFIX]-lenses-strip,
.[PREFIX]-objectives-strip,
.[PREFIX]-trust-bar  {
  background: var(--bg-card) !important;
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}

.[PREFIX]-focus-card,
.[PREFIX]-factor-card,
.[PREFIX]-pillar-card,
.[PREFIX]-lens-card,
.[PREFIX]-objective-card,
.[PREFIX]-ti          {
  background: var(--glass-bg)    !important;
  border-color: var(--border-subtle) !important;
  color: var(--text-secondary)   !important;
}

/* Main content sections */
.[PREFIX]-sec,
.[PREFIX]-section,
.[PREFIX]-overview,
.[PREFIX]-core-services,
.[PREFIX]-funding-types { background: var(--bg-deep) !important; }

.[PREFIX]-sec-alt,
.[PREFIX]-process      { background: var(--bg-card) !important; border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); }

/* Cards in grids */
.[PREFIX]-vc,
.[PREFIX]-crit-card,
.[PREFIX]-source-card,
.[PREFIX]-service-card,
.[PREFIX]-funding-card,
.[PREFIX]-stat-card,
.[PREFIX]-bc-stat-card {
  background: var(--bg-card)    !important;
  border: 1px solid var(--border-subtle) !important;
  color: var(--text-secondary)  !important;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease !important;
}

.[PREFIX]-vc:hover,
.[PREFIX]-crit-card:hover,
.[PREFIX]-source-card:hover,
.[PREFIX]-service-card:hover,
.[PREFIX]-funding-card:hover {
  transform: translateY(-4px) !important;
  border-color: var(--accent) !important;
  box-shadow: 0 12px 32px rgba(77,163,255,0.12) !important;
  border-left: 3px solid var(--accent) !important;
}

.[PREFIX]-vc-t,
.[PREFIX]-crit-t,
.[PREFIX]-sc-name,
.[PREFIX]-vc-num { color: var(--accent) !important; }

.[PREFIX]-vc-d,
.[PREFIX]-crit-d,
.[PREFIX]-sc-desc,
.[PREFIX]-sc-type { color: var(--text-secondary) !important; }

/* Process steps */
.[PREFIX]-steps,
.[PREFIX]-step   { color: var(--text-secondary) !important; }
.[PREFIX]-step-circle,
.[PREFIX]-step-number { background: var(--bg-elevated) !important; border-color: var(--border-subtle) !important; color: var(--accent) !important; }
.[PREFIX]-step-circle.active,
.[PREFIX]-step-number.active { background: var(--accent-gradient) !important; color: #fff !important; }
.[PREFIX]-step-t { color: var(--text-primary) !important; }

/* Sector pills */
.[PREFIX]-sector-pill,
.[PREFIX]-sp     {
  background: var(--bg-card) !important;
  border: 1px solid var(--border-subtle) !important;
  color: var(--text-secondary) !important;
}
.[PREFIX]-sp-name { color: var(--text-primary) !important; }
.[PREFIX]-sp-icon { color: var(--accent) !important; }

/* CTA section */
.[PREFIX]-cta    { background: var(--bg-elevated) !important; border-top: 1px solid var(--border-subtle); }
.[PREFIX]-cta h2 { color: var(--text-primary) !important; }
.[PREFIX]-cta p  { color: var(--text-secondary) !important; }
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Services/ProjectFunding/ProjectFunding.css src/pages/Services/InternationalFinancialAdvisor/InternationalFinancialAdvisor.css src/pages/Services/RiskCompliance/RiskCompliance.css src/pages/Services/DocumentAlignment/DocumentAlignment.css src/pages/Services/BusinessFunding/BusinessFunding.css src/pages/Services/BusinessConsultant/BusinessConsultant.css src/pages/Services/GrantsDonations/GrantsDonations.css src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.css
git commit -m "feat: apply dark navy CSS overrides to all 8 service detail pages"
```

---

## Task 15: Animate ProjectFunding Page

**Files:**
- Modify: `src/pages/Services/ProjectFunding/ProjectFunding.jsx`

- [ ] **Step 1: Add imports at the top of ProjectFunding.jsx**

After the existing imports, add:

```jsx
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, slideInLeft } from '../../../utils/motion';
```

- [ ] **Step 2: Wrap hero/header section**

Find the page hero section (the section containing the breadcrumb, h1, and CTAs). Wrap its inner body div:

```jsx
<motion.div
  className="pf-header-body"  // keep existing className
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  <motion.span variants={staggerItem} className="pf-header-label">...</motion.span>
  <motion.h1   variants={staggerItem}>...</motion.h1>
  <motion.p    variants={staggerItem} className="pf-header-tagline">...</motion.p>
  <motion.div  variants={staggerItem} className="pf-header-cta">...</motion.div>
</motion.div>
```

- [ ] **Step 3: Wrap feature strip cards**

Find the strip section (the one with a grid of small icon cards). Wrap the grid:

```jsx
<motion.div
  className="pf-sectors-grid"  // keep existing className
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-60px' }}
>
  {sectors.map((s, i) => (
    <motion.div key={i} className="pf-sector-card" variants={staggerItem}>
      {/* existing content */}
    </motion.div>
  ))}
</motion.div>
```

- [ ] **Step 4: Wrap core services grid**

```jsx
<motion.div
  className="pf-services-grid"  // keep existing className
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-80px' }}
>
  {coreServices.map((svc, i) => (
    <motion.div
      key={i}
      className="pf-service-card"  // keep existing className
      variants={staggerItem}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* existing content */}
    </motion.div>
  ))}
</motion.div>
```

- [ ] **Step 5: Wrap process steps sequentially**

Find the steps section. Wrap each step with increasing delay:

```jsx
{steps.map((step, i) => (
  <motion.div
    key={i}
    className="pf-step"  // keep existing className
    variants={slideInLeft}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ delay: i * 0.12 }}
  >
    {/* existing content */}
  </motion.div>
))}
```

- [ ] **Step 6: Wrap CTA section**

```jsx
<motion.section
  className="pf-cta"  // keep existing className
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-60px' }}
>
```

- [ ] **Step 7: Commit**

```bash
git add src/pages/Services/ProjectFunding/ProjectFunding.jsx
git commit -m "feat: animate ProjectFunding page"
```

---

## Task 16: Animate InternationalFinancialAdvisor Page

**Files:**
- Modify: `src/pages/Services/InternationalFinancialAdvisor/InternationalFinancialAdvisor.jsx`

- [ ] **Step 1: Add imports**

```jsx
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, slideInLeft } from '../../../utils/motion';
```

- [ ] **Step 2: Wrap ifa-header-body with staggerContainer (same pattern as Task 15 Step 2)**

Target class: `ifa-header-body`. Wrap children (`ifa-header-label`, `h1`, `ifa-header-tagline`, `ifa-header-cta`) in `motion.*` with `staggerItem` variant. Parent gets `staggerContainer` + `initial="hidden" animate="visible"`.

- [ ] **Step 3: Wrap ifa-lenses-grid with staggerContainer**

Each `.ifa-lens-card` gets `staggerItem` variant with `whileInView`.

- [ ] **Step 4: Wrap core services section heading with fadeUp, then service cards with staggerContainer**

Each service card gets `staggerItem` + `whileHover={{ y: -4 }}`.

- [ ] **Step 5: Wrap process steps with slideInLeft + sequential delay (same as Task 15 Step 5)**

- [ ] **Step 6: Wrap CTA section with fadeUp**

- [ ] **Step 7: Commit**

```bash
git add src/pages/Services/InternationalFinancialAdvisor/InternationalFinancialAdvisor.jsx
git commit -m "feat: animate InternationalFinancialAdvisor page"
```

---

## Task 17: Animate RiskCompliance Page

**Files:**
- Modify: `src/pages/Services/RiskCompliance/RiskCompliance.jsx`

- [ ] **Step 1: Add imports**

```jsx
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, slideInLeft } from '../../../utils/motion';
```

- [ ] **Step 2: Wrap rc-header-body with staggerContainer + animate**

Target: `rc-header-body` div. Wrap its children (`rc-header-label`, `h1`, `rc-header-tagline`, `rc-header-cta`) in `motion.*` with `staggerItem`.

- [ ] **Step 3: Wrap rc-focus-grid with staggerContainer + whileInView**

Each `.rc-focus-card` gets `staggerItem` + `whileHover={{ y: -4 }}`.

- [ ] **Step 4: Wrap rc-services-grid (both risk and compliance sub-grids)**

Each `.rc-service-card` gets `staggerItem`. Both grids get `staggerContainer` + `whileInView`.

- [ ] **Step 5: Wrap rc-steps with sequential slideInLeft**

```jsx
{steps.map((step, i) => (
  <motion.div key={i} className="rc-step" variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
    {/* existing content */}
  </motion.div>
))}
```

- [ ] **Step 6: Wrap final CTA with fadeUp**

- [ ] **Step 7: Commit**

```bash
git add src/pages/Services/RiskCompliance/RiskCompliance.jsx
git commit -m "feat: animate RiskCompliance page"
```

---

## Task 18: Animate DocumentAlignment Page

**Files:**
- Modify: `src/pages/Services/DocumentAlignment/DocumentAlignment.jsx`

- [ ] **Step 1: Add imports**

```jsx
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, slideInLeft } from '../../../utils/motion';
```

- [ ] **Step 2: Wrap das-header-body with staggerContainer + animate**

Wrap children (`das-header-label`, `h1`, `das-header-tagline`, `das-header-cta`) with `motion.*` + `staggerItem`.

- [ ] **Step 3: Wrap das-objectives-grid with staggerContainer + whileInView**

Each `.das-objective-card` gets `staggerItem` + `whileHover={{ y: -4 }}`.

- [ ] **Step 4: Wrap core services grid with staggerContainer + whileInView**

Each service card gets `staggerItem`.

- [ ] **Step 5: Wrap process steps with slideInLeft + sequential delay**

- [ ] **Step 6: Wrap CTA section with fadeUp**

- [ ] **Step 7: Commit**

```bash
git add src/pages/Services/DocumentAlignment/DocumentAlignment.jsx
git commit -m "feat: animate DocumentAlignment page"
```

---

## Task 19: Animate BusinessFunding Page

**Files:**
- Modify: `src/pages/Services/BusinessFunding/BusinessFunding.jsx`

- [ ] **Step 1: Add imports**

```jsx
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, slideInLeft } from '../../../utils/motion';
```

- [ ] **Step 2: Wrap bf-header-body with staggerContainer + animate**

Wrap `bf-header-label`, `h1`, `bf-header-tagline`, `bf-header-cta` with `motion.*` + `staggerItem`.

- [ ] **Step 3: Wrap bf-factors-grid with staggerContainer + whileInView**

Each `.bf-factor-card` gets `staggerItem`.

- [ ] **Step 4: Wrap bf-funding-grid with staggerContainer + whileInView**

Each `.bf-funding-card` gets `staggerItem` + `whileHover={{ y: -4 }}`.

- [ ] **Step 5: Wrap process steps with slideInLeft + sequential delay**

- [ ] **Step 6: Wrap CTA section with fadeUp**

- [ ] **Step 7: Commit**

```bash
git add src/pages/Services/BusinessFunding/BusinessFunding.jsx
git commit -m "feat: animate BusinessFunding page"
```

---

## Task 20: Animate BusinessConsultant Page

**Files:**
- Modify: `src/pages/Services/BusinessConsultant/BusinessConsultant.jsx`

- [ ] **Step 1: Add imports**

```jsx
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, slideInLeft } from '../../../utils/motion';
```

- [ ] **Step 2: Wrap bc-hero section content with staggerContainer + animate**

Wrap `bc-hero-eyebrow`, `h1`, `bc-hero-subtitle`, `bc-hero-ctas` with `motion.*` + `staggerItem`.

- [ ] **Step 3: Wrap bc-trust-inner with staggerContainer + whileInView**

Each `.bc-trust-item` gets `staggerItem`.

- [ ] **Step 4: Wrap bc-services-grid with staggerContainer + whileInView**

Each service card gets `staggerItem` + `whileHover={{ y: -4 }}`.

- [ ] **Step 5: Wrap bc-overview-stats with staggerContainer + whileInView**

Each `.bc-stat-card` gets `staggerItem`.

- [ ] **Step 6: Wrap process section heading and steps with fadeUp + slideInLeft**

- [ ] **Step 7: Wrap CTA section with fadeUp**

- [ ] **Step 8: Commit**

```bash
git add src/pages/Services/BusinessConsultant/BusinessConsultant.jsx
git commit -m "feat: animate BusinessConsultant page"
```

---

## Task 21: Animate GrantsDonations Page

**Files:**
- Modify: `src/pages/Services/GrantsDonations/GrantsDonations.jsx`

- [ ] **Step 1: Add imports**

```jsx
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, slideInLeft } from '../../../utils/motion';
```

- [ ] **Step 2: Wrap gd-header-body with staggerContainer + animate**

Wrap `gd-header-label`, `h1`, `gd-header-tagline`, `gd-header-cta` with `motion.*` + `staggerItem`.

- [ ] **Step 3: Wrap gd-pillars-grid with staggerContainer + whileInView**

Each `.gd-pillar-card` gets `staggerItem`.

- [ ] **Step 4: Wrap gd-stat-cards with staggerContainer + whileInView**

Each `.gd-stat-card` gets `staggerItem`.

- [ ] **Step 5: Wrap grant types section with staggerContainer + whileInView**

Each grant type card gets `staggerItem` + `whileHover={{ y: -4 }}`.

- [ ] **Step 6: Wrap process steps with slideInLeft + sequential delay**

- [ ] **Step 7: Wrap CTA section with fadeUp**

- [ ] **Step 8: Commit**

```bash
git add src/pages/Services/GrantsDonations/GrantsDonations.jsx
git commit -m "feat: animate GrantsDonations page"
```

---

## Task 22: Animate ProjectFundersInvestors Page

**Files:**
- Modify: `src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.jsx`

- [ ] **Step 1: Add imports**

```jsx
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, slideInLeft } from '../../../utils/motion';
```

- [ ] **Step 2: Wrap pfi-hero left column with staggerContainer + animate**

The hero left column div (which contains breadcrumb, eyebrow, h1, hero-body, quals, stats) should become:

```jsx
<motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  <motion.nav  variants={staggerItem} className="pfi-breadcrumb" ...>...</motion.nav>
  <motion.div  variants={staggerItem} className="pfi-eyebrow">...</motion.div>
  <motion.h1   variants={staggerItem} id="pfi-h1">...</motion.h1>
  <motion.div  variants={staggerItem} className="pfi-hero-rule" />
  <motion.p    variants={staggerItem} className="pfi-hero-body">...</motion.p>
  <motion.div  variants={staggerItem} className="pfi-quals">...</motion.div>
  <motion.div  variants={staggerItem} className="pfi-hero-stats">...</motion.div>
</motion.div>
```

The `<EnquiryPanel />` stays outside the motion wrapper (it's a form, not a reveal target).

- [ ] **Step 3: Wrap pfi-trust-bar inner items**

```jsx
<motion.div
  className="pfi-trust-inner"
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {TRUST.map((t) => (
    <motion.div key={t.n} className="pfi-ti" variants={staggerItem}>
      <div className="pfi-ti-n">{t.n}</div>
      <div className="pfi-ti-l">{t.l}</div>
    </motion.div>
  ))}
</motion.div>
```

- [ ] **Step 4: Wrap pfi-value-grid (advisory advantage cards)**

```jsx
<motion.div
  className="pfi-value-grid"
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-60px' }}
>
  {ADVANTAGE.map((a) => (
    <motion.div
      key={a.num}
      className="pfi-vc"
      variants={staggerItem}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="pfi-vc-num">{a.num}</div>
      <div className="pfi-vc-t">{a.title}</div>
      <div className="pfi-vc-d">{a.desc}</div>
    </motion.div>
  ))}
</motion.div>
```

- [ ] **Step 5: Wrap pfi-criteria-grid**

```jsx
<motion.div
  className="pfi-criteria-grid"
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-60px' }}
>
  {CRITERIA.map((c, i) => (
    <motion.div key={i} className="pfi-crit-card" variants={staggerItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
      <div className="pfi-crit-icon" aria-hidden="true"><i className={c.icon} /></div>
      <div className="pfi-crit-t">{c.title}</div>
      <div className="pfi-crit-d">{c.desc}</div>
    </motion.div>
  ))}
</motion.div>
```

- [ ] **Step 6: Wrap pfi-sectors-grid**

```jsx
<motion.div
  className="pfi-sectors-grid"
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {SECTORS.map((s) => (
    <motion.div key={s.name} className="pfi-sector-pill" variants={staggerItem}>
      <span className="pfi-sp-icon" aria-hidden="true">{s.icon}</span>
      <div className="pfi-sp-name">{s.name}</div>
      <div className="pfi-sp-desc">{s.desc}</div>
    </motion.div>
  ))}
</motion.div>
```

- [ ] **Step 7: Wrap pfi-steps sequentially**

```jsx
{STEPS.map((s, i) => (
  <motion.div
    key={s.n}
    className="pfi-step"
    role="listitem"
    variants={slideInLeft}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ delay: i * 0.12 }}
  >
    <div className={`pfi-step-circle${s.active ? ' active' : ''}`} aria-hidden="true">{s.n}</div>
    <div className="pfi-step-t">{s.title}</div>
    <div className="pfi-step-d">{s.desc}</div>
  </motion.div>
))}
```

- [ ] **Step 8: Wrap pfi-sources-grid**

```jsx
<motion.div
  className="pfi-sources-grid"
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-60px' }}
>
  {SOURCES.map((s) => (
    <motion.div key={s.name} className="pfi-source-card" variants={staggerItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
      <div className="pfi-sc-type">{s.type}</div>
      <div className="pfi-sc-name">{s.name}</div>
      <div className="pfi-sc-desc">{s.desc}</div>
    </motion.div>
  ))}
</motion.div>
```

- [ ] **Step 9: Wrap pfi-cta with fadeUp**

```jsx
<motion.section
  className="pfi-cta"
  aria-labelledby="pfi-cta-heading"
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-60px' }}
>
```

- [ ] **Step 10: Commit**

```bash
git add src/pages/Services/ProjectFundersInvestors/ProjectFundersInvestors.jsx
git commit -m "feat: animate ProjectFundersInvestors page"
```

---

## Task 23: Verify and Final Check

- [ ] **Step 1: Run the dev server**

```bash
npm start
```

Expected: Compiles successfully, no errors in terminal.

- [ ] **Step 2: Check each page in browser**

Open `http://localhost:3000` and verify:
- Home: hero text staggers in on load, stats count up, TiltCard tilts on mouse move, service slider scrolls with autoplay
- About: bio section slides in left/right, philosophy cards stagger in
- `/services`: service blocks alternate slide-in directions, stats count up on scroll
- Each service detail page: hero staggers in, cards cascade in on scroll, process steps slide in sequentially, hover lifts work

- [ ] **Step 3: Check reduced motion**

In Chrome DevTools → Rendering → Emulate CSS media features → `prefers-reduced-motion: reduce`. Reload. All page content should be visible instantly with no movement.

- [ ] **Step 4: Check mobile at 375px width**

Verify Swiper shows 1 slide, navigation arrows appear, dark theme is consistent.

- [ ] **Step 5: Fix any console errors, then commit**

```bash
git add -A
git commit -m "chore: final dark theme and animation polish"
```
