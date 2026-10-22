import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SEO from '../../components/common/SEO/SEO';
import './ThankYou.css';

const CONVERSION_TOKEN_KEY = 'gk-conv-token';

const NEXT_STEPS = [
  {
    icon: 'fa-search',
    title: 'Enquiry review',
    text: 'Kevin reviews your project and responds within 48 hours.',
  },
  {
    icon: 'fa-clipboard-check',
    title: 'Documentation readiness check',
    text: 'We confirm whether your pitch deck, business plan and financial model meet financier standards.',
  },
  {
    icon: 'fa-handshake',
    title: 'Funding lobbying & financier engagement',
    text: 'Once your documentation is financier-ready, we present your project to suitable funders and investors.',
  },
];

const DOCUMENTS = [
  'Pitch deck or investment presentation',
  'Business plan',
  'Financial model and 3–5 year projections',
  'Company registration and ownership documents',
  'Recent financial statements (if trading)',
  'Feasibility study (for project funding)',
];

// Keep in sync with FEE_BANNER in ProjectFundersInvestors.jsx, FEES in
// EquityFinancing.jsx and the funding-track note in DocumentAlignment.jsx.
const FEE_NOTICE = {
  heading: 'Fees and costs',
  body: 'Financiers only engage with complete, investor-ready documentation. Where your pitch deck, business plan, financial model or supporting documents need to be prepared or restructured, this is carried out as a paid documentation alignment engagement before funding is realised. The fee compensates the professional time and commitment involved as we proceed with funding lobbying and financier engagement on your behalf.',
  fee: 'From USD 1,350',
  feeLabel: 'Professional input & documentation alignment',
  successFee: '1%',
  successFeeLabel: 'Success fee on every funded client, paid when funding is delivered',
  points: [
    'Reviewing your enquiry is free of charge.',
    'If your documents are already financier-ready, no alignment fee applies.',
    'If you are required to meet financiers or funders in person, travel costs — tickets, accommodation and logistics — are at your own expense.',
    'Scope, fee and timeline are confirmed in a written engagement letter before any work begins.',
    'The fee covers professional work on your documentation — it is not a guarantee of funding.',
  ],
};

// Event snippet for Submit lead form (1) conversion page, fired only from
// this thank-you page — see the token check in the effect below for why.
// Enhanced Conversions: for visitors who ticked the marketing opt-in, the
// email is attached as user_data — gtag normalises and SHA-256 hashes it in
// the browser, so Google never receives it in plain text.
const fireConversion = ({ email, marketingOptIn } = {}) => {
  if (typeof window.gtag === 'function') {
    if (marketingOptIn === true && email) {
      window.gtag('set', 'user_data', { email });
    }
    window.gtag('event', 'conversion', { send_to: 'AW-18234308546/oy6-CNmgiL8cEMLv5fZD' });
  }
};

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const state = location.state || {};
  const hasRun = useRef(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    // Guard against React.StrictMode's dev-only double-invoke of effects:
    // without this, the second pass would find the token already consumed
    // by the first pass and wrongly treat a genuine success as unverified.
    if (hasRun.current) return;
    hasRun.current = true;

    const storedToken = sessionStorage.getItem(CONVERSION_TOKEN_KEY);
    if (state.token && storedToken && state.token === storedToken) {
      // One-shot token: clear it immediately so a refresh, bookmark, or
      // back/forward navigation back to this page can't re-fire the
      // conversion or re-verify — only the genuine redirect that set it can.
      sessionStorage.removeItem(CONVERSION_TOKEN_KEY);
      fireConversion(state);
      setVerified(true);
    } else {
      // No matching token: this page wasn't reached via a real form
      // submission. Don't track a conversion or show a fake confirmation.
      navigate('/', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!verified) return null;

  return (
    <div className="ty-page">
      <SEO
        title="Enquiry Received"
        description="Your enquiry has been received."
        canonical="https://grahamkarimi.com/thank-you"
        robots="noindex, nofollow"
      />
      <main id="main-content">
        <section className="ty-hero ty-hero--compact">
          <div className="ty-card">
            <div className="ty-icon">
              <i className="fas fa-check" aria-hidden="true" />
            </div>
            <h1>Enquiry received</h1>
            <p>
              {state.email
                ? <>Thank you — your enquiry has been submitted successfully. A confirmation has been sent to <strong>{state.email}</strong>. Kevin will review your project and respond within 48 hours.</>
                : 'Thank you — your enquiry has been submitted successfully. Kevin will review your project and respond within 48 hours.'}
            </p>
            <Link to="/" className="ty-btn">
              <i className="fas fa-home" aria-hidden="true" /> Back to Home
            </Link>
          </div>
        </section>

        <section className="ty-info" aria-labelledby="ty-next-heading">
          <h2 id="ty-next-heading">What happens next</h2>
          <ol className="ty-steps">
            {NEXT_STEPS.map((step) => (
              <li key={step.title} className="ty-step">
                <i className={`fas ${step.icon}`} aria-hidden="true" />
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <h2>Prepare your documents</h2>
          <p className="ty-lead">Having these ready speeds up your review and financier engagement:</p>
          <ul className="ty-docs">
            {DOCUMENTS.map((doc) => (
              <li key={doc}>
                <i className="fas fa-file-alt" aria-hidden="true" /> {doc}
              </li>
            ))}
          </ul>

          <div className="ty-notice" role="note" aria-labelledby="ty-notice-heading">
            <h2 id="ty-notice-heading">
              <i className="fas fa-info-circle" aria-hidden="true" /> {FEE_NOTICE.heading}
            </h2>
            <p>{FEE_NOTICE.body}</p>
            <dl className="ty-fees">
              <div>
                <dt>{FEE_NOTICE.fee}</dt>
                <dd>{FEE_NOTICE.feeLabel}</dd>
              </div>
              <div>
                <dt>{FEE_NOTICE.successFee}</dt>
                <dd>{FEE_NOTICE.successFeeLabel}</dd>
              </div>
            </dl>
            <ul>
              {FEE_NOTICE.points.map((point) => (
                <li key={point}>
                  <i className="fas fa-check" aria-hidden="true" /> {point}
                </li>
              ))}
            </ul>
            <Link to="/services/document-alignment-services" className="ty-notice-link">
              Learn about document alignment services <i className="fas fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ThankYou;
