import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, slideInLeft } from '../../../utils/motion';
import SEO from '../../../components/common/SEO/SEO';
import { Honeypot, Turnstile, TURNSTILE_ENABLED, useFillTimer } from '../../../components/common/FormGuard/FormGuard';
import MarketingOptIn from '../../../components/common/MarketingOptIn/MarketingOptIn';
// Shares the Navy Executive layout primitives (hero, sections, enquiry panel)
// with the PFI page; ef- classes in EquityFinancing.css cover what's unique here.
import '../ProjectFundersInvestors/ProjectFundersInvestors.css';
import './EquityFinancing.css';

/* ── Constants ───────────────────────────────────────────────────────────── */
const CALENDLY    = 'https://calendly.com/kevingraham';
const WORKER_URL  = 'https://pfi-enquiry.grahamkarimi.com';
const MIN_FUNDING = 500_000; // $500K floor — matches the PFI enquiry form
const CANONICAL   = 'https://grahamkarimi.com/services/equity-financing';
const FCA_REGISTER = 'https://register.fca.org.uk/s/individual?id=003b000000LUZUPAA5'; // same link as Footer

/* ── Data ────────────────────────────────────────────────────────────────── */

const QUALS = [
  'Advisory for raises from $500K — no upper ceiling',
  'UK, Africa and international markets',
  'Private equity, growth, structured and mezzanine capital',
  'Strictly confidential — NDA available on request',
];

const FUNDING_USES = [
  'Expansion into new markets or sites',
  'Construction and commissioning of new facilities',
  'Acquisitions and buy-and-build strategies',
  'Working capital for scaling operations',
  'Refinancing expensive short-term debt',
  'Equity contribution required by lenders on project finance deals',
];

const REVIEW_ITEMS = [
  'Historical accounts and management accounts',
  'Financial model and key assumptions',
  'Corporate and ownership structure',
  'Existing debt, security and shareholder agreements',
  'Market and competitor evidence',
];

const DOCS_READY = [
  'Last two to three years of financial statements',
  'Current business plan or project feasibility study',
  'Cap table and company registration documents',
];

// Steps 2–4; step 1 (readiness assessment) is rendered in full above these.
const STEPS = [
  { n: 2, title: 'Transaction structuring',                desc: 'We recommend the right mix of equity, quasi equity and debt for your situation, and set out a realistic valuation range and use of funds.' },
  { n: 3, title: 'Investor materials',                     desc: 'We prepare or refine your teaser, information memorandum, financial model and pitch deck so they meet the standard institutional investors expect.' },
  { n: 4, title: 'Investor introductions and negotiation', desc: 'We approach a targeted list of investors, manage questions and due diligence requests, and support you through term sheet negotiation.' },
];

const EQUITY_TYPES = [
  {
    id: 'private-equity',
    tag: 'Established businesses',
    title: 'Private Equity Financing',
    desc: 'Investment from private equity funds in established businesses with proven revenue. Investors usually take a significant minority or majority stake and work with management to grow the company over four to seven years.',
    fitTitle: 'Who Private Equity Financing Suits',
    fit: ['Profitable companies looking to scale', 'Founders seeking partial liquidity', 'Businesses planning acquisitions'],
  },
  {
    id: 'growth-equity',
    tag: 'Minority investment',
    title: 'Growth Equity',
    desc: 'Minority investment for companies that are already growing and need capital to accelerate. Founders keep control, and the investor supports expansion without taking over day-to-day management.',
    fitTitle: 'Who Growth Equity Suits',
    fit: ['Companies with strong revenue growth', 'Businesses entering new regions', 'Owners who want to keep a majority stake'],
  },
  {
    id: 'structured-equity',
    tag: 'Hybrid instruments',
    title: 'Structured and Quasi Equity Finance',
    desc: 'Hybrid instruments such as preferred shares, convertible loans and revenue-linked returns. Structured equity finance can reduce dilution while giving investors downside protection.',
    fitTitle: 'When Structured Equity Makes Sense',
    fit: ['The valuation gap between you and investors is wide', 'Cash flow is predictable but not yet strong enough for senior debt', 'You want to limit dilution for existing shareholders'],
  },
  {
    id: 'equity-bridge',
    tag: 'Short-term capital',
    title: 'Equity Bridge Financing',
    desc: 'Short-term capital that covers the period before a larger equity round or project financial close. Often used to fund development costs, permits or early works.',
  },
];

const MEZZANINE_USES = [
  'Closing a funding gap on a project or acquisition',
  'Management buyouts',
  'Expansion where senior lenders have reached their limit',
];

const INVESTOR_TYPES = [
  { icon: 'fas fa-briefcase',    name: 'Private equity funds',            desc: 'Including small and mid-market firms' },
  { icon: 'fas fa-chart-line',   name: 'Growth equity investors',         desc: 'Minority capital for scaling companies' },
  { icon: 'fas fa-users',        name: 'Family offices',                  desc: 'And private investment companies' },
  { icon: 'fas fa-globe-africa', name: 'DFIs and impact investors',       desc: 'Development finance institutions' },
  { icon: 'fas fa-handshake',    name: 'Strategic investors',             desc: 'Corporate and industry investors' },
  { icon: 'fas fa-solar-panel',  name: 'Infrastructure and energy funds', desc: 'Long-horizon asset investors' },
];

const KEY_SECTORS = [
  {
    title: 'Healthcare Private Equity',
    desc: 'Hospitals, clinics, diagnostics, pharmacy chains and digital health platforms. Healthcare investors look closely at licensing, patient volumes, payer mix and management depth.',
  },
  {
    title: 'Infrastructure Private Equity',
    desc: 'Ports, shipyards, logistics, real estate and industrial projects. These raises often combine equity with project finance debt, and investors expect a bankable feasibility study.',
  },
  {
    title: 'Renewable Energy Private Equity',
    desc: 'Solar, wind, waste-to-energy and clean technology projects. Investors focus on offtake agreements, grid connection and permitting status.',
  },
];

const OTHER_SECTORS = [
  'Agriculture and agro-processing',
  'Fintech and financial services',
  'Waste management and recycling',
  'Leisure and hospitality',
];

const COMPARISON = [
  { label: 'Repayment', equity: 'No fixed repayments',                              debt: 'Scheduled repayments with interest' },
  { label: 'Ownership', equity: 'You share ownership',                              debt: 'You keep full ownership' },
  { label: 'Security',  equity: 'Usually unsecured',                                debt: 'Often secured on assets' },
  { label: 'Cost',      equity: 'Higher long-term cost if the business grows',      debt: 'Lower cost if cash flow is stable' },
  { label: 'Best for',  equity: 'Growth, early-stage projects, high-risk ventures', debt: 'Stable cash flow, asset-backed businesses' },
];

const PROS = [
  'No repayment pressure on cash flow',
  'Investors share the risk',
  'Access to investor networks and experience',
];

const CONS = [
  'Dilution of ownership',
  'Investor reporting and governance requirements',
  'Longer process than most loans',
];

const READINESS = [
  'We have at least two years of audited or reviewed accounts, or a bankable feasibility study for a new project',
  'We have a financial model with clear assumptions',
  'Our ownership and legal structure are documented and clean',
  'We know how much we need and how we will use it',
  'Our management team can commit time to an investor process',
];

const FAQS = [
  {
    q: 'How long does equity financing take?',
    a: 'A typical equity raise takes four to nine months from preparation to completion. Larger or more complex transactions can take longer.',
  },
  {
    q: 'How much equity will I have to give up?',
    a: 'That depends on your valuation, the amount raised and the type of instrument. Structured equity and mezzanine options can reduce dilution.',
  },
  {
    q: 'Do you provide the capital yourselves?',
    a: 'No. We are advisers. We prepare your raise and introduce you to investors. Investment decisions are made by the investors.',
  },
  {
    q: 'Can you guarantee funding?',
    a: 'No adviser can guarantee funding. We give you an honest view of your chances before you commit to a full process.',
  },
  {
    q: 'What is the minimum raise you work on?',
    a: 'We work on raises from USD 500,000. For smaller amounts we can point you to suitable alternatives.',
  },
  {
    q: 'Do you work with businesses outside the UK?',
    a: 'Yes. We work with companies and project sponsors across Africa, Europe and other international markets.',
  },
];

const FEES = {
  heading: 'Fees and engagement',
  body: 'No upfront fees are required. Where professional services or advisory work are needed ahead of disbursement, that time is compensated — agreed transparently before any work begins. You receive a written engagement letter setting out scope, fees and timelines before any work starts.',
};

const SECTORS_DROPDOWN = [
  'Healthcare',
  'Infrastructure',
  'Renewable energy',
  'Agriculture & agro-processing',
  'Fintech & financial services',
  'Waste management & recycling',
  'Leisure & hospitality',
  'Real estate',
  'Manufacturing & industrial',
  'Technology',
  'Other',
];

const STAGES = [
  { value: 'Startup',   label: 'Startup' },
  { value: 'Operating', label: 'Operating business' },
  { value: 'Project',   label: 'Project' },
];

const MIN_DESCRIPTION = 50;

/* ══════════════════════════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════════════════════════ */

function parseFundingAmount(raw) {
  if (!raw || !raw.trim()) return null;
  const str = raw.trim().toLowerCase()
    .replace(/,/g, '').replace(/\s+/g, '').replace(/^[$€£¥]/g, '');
  const match = str.match(/^(\d+(?:\.\d+)?)(k|m|b|million|billion|thousand)?$/);
  if (!match) return null;
  const num    = parseFloat(match[1]);
  const suffix = match[2] || '';
  if (isNaN(num)) return null;
  if (suffix === 'k' || suffix === 'thousand') return num * 1_000;
  if (suffix === 'm' || suffix === 'million')  return num * 1_000_000;
  if (suffix === 'b' || suffix === 'billion')  return num * 1_000_000_000;
  return num;
}

function validatePhone(val) {
  if (!val || !val.trim()) return 'Phone number is required.';
  const stripped = val.trim().replace(/[\s\-().]/g, '');
  if (!/^\+\d{7,15}$/.test(stripped)) {
    return 'Please use international format, e.g. +44 7700 900000';
  }
  return '';
}

function validateDescription(val) {
  if (!val || !val.trim()) return 'A short description is required.';
  if (val.trim().length < MIN_DESCRIPTION) {
    return `At least ${MIN_DESCRIPTION} characters required (${val.trim().length}/${MIN_DESCRIPTION})`;
  }
  return '';
}

const inlineErr = {
  fontSize: '11px', color: '#c0392b',
  marginTop: '4px', fontWeight: 400, display: 'block',
};

const makeConversionToken = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

/* ══════════════════════════════════════════════════════════════════════════
   ENQUIRY PANEL
   Posts to the shared PFI worker, which requires name/org/email/phone/
   country/sector/range/summary. Stage has no worker field, so it is
   prepended to the summary along with the page source.
   ══════════════════════════════════════════════════════════════════════════ */
const EnquiryPanel = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    name: '', company: '', email: '', phone: '',
    country: '', sector: '', amount: '', stage: '', description: '',
  });
  const [agreed,      setAgreed]      = useState(false);
  const [status,      setStatus]      = useState('idle'); // idle | sending | error
  const [amountError, setAmountError] = useState('');
  const [phoneError,  setPhoneError]  = useState('');
  const [descError,   setDescError]   = useState('');
  const [descTouched, setDescTouched] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [website,     setWebsite]     = useState(''); // honeypot
  const fillMs = useFillTimer();
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileKey, setTurnstileKey] = useState(0); // remount → fresh single-use token

  const resetTurnstile = () => { setTurnstileToken(''); setTurnstileKey(k => k + 1); };

  const validateAmount = (val) => {
    if (!val.trim()) { setAmountError('Amount sought is required.'); return false; }
    const amount = parseFundingAmount(val);
    if (amount === null) {
      setAmountError('Please enter a valid amount — e.g. 500,000 or 2,500,000');
      return false;
    }
    if (amount < MIN_FUNDING) {
      setAmountError('We advise on raises from $500K upward.');
      return false;
    }
    setAmountError('');
    return true;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const cleaned = name === 'amount' ? value.replace(/[^\d,.]/g, '') : value;
    setFields(f => ({ ...f, [name]: cleaned }));
    if (name === 'amount')      validateAmount(cleaned);
    if (name === 'phone')       setPhoneError(validatePhone(value));
    if (name === 'description') setDescError(validateDescription(value));
  };

  const allFilled = Object.values(fields).every(v => v && v.trim());
  const sending   = status === 'sending';

  const canSubmit =
    allFilled && !amountError && !phoneError && !descError && agreed && !sending &&
    (!TURNSTILE_ENABLED || turnstileToken);

  const handleSubmit = async () => {
    const amountOk = validateAmount(fields.amount);
    const phoneMsg = validatePhone(fields.phone);
    const descMsg  = validateDescription(fields.description);
    if (phoneMsg) setPhoneError(phoneMsg);
    if (descMsg)  { setDescError(descMsg); setDescTouched(true); }

    if (!allFilled || !amountOk || phoneMsg || descMsg || !agreed) {
      setSubmitError('Please complete all required fields before submitting.');
      return;
    }

    setSubmitError('');
    setStatus('sending');

    const payload = {
      name:    fields.name,
      org:     fields.company,
      email:   fields.email,
      phone:   fields.phone,
      country: fields.country,
      sector:  fields.sector,
      range:   fields.amount,
      summary: `[Equity Financing enquiry — Stage: ${fields.stage}]\n\n${fields.description}`,
      website,
      turnstileToken,
      fillMs: fillMs(),
      marketingOptIn,
    };

    try {
      const res  = await fetch(WORKER_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        const token = makeConversionToken();
        sessionStorage.setItem('gk-conv-token', token);
        navigate('/thank-you', { state: { token, source: 'equity', email: fields.email, marketingOptIn } });
      } else {
        setStatus('error');
        resetTurnstile();
        setSubmitError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      resetTurnstile();
      setSubmitError(
        'Network error — please check your connection and try again, or email kevin.uk@grahamkarimi.com directly.'
      );
    }
  };

  return (
    <div className="pfi-enquiry-panel ef-enquiry-panel" id="enquiry" aria-label="Equity financing enquiry form">

      <div className="pfi-ep-head">
        <div className="pfi-ep-head-title">
          <span className="pfi-ep-dot" aria-hidden="true" />
          Funding readiness review
        </div>
        <div className="pfi-ep-head-sub">Confidential · Reply within 48 hours</div>
      </div>

      <div className="pfi-ep-body">

        <div className="pfi-ef-row">
          <div className="pfi-ef">
            <label htmlFor="ef-name">Name *</label>
            <input id="ef-name" type="text" name="name" placeholder="Full name"
              value={fields.name} onChange={onChange} required aria-required="true"
              disabled={sending} />
          </div>
          <div className="pfi-ef">
            <label htmlFor="ef-company">Company *</label>
            <input id="ef-company" type="text" name="company" placeholder="Company / project entity"
              value={fields.company} onChange={onChange} required aria-required="true"
              disabled={sending} />
          </div>
        </div>

        <div className="pfi-ef-row">
          <div className="pfi-ef">
            <label htmlFor="ef-email">Email *</label>
            <input id="ef-email" type="email" name="email" placeholder="your@company.com"
              value={fields.email} onChange={onChange} required aria-required="true"
              disabled={sending} />
          </div>
          <div className="pfi-ef">
            <label htmlFor="ef-phone">Phone (intl. format) *</label>
            <input id="ef-phone" type="tel" name="phone" placeholder="+44 7723 339858"
              value={fields.phone} onChange={onChange} required aria-required="true"
              disabled={sending} />
            {phoneError && <span style={inlineErr}>{phoneError}</span>}
          </div>
        </div>

        <div className="pfi-ef-row">
          <div className="pfi-ef">
            <label htmlFor="ef-country">Country *</label>
            <input id="ef-country" type="text" name="country" placeholder="e.g. UK, Kenya, Nigeria"
              value={fields.country} onChange={onChange} required aria-required="true"
              disabled={sending} />
          </div>
          <div className="pfi-ef">
            <label htmlFor="ef-sector">Sector *</label>
            <select id="ef-sector" name="sector" value={fields.sector} onChange={onChange}
              required aria-required="true" disabled={sending}>
              <option value="">Select sector</option>
              {SECTORS_DROPDOWN.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="pfi-ef-row">
          <div className="pfi-ef">
            <label htmlFor="ef-amount">Amount sought (USD) *</label>
            <input id="ef-amount" type="text" name="amount" inputMode="numeric" placeholder="e.g. 2,500,000"
              value={fields.amount} onChange={onChange} required aria-required="true"
              disabled={sending} />
            {amountError && <span style={inlineErr}>{amountError}</span>}
          </div>
          <div className="pfi-ef">
            <label htmlFor="ef-stage">Stage *</label>
            <select id="ef-stage" name="stage" value={fields.stage} onChange={onChange}
              required aria-required="true" disabled={sending}>
              <option value="">Select stage</option>
              {STAGES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>

        <div className="pfi-ef">
          <label htmlFor="ef-description">
            Short description * <small style={{ fontWeight: 400, opacity: 0.7 }}>(min. {MIN_DESCRIPTION} chars)</small>
          </label>
          <textarea id="ef-description" name="description"
            placeholder="What does the business or project do, how much are you raising and what will the capital be used for?"
            value={fields.description} onChange={onChange} required aria-required="true"
            disabled={sending}
            onBlur={() => { setDescTouched(true); setDescError(validateDescription(fields.description)); }}
          />
          {descTouched && descError && <span style={inlineErr}>{descError}</span>}
        </div>

        <div className="pfi-conf-row">
          <input type="checkbox" id="ef-conf" checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            aria-required="true" disabled={sending} />
          <label htmlFor="ef-conf">
            I understand this enquiry is confidential and consent to being
            contacted about equity financing options. *
          </label>
        </div>

        <MarketingOptIn id="ef-optin" checked={marketingOptIn}
          onChange={setMarketingOptIn} disabled={sending} />

        <Honeypot value={website} onChange={setWebsite} />
        <Turnstile key={turnstileKey} onToken={setTurnstileToken} />

        {submitError && (
          <p style={{ ...inlineErr, marginBottom: '10px' }} role="alert">{submitError}</p>
        )}

        <button
          className="pfi-ep-submit"
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            width:   '100%',
            opacity: sending ? 0.75 : 1,
            cursor:  sending ? 'wait' : undefined,
          }}
        >
          {sending ? (
            <><i className="fas fa-circle-notch fa-spin" aria-hidden="true" /> &nbsp;Sending…</>
          ) : (
            <><i className="fas fa-paper-plane" aria-hidden="true" /> &nbsp;Book a Funding Readiness Review</>
          )}
        </button>

      </div>

      <div className="pfi-ep-foot">
        By submitting this form you consent to being contacted about your enquiry.
        All submissions are treated in strict confidence and subject to eligibility assessment.
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   READINESS CHECKLIST
   ══════════════════════════════════════════════════════════════════════════ */
const ReadinessChecklist = () => {
  const [checked, setChecked] = useState(() => READINESS.map(() => false));
  const count = checked.filter(Boolean).length;

  const toggle = (i) => setChecked(c => c.map((v, j) => (j === i ? !v : v)));

  let verdict = 'Tick the statements that are true for your business today.';
  if (count >= 4)      verdict = 'You are likely ready to start a conversation with equity investors.';
  else if (count >= 1) verdict = 'Some groundwork is needed first — a readiness review will show you exactly what.';

  return (
    <div className="ef-checklist">
      <ul className="ef-check-list">
        {READINESS.map((item, i) => (
          <li key={item}>
            <label className={`ef-check${checked[i] ? ' is-checked' : ''}`}>
              <input type="checkbox" checked={checked[i]} onChange={() => toggle(i)} />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className="ef-check-result" aria-live="polite">
        <div className="ef-check-score">{count}<span>/{READINESS.length}</span></div>
        <p>{verdict}</p>
        <button type="button" className="pfi-btn-gold" onClick={() => scrollToId('enquiry')}>
          <i className="fas fa-clipboard-check" aria-hidden="true" />
          Take the Funding Readiness Review
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════════════════════════════════ */
const EquityFinancing = () => {
  const { hash } = useLocation();

  // Ad groups land on section anchors (e.g. #mezzanine-financing), so honour
  // the hash instead of always resetting to the top.
  useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView({ behavior: 'auto' });
    else window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [hash]);

  return (
    <div className="pfi-page ef-page">

      <SEO
        title="Equity Financing for Growing Businesses"
        description="Equity financing advisory for growth companies and project sponsors: funding readiness review, investor materials and introductions to private equity investors."
        keywords="equity financing, private equity financing, equity investors, growth equity, private business funding, structured equity finance, mezzanine financing, equity bridge financing, debt and equity financing"
        canonical={CANONICAL}
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              name: 'Equity Financing Advisory',
              description: 'Funding readiness review, investor materials and introductions to private equity, growth equity, family office and strategic investors for growth companies and project sponsors.',
              provider: {
                '@type': 'Person',
                name: 'Kevin Graham',
                url: 'https://grahamkarimi.com',
                telephone: '+447723339858',
                email: 'kevin.uk@grahamkarimi.com',
              },
              serviceType: 'Equity Financing Advisory',
              areaServed: { '@type': 'Country', name: 'Global' },
              url: CANONICAL,
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home',             item: 'https://grahamkarimi.com/' },
                { '@type': 'ListItem', position: 2, name: 'Services',         item: 'https://grahamkarimi.com/services' },
                { '@type': 'ListItem', position: 3, name: 'Equity Financing', item: CANONICAL },
              ],
            },
            {
              '@type': 'FAQPage',
              mainEntity: FAQS.map(f => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
          ],
        }}
      />

      <main id="main-content">

        {/* HERO */}
        <section className="pfi-hero ef-hero" aria-labelledby="top">
          <div className="pfi-hi">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.nav variants={staggerItem} className="pfi-breadcrumb" aria-label="Breadcrumb">
                <Link to="/"><i className="fas fa-home" aria-hidden="true" /> Home</Link>
                <span className="pfi-sep"><i className="fas fa-chevron-right" aria-hidden="true" /></span>
                <Link to="/services">Services</Link>
                <span className="pfi-sep"><i className="fas fa-chevron-right" aria-hidden="true" /></span>
                <span className="pfi-cur">Equity Financing</span>
              </motion.nav>

              <motion.div variants={staggerItem} className="pfi-eyebrow" aria-hidden="true">
                <div className="pfi-eyebrow-line" />
                <div className="pfi-eyebrow-text">Equity Financing Advisory</div>
              </motion.div>

              <motion.h1 variants={staggerItem} id="top" className="ef-anchor">
                Equity financing for growing<br />
                <em>businesses and project sponsors</em>
              </motion.h1>

              <motion.div variants={staggerItem} className="pfi-hero-rule" aria-hidden="true" />

              <motion.p variants={staggerItem} className="pfi-hero-body ef-hero-body">
                Raise growth capital from private equity, family offices and strategic investors.
                We assess your funding readiness, prepare your investor materials and introduce you
                to equity investors that fit your sector, stage and ticket size.
              </motion.p>

              <motion.div variants={staggerItem} className="pfi-cta-btns ef-hero-btns">
                <button type="button" className="pfi-btn-outline" onClick={() => scrollToId('readiness')}>
                  <i className="fas fa-clipboard-list" aria-hidden="true" />
                  Check If Your Project Qualifies
                </button>
              </motion.div>

              <motion.div variants={staggerItem} className="pfi-quals ef-quals" aria-label="Key qualifications">
                {QUALS.map((q) => (
                  <div key={q} className="pfi-qual-row">
                    <div className="pfi-qual-icon" aria-hidden="true" />
                    {q}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <EnquiryPanel />
          </div>
        </section>

        {/* WHY EQUITY */}
        <section className="pfi-sec" aria-labelledby="ef-why-heading">
          <div className="pfi-inner">
            <span className="pfi-stag">Why equity</span>
            <h2 id="ef-why-heading" className="pfi-stitle">Why Businesses Choose Equity Financing Over Debt</h2>
            <p className="pfi-ssub ef-ssub-wide">
              Equity financing gives you capital without fixed repayments. Investors take a share of
              the business and, in return, carry part of the risk. This suits companies that are
              growing fast, building assets with long payback periods, or already carrying as much
              debt as their cash flow allows.
            </p>
            <div className="ef-two-col">
              <div className="ef-panel">
                <h3>What Equity Financing Can Fund</h3>
                <ul className="ef-ticks">
                  {FUNDING_USES.map(u => <li key={u}>{u}</li>)}
                </ul>
              </div>
              <div className="ef-panel">
                <h3>What Investors Expect in Return</h3>
                <p>
                  Equity investors look for a credible growth plan, a clear exit route and a
                  management team they can back. They will ask for a board seat or reporting rights
                  in most cases, and they will price the deal against the risk they see.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="pfi-sec-alt ef-anchor" id="how-it-works" aria-labelledby="ef-process-heading">
          <div className="pfi-inner">
            <span className="pfi-stag">Our process</span>
            <h2 id="ef-process-heading" className="pfi-stitle">How Our Equity Financing Process Works</h2>
            <p className="pfi-ssub">
              We work with you from first assessment to signed term sheet. You stay in control of
              the decision at every stage.
            </p>

            <div className="ef-step1">
              <div className="pfi-step-circle active" aria-hidden="true">1</div>
              <div className="ef-step1-body">
                <h3>Step 1: Funding Readiness Assessment</h3>
                <p>
                  We review your financials, business plan, legal structure and capital needs. You
                  receive a written assessment of how fundable the raise is today and what needs to
                  change before you approach investors.
                </p>
                <div className="ef-step1-grid">
                  <div>
                    <h4>What We Review</h4>
                    <ul className="ef-ticks">
                      {REVIEW_ITEMS.map(r => <li key={r}>{r}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h5>Documents to Have Ready</h5>
                    <ul className="ef-ticks">
                      {DOCS_READY.map(d => <li key={d}>{d}</li>)}
                    </ul>
                    <h6 className="ef-timeline">
                      <i className="far fa-clock" aria-hidden="true" /> Typical timeline: 2 to 3 weeks from receipt of documents
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="pfi-steps ef-steps" role="list" aria-label="Remaining process steps">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.n}
                  className="pfi-step"
                  role="listitem"
                  variants={slideInLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                >
                  <div className="pfi-step-circle" aria-hidden="true">{s.n}</div>
                  <h3 className="pfi-step-t">Step {s.n}: {s.title}</h3>
                  <div className="pfi-step-d">{s.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TYPES OF EQUITY FINANCING */}
        <section className="pfi-sec ef-anchor" id="types-of-equity-financing" aria-labelledby="ef-types-heading">
          <div className="pfi-inner">
            <span className="pfi-stag">Structures</span>
            <h2 id="ef-types-heading" className="pfi-stitle">Types of Equity Financing We Arrange</h2>
            <p className="pfi-ssub">
              Different stages and assets call for different structures. These are the main
              options we work with.
            </p>
            <motion.div
              className="ef-types-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {EQUITY_TYPES.map(t => (
                <motion.article key={t.id} className="ef-type-card" variants={staggerItem}>
                  <div className="pfi-sc-type">{t.tag}</div>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                  {t.fit && (
                    <>
                      <h4>{t.fitTitle}</h4>
                      <ul className="ef-ticks">
                        {t.fit.map(f => <li key={f}>{f}</li>)}
                      </ul>
                    </>
                  )}
                </motion.article>
              ))}

              <motion.article
                className="ef-type-card ef-type-card--wide ef-anchor"
                id="mezzanine-financing"
                variants={staggerItem}
              >
                <div className="pfi-sc-type">Between debt and equity</div>
                <h3>Mezzanine Financing</h3>
                <p>
                  Mezzanine capital sits between senior debt and equity. It carries higher returns
                  than bank lending and often includes an equity kicker, but it dilutes owners less
                  than a full equity raise.
                </p>
                <h4>Common Uses of Mezzanine Financing</h4>
                <ul className="ef-ticks">
                  {MEZZANINE_USES.map(m => <li key={m}>{m}</li>)}
                </ul>
              </motion.article>
            </motion.div>
          </div>
        </section>

        {/* INVESTORS */}
        <section className="pfi-sec-alt ef-anchor" id="equity-investors" aria-labelledby="ef-investors-heading">
          <div className="pfi-inner">
            <span className="pfi-stag">Capital sources</span>
            <h2 id="ef-investors-heading" className="pfi-stitle">Equity Investors We Work With</h2>
            <p className="pfi-ssub">
              Finding the right equity investors matters as much as the capital itself. We match
              your raise to investors whose mandate, ticket size and sector focus fit your business.
            </p>
            <h3 className="ef-subhead">Investor Types</h3>
            <motion.div
              className="pfi-sectors-grid ef-investor-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {INVESTOR_TYPES.map(inv => (
                <motion.div key={inv.name} className="pfi-sector-pill" variants={staggerItem}>
                  <span className="pfi-sp-icon" aria-hidden="true"><i className={inv.icon} /></span>
                  <div className="pfi-sp-name">{inv.name}</div>
                  <div className="pfi-sp-desc">{inv.desc}</div>
                </motion.div>
              ))}
            </motion.div>
            <div className="ef-panel ef-shortlist">
              <h3>How We Shortlist Investors</h3>
              <p>
                We filter investors by sector, geography, stage, ticket size and recent activity, so
                your time goes to conversations with a real chance of closing.
              </p>
            </div>
          </div>
        </section>

        {/* SECTORS */}
        <section className="pfi-sec ef-anchor" id="sectors" aria-labelledby="ef-sectors-heading">
          <div className="pfi-inner">
            <span className="pfi-stag">Sector focus</span>
            <h2 id="ef-sectors-heading" className="pfi-stitle">Sectors We Support</h2>
            <p className="pfi-ssub">
              We focus on sectors where we understand the risk profile and the investor base.
            </p>
            <motion.div
              className="pfi-sources-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {KEY_SECTORS.map(s => (
                <motion.div key={s.title} className="pfi-source-card" variants={staggerItem}>
                  <h3 className="pfi-sc-name">{s.title}</h3>
                  <div className="pfi-sc-desc">{s.desc}</div>
                </motion.div>
              ))}
            </motion.div>
            <h3 className="ef-subhead">Other Sectors</h3>
            <ul className="ef-chips">
              {OTHER_SECTORS.map(s => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </section>

        {/* DEBT VS EQUITY */}
        <section className="pfi-sec-alt ef-anchor" id="debt-vs-equity-financing" aria-labelledby="ef-compare-heading">
          <div className="pfi-inner">
            <span className="pfi-stag">Debt vs equity</span>
            <h2 id="ef-compare-heading" className="pfi-stitle">Debt vs Equity Financing: Which Is Right for You?</h2>
            <p className="pfi-ssub">
              Most businesses use a combination of debt and equity financing. The right balance
              depends on your cash flow, assets and growth plans.
            </p>
            <div className="ef-table-wrap">
              <table className="ef-table">
                <thead>
                  <tr>
                    <td />
                    <th scope="col">Equity Financing</th>
                    <th scope="col">Debt Financing</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map(row => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td>{row.equity}</td>
                      <td>{row.debt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="ef-two-col">
              <div className="ef-panel">
                <h3>Pros of Equity Financing</h3>
                <ul className="ef-ticks">
                  {PROS.map(p => <li key={p}>{p}</li>)}
                </ul>
              </div>
              <div className="ef-panel">
                <h3>Cons of Equity Financing</h3>
                <ul className="ef-ticks ef-ticks--minus">
                  {CONS.map(c => <li key={c}>{c}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* READINESS */}
        <section className="pfi-sec ef-anchor" id="readiness" aria-labelledby="ef-readiness-heading">
          <div className="pfi-inner">
            <span className="pfi-stag">Self-assessment</span>
            <h2 id="ef-readiness-heading" className="pfi-stitle">Is Your Business Ready for Equity Investors?</h2>
            <p className="pfi-ssub">
              Answer these questions honestly. If you can say yes to most of them, you are likely
              ready to start a conversation.
            </p>
            <ReadinessChecklist />
          </div>
        </section>

        {/* FEES */}
        <div className="pfi-no-fee-banner" role="region" aria-labelledby="ef-fees-heading">
          <div className="pfi-nfb-inner">
            <h2 id="ef-fees-heading" className="pfi-nfb-h">{FEES.heading}</h2>
            <p className="pfi-nfb-p">{FEES.body}</p>
          </div>
        </div>

        {/* FAQ */}
        <section className="pfi-sec-alt" aria-labelledby="ef-faq-heading">
          <div className="pfi-inner">
            <span className="pfi-stag">FAQs</span>
            <h2 id="ef-faq-heading" className="pfi-stitle">Equity Financing FAQs</h2>
            <div className="ef-faq">
              {FAQS.map(f => (
                <details key={f.q} className="ef-faq-item">
                  <summary><h3>{f.q}</h3></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* START / ENQUIRY */}
        <motion.section
          className="pfi-cta ef-start"
          aria-labelledby="ef-start-heading"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <h2 id="ef-start-heading">Start Your Equity Financing Process</h2>
          <p>
            Tell us about your business or project. We will reply within 48 hours with next steps.
          </p>
          <div className="pfi-cta-btns">
            <button type="button" className="pfi-btn-gold" onClick={() => scrollToId('enquiry')}>
              <i className="fas fa-file-signature" aria-hidden="true" />
              Start your enquiry
            </button>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="pfi-btn-outline">
              <i className="fas fa-calendar-check" aria-hidden="true" />
              Prefer to talk? Schedule a call
            </a>
          </div>
          <p className="pfi-cta-disc">
            Kevin Graham provides corporate finance advisory services. We do not lend money or
            make investment decisions, and we cannot guarantee that any raise will succeed.
            Nothing on this page constitutes a financial promotion for any specific product.
            All enquiries are subject to eligibility assessment.
          </p>
          <p className="pfi-cta-disc ef-reg">
            Kevin Graham is listed on the{' '}
            <a href={FCA_REGISTER} target="_blank" rel="noopener noreferrer">FCA Financial Services Register</a>{' '}
            (reference KXG00024) as an individual certified/assessed by an authorised firm that is
            regulated for certain activities. The FCA does not directly approve certified
            individuals. No FCA or PRA disciplinary or regulatory action is recorded.
          </p>
        </motion.section>

      </main>
    </div>
  );
};

export default EquityFinancing;
