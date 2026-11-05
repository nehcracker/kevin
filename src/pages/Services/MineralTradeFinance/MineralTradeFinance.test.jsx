import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MineralTradeFinance from './MineralTradeFinance';

// Turnstile is enabled when the build has a site key (.env). Stand in for the
// widget with one that passes immediately, so tests don't load Cloudflare.
jest.mock('../../../components/common/FormGuard/FormGuard', () => {
  const React = require('react');
  const actual = jest.requireActual('../../../components/common/FormGuard/FormGuard');
  return {
    ...actual,
    Turnstile: ({ onToken }) => {
      React.useEffect(() => { onToken('test-turnstile-pass'); }, [onToken]);
      return null;
    },
  };
});

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/services/mineral-trade-finance']}>
      <Routes>
        <Route path="/services/mineral-trade-finance" element={<MineralTradeFinance />} />
        <Route path="/thank-you" element={<div>thank-you-page</div>} />
      </Routes>
    </MemoryRouter>
  );
}

function fillValidForm(container) {
  const fill = (id, value) => fireEvent.change(container.querySelector(`#mtf-${id}`), { target: { value } });
  fill('name', 'Jane Doe');
  fill('company', 'Acme Minerals Ltd');
  fill('email', 'jane@acme.test');
  fill('phone', '+44 7700 900000');
  fill('country', 'Ghana');
  fill('commodity', 'Copper');
  fill('financing', 'Pre-Export Finance');
  fill('amount', '4,000,000');
  fill('offtake', 'Signed offtake / purchase agreement');
  fill('description', 'Licensed exporter shipping 2,000 t of copper cathodes per quarter against a signed offtake.');
  fireEvent.click(screen.getByLabelText(/consent to being contacted/i));
}

beforeEach(() => {
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
  sessionStorage.clear();
});

afterEach(() => {
  delete global.fetch;
});

test('renders exactly one H1 reading Mineral Trade Finance', () => {
  const { container } = renderPage();
  const h1s = container.querySelectorAll('h1');
  expect(h1s).toHaveLength(1);
  expect(h1s[0]).toHaveTextContent(/^Mineral Trade Finance/);
});

test('section landing anchors exist on the page', () => {
  const { container } = renderPage();
  ['top', 'services', 'minerals', 'who-we-work-with', 'how-it-works', 'documents', 'faq', 'enquiry']
    .forEach((id) => {
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    });
});

test('document checklist counts ticked items', () => {
  renderPage();
  fireEvent.click(screen.getByRole('checkbox', { name: 'Company profile and incorporation details' }));
  expect(screen.getByText(/material gaps will be identified/)).toBeInTheDocument();
});

test('rejects an amount that cannot be parsed', () => {
  renderPage();
  fireEvent.change(screen.getByLabelText(/Financing required/i), { target: { value: '0' } });
  expect(screen.getByText(/Please enter a valid amount/)).toBeInTheDocument();
});

test('valid submission posts worker-shaped payload and redirects to thank-you', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  });
  const { container } = renderPage();
  fillValidForm(container);

  fireEvent.click(container.querySelector('.pfi-ep-submit'));

  await waitFor(() => expect(screen.getByText('thank-you-page')).toBeInTheDocument());

  const body = JSON.parse(global.fetch.mock.calls[0][1].body);
  expect(body).toMatchObject({
    name: 'Jane Doe',
    org: 'Acme Minerals Ltd',
    email: 'jane@acme.test',
    country: 'Ghana',
    sector: 'Copper',
    range: '4,000,000',
    marketingOptIn: false,
  });
  // pfi-enquiry/worker.js keys off this prefix to label the enquiry "mineral".
  expect(body.summary).toMatch(/^\[Mineral Trade Finance enquiry — Financing: Pre-Export Finance — Buyer\/offtake: Signed offtake/);
  expect(sessionStorage.getItem('gk-conv-token')).toBeTruthy();
});
