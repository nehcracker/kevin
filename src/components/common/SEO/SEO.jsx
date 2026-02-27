import { useEffect } from 'react';

/**
 * SEO Component — Direct DOM Meta Tag Manager
 *
 * Replaces react-helmet-async with direct DOM manipulation via useEffect.
 * This is 100% reliable page-to-page in CRA because it directly sets
 * document.title and meta tags on every render — no library ownership
 * confusion, no data-rh issues, no deduplication bugs.
 *
 * Usage:
 *   <SEO
 *     title="Page Title"
 *     description="Unique description for this page."
 *     keywords="keyword1, keyword2"
 *     canonical="https://grahamkarimi.com/page"
 *     ogType="website"
 *     ogImage="https://grahamkarimi.com/Kevin-graham.png"
 *     schema={{ '@context': 'https://schema.org', ... }}
 *   />
 */

const SITE_NAME      = 'Kevin Graham';
const BASE_URL       = 'https://grahamkarimi.com';
const OG_DEFAULT     = `${BASE_URL}/Kevin-graham.png`;
const TWITTER_HANDLE = '@kevingrahamkarimi';

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Find tag by selector, or create + append it if it doesn't exist */
function getOrCreate(selector, tagName, initAttrs = {}) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement(tagName);
    Object.entries(initAttrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  return el;
}

function setMeta(name, content) {
  getOrCreate(`meta[name="${name}"]`, 'meta', { name })
    .setAttribute('content', content);
}

function setProperty(property, content) {
  getOrCreate(`meta[property="${property}"]`, 'meta', { property })
    .setAttribute('content', content);
}

function setCanonical(href) {
  getOrCreate('link[rel="canonical"]', 'link', { rel: 'canonical' })
    .setAttribute('href', href);
}

function setJsonLd(schema) {
  // Remove previous JSON-LD injected by this component
  document.querySelectorAll('script[data-seo-jsonld]')
    .forEach(el => el.remove());

  if (!schema) return;

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-seo-jsonld', 'true');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

// ── Component ─────────────────────────────────────────────────────────────────

const SEO = ({
  title,
  description = '',
  keywords    = '',
  canonical,
  ogType      = 'website',
  ogImage     = OG_DEFAULT,
  schema      = null,
}) => {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | Global Financial Advisor`;

  const pageUrl = canonical || BASE_URL;

  useEffect(() => {

    // ── Title ─────────────────────────────────────────────────────────────────
    document.title = fullTitle;

    // ── Primary meta ──────────────────────────────────────────────────────────
    setMeta('description', description);
    setMeta('keywords',    keywords);
    setMeta('robots',      'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // ── Canonical ─────────────────────────────────────────────────────────────
    setCanonical(pageUrl);

    // ── Open Graph ────────────────────────────────────────────────────────────
    setProperty('og:site_name',        SITE_NAME);
    setProperty('og:type',             ogType);
    setProperty('og:title',            fullTitle);
    setProperty('og:description',      description);
    setProperty('og:url',              pageUrl);
    setProperty('og:image',            ogImage);
    setProperty('og:image:secure_url', ogImage);
    setProperty('og:image:width',      '1200');
    setProperty('og:image:height',     '630');
    setProperty('og:image:alt',        `${SITE_NAME} – Global Financial Advisor`);
    setProperty('og:locale',           'en_US');

    // ── Twitter Card ──────────────────────────────────────────────────────────
    setMeta('twitter:card',        'summary_large_image');
    setMeta('twitter:site',        TWITTER_HANDLE);
    setMeta('twitter:creator',     TWITTER_HANDLE);
    setMeta('twitter:title',       fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image',       ogImage);
    setMeta('twitter:image:alt',   `${SITE_NAME} – Global Financial Advisor`);

    // ── JSON-LD ───────────────────────────────────────────────────────────────
    setJsonLd(schema);

  // Re-run every time any SEO value changes (i.e. on every page navigation)
  }, [fullTitle, description, keywords, pageUrl, ogType, ogImage, schema]);

  // Renders nothing to the DOM — all work happens in useEffect
  return null;
};

export default SEO;