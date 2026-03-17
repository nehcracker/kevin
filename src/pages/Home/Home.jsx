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

/* Hero right-column service cards */
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
  {
    number: '06',
    icon:   'fas fa-briefcase',
    title:  'Business Consultant',
    sub:    'Registration · Accounting · Tax · HR · Strategy',
    path:   '/services/business-consultant',
    accent: '#facc15',
  },
  {
    number: '07',
    icon:   'fas fa-search-dollar',
    title:  'Grants & Donations',
    sub:    'Sourcing Advisory',
    path:   '/services/grants-donations',
    accent: '#D97706',
  },
];

const STATS = [
  { number: '15+',    label: 'Years Exp.'    },
  { number: '$500M+', label: 'Transactions'  },
  { number: '40+',    label: 'Countries'     },
  { number: '100+',   label: 'Clients'       },
];

/* Expertise section cards */
const SERVICES_CARDS = [
  {
    num:   '01',
    icon:  'fas fa-landmark',
    color: '#1565C0',
    title: 'International Project Funding',
    sub:   '& Debt Structuring',
    body:  'Connecting businesses and projects with credible local and international lenders. Structures tailored debt solutions aligned with client goals and regulatory frameworks.',
    path:  '/services/project-funding',
  },
  {
    num:   '02',
    icon:  'fas fa-globe-americas',
    color: '#0891b2',
    title: 'Cross Border Financial Advisory',
    sub:   '& Investment Structuring',
    body:  'Strategic financial advisory for cross-border transactions, international investment structuring, and multi-jurisdictional capital deployment.',
    path:  '/services/international-financial-advisor',
  },
  {
    num:   '03',
    icon:  'fas fa-shield-alt',
    color: '#7c3aed',
    title: 'Risk Management',
    sub:   '& Regulatory Compliance Advisory',
    body:  'Comprehensive risk frameworks for high-value transactions. Full alignment with international regulatory standards, AML policies, and compliance protocols.',
    path:  '/services/risk-compliance',
  },
  {
    num:   '04',
    icon:  'fas fa-file-contract',
    color: '#b45309',
    title: 'Document Alignment Services',
    sub:   'DAS — Lender-Ready Documentation',
    body:  'Strategic oversight ensuring project documents and business proposals meet investor, lender, and statutory expectations — increasing fundability and reducing bottlenecks.',
    path:  '/services/document-alignment-services',
  },
  {
    num:   '05',
    icon:  'fas fa-users',
    color: '#059669',
    title: 'Global HR & International',
    sub:   'Job Placement Services',
    body:  'End-to-end international HR solutions and job placement services connecting talent with global opportunities across 40+ countries.',
    path:  '/services/global-hr',
  },
  {
    num:   '06',
    icon:  'fas fa-briefcase',
    color: '#ca8a04',
    title: 'Business Consultant',
    sub:   'Registration · Accounting · Tax · HR · Strategy',
    body:  'From company formation and accounting to tax planning, HR consulting, management strategy, and specialist advisory — all coordinated by one expert.',
    path:  '/services/business-consultant',
  },
  {
    num:   '07',
    icon:  'fas fa-search-dollar',
    color: '#D97706',
    title: 'Grants & Donations',
    sub:   'Sourcing Advisory',
    body:  'Sourcing grants and donations for NGOs, non-profits, infrastructure developers, and community groups from government, foundation, corporate, and international networks.',
    path:  '/services/grants-donations',
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
        keywords="Kevin Graham, Graham financial advisor, InBest Consultant Solutions, global financial advisor, director risk management compliance, HNW corporate finance advisor, debt structuring expert, international finance director UK"
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
        ══════════════════════════════════════════════════════════════════ */}
        <section id="hero" className="hero-section" aria-labelledby="hero-name">

          <div className="hero-glow hero-glow--tr" aria-hidden="true" />
          <div className="hero-glow hero-glow--bl" aria-hidden="true" />
          <div className="hero-grid-texture"       aria-hidden="true" />

          <div className="hero-inner">

            {/* ── LEFT — Identity + CTAs ── */}
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
                With over 15 years of global experience, Kevin delivers specialist advisory across
                project funding, international financial strategy, risk &amp; compliance, grants
                &amp; donations sourcing, and document alignment services — serving high-net-worth
                corporations and organisations across 40+ countries.
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

            {/* ── RIGHT — Service cards ── */}
            <div className="hero-right">
              <p className="hero-services-label" aria-hidden="true">7 Core Services</p>

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

          <div className="hero-scroll" aria-hidden="true">
            <i className="fas fa-chevron-down" />
            <span>Explore Services</span>
          </div>

        </section>

        {/* ══════════════════════════════════════════════════════════════════
            GLOBAL FINANCIAL SERVICES SECTION
        ══════════════════════════════════════════════════════════════════ */}
        <section id="expertise" className="exp-section" aria-labelledby="expertise-heading">

          <div className="exp-mesh"             aria-hidden="true" />
          <div className="exp-glow exp-glow--1" aria-hidden="true" />
          <div className="exp-glow exp-glow--2" aria-hidden="true" />

          <div className="exp-inner">

            <div className="exp-header">
              <span className="exp-eyebrow">What We Offer</span>
              <h2 id="expertise-heading">Global Financial Services</h2>
              <p>
                Seven specialist disciplines under one advisory roof — from project funding
                and compliance to business formation, grants sourcing, and HR — deployed
                across 40+ countries.
              </p>
            </div>

            <div className="exp-grid">
              {SERVICES_CARDS.map((item) => (
                <a
                  key={item.num}
                  href={item.path}
                  className="exp-card"
                  style={{ '--icon-color': item.color }}
                  aria-label={`${item.title} — ${item.sub}`}
                >
                  <div className="exp-card-top">
                    <span className="exp-card-num">{item.num}</span>
                    <div className="exp-card-icon" aria-hidden="true">
                      <i className={item.icon} />
                    </div>
                  </div>
                  <h3 className="exp-card-title">{item.title}</h3>
                  <p className="exp-card-sub">{item.sub}</p>
                  <p className="exp-card-body">{item.body}</p>
                  <span className="exp-card-link">
                    Learn more <i className="fas fa-arrow-right" aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            EXPERIENCE SECTION
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
                With over 15 years of global experience, Kevin delivers specialist advisory across
                project funding, international financial strategy, risk &amp; compliance, and
                document alignment services, serving high-net-worth corporations across 40+ countries.
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
                <div className="bio-chip bio-chip--tl">
                  <i className="fas fa-award" aria-hidden="true" />
                  <span>15+ Years</span>
                </div>
                <div className="bio-chip bio-chip--br">
                  <i className="fas fa-globe" aria-hidden="true" />
                  <span>40+ Countries</span>
                </div>
              </div>

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