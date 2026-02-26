import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../../components/common/SEO/SEO';
import './InternationalFinancialAdvisor.css';

// ── Data ──────────────────────────────────────────────────────────────────────

const lenses = [
  {
    icon: 'fas fa-shield-alt',
    title: 'Capital Protection',
    desc: 'Every transaction is reviewed through this lens first. Your capital is protected before deployment.',
  },
  {
    icon: 'fas fa-balance-scale',
    title: 'Regulatory Compliance',
    desc: 'Domestic and international regulatory standards are identified and aligned before execution.',
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Return Optimization',
    desc: 'Structure that serves your long-term return profile and reduces unnecessary cost of compliance.',
  },
];

const audiencePills = [
  'HNW Investors',
  'Corporations',
  'Project Sponsors',
  'Joint Ventures',
];

const coreServices = [
  {
    icon: 'fas fa-random',
    title: 'Cross Border Transaction Structuring',
    description:
      'You receive a structured approach for acquisitions, joint ventures, and international investments. The structure aligns ownership, funding source, and jurisdictional requirements.',
  },
  {
    icon: 'fas fa-umbrella-beach',
    title: 'Offshore Investment Planning',
    description:
      'You structure international holdings with proper legal and financial coordination. The focus is lawful positioning, reporting alignment, and operational clarity.',
  },
  {
    icon: 'fas fa-funnel-dollar',
    title: 'International Capital Raising Strategy',
    description:
      'You prepare your transaction for foreign lenders, private financiers, and institutional investors. Documentation, structure, and risk disclosure align with global standards.',
  },
  {
    icon: 'fas fa-exclamation-triangle',
    title: 'Investment Risk Assessment',
    description:
      'You evaluate currency exposure, sovereign risk, counterparty risk, and regulatory barriers before capital deployment.',
  },
  {
    icon: 'fas fa-search',
    title: 'Due Diligence Coordination',
    description:
      'You receive support coordinating legal, financial, and compliance reviews across multiple jurisdictions to avoid execution gaps.',
  },
  {
    icon: 'fas fa-sitemap',
    title: 'Corporate Structuring for Global Expansion',
    description:
      'You design holding structures, subsidiaries, and special purpose vehicles to support international operations and funding access.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Strategic Assessment',
    description: 'Your investment objective, jurisdiction, and capital source are reviewed.',
  },
  {
    number: '02',
    title: 'Risk & Regulatory Mapping',
    description: 'Applicable laws, reporting obligations, and financial controls are identified.',
  },
  {
    number: '03',
    title: 'Structural Design',
    description: 'An optimal ownership and funding structure is developed.',
  },
  {
    number: '04',
    title: 'Documentation & Compliance Alignment',
    description: 'Agreements and financial documents align with regulatory expectations.',
  },
  {
    number: '05',
    title: 'Execution Support',
    description: 'You receive negotiation and transaction support through closing.',
  },
];

const risks = [
  'Regulatory penalties',
  'Double taxation exposure',
  'Capital repatriation restrictions',
  'Currency volatility losses',
  'Delayed transaction approval',
];

const solutions = [
  'Full regulatory compliance alignment',
  'Tax-efficient ownership structure',
  'Smooth and lawful capital movement',
  'Currency exposure identified and managed',
  'Clear and accelerated execution pathway',
];

const audiences = [
  {
    icon: 'fas fa-user-tie',
    title: 'HNW Individuals',
    desc: 'Investing internationally',
  },
  {
    icon: 'fas fa-building',
    title: 'Expanding Corporations',
    desc: 'Entering new markets',
  },
  {
    icon: 'fas fa-project-diagram',
    title: 'Project Sponsors',
    desc: 'Raising foreign capital',
  },
  {
    icon: 'fas fa-handshake',
    title: 'Joint Venture Investors',
    desc: 'Structuring across borders',
  },
  {
    icon: 'fas fa-globe',
    title: 'Offshore Businesses',
    desc: 'Seeking compliance alignment',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

const InternationalFinancialAdvisor = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="international-financial-advisor-page">

      {/* ── PAGE SEO ─────────────────────────────────────────────────── */}
      <SEO
        title="International Financial Advisor & Cross Border Investment Structuring"
        description="Kevin Graham Karimi is an international financial advisor specializing in cross-border investment structuring, offshore investment planning, international capital raising, and regulatory compliance across multiple jurisdictions."
        keywords="international financial advisor, cross border investment structuring, offshore investment planning, international capital raising, investment risk assessment, due diligence coordination, corporate structuring, global expansion advisory, cross border finance"
        canonical="https://grahamkarimi.com/services/international-financial-advisor"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'International Financial Advisory & Cross Border Investment Structuring',
          description:
            'Cross-border investment structuring, offshore investment planning, international capital raising strategy, and regulatory compliance for HNW individuals and corporations.',
          provider: {
            '@type': 'Person',
            name: 'Kevin Graham Karimi',
            url: 'https://grahamkarimi.com',
          },
          serviceType: 'International Financial Advisory',
          areaServed: { '@type': 'Country', name: 'Global' },
          url: 'https://grahamkarimi.com/services/international-financial-advisor',
        }}
      />
      {/* ─────────────────────────────────────────────────────────────── */}

      <main id="main-content">

        {/* SECTION 1 — HEADER */}
        <section className="ifa-header">
          <div className="container">
            <nav className="ifa-breadcrumb" aria-label="Breadcrumb">
              <Link to="/"><i className="fas fa-home"></i> Home</Link>
              <span className="separator"><i className="fas fa-chevron-right"></i></span>
              <Link to="/services">Services</Link>
              <span className="separator"><i className="fas fa-chevron-right"></i></span>
              <span className="current">International Financial Advisor</span>
            </nav>

            <div className="ifa-header-body">
              <span className="ifa-header-label">Financial Advisory Service</span>
              <h1>
                Cross Border Financial Advisory
                <span>& Investment Structuring</span>
              </h1>
              <p className="ifa-header-tagline">
                You invest across jurisdictions. Poor structuring exposes you to regulatory risk,
                capital loss, and delayed execution. This service focuses on structuring international
                transactions with legal clarity, financial efficiency, and risk control.
              </p>
              <div className="ifa-header-cta">
                <a href="#contact" className="ifa-btn-primary">
                  <i className="fas fa-calendar-check"></i> Schedule Consultation
                </a>
                <a href="#process" className="ifa-btn-outline">
                  <i className="fas fa-arrow-down"></i> How It Works
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — THREE LENSES STRIP */}
        <section className="ifa-lenses-strip">
          <div className="container">
            <div className="ifa-lenses-grid">
              {lenses.map((lens, i) => (
                <div key={i} className="ifa-lens-card">
                  <i className={`${lens.icon} ifa-lens-icon`}></i>
                  <h3>{lens.title}</h3>
                  <p>{lens.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 — OVERVIEW */}
        <section className="ifa-overview">
          <div className="container">
            <div className="ifa-overview-layout">
              <div className="ifa-overview-text">
                <p>
                  Kevin Graham advises high net worth individuals, corporations, and project sponsors
                  on cross border financial strategy. The goal is to protect capital, ensure compliance,
                  and structure transactions that meet both domestic and international regulatory standards.
                </p>
                <p>
                  Every transaction is reviewed through three lenses: capital protection, regulatory
                  compliance, and return optimization. This structured approach prevents execution
                  failures before they occur and ensures your capital moves efficiently across borders.
                </p>
              </div>
              <div className="ifa-overview-visual">
                <div className="ifa-globe-card">
                  <i className="fas fa-globe-americas"></i>
                  <span>Advisory Across Multiple Jurisdictions</span>
                </div>
                <div className="ifa-audience-mini">
                  {audiencePills.map((pill, i) => (
                    <div key={i} className="ifa-audience-pill">{pill}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 — CORE SERVICES */}
        <section className="ifa-core-services">
          <div className="container">
            <div className="ifa-section-header">
              <h2>Core Services</h2>
              <p>Six structured advisory solutions for every stage of international investment and cross-border structuring.</p>
            </div>
            <div className="ifa-services-grid">
              {coreServices.map((svc, i) => (
                <div key={i} className="ifa-service-card">
                  <div className="ifa-card-icon">
                    <i className={svc.icon}></i>
                  </div>
                  <h3>{svc.title}</h3>
                  <p>{svc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 — PROCESS */}
        <section id="process" className="ifa-process">
          <div className="container">
            <div className="ifa-section-header">
              <h2>How the Process Works</h2>
              <p>A five-step structured engagement from strategic assessment through to execution and close.</p>
            </div>
            <div className="ifa-steps">
              {steps.map((step, i) => (
                <div key={i} className="ifa-step">
                  <div className="ifa-step-number">{step.number}</div>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 — KEY RISKS ADDRESSED */}
        <section className="ifa-risks-section">
          <div className="container">
            <div className="ifa-section-header">
              <h2>Key Risks Addressed</h2>
              <p>
                Without proper structuring, cross-border transactions expose capital to five compounding
                risk categories. A structured approach controls each one.
              </p>
            </div>
            <div className="ifa-risks-grid">
              <div className="ifa-risk-panel problem">
                <div className="ifa-risk-panel-header">
                  <div className="panel-icon">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                  <h3>Without Proper Structure</h3>
                </div>
                <ul className="ifa-risk-list">
                  {risks.map((r, i) => (
                    <li key={i}>
                      <i className="fas fa-times list-icon"></i> {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="ifa-risk-panel solution">
                <div className="ifa-risk-panel-header">
                  <div className="panel-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h3>With Structured Approach</h3>
                </div>
                <ul className="ifa-risk-list">
                  {solutions.map((s, i) => (
                    <li key={i}>
                      <i className="fas fa-check list-icon"></i> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7 — WHO THIS IS FOR */}
        <section className="ifa-who-section">
          <div className="container">
            <div className="ifa-section-header">
              <h2>Who This Service Is For</h2>
              <p>Designed for investors, corporations, and project sponsors operating or expanding across borders.</p>
            </div>
            <div className="ifa-who-grid">
              {audiences.map((a, i) => (
                <div key={i} className="ifa-who-card">
                  <i className={`${a.icon} ifa-who-icon`}></i>
                  <h4>{a.title}</h4>
                  <p>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8 — ENGAGEMENT MODEL */}
        <section className="ifa-engagement">
          <div className="container">
            <div className="ifa-section-header">
              <h2>Engagement Model</h2>
            </div>
            <div className="ifa-engagement-inner">
              <p>
                Each engagement begins with a defined advisory mandate. The scope covers structuring
                design, compliance alignment, investor positioning, and transaction execution support.
              </p>
              <p>
                If you plan to move capital across borders, structure first.
              </p>
              <div className="ifa-quote-block">
                <blockquote>
                  "Capital moves efficiently when risk is controlled and compliance is aligned."
                </blockquote>
                <cite>— Kevin Graham Karimi, International Financial Advisor</cite>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9 — CTA */}
        <section className="ifa-cta-section">
          <div className="container">
            <h2>Ready to Protect Your Capital Across Borders?</h2>
            <p>
              If you plan to move capital across borders, structure first. Let's design
              your approach.
            </p>
            <div className="ifa-cta-buttons">
              <a href="#contact" className="ifa-btn-primary">
                <i className="fas fa-calendar-check"></i> Schedule a Consultation
              </a>
              <a href="mailto:kevin.karimi@inbestconsultant.com" className="ifa-btn-outline">
                <i className="fas fa-envelope"></i> Send an Email
              </a>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default InternationalFinancialAdvisor;