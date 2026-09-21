import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SEO from '../../components/common/SEO/SEO';
import './ThankYou.css';

const CONVERSION_TOKEN_KEY = 'gk-conv-token';

// Event snippet for Submit lead form (1) conversion page, fired only from
// this thank-you page — see the token check in the effect below for why.
const fireConversion = () => {
  if (typeof window.gtag === 'function') {
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
      fireConversion();
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
        <section className="ty-hero">
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
      </main>
    </div>
  );
};

export default ThankYou;
