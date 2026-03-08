import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../../components/common/SEO/SEO';
import './ProjectFunding.css';

// ── Data ──────────────────────────────────────────────────────────────────────

const sectors = [
  { icon: 'fas fa-road',       label: 'Infrastructure' },
  { icon: 'fas fa-building',   label: 'Real Estate' },
  { icon: 'fas fa-bolt',       label: 'Energy' },
  { icon: 'fas fa-industry',   label: 'Manufacturing' },
  { icon: 'fas fa-ship',       label: 'Large Trade Operations' },
  { icon: 'fas fa-chart-line', label: 'Corporate Expansion' },
];

const coreServices = [
  {
    icon: 'fas fa-landmark',
    title: 'Project Finance Structuring',
    description: 'You receive a funding structure based on projected cash flow, asset value, and repayment capacity. The structure aligns with lender requirements and international banking standards.',
    bullets: null,
  },
  {
    icon: 'fas fa-layer-group',
    title: 'Debt Structuring & Restructuring',
    description: 'You optimize your capital stack through:',
    bullets: [
      'Senior debt structuring',
      'Mezzanine finance coordination',
      'Refinancing of existing facilities',
      'Tenor extension and repayment restructuring',
      'Interest cost optimization',
    ],
  },
  {
    icon: 'fas fa-handshake',
    title: 'Syndicated Loan Arrangement',
    description: 'For large ticket transactions, Kevin coordinates multi-lender participation. You access higher funding capacity while spreading risk across institutions.',
    bullets: null,
  },
  {
    icon: 'fas fa-briefcase',
    title: 'Private Capital Placement',
    description: 'You connect with private financiers, institutional investors, and alternative funding partners for structured debt or hybrid instruments.',
    bullets: null,
  },
  {
    icon: 'fas fa-chart-bar',
    title: 'Acquisition & Expansion Funding',
    description: 'You secure funding for mergers, acquisitions, plant expansion, asset purchase, and geographic expansion.',
    bullets: null,
  },
  {
    icon: 'fas fa-globe',
    title: 'Cross Border Funding Solutions',
    description: 'You structure transactions involving multiple jurisdictions, addressing currency exposure, regulatory compliance, and international banking requirements.',
    bullets: null,
  },
];

const steps = [
  { number: '01', title: 'Project Review & Feasibility Assessment', description: 'Your financial model, revenue projections, and repayment capacity are assessed.' },
  { number: '02', title: 'Funding Structure Design',                description: 'A tailored capital structure is developed based on risk, sector, and jurisdiction.' },
  { number: '03', title: 'Documentation Alignment',                description: 'Your business plan, financial model, and supporting documents are aligned with lender standards.' },
  { number: '04', title: 'Lender & Investor Engagement',           description: 'Funding discussions begin with aligned institutions or private financiers.' },
  { number: '05', title: 'Negotiation & Financial Close',          description: 'Terms are negotiated. Documentation is finalized. Disbursement follows approval.' },
];

const problems  = ['Cash flow strain', 'Delayed approvals', 'Increased cost of capital', 'Regulatory exposure'];
const solutions = ['Protected project cash flow', 'Faster lender approval pathway', 'Optimized cost of capital', 'Full regulatory compliance alignment'];

const audiences = [
  { icon: 'fas fa-hard-hat',  title: 'Project Developers',                  desc: 'Seeking large-scale funding' },
  { icon: 'fas fa-building',  title: 'Expanding Corporations',               desc: 'Moving into new markets' },
  { icon: 'fas fa-bolt',      title: 'Infrastructure & Energy Sponsors',     desc: 'Capital-intensive projects' },
  { icon: 'fas fa-industry',  title: 'Manufacturing & Industrial Operators', desc: 'Plant and asset financing' },
  { icon: 'fas fa-user-tie',  title: 'High Net Worth Investors',             desc: 'Executing structured projects' },
];

// ── Component ─────────────────────────────────────────────────────────────────

const ProjectFunding = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="project-funding-page">

      {/* ── PAGE SEO ─────────────────────────────────────────────────── */}
      <SEO
        title="International Project Funding & Debt Structuring"
        description="project funding & debt structuring for infrastructure, energy, real estate, private capital placement, debt restructuring, & cross border funding solution."
       keywords="project funding services,
       international project finance, 
       debt structuring advisory, 
       syndicated loan arrangement, 
       private capital placement, 
       cross border funding solutions, 
       acquisition funding, project 
       finance structuring, 
       mezzanine finance,
       project funding, 
       funding for african projects, 
       how to find investors, 
       business funding, 
       investors looking for projects to fund, apply for funding, financing for projects, project debt financing, find investors, how to get funding for a project, private lender, funding companies, trade finance, trade credit, venture capital financing, project funders worldwide, private finance, international finance, green financing, real estate financing, agriculture funding, real estate funding, apply for project funding, international investors, how to get funders for my project, private investors in nigeria, investors in nigeria, investors looking for projects to fund in africa, investors looking for projects to fund in ghana, africa investors, funding opportunities 2026, development finance, peer to peer lending sites, agriculture funding opportunities, credit finance, world funding organizations, chinese investors contacts, farm funding, entrepreneurs looking for business partners"canonical="https://grahamkarimi.com/services/project-funding"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'International Project Funding & Debt Structuring',
          description: 'Advisory and structuring solutions for large-scale project funding, debt restructuring, syndicated loans, and cross-border financing.',
          provider: {
            '@type': 'Person',
            name: 'Kevin Graham',
            url: 'https://grahamkarimi.com',
            telephone: '+447723339858',
            email: 'kevin.uk@grahamkarimi.com',
          },
          serviceType: 'Project Finance Advisory',
          areaServed: { '@type': 'Country', name: 'Global' },
          url: 'https://grahamkarimi.com/services/project-funding',
        }}
      />
      {/* ─────────────────────────────────────────────────────────────── */}

      <main id="main-content">

        {/* HEADER */}
        <section className="pf-header">
          <div className="container">
            <nav className="pf-breadcrumb" aria-label="Breadcrumb">
              <Link to="/"><i className="fas fa-home"></i> Home</Link>
              <span className="separator"><i className="fas fa-chevron-right"></i></span>
              <Link to="/services">Services</Link>
              <span className="separator"><i className="fas fa-chevron-right"></i></span>
              <span className="current">Project Funding</span>
            </nav>
            <div className="pf-header-body">
              <span className="pf-header-label">Financial Advisory Service</span>
              <h1>
                International Project Funding
                <span>& Debt Structuring</span>
              </h1>
              <p className="pf-header-tagline">
                You need structured capital to execute large-scale projects. You need the right
                structure to secure approval and protect long-term returns. Funding follows structure.
              </p>
              <div className="pf-header-cta">
                <a href="#contact" className="pf-btn-primary">
                  <i className="fas fa-calendar-check"></i> Schedule Consultation
                </a>
                <a href="#process" className="pf-btn-outline">
                  <i className="fas fa-arrow-down"></i> How It Works
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="pf-overview">
          <div className="container">
            <div className="pf-overview-text">
              <p>Kevin Graham Karimi provides international project funding advisory and debt structuring solutions for corporations, developers, and high net worth investors. The focus is on bankable structures, clear repayment models, and cross-border compliance.</p>
              <p>Whether you are developing infrastructure, real estate, energy, manufacturing, or large trade operations, your funding structure must match your cash flow model and risk profile.</p>
            </div>
            <div className="pf-sector-tags">
              {sectors.map((s, i) => (
                <span key={i} className="pf-sector-tag">
                  <i className={s.icon}></i> {s.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CORE SERVICES */}
        <section className="pf-core-services">
          <div className="container">
            <div className="pf-section-header">
              <h2>Core Services</h2>
              <p>Six structured advisory solutions covering every phase of project funding and debt management.</p>
            </div>
            <div className="pf-services-grid">
              {coreServices.map((svc, i) => (
                <div key={i} className="pf-service-card">
                  <div className="pf-card-icon"><i className={svc.icon}></i></div>
                  <h3>{svc.title}</h3>
                  <p>{svc.description}</p>
                  {svc.bullets && (
                    <ul className="pf-bullet-list">
                      {svc.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="pf-process">
          <div className="container">
            <div className="pf-section-header">
              <h2>How the Process Works</h2>
              <p>A structured five-step engagement from project review to financial close.</p>
            </div>
            <div className="pf-steps">
              {steps.map((step, i) => (
                <div key={i} className="pf-step">
                  <div className="pf-step-number">{step.number}</div>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY STRUCTURED DEBT */}
        <section className="pf-why-section">
          <div className="container">
            <div className="pf-section-header">
              <h2>Why Structured Debt Matters</h2>
              <p>The difference between poorly structured and properly structured debt is the difference between a project that stalls and one that closes.</p>
            </div>
            <div className="pf-why-grid">
              <div className="pf-why-panel problem">
                <div className="pf-why-panel-header">
                  <div className="panel-icon"><i className="fas fa-times-circle"></i></div>
                  <h3>Without Proper Structure</h3>
                </div>
                <ul className="pf-why-list">
                  {problems.map((p, i) => (
                    <li key={i}><i className="fas fa-times list-icon"></i> {p}</li>
                  ))}
                </ul>
              </div>
              <div className="pf-why-panel solution">
                <div className="pf-why-panel-header">
                  <div className="panel-icon"><i className="fas fa-check-circle"></i></div>
                  <h3>With Proper Structure</h3>
                </div>
                <ul className="pf-why-list">
                  {solutions.map((s, i) => (
                    <li key={i}><i className="fas fa-check list-icon"></i> {s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* WHO THIS IS FOR */}
        <section className="pf-who-section">
          <div className="container">
            <div className="pf-section-header">
              <h2>Who This Service Is For</h2>
              <p>Designed for serious capital seekers with fundable projects and the intent to execute.</p>
            </div>
            <div className="pf-who-grid">
              {audiences.map((a, i) => (
                <div key={i} className="pf-who-card">
                  <i className={`${a.icon} who-icon`}></i>
                  <h4>{a.title}</h4>
                  <p>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ENGAGEMENT MODEL */}
        <section className="pf-engagement">
          <div className="container">
            <div className="pf-section-header">
              <h2>Engagement Model</h2>
            </div>
            <div className="pf-engagement-inner">
              <p>Each mandate begins with a structured advisory engagement. The scope covers funding design, lender positioning, negotiation support, and financial close coordination.</p>
              <p>If you are preparing to raise capital for a project, your first priority is structure.</p>
              <div className="pf-quote-block">
                <blockquote>"Funding follows structure."</blockquote>
                <cite>— Kevin Graham Karimi, Director of Risk Management & Compliance</cite>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pf-cta-section">
          <div className="container">
            <h2>Ready to Structure Your Funding?</h2>
            <p>If you are preparing to raise capital for a project, your first priority is structure. Let's build yours.</p>
            <div className="pf-cta-buttons">
              <a href="#contact" className="pf-btn-primary">
                <i className="fas fa-calendar-check"></i> Schedule a Consultation
              </a>
              <a href="mailto:kevin.uk@grahamkarimi.com" className="pf-btn-outline">
                <i className="fas fa-envelope"></i> Send an Email
              </a>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default ProjectFunding;