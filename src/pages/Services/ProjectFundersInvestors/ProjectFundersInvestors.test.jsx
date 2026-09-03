import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProjectFundersInvestors from './ProjectFundersInvestors';
import fs from 'fs';
import path from 'path';

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
  const heroStats = container.querySelector('.pfi-hero-stats');
  const counters = within(heroStats).getAllByTestId('animated-counter');
  expect(counters.map(el => el.textContent)).toEqual(['1M+', '40+', '48hr', '100+']);
  const statNumbers = container.querySelectorAll('.pfi-hs-n');
  const values = Array.from(statNumbers).map(el => el.textContent);
  expect(values).toEqual(['$1M+', '40+', '48hr', '100+']);
});

test('CSS no longer references the old gold/ink token system, Libre Baskerville, or the broken override', () => {
  const css = fs.readFileSync(
    path.join(__dirname, 'ProjectFundersInvestors.css'),
    'utf8'
  );
  expect(css).not.toMatch(/var\(--(gold|ink|white|mid|lt|bds?|ash|fog|navy|blue)[\w-]*\)/);
  expect(css).not.toMatch(/^\s*--(gold|ink|ash|fog|bds?)\b/m);
  expect(css).not.toMatch(/Libre Baskerville/);
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
