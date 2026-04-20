import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../../components/common/SEO/SEO';
import './ProjectFundersInvestors.css';

/* ── Constants ───────────────────────────────────────────────────────────── */
const CALENDLY    = 'https://calendly.com/kevingraham';
const WORKER_URL  = 'https://pfi-enquiry.nehlmac4.workers.dev';
const MIN_FUNDING = 1_000_000; // $1M floor

/* ── Data ────────────────────────────────────────────────────────────────── */

const QUALS = [
  'Minimum project value: $1M — no upper ceiling',
  'Access to DFIs, sovereign funds & private capital desks',
  'All major sectors considered across 40+ countries',
  'Strictly confidential — NDA available on request',
];

const STATS = [
  { n: '$1M+',  l: 'Minimum project size' },
  { n: '40+',   l: 'Countries covered' },
  { n: '48hr',  l: 'Enquiry response' },
  { n: '100+',  l: 'Capital relationships' },
];

const TRUST = [
  { n: 'DFIs',      l: 'Development finance institutions' },
  { n: 'Private',   l: 'Institutional & private lenders' },
  { n: 'Sovereign', l: 'Sovereign & pension funds' },
  { n: 'Dev Banks', l: 'Multilateral development banks' },
  { n: 'Family',    l: 'Family offices & UHNW capital' },
];

const ADVANTAGE = [
  {
    num: '01',
    title: 'Established funder relationships',
    desc: 'Direct access to DFIs, multilateral banks, sovereign funds, and private capital desks — not intermediary directories or cold-introduction services.',
  },
  {
    num: '02',
    title: 'Sector-agnostic mandate',
    desc: 'Infrastructure, energy, property, trade, technology, agriculture — we structure funder introductions across all major project categories globally.',
  },
  {
    num: '03',
    title: 'Structured before introduced',
    desc: 'Projects are assessed for fundability before any capital introduction. Funders only see mandates that are credibly structured and submission-ready.',
  },
  {
    num: '04',
    title: 'Global reach, local expertise',
    desc: 'Active across Africa, MENA, Asia, Europe, and the Americas. Cross-border deal structuring with multi-jurisdiction regulatory expertise.',
  },
];

const SECTORS = [
  { icon: '◈', name: 'Infrastructure',     desc: 'Roads, ports, airports, rail' },
  { icon: '◈', name: 'Energy & utilities', desc: 'Power, renewables, water' },
  { icon: '◈', name: 'Real estate',        desc: 'Commercial, residential, mixed-use' },
  { icon: '◈', name: 'Trade finance',      desc: 'Commodity, supply chain, export' },
  { icon: '◈', name: 'Technology',         desc: 'Deep tech, telecoms, data' },
  { icon: '◈', name: 'Agriculture',        desc: 'Food security, agri-processing' },
  { icon: '◈', name: 'Healthcare',         desc: 'Hospitals, pharma, infrastructure' },
  { icon: '◈', name: 'Mining & resources', desc: 'Extraction, processing, logistics' },
];

const STEPS = [
  { n: '1', active: true, title: 'Enquiry submission',  desc: 'Submit your project details confidentially using the form on this page.' },
  { n: '2',              title: 'Eligibility review',   desc: 'Project viability, structure, and funder alignment assessed within 48 hours.' },
  { n: '3',              title: 'Mandate agreement',    desc: 'NDA signed, advisory mandate agreed, and capital introduction strategy defined.' },
  { n: '4',              title: 'Funder introduction',  desc: "Curated introductions to matched capital sources from Kevin's active network." },
  { n: '5',              title: 'Term sheet & close',   desc: 'Support through due diligence, term negotiation, and financial close.' },
];

const SOURCES = [
  { type: 'Development finance', name: 'DFIs & development banks',   desc: 'World Bank Group, AfDB, AIIB, EBRD, IFC, EIB and bilateral development finance institutions.' },
  { type: 'Private capital',     name: 'Institutional lenders',      desc: 'Private equity funds, infrastructure debt funds, and specialist project finance lenders.' },
  { type: 'Sovereign capital',   name: 'Sovereign & pension funds',  desc: 'Sovereign wealth funds and large pension funds seeking long-term infrastructure and project exposure.' },
  { type: 'Private wealth',      name: 'Family offices & UHNW',      desc: 'Ultra-high-net-worth individuals and family offices deploying capital into large-scale project opportunities.' },
  { type: 'Trade & export',      name: 'Export credit agencies',     desc: 'UK Export Finance and other ECAs providing guarantees, insurance, and direct lending for cross-border projects.' },
  { type: 'Impact capital',      name: 'ESG & impact funds',         desc: 'Green bonds, blended finance, and impact-first capital for climate-aligned or SDG-linked projects.' },
];

const CRITERIA = [
  {
    icon: 'fas fa-dollar-sign',
    title: 'Minimum project size: $1M',
    desc: 'This service is designed for established projects requiring structured institutional or private capital. We do not secure funding for projects below $1M.',
  },
  {
    icon: 'fas fa-file-alt',
    title: 'Documentation readiness',
    desc: 'Projects must have a business plan, financial model, or executive summary. If documentation is incomplete, consider our Document Alignment Services first.',
  },
  {
    icon: 'fas fa-globe',
    title: 'Commercially viable & globally located',
    desc: 'The project must demonstrate commercial viability with a defined use of funds. We accept mandates from all regions — no geographic restriction.',
  },
];

const SECTORS_DROPDOWN = [
  'Infrastructure',
  'Energy & utilities',
  'Real estate & development',
  'Trade finance',
  'Technology & innovation',
  'Agriculture & food security',
  'Healthcare',
  'Mining & resources',
  'Other',
];

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

const inlineErr = {
  fontSize: '11px', color: '#c0392b',
  marginTop: '4px', fontWeight: 400, display: 'block',
};

/* ══════════════════════════════════════════════════════════════════════════
   ENQUIRY PANEL
   ══════════════════════════════════════════════════════════════════════════ */
const EnquiryPanel = () => {
  const [fields, setFields] = useState({
    name: '', org: '', email: '', phone: '',
    country: '', sector: '', range: '', summary: '',
  });
  const [agreed,       setAgreed]       = useState(false);
  const [status,       setStatus]       = useState('idle'); // idle | sending | success | error
  const [fundingError, setFundingError] = useState('');
  const [phoneError,   setPhoneError]   = useState('');
  const [submitError,  setSubmitError]  = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
    if (name === 'range') validateFunding(value);
    if (name === 'phone') setPhoneError(validatePhone(value));
  };

  const validateFunding = (val) => {
    if (!val.trim()) { setFundingError('Funding amount is required.'); return false; }
    const amount = parseFundingAmount(val);
    if (amount === null) {
      setFundingError('Please enter a valid amount — e.g. $5M, $50M, $200,000,000');
      return false;
    }
    if (amount < MIN_FUNDING) {
      setFundingError("We don't secure funding for projects under $1M.");
      return false;
    }
    setFundingError('');
    return true;
  };

  const canSubmit =
    fields.name && fields.org && fields.email && fields.phone &&
    fields.country && fields.sector && fields.range && fields.summary &&
    !fundingError && !phoneError && agreed && status !== 'sending';

  const handleSubmit = async () => {
    const fundingOk = validateFunding(fields.range);
    const phoneMsg  = validatePhone(fields.phone);
    if (phoneMsg) setPhoneError(phoneMsg);

    const allFilled =
      fields.name && fields.org && fields.email && fields.phone &&
      fields.country && fields.sector && fields.range && fields.summary;

    if (!allFilled || !fundingOk || phoneMsg || !agreed) {
      setSubmitError('Please complete all required fields before submitting.');
      return;
    }

    setSubmitError('');
    setStatus('sending');

    try {
      const res  = await fetch(WORKER_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(fields),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setSubmitError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setSubmitError(
        'Network error — please check your connection and try again, or email kevin.uk@grahamkarimi.com directly.'
      );
    }
  };

  /* Success */
  if (status === 'success') {
    return (
      <div className="pfi-enquiry-panel">
        <div className="pfi-ep-head">
          <div className="pfi-ep-head-title">Submit a funding enquiry</div>
          <div className="pfi-ep-head-sub">Confidential · Reviewed within 48 hours</div>
        </div>
        <div className="pfi-ep-confirm">
          <div className="pfi-ep-confirm-icon" style={{ background: 'linear-gradient(135deg,#1565C0,#0D1B4E)', color: '#fff' }}>
            <i className="fas fa-check" aria-hidden="true" />
          </div>
          <h4>Enquiry received</h4>
          <p>
            Your enquiry has been submitted successfully. A confirmation and next-steps
            email has been sent to <strong>{fields.email}</strong>. Kevin will review your
            project and respond within 48 hours (GMT/BST).
          </p>
        </div>
        <div className="pfi-ep-foot">
          All enquiries are treated in strict confidence and subject to eligibility assessment.
        </div>
      </div>
    );
  }

  /* Form */
  return (
    <div className="pfi-enquiry-panel" id="enquiry" aria-label="Funding enquiry panel">

      <div className="pfi-ep-head">
        <div className="pfi-ep-head-title">
          <span className="pfi-ep-dot" aria-hidden="true" />
          Submit a funding enquiry
        </div>
        <div className="pfi-ep-head-sub">Confidential · Reviewed within 48 hours</div>
      </div>

      <div className="pfi-ep-body">

        {/* Name + Org */}
        <div className="pfi-ef-row">
          <div className="pfi-ef">
            <label htmlFor="pfi-name">Your name *</label>
            <input id="pfi-name" type="text" name="name" placeholder="Full name"
              value={fields.name} onChange={onChange} required aria-required="true"
              disabled={status === 'sending'} />
          </div>
          <div className="pfi-ef">
            <label htmlFor="pfi-org">Organisation *</label>
            <input id="pfi-org" type="text" name="org" placeholder="Company / entity"
              value={fields.org} onChange={onChange} required aria-required="true"
              disabled={status === 'sending'} />
          </div>
        </div>

        {/* Email + Phone */}
        <div className="pfi-ef-row">
          <div className="pfi-ef">
            <label htmlFor="pfi-email">Email address *</label>
            <input id="pfi-email" type="email" name="email" placeholder="your@organisation.com"
              value={fields.email} onChange={onChange} required aria-required="true"
              disabled={status === 'sending'} />
          </div>
          <div className="pfi-ef">
            <label htmlFor="pfi-phone">Phone (intl. format) *</label>
            <input id="pfi-phone" type="tel" name="phone" placeholder="+44 7723 339858"
              value={fields.phone} onChange={onChange} required aria-required="true"
              disabled={status === 'sending'} />
            {phoneError && <span style={inlineErr}>{phoneError}</span>}
          </div>
        </div>

        {/* Country */}
        <div className="pfi-ef">
          <label htmlFor="pfi-country">Country of project *</label>
          <input id="pfi-country" type="text" name="country" placeholder="e.g. Nigeria, UAE, UK"
            value={fields.country} onChange={onChange} required aria-required="true"
            disabled={status === 'sending'} />
        </div>

        {/* Sector + Funding */}
        <div className="pfi-ef-row">
          <div className="pfi-ef">
            <label htmlFor="pfi-sector">Project sector *</label>
            <select id="pfi-sector" name="sector" value={fields.sector} onChange={onChange}
              required aria-required="true" disabled={status === 'sending'}>
              <option value="">Select sector</option>
              {SECTORS_DROPDOWN.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="pfi-ef">
            <label htmlFor="pfi-range">Funding required *</label>
            <input id="pfi-range" type="text" name="range" placeholder="e.g. $5M, $50M, $200M"
              value={fields.range} onChange={onChange} required aria-required="true"
              disabled={status === 'sending'} />
            {fundingError && <span style={inlineErr}>{fundingError}</span>}
          </div>
        </div>

        {/* Summary */}
        <div className="pfi-ef">
          <label htmlFor="pfi-summary">Brief project summary *</label>
          <textarea id="pfi-summary" name="summary"
            placeholder="Describe the project, its stage of development, and the nature of funding required…"
            value={fields.summary} onChange={onChange} required aria-required="true"
            disabled={status === 'sending'} />
        </div>

        {/* Checkbox */}
        <div className="pfi-conf-row">
          <input type="checkbox" id="pfi-conf" checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            aria-required="true" disabled={status === 'sending'} />
          <span>
            I understand this enquiry is strictly confidential and consent to being
            contacted regarding funding options. *
          </span>
        </div>

        {submitError && (
          <p style={{ ...inlineErr, marginBottom: '10px' }}>{submitError}</p>
        )}

        {/* Single submit button */}
        <button
          className="pfi-ep-submit"
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            width:      '100%',
            background: canSubmit ? 'var(--gold)' : undefined,
            opacity:    status === 'sending' ? 0.75 : 1,
            cursor:     status === 'sending' ? 'wait' : undefined,
          }}
          aria-label="Submit funding enquiry"
        >
          {status === 'sending' ? (
            <><i className="fas fa-circle-notch fa-spin" aria-hidden="true" /> &nbsp;Sending…</>
          ) : (
            <><i className="fas fa-paper-plane" aria-hidden="true" /> &nbsp;Submit Enquiry</>
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
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════════════════════════════════ */
const ProjectFundersInvestors = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="pfi-page">

      <SEO
        title="Project Funders & Investors — Capital Introduction Advisory"
        description="Kevin Graham connects project sponsors and capital seekers with DFIs, development banks, institutional lenders, sovereign funds, and private capital sources globally. Projects from $1M considered."
        keywords="project funders and investors, capital introduction advisory, project funding investors, DFI funding, development finance institutions, institutional lenders, sovereign wealth funds, private capital placement, project finance advisory, funder introduction, investors looking for projects to fund, international project investors, project funding sources, capital introduction service, project sponsor advisory, funder matching, infrastructure funding, energy project investors, real estate project funders"
        canonical="https://grahamkarimi.com/services/project-funders-and-investors"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Project Funders & Investors — Capital Introduction Advisory',
          description: 'Kevin Graham connects project sponsors with DFIs, development banks, institutional lenders, sovereign funds, and private capital sources across 40+ countries.',
          provider: {
            '@type': 'Person',
            name: 'Kevin Graham',
            url: 'https://grahamkarimi.com',
            telephone: '+447723339858',
            email: 'kevin.uk@grahamkarimi.com',
          },
          serviceType: 'Capital Introduction Advisory',
          areaServed: { '@type': 'Country', name: 'Global' },
          url: 'https://grahamkarimi.com/services/project-funders-and-investors',
        }}
      />

      <main id="main-content">

        {/* HERO */}
        <section className="pfi-hero" aria-labelledby="pfi-h1">
          <div className="pfi-hero-lines" aria-hidden="true">
            <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
              <line x1="0"   y1="150" x2="1200" y2="150" stroke="#b5922e" strokeWidth="0.5" />
              <line x1="0"   y1="300" x2="1200" y2="300" stroke="#b5922e" strokeWidth="0.5" />
              <line x1="0"   y1="450" x2="1200" y2="450" stroke="#b5922e" strokeWidth="0.5" />
              <line x1="200" y1="0"   x2="200"  y2="600" stroke="#b5922e" strokeWidth="0.5" />
              <line x1="500" y1="0"   x2="500"  y2="600" stroke="#b5922e" strokeWidth="0.5" />
              <line x1="900" y1="0"   x2="900"  y2="600" stroke="#b5922e" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="pfi-hi">
            <div>
              <nav className="pfi-breadcrumb" aria-label="Breadcrumb">
                <Link to="/"><i className="fas fa-home" aria-hidden="true" /> Home</Link>
                <span className="pfi-sep"><i className="fas fa-chevron-right" aria-hidden="true" /></span>
                <Link to="/services">Services</Link>
                <span className="pfi-sep"><i className="fas fa-chevron-right" aria-hidden="true" /></span>
                <span className="pfi-cur">Project Funders & Investors</span>
              </nav>

              <div className="pfi-eyebrow" aria-hidden="true">
                <div className="pfi-eyebrow-line" />
                <div className="pfi-eyebrow-text">Capital Introduction Advisory</div>
              </div>

              <h1 id="pfi-h1">
                Project funders &amp;<br />
                <em>investors, connected</em>
              </h1>

              <div className="pfi-hero-rule" aria-hidden="true" />

              <p className="pfi-hero-body">
                Kevin Graham connects project sponsors and capital seekers directly with DFIs,
                development banks, institutional lenders, sovereign funds, and private capital sources
                across 40+ countries — providing structured, curated introductions for projects that
                are commercially viable and ready for funder engagement.
              </p>

              <div className="pfi-quals" aria-label="Key qualifications">
                {QUALS.map((q, i) => (
                  <div key={i} className="pfi-qual-row">
                    <div className="pfi-qual-icon" aria-hidden="true" />
                    {q}
                  </div>
                ))}
              </div>

              <div className="pfi-hero-stats" aria-label="Key statistics">
                {STATS.map((s) => (
                  <div key={s.n}>
                    <div className="pfi-hs-n">{s.n}</div>
                    <div className="pfi-hs-l">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <EnquiryPanel />
          </div>
        </section>

        {/* TRUST BAR */}
        <div className="pfi-trust-bar" role="region" aria-label="Capital source categories">
          <div className="pfi-trust-inner">
            {TRUST.map((t) => (
              <div key={t.n} className="pfi-ti">
                <div className="pfi-ti-n">{t.n}</div>
                <div className="pfi-ti-l">{t.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ADVISORY ADVANTAGE */}
        <section className="pfi-sec" aria-labelledby="pfi-advantage-heading">
          <div className="pfi-inner">
            <span className="pfi-stag">Why work with Kevin</span>
            <h2 id="pfi-advantage-heading" className="pfi-stitle">The advisory advantage</h2>
            <p className="pfi-ssub">
              Securing institutional-scale funding requires relationships, credibility, and the
              right structure. Kevin provides all three — connecting projects to verified capital
              sources with a curated, mandate-driven process.
            </p>
            <div className="pfi-value-grid">
              {ADVANTAGE.map((a) => (
                <div key={a.num} className="pfi-vc">
                  <div className="pfi-vc-num">{a.num}</div>
                  <div className="pfi-vc-t">{a.title}</div>
                  <div className="pfi-vc-d">{a.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ELIGIBILITY */}
        <section className="pfi-sec-alt" aria-labelledby="pfi-criteria-heading">
          <div className="pfi-inner">
            <span className="pfi-stag">Is your project eligible?</span>
            <h2 id="pfi-criteria-heading" className="pfi-stitle">Eligibility criteria</h2>
            <p className="pfi-ssub">
              This service is reserved for projects and sponsors who meet the following baseline
              requirements. If your project does not yet meet these, Kevin's other advisory
              services can help you get there.
            </p>
            <div className="pfi-criteria-grid">
              {CRITERIA.map((c, i) => (
                <div key={i} className="pfi-crit-card">
                  <div className="pfi-crit-icon" aria-hidden="true"><i className={c.icon} /></div>
                  <div className="pfi-crit-t">{c.title}</div>
                  <div className="pfi-crit-d">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTORS */}
        <section className="pfi-sec" aria-labelledby="pfi-sectors-heading">
          <div className="pfi-inner">
            <span className="pfi-stag">Sectors covered</span>
            <h2 id="pfi-sectors-heading" className="pfi-stitle">All major project categories</h2>
            <p className="pfi-ssub">
              Funding mandates are not restricted by sector. If the project is commercially
              viable and appropriately scaled, it will be assessed.
            </p>
            <div className="pfi-sectors-grid">
              {SECTORS.map((s) => (
                <div key={s.name} className="pfi-sector-pill">
                  <span className="pfi-sp-icon" aria-hidden="true">{s.icon}</span>
                  <div className="pfi-sp-name">{s.name}</div>
                  <div className="pfi-sp-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="pfi-sec-alt" aria-labelledby="pfi-process-heading">
          <div className="pfi-inner">
            <span className="pfi-stag">Our process</span>
            <h2 id="pfi-process-heading" className="pfi-stitle">From enquiry to funding placement</h2>
            <p className="pfi-ssub">
              A structured, confidential five-step process designed to protect your
              interests and maximise funder alignment at every stage.
            </p>
            <div className="pfi-steps" role="list" aria-label="Process steps">
              {STEPS.map((s) => (
                <div key={s.n} className="pfi-step" role="listitem">
                  <div className={`pfi-step-circle${s.active ? ' active' : ''}`} aria-hidden="true">{s.n}</div>
                  <div className="pfi-step-t">{s.title}</div>
                  <div className="pfi-step-d">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPITAL SOURCES */}
        <section className="pfi-sec" aria-labelledby="pfi-sources-heading">
          <div className="pfi-inner">
            <span className="pfi-stag">Capital sources</span>
            <h2 id="pfi-sources-heading" className="pfi-stitle">Who provides the funding</h2>
            <p className="pfi-ssub">
              Kevin works with a curated network of verified capital sources actively deploying
              into large-scale projects across all major sectors and geographies.
            </p>
            <div className="pfi-sources-grid">
              {SOURCES.map((s) => (
                <div key={s.name} className="pfi-source-card">
                  <div className="pfi-sc-type">{s.type}</div>
                  <div className="pfi-sc-name">{s.name}</div>
                  <div className="pfi-sc-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pfi-cta" aria-labelledby="pfi-cta-heading">
          <h2 id="pfi-cta-heading">
            Have a project requiring<br />substantial funding?
          </h2>
          <p>
            Submit a confidential enquiry above and Kevin will assess your project for
            funder suitability within 48 hours.
          </p>
          <div className="pfi-cta-btns">
            <button
              className="pfi-btn-gold"
              onClick={() => document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Scroll to enquiry form"
            >
              <i className="fas fa-file-signature" aria-hidden="true" />
              Submit a funding enquiry
            </button>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer"
               className="pfi-btn-outline" aria-label="Schedule a consultation via Calendly">
              <i className="fas fa-calendar-check" aria-hidden="true" />
              Schedule a consultation
            </a>
          </div>
          <p className="pfi-cta-disc">
            All enquiries are treated in strict confidence. This service is provided by
            Kevin Graham, a global financial advisory practitioner. Nothing on this page
            constitutes a guarantee of funding or a financial promotion for any specific
            product. All enquiries are subject to eligibility assessment.
          </p>
        </section>

      </main>
    </div>
  );
};

export default ProjectFundersInvestors;