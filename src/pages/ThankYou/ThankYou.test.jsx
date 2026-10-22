import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ThankYou from './ThankYou';

function renderPage(state) {
  return render(
    <MemoryRouter initialEntries={[{ pathname: '/thank-you', state }]}>
      <Routes>
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/" element={<div>home-page</div>} />
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  window.scrollTo = jest.fn();
  window.gtag = jest.fn();
  sessionStorage.clear();
});

test('verified visit shows next steps, document checklist and alignment-fee notice', () => {
  sessionStorage.setItem('gk-conv-token', 'tok-1');
  renderPage({ token: 'tok-1', email: 'a@example.com' });

  expect(screen.getByRole('heading', { name: 'Enquiry received' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'What happens next' })).toBeInTheDocument();
  expect(screen.getByText('Pitch deck or investment presentation')).toBeInTheDocument();

  const notice = screen.getByRole('note');
  expect(notice).toHaveTextContent('Fees and costs');
  expect(notice).toHaveTextContent(/1%.*every funded client.*when funding is delivered/);
  expect(notice).toHaveTextContent(/tickets, accommodation and logistics.*at your own expense/);
  expect(notice).toHaveTextContent(/paid documentation alignment engagement before funding is realised/);
  expect(notice).toHaveTextContent('written engagement letter before any work begins');
  expect(notice).toHaveTextContent('USD 1,350');
  expect(screen.getByRole('link', { name: /document alignment services/i }))
    .toHaveAttribute('href', '/services/document-alignment-services');
});

test('unverified visit redirects home without showing the notice', () => {
  renderPage({ token: 'forged' });

  expect(screen.getByText('home-page')).toBeInTheDocument();
  expect(screen.queryByText('Fees and costs')).not.toBeInTheDocument();
  expect(window.gtag).not.toHaveBeenCalled();
});
