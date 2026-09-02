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
