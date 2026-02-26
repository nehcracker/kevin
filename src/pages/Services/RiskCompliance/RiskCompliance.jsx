import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../../components/common/SEO/SEO';
import './RiskCompliance.css';

// ── Data ──────────────────────────────────────────────────────────────────────

const focusPillars = [
  {
    icon: 'fas fa-search',
    title: 'Identify Risk Early',
    desc: 'Operational, financial, and transactional risks are mapped before they escalate into exposure.',
  },
  {
    icon: 'fas fa-lock',
    title: 'Strengthen Internal Controls',
    desc: 'Governance structures and reporting systems are reinforced to reduce fraud and operational failure.',
  },
  {
    icon: 'fas fa-balance-scale',
    title: 'Align with Regulatory Standards',
    desc: 'Operations are structured to meet domestic and international financial regulatory requirements.',
  },
  {
    icon: 'fas fa-handshake',
    title: 'Protect Investor Confidence',
    desc: 'Compliance alignment strengthens your lender profile and maintains access to institutional capital.',
  },
];

const industries = [
  { icon: 'fas fa-hard-hat',   title: 'Project Finance',        desc: '& Infrastructure' },
  { icon: 'fas fa-building',   title: 'Real Estate',            desc: '& Construction' },
  { icon: 'fas fa-ship',       title: 'Trade Finance',          desc: '& Cross Border' },
  { icon: 'fas fa-bolt',       title: 'Energy',                 desc: '& Industrial Operations' },
  { icon: 'fas fa-briefcase',  title: 'Private Investment',     desc: 'Structures' },
];

const riskServices = [
  {
    icon: 'fas fa-chart-pie',
    title: 'Enterprise Risk Assessment',
    description:
      'You receive a structured review of operational, financial, legal, and transactional risks. Gaps are identified before they escalate into material exposure.',
  },
  {
    icon: 'fas fa-coins',
    title: 'Financial Risk Management Advisory',
    description:
      'You address exposure related to debt obligations, liquidity pressure, currency volatility, and counterparty risk across domestic and international operations.',
  },
  {
    icon: 'fas fa-exclamation-circle',
    title: 'Investment Risk Assessment',
    description:
      'You evaluate project risk, sovereign risk, regulatory exposure, and repayment capacity before capital is deployed into a transaction or structure.',
  },
  {
    icon: 'fas fa-lock',
    title: 'Internal Control Systems Review',
    description:
      'You strengthen financial reporting structures and internal governance processes to reduce fraud risk, audit exposure, and operational failure.',
  },
];

const complianceServices = [
  {
    icon: 'fas fa-file-alt',
    title: 'Financial Regulatory Compliance Framework',
    description:
      'You design compliance systems aligned with domestic and international financial regulations. The framework is built to meet lender, investor, and regulatory body expectations.',
  },
  {
    icon: 'fas fa-university',
    title: 'AML & KYC Compliance Advisory',
    description:
      'You implement Anti-Money Laundering and Know Your Customer procedures to meet banking and institutional requirements across all transaction types.',
  },
  {
    icon: 'fas fa-sitemap',
    title: 'Corporate Governance Structuring',
    description:
      'You establish board-level oversight, reporting protocols, and accountability frameworks aligned with institutional investor and regulatory standards.',
  },
  {
    icon: 'fas fa-globe',
    title: 'Cross Border Compliance Coordination',
    description:
      'You align your transaction structure with multi-jurisdiction reporting obligations and regulatory approvals for international operations and funding.',
  },
  {
    icon: 'fas fa-clipboard-check',
    title: 'Compliance Risk Audits',
    description:
      'You receive structured reviews to ensure your operations meet licensing, reporting, and disclosure requirements across all applicable regulatory frameworks.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Risk Identification & Diagnostic Review',
    description: 'Your operational and financial exposure is mapped across all active and planned activities.',
  },
  {
    number: '02',
    title: 'Compliance Gap Analysis',
    description: 'Existing systems are reviewed against applicable regulatory requirements to identify shortfalls.',
  },
  {
    number: '03',
    title: 'Framework Development',
    description: 'Clear policies, reporting systems, and internal control structures are designed and established.',
  },
  {
    number: '04',
    title: 'Implementation Oversight',
    description: 'You receive advisory guidance during system rollout and internal team alignment.',
  },
  {
    number: '05',
    title: 'Ongoing Monitoring Support',
    description: 'Periodic review ensures continued regulatory alignment as operations and regulations evolve.',
  },
];

const risks = [
  'Regulatory penalties and fines',
  'Banking restrictions and account closure',
  'Funding rejection from lenders',
  'Reputational damage with investors',
  'Transaction delays and failed closings',
];

const solutions = [
  'Protected compliance standing',
  'Stronger lender and banking profile',
  'Capital access maintained and expanded',
  'Investor confidence protected',
  'Faster transaction approval and close',
];

// ── Component ─────────────────────────────────────────────────────────────────

const RiskCompliance = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="risk-compliance-page">

      {/* ── PAGE SEO ─────────────────────────────────────────────────── */}
      <SEO
        title="Risk Management & Regulatory Compliance Advisory"
        description="Kevin Graham Karimi provides financial risk management and regulatory compliance advisory for corporations, project sponsors, and investors. Services include enterprise risk assessment, AML and KYC compliance, corporate governance structuring, and cross-border compliance coordination."
        keywords="financial risk management services, regulatory compliance advisory, AML KYC compliance, corporate governance structuring, enterprise risk assessment, compliance risk audit, cross border compliance, investment risk assessment, internal controls review"
        canonical="https://grahamkarimi.com/services/risk-compliance"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Risk Management & Regulatory Compliance Advisory',
          description:
            'Financial risk management and regulatory compliance advisory for corporations, project sponsors, and investors operating locally and internationally.',
          provider: {
            '@type': 'Person',
            name: 'Kevin Graham Karimi',
            url: 'https://grahamkarimi.com',
          },
          serviceType: 'Risk Management & Compliance Advisory',
          areaServed: { '@type': 'Country', name: 'Global' },
          url: 'https://grahamkarimi.com/services/risk-compliance',
        }}
      />
      {/* ─────────────────────────────────────────────────────────────── */}

      <main id="main-content">

        {/* SECTION 1 — HEADER */}
        <section className="rc-header">
          <div className="container">
            <nav className="rc-breadcrumb" aria-label="Breadcrumb">
              <Link to="/"><i className="fas fa-home"></i> Home</Link>
              <span className="separator"><i className="fas fa-chevron-right"></i></span>
              <Link to="/services">Services</Link>
              <span className="separator"><i className="fas fa-chevron-right"></i></span>
              <span className="current">Risk & Compliance</span>
            </nav>

            <div className="rc-header-body">
              <span className="rc-header-label">Financial Advisory Service</span>
              <h1>
                Risk Management &
                <span>Regulatory Compliance Advisory</span>
              </h1>
              <p className="rc-header-tagline">
                You operate in regulated financial environments. One compliance failure exposes your
                capital, reputation, and operations. This service protects your business through
                structured risk management and regulatory compliance advisory.
              </p>
              <div className="rc-header-cta">
                <a href="#contact" className="rc-btn-primary">
                  <i className="fas fa-calendar-check"></i> Schedule Consultation
                </a>
                <a href="#process" className="rc-btn-outline">
                  <i className="fas fa-arrow-down"></i> How It Works
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — FOUR FOCUS STRIP */}
        <section className="rc-focus-strip">
          <div className="container">
            <div className="rc-focus-grid">
              {focusPillars.map((pillar, i) => (
                <div key={i} className="rc-focus-card">
                  <i className={`${pillar.icon} rc-focus-icon`}></i>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 — OVERVIEW */}
        <section className="rc-overview">
          <div className="container">
            <div className="rc-overview-text">
              <p>
                Kevin Graham provides financial risk management services and regulatory compliance
                advisory for corporations, project sponsors, and high net worth investors operating
                locally and internationally.
              </p>
              <p>
                Every engagement is structured to identify exposure early, strengthen governance,
                and align operations with the regulatory standards that lenders, investors, and
                regulators require before approving capital access or transactions.
              </p>
            </div>
            <div className="rc-industry-tags">
              {industries.map((ind, i) => (
                <span key={i} className="rc-industry-tag">
                  <i className={ind.icon}></i>
                  {ind.title} {ind.desc}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 — DUAL SUB-SECTION GRID */}
        <section className="rc-core-services">
          <div className="container">
            <div className="rc-section-header">
              <h2>Core Services</h2>
              <p>
                Two integrated advisory disciplines — risk management and regulatory compliance —
                delivered as a single structured engagement.
              </p>
            </div>

            {/* Risk Management sub-section */}
            <div className="rc-services-group rc-risk">
              <div className="rc-sub-label">
                <span>Risk Management</span>
              </div>
              <div className="rc-services-grid">
                {riskServices.map((svc, i) => (
                  <div key={i} className="rc-service-card">
                    <div className="rc-card-icon">
                      <i className={svc.icon}></i>
                    </div>
                    <h3>{svc.title}</h3>
                    <p>{svc.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Regulatory Compliance sub-section */}
            <div className="rc-services-group rc-compliance">
              <div className="rc-sub-label">
                <span>Regulatory Compliance</span>
              </div>
              <div className="rc-services-grid has-orphan">
                {complianceServices.map((svc, i) => (
                  <div
                    key={i}
                    className={`rc-service-card${i === complianceServices.length - 1 && complianceServices.length % 2 !== 0 ? ' orphan' : ''}`}
                  >
                    <div className="rc-card-icon">
                      <i className={svc.icon}></i>
                    </div>
                    <h3>{svc.title}</h3>
                    <p>{svc.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 — PROCESS */}
        <section id="process" className="rc-process">
          <div className="container">
            <div className="rc-section-header">
              <h2>How the Process Works</h2>
              <p>
                A five-step structured engagement from risk diagnostic through to ongoing
                regulatory monitoring and alignment.
              </p>
            </div>
            <div className="rc-steps">
              {steps.map((step, i) => (
                <div key={i} className="rc-step">
                  <div className="rc-step-number">{step.number}</div>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 — KEY COMPLIANCE RISKS */}
        <section className="rc-risks-section">
          <div className="container">
            <div className="rc-section-header">
              <h2>Key Compliance Risks Addressed</h2>
              <p>
                Without a structured compliance framework, five compounding risks threaten your
                capital access, banking relationships, and transaction outcomes.
              </p>
            </div>
            <div className="rc-risks-grid">
              <div className="rc-risk-panel problem">
                <div className="rc-risk-panel-header">
                  <div className="panel-icon">
                    <i className="fas fa-times-circle"></i>
                  </div>
                  <h3>Without Compliance Framework</h3>
                </div>
                <ul className="rc-risk-list">
                  {risks.map((r, i) => (
                    <li key={i}>
                      <i className="fas fa-times list-icon"></i> {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rc-risk-panel solution">
                <div className="rc-risk-panel-header">
                  <div className="panel-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h3>With Defined Compliance Framework</h3>
                </div>
                <ul className="rc-risk-list">
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

        {/* SECTION 7 — INDUSTRIES SERVED */}
        <section className="rc-industries-section">
          <div className="container">
            <div className="rc-section-header">
              <h2>Industries Served</h2>
              <p>
                Risk management and compliance advisory across five high-regulation sectors
                operating locally and internationally.
              </p>
            </div>
            <div className="rc-industries-grid">
              {industries.map((ind, i) => (
                <div key={i} className="rc-industry-card">
                  <i className={`${ind.icon} rc-industry-icon`}></i>
                  <h4>{ind.title}</h4>
                  <p>{ind.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8 — ENGAGEMENT MODEL */}
        <section className="rc-engagement">
          <div className="container">
            <div className="rc-section-header">
              <h2>Engagement Model</h2>
            </div>
            <div className="rc-engagement-inner">
              <p>
                Each mandate begins with a structured advisory scope focused on risk reduction,
                regulatory alignment, and governance stability.
              </p>
              <p>
                Strong risk management and regulatory compliance position your business for funding
                approval, cross-border expansion, and long-term operational stability.
              </p>
              <div className="rc-quote-block">
                <blockquote>
                  "Strong risk management and regulatory compliance position your business for
                  funding approval, cross border expansion, and long term operational stability."
                </blockquote>
                <cite>— Kevin Graham Karimi, Director of Risk Management & Compliance</cite>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9 — CTA */}
        <section className="rc-cta-section">
          <div className="container">
            <h2>Ready to Strengthen Your Compliance Position?</h2>
            <p>
              One compliance failure can cost your business its access to capital.
              Let's build the framework that prevents it.
            </p>
            <div className="rc-cta-buttons">
              <a href="#contact" className="rc-btn-primary">
                <i className="fas fa-calendar-check"></i> Schedule a Consultation
              </a>
              <a href="mailto:kevin.karimi@inbestconsultant.com" className="rc-btn-outline">
                <i className="fas fa-envelope"></i> Send an Email
              </a>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default RiskCompliance;