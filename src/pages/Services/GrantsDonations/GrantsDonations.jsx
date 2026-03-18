import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../../components/common/SEO/SEO';
import './GrantsDonations.css';

// ── Data ──────────────────────────────────────────────────────────────────────

const pillars = [
  {
    icon: 'fas fa-search-dollar',
    title: 'Grant Research & Sourcing',
    desc: 'Identifying live grant opportunities aligned with your sector, region, and project objectives.',
  },
  {
    icon: 'fas fa-file-alt',
    title: 'Application Preparation',
    desc: 'Structuring compelling applications that meet funder criteria and maximise approval probability.',
  },
  {
    icon: 'fas fa-globe',
    title: 'Global Funding Networks',
    desc: 'Access to international foundations, government programmes, and corporate giving channels.',
  },
  {
    icon: 'fas fa-handshake',
    title: 'Donor Relationship Advisory',
    desc: 'Guidance on building credible donor relationships and positioning your cause effectively.',
  },
];

const grantTypes = [
  {
    icon: 'fas fa-landmark',
    title: 'Government & Public Grants',
    desc: 'National and local government programmes targeting infrastructure development, public services, community projects, and economic empowerment initiatives.',
    examples: ['Local Authority Grants', 'National Development Funds', 'Public Infrastructure Grants', 'Social Enterprise Funds'],
  },
  {
    icon: 'fas fa-heart',
    title: 'Charitable Foundation Grants',
    desc: 'Private foundations and charitable trusts that fund NGOs, non-profits, and community-led development projects across multiple sectors.',
    examples: ['Foundation Endowments', 'Community Trust Grants', 'Humanitarian Aid Funds', 'Education & Health Grants'],
  },
  {
    icon: 'fas fa-building',
    title: 'Corporate Donations & CSR Funding',
    desc: 'Multinational and regional corporations allocating CSR budgets to impactful community projects, environmental programmes, and social development.',
    examples: ['Corporate Social Responsibility', 'Community Investment Funds', 'Environmental Grants', 'Skills & Capacity Building'],
  },
];

const grantTypesRow2 = [
  {
    icon: 'fas fa-globe-americas',
    title: 'International Aid & Development Grants',
    desc: 'Multilateral development banks, UN agencies, and international aid organisations funding cross-border development and infrastructure projects.',
    examples: ['World Bank Grants', 'UN Development Funds', 'EU Funding Programmes', 'Bilateral Aid Grants'],
  },
  {
    icon: 'fas fa-seedling',
    title: 'Impact & ESG Funds',
    desc: 'Impact investors and ESG-aligned funds seeking measurable social, environmental, or governance outcomes alongside financial sustainability.',
    examples: ['Green Climate Fund', 'Social Impact Bonds', 'ESG-Aligned Donations', 'Sustainable Development Grants'],
  },
];

const steps = [
  {
    number: '01',
    title: 'Eligibility & Needs Assessment',
    description: 'Your organisation, project, and funding requirement are reviewed to determine eligible grant categories and donor alignment.',
  },
  {
    number: '02',
    title: 'Grant Research & Identification',
    description: 'Live and forthcoming grant opportunities are sourced from government, foundation, corporate, and international networks.',
  },
  {
    number: '03',
    title: 'Application Preparation',
    description: 'A compelling, criteria-aligned application is prepared — covering project narrative, budget, impact evidence, and supporting documentation.',
  },
  {
    number: '04',
    title: 'Submission & Follow-Up',
    description: 'Applications are submitted to identified funders. Progress is tracked and follow-up communication is managed on your behalf.',
  },
  {
    number: '05',
    title: 'Award & Reporting Guidance',
    description: 'Upon award, guidance is provided on fund acceptance, reporting obligations, and positioning for future grant cycles.',
  },
];

const audiences = [
  {
    icon: 'fas fa-hands-helping',
    title: 'NGOs & Non-Profit Organisations',
    desc: 'Registered charities, social enterprises, and non-governmental organisations seeking sustainable funding for programmes, operations, and community impact initiatives.',
  },
  {
    icon: 'fas fa-hard-hat',
    title: 'Infrastructure & Project Developers',
    desc: 'Developers and project sponsors working on social infrastructure, green energy, rural development, or public-benefit projects eligible for grant co-financing.',
  },
  {
    icon: 'fas fa-users',
    title: 'Individuals & Community Groups',
    desc: 'Community leaders, grassroots organisations, and individuals seeking funding for education, healthcare, housing, skills development, or local economic projects.',
  },
];

const feePoints = [
  'Grant research across global funding networks',
  'Application writing and document preparation',
  'Sourcing and funder outreach coordination',
  'Advisory time and professional expertise',
  'Submission management and follow-up',
  'Ongoing progress reporting to the client',
];

// ── Component ─────────────────────────────────────────────────────────────────

const GrantsDonations = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="grants-donations-page">

      {/* ── SEO ────────────────────────────────────────────────────── */}
      <SEO
        title="Grants & Donations Sourcing | NGOs, Non-Profits & Projects"
        description="Kevin secures grants and donations for NGOs, nonprofits, infrastructure developers, and groups from government, corporate, and key global funding networks."
        keywords="gov grants, google nonprofit, google for non profits, impact investing, non profit grants, grants for nonprofit organizations, grants available for nonprofits, grant funding for nonprofits, organizations that give grants to nonprofits, not for profit grants, grant money for nonprofits, gov funding, grants for not for profit organizations, grant for non profit organisation, grants available for non profit organizations, govt funding, gov fund, grants and nonprofits, small business grants gov, federal grants, www grants gov apply online, federal funding, federal govt grant, energy impact partners, fundings for ngo, farm grants, grants for ngos, business grants gov, grant money for churches, grant writers for nonprofits, google ad grants for nonprofits, grant writers for nonprofit organizations, grant writing nonprofit, not for profit grant writing, ngo funding, money grants, apply for grants for nonprofit, applying for a grant for a nonprofit organization, grant application for non profit organization, google grants for nonprofits, npo funding, grants for education nonprofits, non profit organization funding, charitable grants, personal grant money, grants for charity organizations, grants for charitable organizations, funding for npos, grants for educational non profit organizations, google not for profit grant, govt funding for startups, google grants for nonprofit organizations, grants for senior citizens, gov grants for seniors, gov grants for individuals, self employed start up grant, state grant, federal funding for education, grant money for senior citizens, state grant money, get grants, grant money available, department of education grants, grant available, gov grants for homeowners, gov grants for disabled, dod grants, google ad nonprofit, impact funds, ngo funding opportunities, grant management for nonprofits, small business loan gov, gov grants for housing, student grants for international students, livelihood impact fund, department of education funding, fg grant, impact venture, examples of grant proposals for nonprofit, foreign student grants, non profit security grant program, nonprofit ad, grants for non profits, funding for nonprofits, microsoft nonprofit grants, funding for non profit organisations, gov grants apply, affordable housing grants, gov grants and loans, microsoft non profit grant, grant from council, sam gov grants, grants for nonprofit startups, walmart grants for nonprofits, grants to buy land, startup nonprofit grants, impact venture capital, grants to purchase land, grants for startup nonprofit organizations, grant management training for non profit applicants and recipients, nonprofit business startup grants, grants to start a nonprofit, unrestricted grants for nonprofits, technology grants for nonprofits, eco grant, grants gov website, federal grants for individuals, grants for 501c3, tech grants for nonprofits, csr fund for ngo, calvert impact capital, dwp grants, ed gov grants, smedan grant, grant money to start a nonprofit organization, grants housing authority, msme grants, profit funding, technology grants for nonprofit organizations, sba gov grants, foundation grants for nonprofits, green benefit global impact fund, federal grants for nonprofits, sba gov grant, operational grants for nonprofits, fundraising for ngo, grants gov application, operating grants for nonprofit organizations, foundations grants for nonprofit organizations, us department of energy grants, department of energy grants, federal grants for nonprofit organizations, federal funding for nonprofits, canadian grants for non profit organizations, csr donations, non profit start up grants, ngo funding agencies, community grants for nonprofits, grants you don t have to pay back, nonprofit funding sources, capacity building grants for nonprofits, usda farm grants for females, grants for start up nonprofits, non profit organization funding sources, grants gov register, rural finance grants, federal grants for businesses, non profit organization start up grants, non profit scholarships, www gov grants, grants i don t have to pay back, city grants for nonprofits, grants for capacity building in nonprofits, grant gov registration, not for profit start up grants, department of justice grants, state funded programs, funding agency ngos, walmart charity, corporate social responsibility donations, community grants for nonprofit organizations, funding agencies of ngo, small grants for nonprofits, grants for mental health nonprofits, local grants for nonprofits, corporate grants for nonprofits, impact investment funds, mental health grants for nonprofits, federal student grants, money grants for unemployed, federal education grants, state and local cybersecurity grant program, marketing grants for nonprofits, federal grant program, grant money to pay bills, govgrants, types of federal grants, walmart non profit donations, grants for small nonprofit organizations, grants for law enforcement equipment, funding for not for profit organisations, ngo startup funding, department of labor grant, local grants for nonprofit organizations, community impact fund, federal research funding, govt fund for ngo, grant schemes, federal grants gov, nonprofit grant writing services, federal and state grants, funds for ngos, community foundation donor advised funds, grant organizations for nonprofits, municipal grants, federal funded programs, grants for not for profit organisations, grants gov federal grants, govt grants for ngo, non profit security grant, nordic impact fund, grants sourcing advisory, donations sourcing, NGO funding, non-profit grants, government grants, charitable foundation grants, international aid grants, grant application advisory, community grants, infrastructure grants"
        canonical="https://grahamkarimi.com/services/grants-donations"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Grants & Donations Sourcing Advisory',
          description:
            'Professional grant sourcing and donations advisory for NGOs, non-profits, infrastructure developers, and community groups seeking government, foundation, corporate, and international funding.',
          provider: {
            '@type': 'Person',
            name: 'Kevin Graham',
            url: 'https://grahamkarimi.com',
            telephone: '+447723339858',
            email: 'kevin.uk@grahamkarimi.com',
          },
            "offers": {
            "@type": "Offer",
            "priceSpecification": {
                "@type": "PriceSpecification",
                "price": "300",
                "priceCurrency": "USD",
                "description": "Minimum upfront advisory service fee ..."
            }
            },
          serviceType: 'Grant Sourcing & Donations Advisory',
          areaServed: { '@type': 'Country', name: 'Global' },
          url: 'https://grahamkarimi.com/services/grants-donations',
        }}
      />

      <main id="main-content">

        {/* ── SECTION 1 — HERO HEADER ── */}
        <section className="gd-header">

          {/* Floating spark dots */}
          <div className="gd-header-sparks" aria-hidden="true">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="gd-spark" />
            ))}
          </div>

          <div className="container">
            <nav className="gd-breadcrumb" aria-label="Breadcrumb">
              <Link to="/"><i className="fas fa-home"></i> Home</Link>
              <span className="separator"><i className="fas fa-chevron-right"></i></span>
              <Link to="/services">Services</Link>
              <span className="separator"><i className="fas fa-chevron-right"></i></span>
              <span className="current">Grants & Donations</span>
            </nav>

            <div className="gd-header-body">
              <span className="gd-header-label">Financial Advisory Service</span>
              <h1>
                Grants &amp; Donations
                <span>Advisory</span>
              </h1>
              <p className="gd-header-tagline">
                Securing grants and donations requires expert knowledge of funding landscapes,
                eligibility criteria, and application standards. Kevin sources opportunities from
                government programmes, charitable foundations, corporate CSR budgets,
                international aid networks, and prepares applications on your behalf.
              </p>
              <div className="gd-header-cta">
                <a href="#contact" className="gd-btn-primary">
                  <i className="fas fa-search-dollar"></i> Discuss Your Funding Need
                </a>
                <a href="#gd-process" className="gd-btn-outline">
                  <i className="fas fa-arrow-down"></i> How It Works
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2 — FOUR PILLARS STRIP ── */}
        <section className="gd-pillars-strip">
          <div className="container">
            <div className="gd-pillars-grid">
              {pillars.map((p, i) => (
                <div key={i} className="gd-pillar-card">
                  <i className={`${p.icon} gd-pillar-icon`}></i>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3 — OVERVIEW ── */}
        <section className="gd-overview">
          <div className="container">
            <div className="gd-overview-layout">
              <div className="gd-overview-text">
                <span className="gd-section-label">What We Do</span>
                <p>
                  Kevin advises and supports NGOs, non-profit organisations, infrastructure
                  developers, and community groups in identifying, applying for, and securing grants
                  and donations from a broad range of funding sources globally.
                </p>
                <p>
                  Grant funding is competitive and highly process-driven. Successful applications
                  require a clear understanding of funder priorities, eligibility requirements, and
                  the ability to present a compelling, evidence-based case. Poorly structured
                  applications — even for genuinely eligible projects — are routinely declined.
                </p>
                <p>
                  This service covers the full sourcing and application cycle: from identifying
                  aligned opportunities to preparing submission-ready applications and managing
                  funder follow-up — delivered under a structured advisory engagement.
                </p>
              </div>

              <div className="gd-overview-stats">
                {[
                  { num: '40+',  label: 'Countries with Active Grant Networks' },
                  { num: '5',    label: 'Funding Source Categories' },
                  { num: '100%', label: 'Tailored to Your Project & Sector' },
                  { num: '24hr', label: 'Initial Response Guarantee' },
                ].map((s, i) => (
                  <div className="gd-stat-card" key={i}>
                    <span className="gd-stat-num">{s.num}</span>
                    <span className="gd-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4 — GRANT TYPES ── */}
        <section className="gd-types-section">
          <div className="container">
            <div className="gd-section-header">
              <span className="gd-section-label">Funding Sources</span>
              <h2>Grant &amp; Donation Categories</h2>
              <p>
                Five structured funding categories | each sourced through dedicated networks
                and matched to your sector, project type, and geographic reach.
              </p>
            </div>

            {/* Row 1 — three cards */}
            <div className="gd-types-grid">
              {grantTypes.map((type, i) => (
                <div key={i} className="gd-type-card">
                  <div className="gd-type-icon"><i className={type.icon}></i></div>
                  <h3>{type.title}</h3>
                  <p>{type.desc}</p>
                  <ul className="gd-type-examples">
                    {type.examples.map((ex, j) => <li key={j}>{ex}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            {/* Row 2 — two cards centred */}
            <div className="gd-types-row2">
              {grantTypesRow2.map((type, i) => (
                <div key={i} className="gd-type-card">
                  <div className="gd-type-icon"><i className={type.icon}></i></div>
                  <h3>{type.title}</h3>
                  <p>{type.desc}</p>
                  <ul className="gd-type-examples">
                    {type.examples.map((ex, j) => <li key={j}>{ex}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 5 — SERVICE FEE DISCLAIMER ── */}
        <section className="gd-fee-section">
          <div className="container">
            <div className="gd-fee-callout" role="note" aria-label="Service fee information">

              <div className="gd-fee-callout-header">
                <div className="gd-fee-callout-icon">
                  <i className="fas fa-info-circle"></i>
                </div>
                <div>
                  <h3>Professional Service Fee | Advisory Notice</h3>
                  <p>Important information for all prospective clients</p>
                </div>
              </div>

              <div className="gd-fee-callout-body">
                <p>
                  Grant and donation sourcing is a <strong>professional advisory service</strong>.
                  An upfront service fee is applicable before grant or donation funds are realised.
                  This fee covers the full scope of advisory work performed on your behalf — from
                  research and eligibility assessment through to application preparation and submission.
                </p>
                <p>
                  The service fee reflects the professional time, expertise, and access to funding
                  networks required to identify aligned opportunities and prepare competitive
                  applications. It is <strong>separate from and does not constitute</strong> any
                  grant or donation award.
                </p>
                <p>
                  The fee covers, but is not limited to, the following scope of work:
                </p>
                <ul className="gd-fee-points">
                  {feePoints.map((pt, i) => (
                    <li key={i}>
                      <i className="fas fa-check-circle"></i>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 6 — PROCESS ── */}
        <section id="gd-process" className="gd-process">
          <div className="container">
            <div className="gd-section-header">
              <span className="gd-section-label">Our Approach</span>
              <h2>How the Process Works</h2>
              <p>
                A structured five-step engagement from eligibility assessment through
                to award guidance and future funding positioning.
              </p>
            </div>
            <div className="gd-steps">
              {steps.map((step, i) => (
                <div key={i} className="gd-step">
                  <div className="gd-step-number">{step.number}</div>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 7 — WHO THIS IS FOR ── */}
        <section className="gd-who-section">
          <div className="container">
            <div className="gd-section-header">
              <span className="gd-section-label">Who We Help</span>
              <h2>Who This Service Is For</h2>
              <p>
                Designed for organisations and individuals with a legitimate funding need,
                a defined project or cause, and the intent to apply.
              </p>
            </div>
            <div className="gd-who-grid">
              {audiences.map((a, i) => (
                <div key={i} className="gd-who-card">
                  <i className={`${a.icon} gd-who-icon`}></i>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 8 — CTA ── */}
        <section className="gd-cta-section">
          <div className="container">
            <h2>Ready to Explore Grant Funding?</h2>
            <p>
              The first step is understanding what you are eligible for.
              Let's assess your project and identify the right opportunities.
            </p>
            <div className="gd-cta-buttons">
              <a href="#contact" className="gd-btn-primary">
                <i className="fas fa-calendar-check"></i> Schedule a Consultation
              </a>
              <a href="mailto:kevin.uk@grahamkarimi.com" className="gd-btn-outline">
                <i className="fas fa-envelope"></i> Send an Email
              </a>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default GrantsDonations;