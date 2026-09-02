import { render, screen } from '@testing-library/react';
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
  const counters = screen.getAllByTestId('animated-counter');
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
