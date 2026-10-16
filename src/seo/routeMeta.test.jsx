import { render, cleanup, waitFor } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import App from '../App';
import routeMeta from './routeMeta.json';
import { renderHead, outputPath } from '../../scripts/prerender-meta';

// CRA's Jest can't resolve swiper's package exports; the slider is irrelevant
// to head tags, so stub it out.
jest.mock('../components/common/ServiceSlider/ServiceSlider', () => () => null);

// The post-build prerender bakes routeMeta.json into static HTML, while each
// page sets the same tags at runtime through <SEO>. These tests fail if the
// two drift apart, or if an indexable page is missing from the sitemap.

const head = (selector, attr) => document.head.querySelector(selector)?.getAttribute(attr);

// /thank-you redirects home without a real submission token, so its runtime
// tags can't be rendered here; its noindex is asserted separately below.
const RENDERABLE = Object.entries(routeMeta).filter(([route]) => route !== '/thank-you');

beforeEach(() => {
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
});

afterEach(cleanup);

test.each(RENDERABLE)('runtime <SEO> tags for %s match routeMeta.json', async (route, meta) => {
  window.history.pushState({}, '', route);
  render(<App />);

  await waitFor(() => expect(document.title).toBe(`${meta.title} | Kevin Graham`));
  expect(head('meta[name="description"]', 'content')).toBe(meta.description);
  expect(head('link[rel="canonical"]', 'href')).toBe(meta.canonical);
  expect(head('meta[name="robots"]', 'content')).toMatch(meta.robots || /^index, follow/);
});

test('thank-you page is noindex in the prerendered HTML', () => {
  expect(routeMeta['/thank-you'].robots).toMatch(/noindex/);
});

test('every indexable canonical URL is listed in the sitemap', () => {
  const sitemap = fs.readFileSync(path.join(__dirname, '..', '..', 'public', 'sitemap.xml'), 'utf8');
  const indexable = new Set(
    Object.values(routeMeta).filter(m => !m.robots).map(m => m.canonical)
  );
  indexable.forEach((url) => {
    expect(sitemap).toContain(`<loc>${url}</loc>`);
  });
});

test('robots.txt does not block the JS/CSS bundles Google needs to render pages', () => {
  const robots = fs.readFileSync(path.join(__dirname, '..', '..', 'public', 'robots.txt'), 'utf8');
  expect(robots).not.toMatch(/^Disallow:\s*\/static\//m);
});

describe('prerender-meta', () => {
  const template = [
    '<head><title>Home | Kevin Graham</title>',
    '<meta name="description" content="home"/>',
    '<meta name="robots" content="index, follow"/>',
    '<link rel="canonical" href="https://grahamkarimi.com/"/>',
    '<meta property="og:title" content="home"/>',
    '<meta property="og:description" content="home"/>',
    '<meta property="og:url" content="https://grahamkarimi.com/"/>',
    '<meta name="twitter:title" content="home"/>',
    '<meta name="twitter:description" content="home"/></head>',
  ].join('');

  test('swaps every route-specific tag and escapes attribute values', () => {
    const html = renderHead(template, '/x', {
      title: 'A & "B"',
      description: 'Desc <here>',
      canonical: 'https://grahamkarimi.com/x',
      robots: 'noindex, nofollow',
    });
    expect(html).toContain('<title>A &amp; &quot;B&quot; | Kevin Graham</title>');
    expect(html).toContain('<meta name="description" content="Desc &lt;here&gt;"/>');
    expect(html).toContain('<meta name="robots" content="noindex, nofollow"/>');
    expect(html).toContain('<link rel="canonical" href="https://grahamkarimi.com/x"/>');
    expect(html).toContain('<meta property="og:url" content="https://grahamkarimi.com/x"/>');
    expect(html).not.toContain('content="home"');
  });

  test('fails loudly when a tag is missing from the template', () => {
    expect(() =>
      renderHead('<title>x</title>', '/x', { title: 't', description: 'd', canonical: 'c' })
    ).toThrow(/meta description/);
  });

  test('writes extensionless-friendly <path>.html files, root to index.html', () => {
    expect(outputPath('/')).toMatch(/build[\\/]index\.html$/);
    expect(outputPath('/services/equity-financing')).toMatch(/build[\\/]services[\\/]equity-financing\.html$/);
  });
});
