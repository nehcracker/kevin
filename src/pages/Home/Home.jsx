import React, { useEffect } from 'react';
import SEO from '../../components/common/SEO/SEO';
import Graham from '../../assets/images/Graham.png';
import './Home.css';

/* ── Constants ───────────────────────────────────────────────────────────── */
const PHONE = '447723339858';
const EMAIL  = 'kevin.uk@grahamkarimi.com';

const WA_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(
  "Hi Kevin, I'd like to discuss your financial advisory services. Please let me know your availability."
)}`;

const SERVICES = [
  {
    number: '01',
    icon:   'fas fa-landmark',
    title:  'International Project Funding',
    sub:    '& Debt Structuring',
    path:   '/services/project-funding',
    accent: '#1565C0',
  },
  {
    number: '02',
    icon:   'fas fa-globe-americas',
    title:  'Cross Border Financial Advisory',
    sub:    '& Investment Structuring',
    path:   '/services/international-financial-advisor',
    accent: '#0891b2',
  },
  {
    number: '03',
    icon:   'fas fa-shield-alt',
    title:  'Risk Management',
    sub:    '& Regulatory Compliance Advisory',
    path:   '/services/risk-compliance',
    accent: '#7c3aed',
  },
  {
    number: '04',
    icon:   'fas fa-file-contract',
    title:  'Document Alignment Services',
    sub:    'DAS — Lender-Ready Documentation',
    path:   '/services/document-alignment-services',
    accent: '#b45309',
  },
  {
    number: '05',
    icon:   'fas fa-users',
    title:  'Global HR & International',
    sub:    'Job Placement Services',
    path:   '/services/global-hr',
    accent: '#059669',
  },
];

const STATS = [
  { number: '15+',    label: 'Years Exp.'    },
  { number: '$500M+', label: 'Transactions'  },
  { number: '40+',    label: 'Countries'     },
  { number: '100+',   label: 'Clients'       },
];

const EXPERTISE = [
  {
    num:   '01',
    icon:  'fas fa-hand-holding-usd',
    color: '#1565C0',
    title: 'Sourcing Loans & Debt Advisory',
    body:  'Connecting businesses and projects with credible local and international lenders. Structures tailored debt solutions aligned with client goals, risk appetite, and regulatory frameworks.',
  },
  {
    num:   '02',
    icon:  'fas fa-file-signature',
    color: '#0891b2',
    title: 'Credit Proposal Alignment',
    body:  'Strategic oversight ensuring project documents and business proposals meet investor, lender, and statutory expectations — increasing fundability and reducing bottlenecks.',
  },
  {
    num:   '03',
    icon:  'fas fa-chart-line',
    color: '#7c3aed',
    title: 'Debt, Restructuring & Recovery',
    body:  'High-stakes negotiations with financial institutions and creditors — offering recovery pathways, restructuring plans, and sustainable repayment strategies for distressed assets.',
  },
  {
    num:   '04',
    icon:  'fas fa-search-dollar',
    color: '#b45309',
    title: 'Due Diligence & Statutory Services',
    body:  'Comprehensive due diligence for both investors and investees. Regulatory compliance, risk profiling, and statutory document verification across multiple jurisdictions.',
  },
  {
    num:   '05',
    icon:  'fas fa-network-wired',
    color: '#059669',
    title: 'Financial Market Networking',
    body:  'High-level network across financial institutions, private equity firms, project sponsors, and sovereign investors — unlocking cross-border funding and joint venture opportunities.',
  },
  {
    num:   '06',
    icon:  'fas fa-shield-alt',
    color: '#dc2626',
    title: 'Risk & Regulatory Compliance',
    body:  'Comprehensive risk frameworks for high-value transactions. Full alignment with international regulatory standards, AML policies, and compliance protocols across jurisdictions.',
  },
];

const MILESTONES = [
  { year: '2008', text: 'Began career in international finance and cross-border investment structuring.' },
  { year: '2013', text: 'Appointed Director of Risk Management & Compliance at InBest Consultant Solutions.' },
  { year: '2017', text: 'Surpassed $200M in managed transactions across 25+ countries.' },
  { year: '2022', text: 'Expanded advisory portfolio to 40+ countries and $500M+ in lifetime transactions.' },
];

const CREDENTIALS = [
  'MBA — Business Administration',
  'Certified Financial Advisor',
  'Director of Risk Management & Compliance',
  'AML & KYC Framework Specialist',
  'Cross-Border Regulatory Expert',
  'International Project Finance Specialist',
];

/* ══════════════════════════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════════════════════════ */
const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="home-page">

      <SEO
        title="Global Financial Advisor & Project Funding Specialist"
        description="Kevin Graham brings over a decade of strategic insight and execution in global finance, with a focus on risk management, compliance, and debt advisory."
        keywords="Kevin Graham Karimi, Kevin Graham financial advisor, InBest Consultant Solutions, global financial advisor, director risk management compliance, HNW corporate finance advisor, debt structuring expert, international finance director UK"
        canonical="https://grahamkarimi.com/"
        ogType="profile"
        schema={{
          '@context': 'https://schema.org',
          '@type':    'Person',
          name:       'Kevin Graham Karimi',
          url:        'https://grahamkarimi.com/',
          image:      'https://grahamkarimi.com/Kevin-graham.png',
          jobTitle:   'Global Financial Advisor & Director of Risk Management',
          worksFor: {
            '@type': 'Organization',
            name:    'InBest Consultant Solutions',
            url:     'https://inbestconsultant.com',
          },
          sameAs: [
            'https://linkedin.com/in/kevingrahamkarimi',
            'https://www.facebook.com/kevingrahamkarimi',
            'https://t.me/kevingrahamkarimi',
          ],
        }}
      />

      <main id="main-content">

        {/* ══════════════════════════════════════════════════════════════════
            HERO
            Layout:  desktop → 2-col grid  (left: identity | right: services)
                     ≤ 960px → 1-col stack (identity first, services below)
            Mobile order is purely DOM order — no CSS `order` property used.
        ══════════════════════════════════════════════════════════════════ */}
        <section id="hero" className="hero-section" aria-labelledby="hero-name">

          <div className="hero-glow hero-glow--tr" aria-hidden="true" />
          <div className="hero-glow hero-glow--bl" aria-hidden="true" />
          <div className="hero-grid-texture"       aria-hidden="true" />

          <div className="hero-inner">

            {/* ── LEFT — Identity + CTAs (DOM pos 1 → always on top on mobile) ── */}
            <div className="hero-left">

              <span className="hero-eyebrow">
                <span className="hero-eyebrow-dot" aria-hidden="true" />
                Trusted by Global Corporations &amp; HNW Investors
              </span>

              <h1 id="hero-name" className="hero-name">
                Kevin
                <em className="hero-name-accent"> Graham</em>
              </h1>

              <h2>
              <p className="hero-role">
              Global Financial Advisor | Finance Broker | Financial Consultant
              </p>
              </h2>

              <div className="hero-stats" aria-label="Key statistics">
                {STATS.map((s, i) => (
                  <React.Fragment key={s.label}>
                    <div className="hero-stat">
                      <span className="hero-stat-num">{s.number}</span>
                      <span className="hero-stat-lbl">{s.label}</span>
                    </div>
                    {i < STATS.length - 1 && (
                      <div className="hero-stat-sep" aria-hidden="true" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <p className="hero-tagline">
              With over 15 years of global experience, Kevin delivers specialist advisory across project funding, 
              international financial strategy, risk & compliance, and document alignment services, serving high-net-worth 
              corporations across 40+ countries.
              </p>

              <div className="hero-cta">
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-btn hero-btn--wa"
                  aria-label="Contact Kevin via WhatsApp"
                >
                  <i className="fab fa-whatsapp" aria-hidden="true" />
                  WhatsApp Kevin
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="hero-btn hero-btn--email"
                  aria-label="Send Kevin an email"
                >
                  <i className="fas fa-envelope" aria-hidden="true" />
                  Send an Email
                </a>
              </div>

              <div className="hero-trust" aria-label="Credentials">
                <span className="hero-trust-badge">
                  <i className="fas fa-certificate" aria-hidden="true" />
                  Certified Financial Advisor
                </span>
                <span className="hero-trust-badge">
                  <i className="fas fa-shield-alt" aria-hidden="true" />
                  Regulatory Expert
                </span>
                <span className="hero-trust-badge">
                  <i className="fas fa-award" aria-hidden="true" />
                  Industry Leader
                </span>
              </div>

            </div>
            {/* end hero-left */}

            {/* ── RIGHT — Service cards (DOM pos 2 → stacks BELOW on mobile) ── */}
            <div className="hero-right">
              <p className="hero-services-label" aria-hidden="true">5 Core Services</p>

              <nav aria-label="Core services">
                {SERVICES.map(svc => (
                  <a
                    key={svc.number}
                    href={svc.path}
                    className="hero-svc-card"
                    style={{ '--svc-accent': svc.accent }}
                    aria-label={`${svc.title} — ${svc.sub}`}
                  >
                    <span className="hero-svc-num" aria-hidden="true">{svc.number}</span>
                    <div
                      className="hero-svc-icon"
                      aria-hidden="true"
                      style={{ background: svc.accent }}
                    >
                      <i className={svc.icon} />
                    </div>
                    <div className="hero-svc-body">
                      <div className="hero-svc-title">{svc.title}</div>
                      <div className="hero-svc-sub">{svc.sub}</div>
                    </div>
                    <i className="fas fa-arrow-right hero-svc-arrow" aria-hidden="true" />
                  </a>
                ))}
              </nav>
            </div>
            {/* end hero-right */}

          </div>
          {/* end hero-inner */}

          <div className="hero-scroll" aria-hidden="true">
            <i className="fas fa-chevron-down" />
            <span>Explore Services</span>
          </div>

        </section>

        {/* ══════════════════════════════════════════════════════════════════
            EXPERTISE SECTION
            6 capability cards in a 3-col grid with numbered accent style.
        ══════════════════════════════════════════════════════════════════ */}
        <section id="expertise" className="exp-section" aria-labelledby="expertise-heading">
          <div className="exp-inner">

            <div className="exp-header">
              <span className="exp-eyebrow">Core Capabilities</span>
              <h2 id="expertise-heading">What Kevin Brings to the Table</h2>
              <p>
                Decades of hands-on execution across global markets — from sourcing structured
                financing to navigating multi-jurisdictional regulatory frameworks.
              </p>
            </div>

            <div className="exp-grid">
              {EXPERTISE.map((item) => (
                <div key={item.num} className="exp-card">
                  <div className="exp-card-top">
                    <span className="exp-card-num">{item.num}</span>
                    <div className="exp-card-icon" style={{ '--icon-color': item.color }}>
                      <i className={item.icon} aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="exp-card-title">{item.title}</h3>
                  <p className="exp-card-body">{item.body}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            EXPERIENCE SECTION
            Two-column: bio + milestones left, photo + credentials right.
        ══════════════════════════════════════════════════════════════════ */}
        <section id="experience" className="bio-section" aria-labelledby="experience-heading">
          <div className="bio-inner">

            {/* ── Left — Bio + timeline ── */}
            <div className="bio-left">
              <span className="exp-eyebrow">Background</span>
              <h2 id="experience-heading">Expertise &amp; Experience</h2>

              <p className="bio-lead">
                Kevin Graham brings over 15 years of strategic insight and execution in
                global finance with a focus on risk management, compliance, and debt advisory.
                As Director of Risk Management &amp; Compliance at{' '}
                <a href="https://inbestconsultant.com/" target="_blank" rel="noopener noreferrer">
                  InBest Consultant Solutions
                </a>
                , he has led high-value transactions across infrastructure, energy, trade finance,
                and real estate.
              </p>

              <p className="bio-body">
                With over 15 years of global experience, Kevin delivers specialist advisory across project funding, 
                international financial strategy, risk & compliance, and document alignment services, serving high-net-worth
                 corporations across 40+ countries.
              </p>

              {/* Milestone timeline */}
              <div className="bio-timeline" aria-label="Career milestones">
                {MILESTONES.map((m) => (
                  <div key={m.year} className="bio-milestone">
                    <div className="bio-milestone-year">{m.year}</div>
                    <div className="bio-milestone-line" aria-hidden="true">
                      <span className="bio-milestone-dot" />
                    </div>
                    <div className="bio-milestone-text">{m.text}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right — Photo + credential badges ── */}
            <div className="bio-right">
              <div className="bio-photo-wrap">
                <img
                  src={Graham}
                  alt="Kevin Graham Karimi — Global Financial Advisor"
                  className="bio-photo"
                />
                {/* Floating credential chips */}
                <div className="bio-chip bio-chip--tl">
                  <i className="fas fa-award" aria-hidden="true" />
                  <span>15+ Years</span>
                </div>
                <div className="bio-chip bio-chip--br">
                  <i className="fas fa-globe" aria-hidden="true" />
                  <span>40+ Countries</span>
                </div>
              </div>

              {/* Credential list */}
              <ul className="bio-creds" aria-label="Credentials">
                {CREDENTIALS.map((c) => (
                  <li key={c} className="bio-cred-item">
                    <i className="fas fa-check-circle" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;