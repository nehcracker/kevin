import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../../components/common/SEO/SEO';
import './BusinessConsultant.css';

/* ── Data ─────────────────────────────────────────────────────── */

const SERVICES = [
  {
    id: 'registration',
    accentVar: '--bc-reg',
    accent: '#2E7D32',
    icon: '🏛️',
    title: 'Business Registration & Formation',
    desc: 'End-to-end company formation services — from choosing the right structure to completing every statutory filing so you can trade with confidence from day one.',
    items: [
      'LLC / LLP / Ltd formation',
      'EIN & VAT registration',
      'Company structure advisory',
      'Statutory filings & compliance',
      'Registered agent services',
    ],
  },
  {
    id: 'accounting',
    accentVar: '--bc-acc',
    accent: '#1565C0',
    icon: '📊',
    title: 'Accounting & Bookkeeping',
    desc: 'Accurate, timely financial records that give you a clear picture of performance and satisfy every regulatory requirement.',
    items: [
      'Financial statements preparation',
      'Cloud accounting setup & migration',
      'Management accounts',
      'Forensic accounting',
      'Payroll processing',
    ],
  },
  {
    id: 'tax',
    accentVar: '--bc-tax',
    accent: '#E65100',
    icon: '🧾',
    title: 'Tax Services',
    desc: 'Strategic tax planning and preparation that minimises liability, keeps you fully compliant, and uncovers credits many businesses overlook.',
    items: [
      'Tax preparation & filing',
      'Payroll tax management',
      'R&D tax credit claims',
      'Cost segregation studies',
      'VAT / GST compliance',
    ],
  },
  {
    id: 'management',
    accentVar: '--bc-mgmt',
    accent: '#6A1B9A',
    icon: '🎯',
    title: 'Management & Strategy Consulting',
    desc: 'Structured advisory to sharpen your competitive position, streamline operations, and build a business that scales on purpose rather than by accident.',
    items: [
      'Business planning & modelling',
      'Growth strategy development',
      'Operational efficiency audits',
      'Market entry advisory',
      'Board-level advisory support',
    ],
  },
  {
    id: 'hr',
    accentVar: '--bc-hr',
    accent: '#00695C',
    icon: '👥',
    title: 'HR Consulting',
    desc: 'Human-resource frameworks that attract, retain, and develop the talent your business needs while keeping you compliant with employment law.',
    items: [
      'HR strategy & policy design',
      'Workforce planning',
      'Recruitment compliance',
      'Performance management frameworks',
      'Employee relations support',
    ],
  },
  {
    id: 'specialist',
    accentVar: '--bc-spec',
    accent: '#B71C1C',
    icon: '⚡',
    title: 'Specialist Consulting',
    desc: 'High-demand advisory across technology, digital, and emerging disciplines — the expertise modern businesses need to stay ahead of the curve.',
    items: [
      'AI strategy & implementation',
      'SEO consulting',
      'IT systems advisory',
      'Cyber security consulting',
      'Sustainability & ESG strategy',
    ],
  },
];

const WHO = [
  {
    emoji: '🚀',
    title: 'Startups',
    desc: 'Build the right foundations: structure, compliance, and financial controls from the outset.',
  },
  {
    emoji: '🏢',
    title: 'SMEs',
    desc: 'Scale efficiently with professional accounting, HR, and strategic oversight in your corner.',
  },
  {
    emoji: '🌐',
    title: 'Corporations',
    desc: 'Navigate complex regulatory landscapes and sharpen operational performance across divisions.',
  },
  {
    emoji: '💡',
    title: 'Entrepreneurs',
    desc: 'Turn ambition into a structured, investor-ready business with expert guidance at every stage.',
  },
  {
    emoji: '✈️',
    title: 'International Businesses',
    desc: 'Enter new markets confidently with cross-border compliance, tax, and formation expertise.',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Assess',
    desc: 'Deep-dive into your current position — financials, structure, operations, and goals.',
  },
  {
    num: '02',
    title: 'Strategise',
    desc: 'Design a tailored advisory plan aligned to your specific objectives and timeline.',
  },
  {
    num: '03',
    title: 'Structure',
    desc: 'Put the legal, financial, and operational foundations in place before scaling.',
  },
  {
    num: '04',
    title: 'Execute',
    desc: 'Implement recommendations with hands-on support throughout each workstream.',
  },
  {
    num: '05',
    title: 'Review',
    desc: 'Ongoing performance tracking and iterative refinement as your business evolves.',
  },
];

const PROBLEMS = [
  'Costly compliance mistakes from wrong business structure',
  'Tax overpayments due to missed reliefs and credits',
  'Cash-flow crises from poor bookkeeping visibility',
  'HR disputes arising from non-compliant policies',
  'Stalled growth with no strategic roadmap in place',
  'Technology decisions made without expert input',
];

const SOLUTIONS = [
  'Correct entity selection and statutory filings from day one',
  'Proactive tax planning that captures every available relief',
  'Real-time financial visibility via cloud accounting',
  'HR frameworks built for compliance and retention',
  'Data-driven growth strategy with clear milestones',
  'Specialist advisory across AI, IT, cyber security, and SEO',
];

const STATS = [
  { num: '6+', label: 'Advisory disciplines under one roof' },
  { num: '£0', label: 'Hidden fees — transparent fixed pricing' },
  { num: '100%', label: 'Client-specific recommendations' },
  { num: '24hr', label: 'Response time guarantee' },
];

/* ── Component ────────────────────────────────────────────────── */

const BusinessConsultant = () => {
  return (
    <div className="bc-page">
      <SEO
        title="Business Consultant – Business Consulting Services"
        description="Expert business consulting services covering registration, accounting, tax, HR, management strategy, and specialist advisory for SMEs and corporations."
        keywords="business consultant, business consulting services, management consulting, business registration, accounting services, tax preparation services, HR consulting, business advisor near me, LLC registration, EIN application, bookkeeping services, strategy consulting, AI consultant, IT consulting"
        canonical="https://grahamkarimi.com/services/business-consultant"
        schemaType="Service"
      />

      {/* ── Hero ── */}
      <section className="bc-hero">
        <span className="bc-hero-eyebrow">Professional Advisory Services</span>
        <h1>Business <span>Consultant</span></h1>
        <p className="bc-hero-subtitle">
          End-to-end business consulting services — from company formation and accounting
          to management strategy, HR, Finance, and specialist advisory — all under one expert roof.
        </p>
        <div className="bc-hero-ctas">
          <Link to="/contact" className="bc-btn-primary">Schedule a Consultation</Link>
          <a href="#bc-process" className="bc-btn-outline">How It Works</a>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <div className="bc-trust-strip">
        <div className="bc-trust-inner">
          <div className="bc-trust-item">
            <span className="bc-trust-icon">🏛️</span>
            <div className="bc-trust-text">
              <strong>End-to-End Advisory</strong>
              <span>Registration to strategy</span>
            </div>
          </div>
          <div className="bc-trust-item">
            <span className="bc-trust-icon">⚖️</span>
            <div className="bc-trust-text">
              <strong>Regulatory finance Compliance</strong>
              <span>Tax, HR &amp; statutory filings</span>
            </div>
          </div>
          <div className="bc-trust-item">
            <span className="bc-trust-icon">📈</span>
            <div className="bc-trust-text">
              <strong>Financial Structure</strong>
              <span>Accounting &amp; cash-flow clarity</span>
            </div>
          </div>
          <div className="bc-trust-item">
            <span className="bc-trust-icon">🎯</span>
            <div className="bc-trust-text">
              <strong>Growth Strategy</strong>
              <span>Management consulting expertise</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Overview ── */}
      <section className="bc-section">
        <div className="bc-section-inner">
          <div className="bc-overview-grid">
            <div className="bc-overview-text">
              <span className="bc-section-label">What We Do</span>
              <h2 className="bc-section-title">
                Business Consulting Services
              </h2>
              <p>
                From business registration, accounting, and tax preparation to management consulting, HR advisory, 
                and specialist support across AI, IT, and cyber security — we cover every dimension of your business, 
                coordinated by one experienced consultant, so nothing falls through the gaps.
              </p>
            </div>
            <div className="bc-overview-stats">
              {STATS.map((s, i) => (
                <div className="bc-stat-card" key={i}>
                  <span className="bc-stat-num">{s.num}</span>
                  <span className="bc-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Services ── */}
      <section className="bc-section bc-section--alt">
        <div className="bc-section-inner">
          <span className="bc-section-label">Core Services</span>
          <h2 className="bc-section-title">
            Consulting Services. <span>One Consulting Partner.</span>
          </h2>
          <p className="bc-section-intro">
            Each of the six service areas below is backed by dedicated expertise — not generalists.
            From accounting services and bookkeeping to HR consulting and specialist advisory,
            you get the right knowledge applied to your specific challenge.
          </p>
          <div className="bc-services-grid">
            {SERVICES.map((svc) => (
              <div className="bc-service-card" key={svc.id}>
                <div className="bc-service-card-top">
                  <div
                    className="bc-service-icon"
                    style={{ background: `${svc.accent}18`, color: svc.accent }}
                  >
                    {svc.icon}
                  </div>
                  <h3 style={{ color: svc.accent }}>{svc.title}</h3>
                </div>
                <div className="bc-service-card-body">
                  <p>{svc.desc}</p>
                  <ul>
                    {svc.items.map((item, i) => (
                      <li key={i} style={{ '--check-color': svc.accent }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who Needs ── */}
      <section className="bc-section">
        <div className="bc-section-inner">
          <span className="bc-section-label">Who We Help</span>
          <h2 className="bc-section-title">
            Who Needs a <span>Business Consultant?</span>
          </h2>
          <p className="bc-section-intro">
            Business consulting services deliver value at every stage of the commercial lifecycle —
            whether you're forming a company, optimising an established operation, or expanding internationally.
          </p>
          <div className="bc-who-grid">
            {WHO.map((w, i) => (
              <div className="bc-who-card" key={i}>
                <span className="bc-who-emoji">{w.emoji}</span>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="bc-section bc-section--alt" id="bc-process">
        <div className="bc-section-inner">
          <span className="bc-section-label">Our Approach</span>
          <h2 className="bc-section-title" style={{ textAlign: 'center' }}>
            The Consulting <span>Process</span>
          </h2>
          <p className="bc-section-intro" style={{ margin: '0 auto 56px', textAlign: 'center' }}>
            A disciplined, five-stage methodology ensures every engagement delivers clear outcomes —
            not just recommendations that sit in a drawer.
          </p>
          <div className="bc-process-steps">
            {STEPS.map((step) => (
              <div className="bc-step" key={step.num}>
                <div className="bc-step-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Kevin ── */}
      <section className="bc-section">
        <div className="bc-section-inner">
          <span className="bc-section-label">Why It Matters</span>
          <h2 className="bc-section-title">
            Without Expert Guidance vs. <span>Structured Advisory</span>
          </h2>
          <p className="bc-section-intro">
            The gap between businesses that thrive and those that struggle is rarely about effort —
            it's about having the right expertise at the right moment.
          </p>
          <div className="bc-why-grid">
            <div className="bc-why-panel bc-why-panel--problem">
              <h3>⚠️ Without a Business Consultant</h3>
              <ul className="bc-why-list">
                {PROBLEMS.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
            <div className="bc-why-panel bc-why-panel--solution">
              <h3>✅ With Structured Consulting</h3>
              <ul className="bc-why-list">
                {SOLUTIONS.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bc-cta">
        <h2>Ready to Work with a Business Consultant?</h2>
        <p>
          Get expert business consulting services tailored to your sector, scale, and ambitions.
          Book a no-obligation consultation today.
        </p>
        <div className="bc-cta-btns">
          <Link to="/contact" className="bc-btn-primary">Book a Consultation</Link>
          <Link to="/services" className="bc-btn-outline">View All Services</Link>
        </div>
      </section>
    </div>
  );
};

export default BusinessConsultant;