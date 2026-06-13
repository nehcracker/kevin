import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/common/SEO/SEO';
import TiltCard from '../../components/common/TiltCard/TiltCard';
import AnimatedCounter from '../../components/common/AnimatedCounter/AnimatedCounter';
import ServiceSlider from '../../components/common/ServiceSlider/ServiceSlider';
import Graham from '../../assets/images/Graham.png';
import { fadeUp, fadeIn, slideInLeft, slideInRight, staggerContainer, staggerItem } from '../../utils/motion';
import './Home.css';

const PHONE = '447723339858';
const EMAIL  = 'kevin.uk@grahamkarimi.com';
const IMO_URL = `https://imo.im/${PHONE}?text=${encodeURIComponent(
  "Hi Kevin, I'd like to discuss your financial advisory services. Please let me know your availability."
)}`;

const SERVICES = [
  { number: '01', icon: 'fas fa-landmark',      title: 'International Project Funding',      sub: '& Debt Structuring',                    path: '/services/project-funding',                      accent: '#1565C0' },
  { number: '02', icon: 'fas fa-globe-americas', title: 'Cross Border Financial Advisory',    sub: '& Investment Structuring',              path: '/services/international-financial-advisor',      accent: '#0891b2' },
  { number: '03', icon: 'fas fa-shield-alt',     title: 'Risk Management',                    sub: '& Regulatory Compliance Advisory',      path: '/services/risk-compliance',                      accent: '#7c3aed' },
  { number: '04', icon: 'fas fa-file-contract',  title: 'Document Alignment Services',        sub: 'DAS — Lender-Ready Documentation',      path: '/services/document-alignment-services',          accent: '#b45309' },
  { number: '05', icon: 'fas fa-users',          title: 'Global HR & International',          sub: 'Job Placement Services',                path: '/services/global-hr',                            accent: '#059669' },
  { number: '06', icon: 'fas fa-briefcase',      title: 'Business Consultant',                sub: 'Registration · Accounting · Tax · HR',  path: '/services/business-consultant',                  accent: '#facc15' },
  { number: '07', icon: 'fas fa-search-dollar',  title: 'Grants & Donations',                 sub: 'Sourcing Advisory',                     path: '/services/grants-donations',                     accent: '#D97706' },
];

const STATS = [
  { number: 15,     suffix: '+', label: 'Years Exp.'   },
  { number: 500,    suffix: 'M+', label: 'Transactions' },
  { number: 40,     suffix: '+', label: 'Countries'    },
  { number: 100,    suffix: '+', label: 'Clients'      },
];

const SERVICES_CARDS = [
  { num: '01', icon: 'fas fa-landmark',      color: '#1565C0', title: 'International Project Funding',   sub: '& Debt Structuring',               body: 'Connecting businesses and projects with credible local and international lenders. Structures tailored debt solutions aligned with client goals and regulatory frameworks.',                                                                      path: '/services/project-funding' },
  { num: '02', icon: 'fas fa-globe-americas',color: '#0891b2', title: 'Cross Border Financial Advisory', sub: '& Investment Structuring',          body: 'Strategic financial advisory for cross-border transactions, international investment structuring, and multi-jurisdictional capital deployment.',                                                                      path: '/services/international-financial-advisor' },
  { num: '03', icon: 'fas fa-shield-alt',    color: '#7c3aed', title: 'Risk Management',                 sub: '& Regulatory Compliance Advisory',  body: 'Comprehensive risk frameworks for high-value transactions. Full alignment with international regulatory standards, AML policies, and compliance protocols.',                                            path: '/services/risk-compliance' },
  { num: '04', icon: 'fas fa-file-contract', color: '#b45309', title: 'Document Alignment Services',     sub: 'DAS — Lender-Ready Documentation',  body: 'Strategic oversight ensuring project documents and business proposals meet investor, lender, and statutory expectations — increasing fundability and reducing bottlenecks.',            path: '/services/document-alignment-services' },
  { num: '05', icon: 'fas fa-users',         color: '#059669', title: 'Global HR & International',       sub: 'Job Placement Services',            body: 'End-to-end international HR solutions and job placement services connecting talent with global opportunities across 40+ countries.',                                                              path: '/services/global-hr' },
  { num: '06', icon: 'fas fa-briefcase',     color: '#ca8a04', title: 'Business Consultant',             sub: 'Registration · Accounting · Tax',   body: 'From company formation and accounting to tax planning, HR consulting, management strategy, and specialist advisory — all coordinated by one expert.',                                       path: '/services/business-consultant' },
  { num: '07', icon: 'fas fa-search-dollar', color: '#D97706', title: 'Grants & Donations',              sub: 'Sourcing Advisory',                 body: 'Sourcing grants and donations for NGOs, non-profits, infrastructure developers, and community groups from government, foundation, corporate, and international networks.',       path: '/services/grants-donations' },
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

const Home = () => {
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); }, []);

  return (
    <div className="home-page">
      <SEO
        title="Global Financial Advisor & Project Funding Specialist"
        description="Kevin Graham brings over a decade of strategic insight and execution in global finance, with a focus on risk management, compliance, and debt advisory."
        keywords="Kevin Graham, Graham financial advisor, global financial advisor, director risk management compliance, debt structuring expert, international finance director UK"
        canonical="https://grahamkarimi.com/"
        ogType="profile"
        schema={{
          '@context': 'https://schema.org', '@type': 'Person',
          name: 'Kevin Graham Karimi', url: 'https://grahamkarimi.com/',
          jobTitle: 'Global Financial Advisor & Director of Risk Management',
          worksFor: { '@type': 'Organization', name: 'InBest Consultant Solutions' },
        }}
      />

      <main id="main-content">

        {/* ── HERO ── */}
        <section id="hero" className="hero-section" aria-labelledby="hero-name">
          <div className="hero-glow hero-glow--tr" aria-hidden="true" />
          <div className="hero-glow hero-glow--bl" aria-hidden="true" />
          <div className="hero-grid-texture dark-grid-bg" aria-hidden="true" />
          <div className="hero-inner">

            {/* Left — Identity + CTAs */}
            <motion.div
              className="hero-left"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.span variants={staggerItem} className="hero-eyebrow">
                <span className="hero-eyebrow-dot" aria-hidden="true" />
                Trusted by Global Corporations &amp; HNW Investors
              </motion.span>

              <motion.h1 variants={staggerItem} id="hero-name" className="hero-name">
                Kevin<em className="hero-name-accent"> Graham</em>
              </motion.h1>

              <motion.h2 variants={staggerItem}>
                <p className="hero-role">Global Financial Advisor | Finance Broker | Financial Consultant</p>
              </motion.h2>

              <motion.div variants={staggerItem} className="hero-stats" aria-label="Key statistics">
                {STATS.map((s, i) => (
                  <React.Fragment key={s.label}>
                    <div className="hero-stat">
                      <span className="hero-stat-num">
                        <AnimatedCounter target={s.number} suffix={s.suffix} />
                      </span>
                      <span className="hero-stat-lbl">{s.label}</span>
                    </div>
                    {i < STATS.length - 1 && <div className="hero-stat-sep" aria-hidden="true" />}
                  </React.Fragment>
                ))}
              </motion.div>

              <motion.p variants={staggerItem} className="hero-tagline">
                With over 15 years of global experience, Kevin delivers specialist advisory across
                project funding, international financial strategy, risk &amp; compliance, grants
                &amp; donations sourcing, and document alignment services — serving high-net-worth
                corporations and organisations across 40+ countries.
              </motion.p>

              <motion.div variants={staggerItem} className="hero-cta">
                <a href={IMO_URL} target="_blank" rel="noopener noreferrer" className="hero-btn hero-btn--imo" aria-label="Contact Kevin via IMO">
                  <i className="fas fa-comment-dots" aria-hidden="true" /> IMO Kevin
                </a>
                <a href={`mailto:${EMAIL}`} className="hero-btn hero-btn--email" aria-label="Send Kevin an email">
                  <i className="fas fa-envelope" aria-hidden="true" /> Send an Email
                </a>
              </motion.div>

              <motion.div variants={staggerItem} className="hero-trust" aria-label="Credentials">
                <span className="hero-trust-badge"><i className="fas fa-certificate" aria-hidden="true" /> Certified Financial Advisor</span>
                <span className="hero-trust-badge"><i className="fas fa-shield-alt"  aria-hidden="true" /> Regulatory Expert</span>
                <span className="hero-trust-badge"><i className="fas fa-award"       aria-hidden="true" /> Industry Leader</span>
              </motion.div>
            </motion.div>

            {/* Right — Service cards */}
            <motion.div
              className="hero-right"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <p className="hero-services-label" aria-hidden="true">7 Core Services</p>
              <nav aria-label="Core services">
                {SERVICES.map(svc => (
                  <motion.a
                    key={svc.number}
                    variants={staggerItem}
                    href={svc.path}
                    className="hero-svc-card"
                    style={{ '--svc-accent': svc.accent }}
                    aria-label={`${svc.title} — ${svc.sub}`}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="hero-svc-num" aria-hidden="true">{svc.number}</span>
                    <div className="hero-svc-icon" aria-hidden="true" style={{ background: svc.accent }}>
                      <i className={svc.icon} />
                    </div>
                    <div className="hero-svc-body">
                      <div className="hero-svc-title">{svc.title}</div>
                      <div className="hero-svc-sub">{svc.sub}</div>
                    </div>
                    <i className="fas fa-arrow-right hero-svc-arrow" aria-hidden="true" />
                  </motion.a>
                ))}
              </nav>
            </motion.div>

          </div>
          <div className="hero-scroll" aria-hidden="true">
            <i className="fas fa-chevron-down" /><span>Explore Services</span>
          </div>
        </section>

        {/* ── EXPERTISE / SERVICES SLIDER ── */}
        <section id="expertise" className="exp-section" aria-labelledby="expertise-heading">
          <div className="exp-mesh"             aria-hidden="true" />
          <div className="exp-glow exp-glow--1" aria-hidden="true" />
          <div className="exp-glow exp-glow--2" aria-hidden="true" />
          <div className="exp-inner">
            <motion.div
              className="exp-header"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <span className="exp-eyebrow">What We Offer</span>
              <h2 id="expertise-heading">Global Financial Services</h2>
              <p>Seven specialist disciplines under one advisory roof — from project funding and compliance to business formation, grants sourcing, and HR — deployed across 40+ countries.</p>
            </motion.div>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <ServiceSlider services={SERVICES_CARDS} />
            </motion.div>
          </div>
        </section>

        {/* ── EXPERIENCE / BIO ── */}
        <section id="experience" className="bio-section" aria-labelledby="experience-heading">
          <div className="bio-inner">

            <motion.div
              className="bio-left"
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <span className="exp-eyebrow">Background</span>
              <h2 id="experience-heading">Expertise &amp; Experience</h2>
              <p className="bio-lead">
                Kevin Graham brings over 15 years of strategic insight and execution in global finance with a focus on risk management, compliance, and debt advisory. As Director of Risk Management &amp; Compliance at{' '}
                <a href="https://inbestconsultant.com/" target="_blank" rel="noopener noreferrer">InBest Consultant Solutions</a>
                , he has led high-value transactions across infrastructure, energy, trade finance, and real estate.
              </p>
              <p className="bio-body">
                With over 15 years of global experience, Kevin delivers specialist advisory across project funding, international financial strategy, risk &amp; compliance, and document alignment services, serving high-net-worth corporations across 40+ countries.
              </p>
              <motion.div
                className="bio-timeline"
                aria-label="Career milestones"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                {MILESTONES.map((m) => (
                  <motion.div key={m.year} className="bio-milestone" variants={staggerItem}>
                    <div className="bio-milestone-year">{m.year}</div>
                    <div className="bio-milestone-line" aria-hidden="true"><span className="bio-milestone-dot" /></div>
                    <div className="bio-milestone-text">{m.text}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="bio-right"
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <TiltCard className="bio-photo-wrap">
                <img src={Graham} alt="Kevin Graham Karimi — Global Financial Advisor" className="bio-photo" />
                <div className="bio-chip bio-chip--tl"><i className="fas fa-award" aria-hidden="true" /><span>15+ Years</span></div>
                <div className="bio-chip bio-chip--br"><i className="fas fa-globe" aria-hidden="true" /><span>40+ Countries</span></div>
              </TiltCard>
              <motion.ul
                className="bio-creds"
                aria-label="Credentials"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {CREDENTIALS.map((c) => (
                  <motion.li key={c} className="bio-cred-item" variants={staggerItem}>
                    <i className="fas fa-check-circle" aria-hidden="true" />{c}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;
