// Writes a per-route copy of build/index.html with that route's title,
// description, robots, canonical, Open Graph and Twitter tags baked in.
//
// Why: the site is a client-rendered SPA served by Cloudflare with
// single-page-application fallback, so without this every URL returns the
// homepage <head> (title + canonical "/") until JavaScript runs. Crawlers and
// link-preview bots that read the raw HTML would treat every page as a
// duplicate of the homepage.
//
// Files are written as build/<path>.html (not <path>/index.html) so Cloudflare
// serves them at the extensionless URL without adding a trailing slash.
// Route metadata lives in src/seo/routeMeta.json; routeMeta.test.jsx keeps it
// in sync with each page's <SEO> props.

const fs = require('fs');
const path = require('path');

const BUILD_DIR  = path.join(__dirname, '..', 'build');
const META_PATH  = path.join(__dirname, '..', 'src', 'seo', 'routeMeta.json');
const SITE_NAME  = 'Kevin Graham'; // matches SITE_NAME in SEO.jsx
const DEFAULT_ROBOTS =
  'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

const escapeAttr = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

function replaceOnce(html, pattern, replacement, label, route) {
  const matches = html.match(new RegExp(pattern.source, 'g')) || [];
  if (matches.length !== 1) {
    throw new Error(
      `prerender-meta: expected exactly one ${label} in build/index.html, found ${matches.length} (route ${route})`
    );
  }
  return html.replace(pattern, replacement);
}

function renderHead(template, route, meta) {
  const fullTitle   = `${meta.title} | ${SITE_NAME}`;
  const title       = escapeAttr(fullTitle);
  const description = escapeAttr(meta.description);
  const canonical   = escapeAttr(meta.canonical);
  const robots      = escapeAttr(meta.robots || DEFAULT_ROBOTS);

  const swaps = [
    [/<title>[\s\S]*?<\/title>/,               `<title>${title}</title>`,                                     'title'],
    [/<meta name="description"[^>]*>/,         `<meta name="description" content="${description}"/>`,         'meta description'],
    [/<meta name="robots"[^>]*>/,              `<meta name="robots" content="${robots}"/>`,                   'meta robots'],
    [/<link rel="canonical"[^>]*>/,            `<link rel="canonical" href="${canonical}"/>`,                 'canonical'],
    [/<meta property="og:title"[^>]*>/,        `<meta property="og:title" content="${title}"/>`,              'og:title'],
    [/<meta property="og:description"[^>]*>/,  `<meta property="og:description" content="${description}"/>`,  'og:description'],
    [/<meta property="og:url"[^>]*>/,          `<meta property="og:url" content="${canonical}"/>`,            'og:url'],
    [/<meta name="twitter:title"[^>]*>/,       `<meta name="twitter:title" content="${title}"/>`,             'twitter:title'],
    [/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${description}"/>`, 'twitter:description'],
  ];

  return swaps.reduce(
    (html, [pattern, replacement, label]) => replaceOnce(html, pattern, replacement, label, route),
    template
  );
}

function outputPath(route) {
  if (route === '/') return path.join(BUILD_DIR, 'index.html');
  return path.join(BUILD_DIR, `${route.replace(/^\//, '')}.html`);
}

function main() {
  const template = fs.readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf8');
  const routes   = JSON.parse(fs.readFileSync(META_PATH, 'utf8'));

  for (const [route, meta] of Object.entries(routes)) {
    const out = outputPath(route);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, renderHead(template, route, meta));
  }

  console.log(`prerender-meta: wrote ${Object.keys(routes).length} route HTML files.`);
}

if (require.main === module) main();

module.exports = { renderHead, outputPath };
