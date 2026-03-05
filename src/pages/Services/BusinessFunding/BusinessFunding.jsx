import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../../components/common/SEO/SEO';
import './BusinessFunding.css';

// ── Data ──────────────────────────────────────────────────────────────────────

const alignmentFactors = [
  {
    icon: 'fas fa-chart-line',
    title: 'Revenue Strength',
    desc: 'Income consistency and cash flow capacity reviewed against repayment obligations.',
  },
  {
    icon: 'fas fa-warehouse',
    title: 'Asset Base',
    desc: 'Tangible and financial assets assessed for collateral value and security support.',
  },
  {
    icon: 'fas fa-star',
    title: 'Credit Profile',
    desc: 'Borrowing history, debt ratios, and financial health evaluated by lenders.',
  },
  {
    icon: 'fas fa-industry',
    title: 'Industry Risk',
    desc: 'Sector-specific risk factors and lender appetite assessed before approach.',
  },
  {
    icon: 'fas fa-globe',
    title: 'Jurisdictional Regulations',
    desc: 'Domestic and cross-border regulatory requirements aligned with funding structure.',
  },
];

const securedExamples = [
  'Asset backed loans',
  'Real estate secured loans',
  'Equipment and machinery financing',
  'Inventory backed facilities',
  'Receivables financing',
  'Collateralized term loans',
];

const securedBenefits = [
  'Higher loan amounts',
  'Longer repayment tenors',
  'Lower interest margins',
  'Structured repayment flexibility',
];

const unsecuredExamples = [
  'Corporate term loans',
  'Working capital facilities',
  'Revolving credit lines',
  'Contract based financing',
  'Revenue based lending',
];

const longTermSectors = [
  'Infrastructure development',
  'Industrial expansion',
  'Manufacturing plants',
  'Real estate development',
  'Cross border acquisitions',
];

const approvalFactors = [
  {
    icon: 'fas fa-percentage',
    title: 'Debt Service Coverage Ratio',
    desc: 'Net operating income vs. total debt obligations.',
  },
  {
    icon: 'fas fa-chart-bar',
    title: 'Revenue Consistency',
    desc: 'Stable cash flow history over a defined period.',
  },
  {
    icon: 'fas fa-user-tie',
    title: 'Management Track Record',
    desc: 'Leadership experience and execution history.',
  },
  {
    icon: 'fas fa-university',
    title: 'Collateral Strength',
    desc: 'Asset quality and enforceability for secured loans.',
  },
  {
    icon: 'fas fa-balance-scale',
    title: 'Regulatory Compliance',
    desc: 'Clean legal and regulatory standing across jurisdictions.',
  },
];

const problems = [
  'Rejection due to documentation gaps',
  'Misaligned repayment terms with cash flow',
  'Higher borrowing cost from poor positioning',
  'Delayed approvals extending capital timelines',
];

const solutions = [
  'Documentation aligned before lender approach',
  'Repayment terms matched to cash flow capacity',
  'Improved cost of capital through proper structure',
  'Faster approval pathway with prepared profile',
];

const steps = [
  {
    number: '01',
    title: 'Funding Assessment',
    description: 'Your financials, project scope, and capital requirement are reviewed in full.',
  },
  {
    number: '02',
    title: 'Structuring Strategy',
    description: 'A secured or unsecured structure is designed based on repayment strength and asset support.',
  },
  {
    number: '03',
    title: 'Documentation Alignment',
    description: 'Financial statements, projections, and supporting documents are aligned with lender standards.',
  },
  {
    number: '04',
    title: 'Lender Engagement',
    description: 'Your profile is presented to aligned banks or private financiers within the network.',
  },
  {
    number: '05',
    title: 'Negotiation & Approval',
    description: 'Terms are negotiated and documentation finalized through to disbursement.',
  },
];

const audiences = [
  {
    icon: 'fas fa-building',
    title: 'Established Corporations',
    desc: 'Seeking expansion capital',
  },
  {
    icon: 'fas fa-project-diagram',
    title: 'Project Sponsors',
    desc: 'Requiring long term structured debt',
  },
  {
    icon: 'fas fa-sync-alt',
    title: 'Businesses Refinancing',
    desc: 'Restructuring existing loan obligations',
  },
  {
    icon: 'fas fa-file-contract',
    title: 'Contract Executing Companies',
    desc: 'Funding large contract delivery',
  },
  {
    icon: 'fas fa-globe-africa',
    title: 'Market Entrants',
    desc: 'Enterprises entering new markets',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

const BusinessFunding = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="business-funding-page">

      {/* ── PAGE SEO ─────────────────────────────────────────────────── */}
      <SEO
        title="Business Funding & Long Term Loans – financial Advisor"
        description="business funding and long term loans from banks, private financiers, and institutional partners | secured loans, unsecured business financing."
        keywords="business funding sourcing, long term business loans, secured business loans, unsecured business loans, working capital financing, corporate debt structuring, project sponsor funding, business loan advisory, international business financing"
        canonical="https://grahamkarimi.com/services/business-funding-loans"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Business Funding & Long Term Loans',
          description:
            'Domestic and international business funding sourcing for corporations, project sponsors, and enterprises seeking secured, unsecured, and long term structured debt solutions.',
          provider: {
            '@type': 'Person',
            name: 'Kevin Graham',
            url: 'https://grahamkarimi.com',
            telephone: '+447723339858',
            email: 'kevin.uk@grahamkarimi.com',
          },
          serviceType: 'Business Funding Advisory',
          areaServed: { '@type': 'Country', name: 'Global' },
          url: 'https://grahamkarimi.com/services/business-funding-loans',
        }}
      />
      {/* ─────────────────────────────────────────────────────────────── */}

      <main id="main-content">

        {/* SECTION 1 — HEADER */}
        <section className="bf-header">
          <div className="container">
            <nav className="bf-breadcrumb" aria-label="Breadcrumb">
              <Link to="/"><i className="fas fa-home"></i> Home</Link>
              <span className="separator"><i className="fas fa-chevron-right"></i></span>
              <Link to="/services">Services</Link>
              <span className="separator"><i className="fas fa-chevron-right"></i></span>
              <span className="current">Business Funding & Loans</span>
            </nav>

            <div className="bf-header-body">
              <span className="bf-header-label">Financial Advisory Service</span>
              <h1>
                Business Funding
                <span>& Long Term Loans</span>
              </h1>
              <p className="bf-header-tagline">
                You need capital to expand, acquire assets, execute contracts, or refinance existing
                obligations. Funding must match your cash flow capacity and risk profile. Poor
                structuring increases repayment pressure and approval delays.
              </p>
              <div className="bf-header-cta">
                <a href="#contact" className="bf-btn-primary">
                  <i className="fas fa-comments-dollar"></i> Discuss Your Funding Need
                </a>
                <a href="#process" className="bf-btn-outline">
                  <i className="fas fa-arrow-down"></i> How It Works
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — FIVE ALIGNMENT FACTORS STRIP */}
        <section className="bf-factors-strip">
          <div className="container">
            <div className="bf-factors-grid">
              {alignmentFactors.map((factor, i) => (
                <div key={i} className="bf-factor-card">
                  <i className={`${factor.icon} bf-factor-icon`}></i>
                  <h3>{factor.title}</h3>
                  <p>{factor.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 — OVERVIEW */}
        <section className="bf-overview">
          <div className="container">
            <div className="bf-overview-text">
              <p>
                Kevin Graham sources domestic and international business funding for corporations,
                project sponsors, and established enterprises seeking structured debt solutions.
              </p>
              <p>
                Every funding mandate is aligned across five factors: revenue strength, asset base,
                credit profile, industry risk, and jurisdictional regulations. This alignment
                determines structure before lender engagement begins.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4 — TYPES OF FUNDING */}
        <section className="bf-funding-types">
          <div className="container">
            <div className="bf-section-header">
              <h2>Business Funding & Long Term Loans</h2>
              <p>
                Three structured funding categories — each matched to a specific capital
                requirement, asset position, and repayment profile.
              </p>
            </div>
            <div className="bf-funding-grid">

              {/* Secured */}
              <div className="bf-funding-card secured">
                <div className="bf-funding-badge">
                  <i className="fas fa-lock"></i> Secured
                </div>
                <h3>Secured Business Loans</h3>
                <p>
                  These facilities are backed by tangible or financial assets. Collateral
                  supports higher amounts, longer tenors, and more competitive terms.
                </p>
                <div className="bf-funding-divider">Examples</div>
                <ul className="bf-funding-list">
                  {securedExamples.map((ex, i) => (
                    <li key={i}>
                      <i className="fas fa-circle"></i> {ex}
                    </li>
                  ))}
                </ul>
                <div className="bf-funding-divider">Benefits</div>
                <ul className="bf-benefits-list">
                  {securedBenefits.map((b, i) => (
                    <li key={i}>
                      <i className="fas fa-check"></i> {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Unsecured */}
              <div className="bf-funding-card unsecured">
                <div className="bf-funding-badge">
                  <i className="fas fa-file-invoice"></i> Unsecured
                </div>
                <h3>Unsecured Business Loans</h3>
                <p>
                  These facilities are based on financial strength, revenue history, and
                  creditworthiness without pledged collateral.
                </p>
                <div className="bf-funding-divider">Examples</div>
                <ul className="bf-funding-list">
                  {unsecuredExamples.map((ex, i) => (
                    <li key={i}>
                      <i className="fas fa-circle"></i> {ex}
                    </li>
                  ))}
                </ul>
                <div className="bf-funding-divider">Suitable for</div>
                <ul className="bf-funding-list">
                  <li>
                    <i className="fas fa-circle"></i>
                    Established businesses with strong financial statements and stable cash flow
                  </li>
                </ul>
              </div>

              {/* Long Term */}
              <div className="bf-funding-card longterm">
                <div className="bf-funding-badge">
                  <i className="fas fa-calendar-alt"></i> Long Term
                </div>
                <h3>Long Term Loan Structuring</h3>
                <p>
                  Long term facilities are structured for capital-intensive projects requiring
                  extended repayment periods and institutional funding sources.
                </p>
                <div className="bf-funding-divider">Sectors</div>
                <ul className="bf-funding-list">
                  {longTermSectors.map((s, i) => (
                    <li key={i}>
                      <i className="fas fa-circle"></i> {s}
                    </li>
                  ))}
                </ul>
                <div className="bf-tenor-note">
                  <i className="fas fa-clock"></i>&nbsp;
                  Tenors from <strong>3 to 15 years</strong> — depending on sector,
                  risk level, and lender appetite.
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 5 — KEY APPROVAL FACTORS */}
        <section className="bf-approval-section">
          <div className="container">
            <div className="bf-section-header">
              <h2>Business Loan Approval Factors</h2>
              <p>
                What lenders assess before making a credit decision. Understanding these
                factors shapes how your funding profile is prepared and positioned.
              </p>
            </div>
            <div className="bf-approval-grid">
              {approvalFactors.map((factor, i) => (
                <div key={i} className="bf-approval-card">
                  <i className={`${factor.icon} bf-approval-icon`}></i>
                  <h4>{factor.title}</h4>
                  <p>{factor.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 — WHY PROFESSIONAL SOURCING MATTERS */}
        <section className="bf-why-section">
          <div className="container">
            <div className="bf-section-header">
              <h2>Why Professional Funding Sourcing Matters</h2>
              <p>
                A direct approach to lenders without structure leads to four compounding
                outcomes. A structured sourcing process prevents each one.
              </p>
            </div>
            <div className="bf-why-grid">
              <div className="bf-why-panel problem">
                <div className="bf-why-panel-header">
                  <div className="panel-icon">
                    <i className="fas fa-times-circle"></i>
                  </div>
                  <h3>Direct Approach Without Structure</h3>
                </div>
                <ul className="bf-why-list">
                  {problems.map((p, i) => (
                    <li key={i}>
                      <i className="fas fa-times list-icon"></i> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bf-why-panel solution">
                <div className="bf-why-panel-header">
                  <div className="panel-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h3>Structured Sourcing Process</h3>
                </div>
                <ul className="bf-why-list">
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

        {/* SECTION 7 — PROCESS */}
        <section id="process" className="bf-process">
          <div className="container">
            <div className="bf-section-header">
              <h2>Business Funding Sourcing Process</h2>
              <p>
                A five-step structured engagement from funding assessment through to
                negotiation and approval.
              </p>
            </div>
            <div className="bf-steps">
              {steps.map((step, i) => (
                <div key={i} className="bf-step">
                  <div className="bf-step-number">{step.number}</div>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8 — WHO THIS IS FOR */}
        <section className="bf-who-section">
          <div className="container">
            <div className="bf-section-header">
              <h2>Who This Service Is For</h2>
              <p>
                Designed for established businesses and project sponsors with a defined
                capital requirement and the capacity to service structured debt.
              </p>
            </div>
            <div className="bf-who-grid">
              {audiences.map((a, i) => (
                <div key={i} className="bf-who-card">
                  <i className={`${a.icon} bf-who-icon`}></i>
                  <h4>{a.title}</h4>
                  <p>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9 — CTA */}
        <section className="bf-cta-section">
          <div className="container">
            <h2>Ready to Source Your Business Funding?</h2>
            <p>
              The first step is proper structuring before lender engagement.
              Let's assess your funding requirement.
            </p>
            <div className="bf-quote-block">
              <blockquote>
                "The first step is proper structuring before lender engagement."
              </blockquote>
              <cite>— Kevin Graham, Global Financial Advisor</cite>
            </div>
            <div className="bf-cta-buttons">
              <a href="#contact" className="bf-btn-primary">
                <i className="fas fa-comments-dollar"></i> Discuss Your Funding Need
              </a>
              <a href="mailto:kevin.uk@grahamkarimi.com" className="bf-btn-outline">
                <i className="fas fa-envelope"></i> Send an Email
              </a>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default BusinessFunding;