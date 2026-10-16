import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO/SEO';
// Shares the centred card layout with the thank-you page.
import '../ThankYou/ThankYou.css';

// Cloudflare's SPA fallback answers every unknown URL with 200, so the only
// way to keep stray URLs out of the index is a rendered noindex.
const NotFound = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="ty-page">
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist."
        canonical="https://grahamkarimi.com/"
        robots="noindex, follow"
      />
      <main id="main-content">
        <section className="ty-hero">
          <div className="ty-card">
            <div className="ty-icon">
              <i className="fas fa-compass" aria-hidden="true" />
            </div>
            <h1>Page not found</h1>
            <p>The page you are looking for has moved or does not exist.</p>
            <Link to="/services" className="ty-btn">
              <i className="fas fa-briefcase" aria-hidden="true" /> View services
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NotFound;
