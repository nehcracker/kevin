import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO Component
 *
 * Injects all page-level meta tags via react-helmet-async.
 * Each tag uses data-rh="true" so Helmet correctly deduplicates
 * and replaces tags on every route change — titles AND descriptions.
 *
 * Usage:
 *   <SEO
 *     title="Page Title"
 *     description="Unique description for this page."
 *     canonical="https://grahamkarimi.com/page"
 *     keywords="optional, comma, separated"
 *     ogType="website"           // optional, default: website
 *     ogImage="https://..."      // optional, defaults to Kevin-graham.png
 *     schema={{...}}             // optional JSON-LD object
 *   />
 */

const SITE_NAME  = 'Kevin Graham';
const BASE_URL   = 'https://grahamkarimi.com';
const OG_DEFAULT = `${BASE_URL}/Kevin-graham.png`;
const TWITTER_HANDLE = '@kevingrahamkarimi';

const SEO = ({
  title,
  description = '',
  keywords,
  canonical,
  ogType   = 'website',
  ogImage  = OG_DEFAULT,
  schema   = null,
}) => {
  // Full title shown in browser tab and search results
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | Global Financial Advisor`;

  const pageUrl = canonical || BASE_URL;

  // Debug logging
  console.log('SEO Component Rendered:', { title, description, keywords, canonical });

  return (
    <Helmet prioritizeSeoTags>

      {/* ── Primary ─────────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || ''} data-rh="true" />
      <meta name="keywords" content={keywords || ''} data-rh="true" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" data-rh="true" />
      <link rel="canonical" href={pageUrl} data-rh="true" />

      {/* ── Open Graph ──────────────────────────────── */}
      <meta property="og:site_name" content={SITE_NAME} data-rh="true" />
      <meta property="og:type" content={ogType} data-rh="true" />
      <meta property="og:title" content={fullTitle} data-rh="true" />
      <meta property="og:description" content={description || ''} data-rh="true" />
      <meta property="og:url" content={pageUrl} data-rh="true" />
      <meta property="og:image" content={ogImage} data-rh="true" />
      <meta property="og:image:secure_url" content={ogImage} data-rh="true" />
      <meta property="og:image:width" content="1200" data-rh="true" />
      <meta property="og:image:height" content="630" data-rh="true" />
      <meta property="og:image:alt" content={`${SITE_NAME} – Global Financial Advisor`} data-rh="true" />
      <meta property="og:locale" content="en_US" data-rh="true" />

      {/* ── Twitter Card ────────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" data-rh="true" />
      <meta name="twitter:site" content={TWITTER_HANDLE} data-rh="true" />
      <meta name="twitter:creator" content={TWITTER_HANDLE} data-rh="true" />
      <meta name="twitter:title" content={fullTitle} data-rh="true" />
      <meta name="twitter:description" content={description || ''} data-rh="true" />
      <meta name="twitter:image" content={ogImage} data-rh="true" />
      <meta name="twitter:image:alt" content={`${SITE_NAME} – Global Financial Advisor`} data-rh="true" />

      {/* ── JSON-LD Structured Data ─────────────────── */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}

    </Helmet>
  );
};

export default SEO;