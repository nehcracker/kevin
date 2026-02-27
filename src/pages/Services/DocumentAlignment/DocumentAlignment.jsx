import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../../components/common/SEO/SEO';
import './DocumentAlignment.css';

// ── Data ──────────────────────────────────────────────────────────────────────

const objectives = [
  {
    icon: 'fas fa-chart-bar',
    title: 'Present Accurate Financial Data',
    desc: 'Every figure is cross-checked for consistency between narrative, model, and proposal.',
  },
  {
    icon: 'fas fa-ruler-combined',
    title: 'Align Projections with Funding Structure',
    desc: 'Revenue forecasts and repayment logic are structured to match lender expectations.',
  },
  {
    icon: 'fas fa-cut',
    title: 'Remove Inconsistencies',
    desc: 'Conflicting data, unsupported assumptions, and misaligned figures are corrected before submission.',
  },
  {
    icon: 'fas fa-handshake',
    title: 'Strengthen Credibility with Lenders',
    desc: 'Documentation that is accurate and well-structured improves your negotiating position.',
  },
];

const docStack = [
  { icon: 'fas fa-file-alt',      label: 'Business Plan' },
  { icon: 'fas fa-chart-line',    label: 'Financial Model' },
  { icon: 'fas fa-file-invoice',  label: 'Investor Proposal' },
  { icon: 'fas fa-folder-open',   label: 'Funding Submission Pack' },
];

const coreServices = [
  {
    icon: 'fas fa-pen-nib',
    title: 'Business Plan Writing & Restructuring',
    description:
      'You receive a professionally structured business plan aligned with project funding requirements. Financial projections are developed for 5 to 10 years with clear assumptions and repayment positioning.',
  },
  {
    icon: 'fas fa-file-invoice-dollar',
    title: 'Investment Proposal Development',
    description:
      'You receive a structured investor proposal tailored for banks and private financiers. Capital structure, return metrics, and risk mitigation are clearly defined.',
  },
  {
    icon: 'fas fa-calculator',
    title: 'Financial Model Review & Alignment',
    description:
      'Revenue projections, operating costs, and cash flow forecasts are reviewed and stress tested. Debt service coverage and repayment structure are aligned with funding terms.',
  },
  {
    icon: 'fas fa-search-dollar',
    title: 'Feasibility Study Review',
    description:
      'Technical and financial studies are reviewed to ensure consistency with projected returns and the expectations of funding institutions.',
  },
  {
    icon: 'fas fa-folder-open',
    title: 'Funding Submission Pack Preparation',
    description:
      'You receive a complete lender-ready submission pack. Documentation is structured to support due diligence and approval processes from first review through to close.',
  },
  {
    icon: 'fas fa-compress-alt',
    title: 'Executive Summary Preparation',
    description:
      'You receive concise summaries designed for decision makers reviewing large funding requests where clarity and precision determine whether a full proposal is requested.',
  },
];

const gaps = [
  'Inconsistent projections across documents',
  'Unsupported revenue assumptions with no basis',
  'Weak repayment models that do not satisfy debt service ratios',
  'Misalignment between the proposal narrative and funding request amount',
  'Poorly structured executive summaries that fail to secure review',
];

const fees = [
  {
    title: 'Express Review & Gap Analysis',
    scope: 'Detailed review with written gap report and corrective recommendations.',
    timeline: '3–5 working days',
    amount: 'USD 1,000 – 2,000',
    featured: false,
  },
  {
    title: 'Financial Model Review & Alignment',
    scope: 'Revenue validation, cost review, stress testing, and debt service analysis.',
    timeline: '5–10 working days',
    amount: 'USD 1,500 – 4,000',
    featured: false,
  },
  {
    title: 'Investment Proposal Development',
    scope: 'Structured proposal with capital summary, return metrics, and repayment outline.',
    timeline: '5–10 working days',
    amount: 'USD 2,000 – 5,000',
    featured: false,
  },
  {
    title: 'Business Plan Writing or Full Restructuring',
    scope: 'Complete business plan with financial projections and full funding alignment.',
    timeline: '7–14 days standard · 14–21 days large scale',
    amount: 'USD 2,500 – 7,500',
    featured: false,
  },
  {
    title: 'Full Funding Submission Pack',
    scope: 'Business plan review, proposal restructuring, financial validation, executive summary, compliance checklist, and final compilation.',
    timeline: '10–21 working days depending on project size',
    amount: 'USD 5,000 – 15,000',
    featured: true,
  },
];

const steps = [
  {
    number: '01',
    title: 'Document Review',
    description: 'Your existing materials are assessed for structure, completeness, and financial accuracy.',
  },
  {
    number: '02',
    title: 'Gap Analysis',
    description: 'Structural and financial weaknesses are identified and documented with corrective direction.',
  },
  {
    number: '03',
    title: 'Alignment & Restructuring',
    description: 'Documents are revised to reflect funding structure, repayment logic, and lender standards.',
  },
  {
    number: '04',
    title: 'Final Quality Control',
    description: 'Financial data and narrative sections are cross-checked for full internal consistency.',
  },
  {
    number: '05',
    title: 'Submission Readiness',
    description: 'Your documentation is structured and ready for lender engagement and due diligence.',
  },
];

const audiences = [
  {
    icon: 'fas fa-hard-hat',
    title: 'Project Developers',
    desc: 'Preparing for debt financing',
  },
  {
    icon: 'fas fa-building',
    title: 'Corporations',
    desc: 'Seeking expansion funding',
  },
  {
    icon: 'fas fa-lightbulb',
    title: 'Entrepreneurs',
    desc: 'Presenting to private investors',
  },
  {
    icon: 'fas fa-sync-alt',
    title: 'Businesses Refinancing',
    desc: 'Restructuring for new facilities',
  },
  {
    icon: 'fas fa-globe',
    title: 'Cross Border Sponsors',
    desc: 'Requiring compliance-aligned docs',
  },
];

const ctaActions = [
  {
    icon: 'fas fa-file-signature',
    title: 'Request a Quotation',
    desc: 'Based on your project size and funding target',
    href: '#contact',
  },
  {
    icon: 'fas fa-paper-plane',
    title: 'Submit Your Executive Summary',
    desc: 'Receive a structured review and gap report',
    href: '#contact',
  },
  {
    icon: 'fas fa-calendar-check',
    title: 'Schedule a Consultation',
    desc: 'Discuss your documentation needs directly',
    href: '#contact',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

const DocumentAlignment = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="document-alignment-page">

      {/* ── PAGE SEO ─────────────────────────────────────────────────── */}
      <SEO
        title="Document Alignment Services DAS – Business Plan & Funding Document Preparation"
        description="Kevin Graham Karimi provides Document Alignment Services (DAS) for corporations and project sponsors seeking funding. Services include business plan writing, financial model review, investment proposal development, feasibility study review, and full funding submission pack preparation."
        keywords="document alignment services, business plan writing, investment proposal development, financial model review, funding submission pack, feasibility study review, executive summary preparation, lender ready documents, DAS financial advisory"
        canonical="https://grahamkarimi.com/services/document-alignment-services"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Document Alignment Services (DAS)',
          description:
            'Structured document preparation and alignment for corporations, project sponsors, and investment promoters seeking debt, private capital, or institutional financing.',
          provider: {
            '@type': 'Person',
            name: 'Kevin Graham Karimi',
            url: 'https://grahamkarimi.com',
          },
          serviceType: 'Financial Document Advisory',
          areaServed: { '@type': 'Country', name: 'Global' },
          url: 'https://grahamkarimi.com/services/document-alignment-services',
        }}
      />
      {/* ─────────────────────────────────────────────────────────────── */}

      <main id="main-content">

        {/* SECTION 1 — HEADER */}
        <section className="das-header">
          <div className="container">
            <nav className="das-breadcrumb" aria-label="Breadcrumb">
              <Link to="/"><i className="fas fa-home"></i> Home</Link>
              <span className="separator"><i className="fas fa-chevron-right"></i></span>
              <Link to="/services">Services</Link>
              <span className="separator"><i className="fas fa-chevron-right"></i></span>
              <span className="current">Document Alignment Services</span>
            </nav>

            <div className="das-header-body">
              <span className="das-header-label">Financial Advisory Service</span>
              <h1>
                Document Alignment Services
                <span>DAS</span>
              </h1>
              <p className="das-header-tagline">
                Lenders review structure before approving capital. Investors assess risk before
                committing funds. Weak documentation delays approval and weakens your negotiating
                position. DAS prepares, reviews, and aligns your documents to meet lender, investor,
                and regulatory standards.
              </p>
              <div className="das-header-cta">
                <a href="#contact" className="das-btn-primary">
                  <i className="fas fa-file-signature"></i> Request a Quote
                </a>
                <a href="#process" className="das-btn-outline">
                  <i className="fas fa-arrow-down"></i> How It Works
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — FOUR OBJECTIVES STRIP */}
        <section className="das-objectives-strip">
          <div className="container">
            <div className="das-objectives-grid">
              {objectives.map((obj, i) => (
                <div key={i} className="das-objective-card">
                  <i className={`${obj.icon} das-objective-icon`}></i>
                  <h3>{obj.title}</h3>
                  <p>{obj.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 — OVERVIEW */}
        <section className="das-overview">
          <div className="container">
            <div className="das-overview-layout">
              <div className="das-overview-text">
                <p>
                  Kevin Graham provides structured document preparation and alignment for corporations,
                  project sponsors, and investment promoters seeking debt, private capital, or
                  institutional financing.
                </p>
                <p>
                  For funding requests above USD 10 million, Document Alignment Services is positioned
                  as a pre-funding alignment phase before lender engagement begins. Your documentation
                  must present a credible, structured case before any institution commits to review.
                </p>
                <p>
                  If you are preparing to raise capital, start with document alignment.
                </p>
              </div>
              <div className="das-overview-visual">
                <div className="das-doc-stack">
                  {docStack.map((doc, i) => (
                    <div key={i} className="das-doc-item">
                      <i className={doc.icon}></i>
                      <span>{doc.label}</span>
                    </div>
                  ))}
                </div>
                <div className="das-doc-tagline">
                  "Lender-ready from day one."
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 — CORE SERVICES */}
        <section className="das-core-services">
          <div className="container">
            <div className="das-section-header">
              <h2>Core Services</h2>
              <p>
                Six structured document advisory services — from gap analysis through to
                full submission pack preparation.
              </p>
            </div>
            <div className="das-services-grid">
              {coreServices.map((svc, i) => (
                <div key={i} className="das-service-card">
                  <div className="das-card-icon">
                    <i className={svc.icon}></i>
                  </div>
                  <h3>{svc.title}</h3>
                  <p>{svc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 — DOCUMENTATION GAPS */}
        <section className="das-gaps-section">
          <div className="container">
            <div className="das-gaps-layout">
              <div className="das-gaps-intro">
                <h2>Common Documentation Gaps That Delay Approval</h2>
                <p>
                  Most funding rejections are not caused by poor projects. They are caused by
                  documentation that fails to present the project accurately or structurally.
                  Lenders need to see consistency, supported assumptions, and a clear repayment model.
                </p>
                <div className="das-resolution-note">
                  <i className="fas fa-check-circle"></i>
                  DAS resolves each of these before lender review.
                </div>
              </div>
              <div className="das-gaps-list-wrap">
                <h4>Gaps That Cause Rejection</h4>
                <ul className="das-gaps-list">
                  {gaps.map((gap, i) => (
                    <li key={i}>
                      <i className="fas fa-times gap-icon"></i>
                      {gap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6 — PROFESSIONAL FEES & TIMELINES */}
        <section className="das-fees-section">
          <div className="container">
            <div className="das-section-header">
              <h2>Professional Fees & Timelines</h2>
            </div>
            <p className="das-fees-note">
              Fees depend on funding size, complexity, industry risk, and the quality of existing documents.
            </p>

            {/* Row 1 — three standard cards */}
            <div className="das-fees-grid">
              {fees.slice(0, 3).map((fee, i) => (
                <div key={i} className="das-fee-card">
                  <h3>{fee.title}</h3>
                  <p className="das-fee-scope">{fee.scope}</p>
                  <div className="das-fee-meta">
                    <div className="das-fee-timeline">
                      <i className="fas fa-clock"></i>
                      {fee.timeline}
                    </div>
                    <div className="das-fee-amount">{fee.amount}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2 — business plan + featured full pack */}
            <div className="das-fees-row-2">
              {fees.slice(3).map((fee, i) => (
                <div key={i} className={`das-fee-card${fee.featured ? ' featured' : ''}`}>
                  {fee.featured && <div className="das-fee-badge">Most Comprehensive</div>}
                  <h3>{fee.title}</h3>
                  <p className="das-fee-scope">{fee.scope}</p>
                  <div className="das-fee-meta">
                    <div className="das-fee-timeline">
                      <i className="fas fa-clock"></i>
                      {fee.timeline}
                    </div>
                    <div className="das-fee-amount">{fee.amount}</div>
                  </div>
                </div>
              ))}
            </div>

            <p className="das-fees-mandate-note">
              <i className="fas fa-info-circle"></i>
              Projects above USD 50 million are quoted under a structured advisory mandate.
            </p>
          </div>
        </section>

        {/* SECTION 7 — PROCESS */}
        <section id="process" className="das-process">
          <div className="container">
            <div className="das-section-header">
              <h2>How the Process Works</h2>
              <p>
                A five-step structured engagement from document review through to
                lender-ready submission.
              </p>
            </div>
            <div className="das-steps">
              {steps.map((step, i) => (
                <div key={i} className="das-step">
                  <div className="das-step-number">{step.number}</div>
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
        <section className="das-who-section">
          <div className="container">
            <div className="das-section-header">
              <h2>Who This Service Is For</h2>
              <p>
                Designed for any business or promoter preparing documentation for a formal
                funding request or investor presentation.
              </p>
            </div>
            <div className="das-who-grid">
              {audiences.map((a, i) => (
                <div key={i} className="das-who-card">
                  <i className={`${a.icon} das-who-icon`}></i>
                  <h4>{a.title}</h4>
                  <p>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9 — THREE-ACTION CTA */}
        <section className="das-cta-section">
          <div className="container">
            <h2>Ready to Prepare Your Documentation?</h2>
            <p>
              If you are preparing to raise capital, start with document alignment.
              Choose how you want to begin.
            </p>
            <div className="das-cta-cards">
              {ctaActions.map((action, i) => (
                <a key={i} href={action.href} className="das-cta-card">
                  <div className="das-cta-card-icon">
                    <i className={action.icon}></i>
                  </div>
                  <h3>{action.title}</h3>
                  <p>{action.desc}</p>
                  <span className="das-cta-card-arrow">
                    Get started <i className="fas fa-arrow-right"></i>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default DocumentAlignment;