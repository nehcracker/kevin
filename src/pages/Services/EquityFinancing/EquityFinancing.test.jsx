import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import EquityFinancing from './EquityFinancing';

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
    <MemoryRouter initialEntries={['/services/equity-financing']}>
      <Routes>
        <Route path="/services/equity-financing" element={<EquityFinancing />} />
        <Route path="/thank-you" element={<div>thank-you-page</div>} />
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
  sessionStorage.clear();
});

afterEach(() => {
  delete global.fetch;
});

test('renders exactly one H1', () => {
  const { container } = renderPage();
  expect(container.querySelectorAll('h1')).toHaveLength(1);
});

test('every ad group landing anchor exists on the page', () => {
  const { container } = renderPage();
  [
    'top',
    'equity-investors',
    'types-of-equity-financing',
    'sectors',
    'debt-vs-equity-financing',
    'how-it-works',
    'mezzanine-financing',
  ].forEach((id) => {
    expect(container.querySelector(`#${id}`)).toBeInTheDocument();
  });
});

test('readiness checklist counts ticked statements', () => {
  renderPage();
  const boxes = screen.getAllByRole('checkbox', { name: /^(We have|Our|We know)/ });
  expect(boxes).toHaveLength(5);
  boxes.slice(0, 4).forEach(b => fireEvent.click(b));
  expect(screen.getByText('You are likely ready to start a conversation with equity investors.')).toBeInTheDocument();
});

test('amount below the $500K floor shows an error', () => {
  renderPage();
  fireEvent.change(screen.getByLabelText(/Amount sought/i), { target: { value: '250,000' } });
  expect(screen.getByText('We advise on raises from $500K upward.')).toBeInTheDocument();
});

test('valid submission posts worker-shaped payload and redirects to thank-you', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  });
  const { container } = renderPage();

  const fill = (id, value) => fireEvent.change(container.querySelector(`#ef-${id}`), { target: { value } });
  fill('name', 'Jane Doe');
  fill('company', 'Acme Ltd');
  fill('email', 'jane@acme.test');
  fill('phone', '+44 7700 900000');
  fill('country', 'Kenya');
  fill('sector', 'Healthcare');
  fill('amount', '2,500,000');
  fill('stage', 'Operating');
  fill('description', 'A chain of diagnostic clinics raising growth capital to open six new sites.');
  fireEvent.click(screen.getByLabelText(/consent to being contacted/i));

  fireEvent.click(screen.getByRole('button', { name: /Book a Funding Readiness Review/i }));

  await waitFor(() => expect(screen.getByText('thank-you-page')).toBeInTheDocument());

  const body = JSON.parse(global.fetch.mock.calls[0][1].body);
  expect(body).toMatchObject({
    name: 'Jane Doe',
    org: 'Acme Ltd',
    email: 'jane@acme.test',
    country: 'Kenya',
    sector: 'Healthcare',
    range: '2,500,000',
    marketingOptIn: false,
  });
  expect(body.summary).toMatch(/Stage: Operating/);
  expect(sessionStorage.getItem('gk-conv-token')).toBeTruthy();
});

test('marketing opt-in is optional, unticked by default, and sent when ticked', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  });
  const { container } = renderPage();

  const optIn = screen.getByLabelText(/keep me informed/i);
  expect(optIn).not.toBeChecked();
  expect(optIn).not.toBeRequired();

  const fill = (id, value) => fireEvent.change(container.querySelector(`#ef-${id}`), { target: { value } });
  fill('name', 'Jane Doe');
  fill('company', 'Acme Ltd');
  fill('email', 'jane@acme.test');
  fill('phone', '+44 7700 900000');
  fill('country', 'Kenya');
  fill('sector', 'Healthcare');
  fill('amount', '2,500,000');
  fill('stage', 'Operating');
  fill('description', 'A chain of diagnostic clinics raising growth capital to open six new sites.');
  fireEvent.click(screen.getByLabelText(/consent to being contacted/i));
  fireEvent.click(optIn);
  fireEvent.click(screen.getByRole('button', { name: /Book a Funding Readiness Review/i }));

  await waitFor(() => expect(screen.getByText('thank-you-page')).toBeInTheDocument());
  expect(JSON.parse(global.fetch.mock.calls[0][1].body).marketingOptIn).toBe(true);
});
