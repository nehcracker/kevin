import React, { useEffect } from 'react';
import SEO from '../../components/common/SEO/SEO';
import profilePhoto from '../../assets/images/Kevin-graham.png';
import Graham from '../../assets/images/Graham.png';
//import Reviews from '../../components/Reviews/Reviews';
import './Home.css';

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="home-page">

      <SEO
        title="Global Financial Advisor & Project Funding Specialist"
        description="Kevin Graham brings over a decade of strategic insight and execution in global finance, with a focus on risk management, compliance, and debt advisory."
        keywords="
        Kevin Graham Karimi,
        International Project Funding & Debt Structuring,
        Kevin Graham financial advisor,
        InBest Consultant Solutions,
        global financial advisor,
        director risk management compliance,
        HNW corporate finance advisor,
        debt structuring expert,
        international finance director UK"
        canonical="https://grahamkarimi.com/"
        ogType="profile"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Kevin Graham',
          url: 'https://grahamkarimi.com/',
          image: 'https://grahamkarimi.com/Kevin-graham.png',
          jobTitle: 'Global Financial Advisor & Director of Risk Management',
          worksFor: {
            '@type': 'Organization',
            name: 'InBest Consultant Solutions',
            url: 'https://inbestconsultant.com',
          },
          telephone: '+447723339858',
          email: 'kevin.uk@grahamkarimi.com',
          sameAs: [
            'https://linkedin.com/in/kevingrahamkarimi',
            'https://www.facebook.com/kevingrahamkarimi',
            'https://t.me/kevingrahamkarimi',
          ],
        }}
      />

      <main id="main-content">

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section id="hero" className="hero-section">
          <div className="floating-particles">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
          <div className="container">
            <div className="hero-content">
              <span className="hero-eyebrow">Trusted by Global Corporations</span>
              <h1>Global Financial Advisor</h1>
              <h2>Project Funding Specialist</h2>
              <span className="hero-credentials">MBA | Director of Risk Management &amp; Compliance</span>
              <p className="hero-tagline">
                Transforming Complex Financial Challenges into Strategic Opportunities
              </p>
              <div className="hero-stats">
                <div className="stat-card">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">$500M+</span>
                  <span className="stat-label">Transactions</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">100+</span>
                  <span className="stat-label">Corporate Clients</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">40+</span>
                  <span className="stat-label">Countries</span>
                </div>
              </div>
              <p>
                Global financial advisor and Risk Management &amp; Compliance Director specializing in
                meeting the domestic and international investing needs of high-net-worth individuals
                and corporations. Expert in debt structuring, cross-border financial solutions,
                Project Funding &amp; regulatory compliance.
              </p>
              <div className="hero-cta">
                <a href="#contact" className="btn btn-primary">
                  <i className="fas fa-calendar-check"></i> Schedule Consultation
                </a>
                <a href="#expertise" className="btn btn-secondary">
                  <i className="fas fa-arrow-down"></i> Explore 6 Expertise Areas
                </a>
              </div>
              <div className="trust-badges">
                <div className="trust-badge">
                  <i className="fas fa-certificate"></i>
                  <span>Certified Financial Advisor</span>
                </div>
                <div className="trust-badge">
                  <i className="fas fa-award"></i>
                  <span>Industry Leader</span>
                </div>
                <div className="trust-badge">
                  <i className="fas fa-shield-alt"></i>
                  <span>Regulatory Expert</span>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-image-wrapper">
                <img src={profilePhoto} alt="Kevin Graham Karimi – Global Financial Strategist" />
                <div className="image-badge">
                  <i className="fas fa-star"></i> Top Rated
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-indicator">
            <i className="fas fa-chevron-down"></i>
            <span>Discover More</span>
          </div>
        </section>

        {/* ── EXPERTISE ─────────────────────────────────────────────── */}
        <section id="expertise" className="expertise-section">
          <div className="container">
            <div className="section-header">
              <h2>Financial Agent</h2>
              <p>
                As a seasoned global financial agent and Director of Risk Management &amp; Compliance at
                InBest Consultant Solutions, Kevin Graham Karimi offers deep, practical expertise across
                core pillars of financial structuring and regulatory advisory.
              </p>
            </div>
            <div className="expertise-grid">
              <div className="expertise-card">
                <div className="expertise-icon"><i className="fas fa-shield-alt"></i></div>
                <h3>Sourcing Loans &amp; Debt Advisory</h3>
                <p>Expert in connecting businesses and projects with credible local and international lenders. Specializes in structuring tailored debt solutions that align with client goals, risk appetite, and regulatory frameworks.</p>
              </div>
              <div className="expertise-card">
                <div className="expertise-icon"><i className="fas fa-balance-scale"></i></div>
                <h3>Credit Proposal Alignment</h3>
                <p>Provides strategic oversight to ensure project documents and business proposals meet investor, lender, and statutory expectations — increasing fundability and reducing bottlenecks.</p>
              </div>
              <div className="expertise-card">
                <div className="expertise-icon"><i className="fas fa-chart-line"></i></div>
                <h3>Debt, Restructuring &amp; Recovery</h3>
                <p>Skilled in high-stakes negotiations with financial institutions and creditors, offering recovery pathways, restructuring plans, and sustainable repayment strategies for distressed assets.</p>
              </div>
              <div className="expertise-card">
                <div className="expertise-icon"><i className="fas fa-balance-scale"></i></div>
                <h3>Due Diligence &amp; Statutory Services</h3>
                <p>Oversees comprehensive due diligence for both investors and investees. Ensures regulatory compliance, risk profiling, and statutory document verification across multiple jurisdictions.</p>
              </div>
              <div className="expertise-card">
                <div className="expertise-icon"><i className="fas fa-chart-line"></i></div>
                <h3>Financial Market Networking</h3>
                <p>Maintains a high-level network across financial institutions, private equity firms, project sponsors, and sovereign investors to unlock cross-border funding and joint venture opportunities.</p>
              </div>
              <div className="expertise-card">
                <div className="expertise-icon"><i className="fas fa-globe"></i></div>
                <h3>Risk &amp; Regulatory Compliance</h3>
                <p>Designs and implements comprehensive risk frameworks for high-value transactions. Ensures full alignment with international regulatory standards, AML policies, and compliance protocols.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ────────────────────────────────────────────── */}
        <section className="react-section">
          <div className="container">
            <div className="section-header">
              <h2>Expertise &amp; Experience</h2>
            </div>
            <div className="react-content">
              <div className="react-info">
                <p>
                  Kevin Graham Karimi brings over a decade of strategic insight and execution in global
                  finance, with a focus on risk management, compliance, and debt advisory. As Director of
                  Risk Management &amp; Compliance at{' '}
                  <a href="https://inbestconsultant.com/" target="_blank" rel="noopener noreferrer">
                    InBest Consultant Solutions
                  </a>
                  , he has led numerous high-value transactions across sectors such as infrastructure,
                  energy, trade finance, and real estate.
                </p>
                <p>
                  His core competencies include sourcing and structuring international loans, aligning
                  complex business proposals with lender expectations, and navigating multi-jurisdictional
                  regulatory landscapes with precision.
                </p>
              </div>
              <div className="react-logo">
                <img src={Graham} alt="Kevin Graham Professional" />
              </div>
            </div>
          </div>
        </section>

        {/* ── REVIEWS ───────────────────────────────────────────────── */}
      
            {/* Reviews section (Trustpilot widget handled inside component) 
            <Reviews />
*/}
       

      </main>
    </div>
  );
};

export default Home;