import { useEffect } from 'react';
import './Reviews.css';

/* ══════════════════════════════════════════════════════════════════════════
   Reviews.jsx  —  Trustpilot-powered reviews section
   Loads the Trustpilot bootstrap script once and renders the Review
   Collector widget inside a branded section.
══════════════════════════════════════════════════════════════════════════ */

const TRUSTPILOT_SCRIPT = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';

const Reviews = () => {
  /* Inject Trustpilot bootstrap script exactly once */
  useEffect(() => {
    if (document.querySelector(`script[src="${TRUSTPILOT_SCRIPT}"]`)) {
      /* Already injected — just re-load any un-initialised widgets */
      if (window.Trustpilot) window.Trustpilot.loadFromElement(
        document.querySelector('.trustpilot-widget')
      );
      return;
    }

    const script = document.createElement('script');
    script.src   = TRUSTPILOT_SCRIPT;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <section id="reviews" className="reviews-section" aria-labelledby="reviews-heading">

      {/* Decorative blobs */}
      <span className="reviews-blob reviews-blob--tl" aria-hidden="true" />
      <span className="reviews-blob reviews-blob--br" aria-hidden="true" />

      <div className="reviews-inner">

        {/* Header */}
        <div className="reviews-header">
          <span className="reviews-eyebrow">Client Feedback</span>
          <h2 id="reviews-heading">What my Clients Say</h2>
          <p>
            Real results from real clients across&nbsp;
            <strong>40&nbsp;+&nbsp;countries</strong>. Read verified reviews on Trustpilot.
          </p>
        </div>

        {/* Trustpilot widget card */}
        <div className="reviews-widget-card">

          {/* Branding row above widget */}
          <div className="reviews-tp-branding">
            <svg className="reviews-tp-logo" viewBox="0 0 134 34" fill="none" aria-label="Trustpilot">
              {/* Trustpilot star logo mark */}
              <path d="M16.8 0L20.6 11.6H33L22.9 18.8L26.7 30.4L16.8 23.2L6.9 30.4L10.7 18.8L0.6 11.6H13L16.8 0Z" fill="#00B67A"/>
              <path d="M24.1 21.6L22.9 18.8L16.8 23.2L24.1 21.6Z" fill="#005128"/>
              {/* Wordmark */}
              <text x="38" y="24" fontFamily="'Poppins', sans-serif" fontWeight="700" fontSize="18" fill="currentColor">Trustpilot</text>
            </svg>
            <span className="reviews-tp-verified">Verified Reviews</span>
          </div>

          {/* The actual Trustpilot embed */}
          <div
            className="trustpilot-widget"
            data-locale="en-US"
            data-template-id="56278e9abfbbba0bdcd568bc"
            data-businessunit-id="69a9e35e7d86900528f9c558"
            data-style-height="52px"
            data-style-width="100%"
            data-token="e705a480-a3b8-4f65-872e-8e8a5c633f03"
          >
            {/* Fallback link shown before script loads */}
            <a
              href="https://www.trustpilot.com/review/grahamkarimi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="reviews-tp-fallback"
            >
              View my reviews on Trustpilot
            </a>
          </div>
        </div>

        {/* Footer note */}
        <p className="reviews-footer-note">
          Reviews are independently collected and verified by Trustpilot.
          <a
            href="https://www.trustpilot.com/review/grahamkarimi.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Leave a review ↗
          </a>
        </p>

      </div>
    </section>
  );
};

export default Reviews;