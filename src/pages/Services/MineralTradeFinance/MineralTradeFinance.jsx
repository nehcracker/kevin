import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, slideInLeft } from '../../../utils/motion';
import SEO from '../../../components/common/SEO/SEO';
import { Honeypot, Turnstile, TURNSTILE_ENABLED, useFillTimer } from '../../../components/common/FormGuard/FormGuard';
import MarketingOptIn from '../../../components/common/MarketingOptIn/MarketingOptIn';
// Shares the Navy Executive layout primitives with the PFI page and the
// ef- content blocks (panels, ticks, checklist, FAQ) with Equity Financing;
// mtf- classes in MineralTradeFinance.css cover what's unique here.
import '../ProjectFundersInvestors/ProjectFundersInvestors.css';
import '../EquityFinancing/EquityFinancing.css';
import './MineralTradeFinance.css';

/* ── Constants ───────────────────────────────────────────────────────────── */
const CALENDLY     = 'https://calendly.com/kevingraham';
const WORKER_URL   = 'https://pfi-enquiry.grahamkarimi.com';
const CANONICAL    = 'https://grahamkarimi.com/services/mineral-trade-finance';
const FCA_REGISTER = 'https://register.fca.org.uk/s/individual?id=003b000000LUZUPAA5'; // same link as Footer
// pfi-enquiry/worker.js keys off this prefix to label the enquiry and auto-reply.
const SUMMARY_PREFIX = '[Mineral Trade Finance enquiry';

/* ── Data ────────────────────────────────────────────────────────────────── */

const QUALS = [
  'Gold, copper, cobalt, lithium, manganese and other traded minerals',
  'Africa, Europe, the Middle East and international markets',
  'Banks, private credit, institutional financiers and investors',
  'Each transaction assessed on its own commercial merits',
];

const SERVICES = [
  {
    icon: 'fas fa-coins',
    tag: 'Procurement',
    title: 'Mineral Purchase Financing',
    desc: 'Advisory and capital-sourcing support for established mineral traders and qualified commodity buyers seeking funds to purchase minerals from verified suppliers. Initial assessment considers the commodity, quantity, price, supplier credentials, buyer arrangements and proposed repayment source.',
  },
  {
    icon: 'fas fa-exchange-alt',
    tag: 'Domestic & cross-border',
    title: 'Commodity Trade Finance',
    desc: 'Transaction assessment and financing structuring support for domestic and cross-border commodity trades. Relevant considerations include purchase and sale contracts, payment terms, delivery obligations, logistics, insurance and counterparty risk.',
  },
  {
    icon: 'fas fa-ship',
    tag: 'Producers & exporters',
    title: 'Pre-Export Finance',
    desc: 'Financing advisory for eligible producers and exporters seeking capital to prepare and deliver minerals against documented export or supply commitments. Assessment may cover production capacity, stock availability, permits, export requirements and confirmed buyer demand.',
  },
  {
    icon: 'fas fa-sync-alt',
    tag: 'Liquidity',
    title: 'Working Capital Finance',
    desc: 'Capital-sourcing support for established mineral businesses seeking liquidity for procurement, supplier payments, storage, transport, handling and other trade-related costs.',
  },
  {
    icon: 'fas fa-file-contract',
    tag: 'Buyer-backed',
    title: 'Offtake-Backed Financing',
    desc: 'Assessment of transactions supported by credible offtake agreements, purchase commitments or established buyer relationships. The strength and enforceability of the underlying commercial arrangements form part of the review.',
  },
  {
    icon: 'fas fa-university',
    tag: 'Bank instruments',
    title: 'Trade Finance Instruments',
    desc: 'Advisory support for transactions involving recognised trade finance instruments, including documentary letters of credit and bank guarantees. Instrument availability, issuance and acceptance depend on the participating banks, transaction structure, compliance review and formal approvals.',
  },
];

const MINERALS = [
  { symbol: 'Au', name: 'Gold',                desc: 'And other precious metals' },
  { symbol: 'Cu', name: 'Copper',              desc: 'Including copper cathodes' },
  { symbol: 'Co', name: 'Cobalt',              desc: 'And cobalt products' },
  { symbol: 'Li', name: 'Lithium',             desc: 'And lithium concentrates' },
  { symbol: 'Mn', name: 'Manganese',           desc: 'Manganese ore' },
  { symbol: 'Ta', name: 'Tantalum',            desc: 'And coltan' },
  { symbol: 'Sn', name: 'Tin and tungsten',    desc: 'Ores and concentrates' },
  { symbol: 'C',  name: 'Graphite',            desc: 'Natural graphite' },
  { symbol: 'Fe', name: 'Iron ore',            desc: 'Lump and fines' },
  { symbol: '+',  name: 'Industrial minerals', desc: 'Other commercially traded minerals' },
];

const ASSESSMENT_FACTORS = [
  'Product form', 'Grade', 'Specifications', 'Quantity', 'Origin',
  'Ownership', 'Applicable permits', 'Route to market',
];

const CLIENTS = [
  'Established mineral trading companies seeking procurement capital',
  'Licensed mineral exporters requiring pre-export financing',
  'Commodity buyers with documented purchase requirements',
  'Mineral producers with credible supply and offtake arrangements',
  'Importers and distributors managing cross-border commodity purchases',
  'Mining and mineral businesses seeking working capital for confirmed transactions',
  'Qualified intermediaries involved in documented mineral supply chains',
];

const PRIORITIES = [
  { icon: 'fas fa-user-check',     label: 'Identifiable counterparties' },
  { icon: 'fas fa-map-marked-alt', label: 'Verifiable mineral origin and ownership' },
  { icon: 'fas fa-chart-line',     label: 'Credible commercial demand' },
  { icon: 'fas fa-undo-alt',       label: 'A clear source of repayment' },
];

const STEPS = [
  { n: 1, title: 'Initial Review',                desc: 'The proposed transaction is reviewed to understand the commodity, parties, jurisdictions, transaction value, funding requirement and intended use of funds.' },
  { n: 2, title: 'Documentation Review',          desc: 'Available corporate, supplier, buyer, product, regulatory and contractual documents are examined. Further information is requested where material gaps affect the assessment.' },
  { n: 3, title: 'Transaction Structuring',       desc: 'Potential financing structures are considered in light of the procurement cycle, payment terms, delivery schedule, security options, repayment source and risk allocation.' },
  { n: 4, title: 'Capital Sourcing',              desc: 'Where the transaction meets the relevant screening requirements, suitable potential financing partners may be identified and approached, subject to mandate, confidentiality and applicable compliance procedures.' },
  { n: 5, title: 'Due Diligence and Negotiation', desc: 'Interested financiers conduct their own due diligence and determine whether to proceed. Commercial terms, conditions, security requirements and documentation are negotiated directly with the relevant parties.' },
  { n: 6, title: 'Financing Completion',          desc: 'Financing proceeds only after the relevant financier has completed its reviews, issued the required approvals and executed definitive agreements. Disbursement follows the agreed contractual and banking procedures.' },
];

const DOCUMENTS = [
  'Company profile and incorporation details',
  'Details of directors, beneficial owners and authorised representatives',
  'Mineral type, grade, form and quantity',
  'Supplier identity and evidence of supply authority',
  'Evidence of mineral origin, ownership and applicable licences',
  'Buyer details and purchase or offtake agreement',
  'Purchase price, sale price and transaction cost breakdown',
  'Delivery terms, destination, logistics and insurance arrangements',
  'Required financing amount and proposed use of funds',
  'Proposed repayment source and payment schedule',
  'Relevant export, import and regulatory documents',
];

const APPROACH = [
  'Assessment of transaction readiness and funding requirements',
  'Review of commercial structures and supporting documentation',
  'Consideration of financing options across institutional and private capital markets',
  'Attention to counterparty, jurisdictional and execution risks',
  'Coordination with potential financing partners where a transaction meets relevant screening criteria',
  'Support through financing discussions and documentation stages',
];

// The brief's suggested internal links, mapped to the closest existing pages.
const RELATED = [
  { to: '/services/project-funding',                 label: 'Mining Project Finance' },
  { to: '/services/business-funding-loans',          label: 'Working Capital & Business Funding' },
  { to: '/services/project-funders-and-investors',   label: 'International Capital Sourcing' },
  { to: '/services/international-financial-advisor', label: 'Financial Advisory Services' },
  { to: '/services/risk-compliance',                 label: 'Due Diligence & Risk Assessment' },
  { to: '/services/document-alignment-services',     label: 'Transaction Documentation' },
];

const FAQS = [
  {
    q: 'What is mineral trade finance?',
    a: 'Mineral trade finance refers to financing arrangements that support the purchase, sale, movement, processing or export of minerals. Depending on the transaction, financing may address procurement costs, working capital, pre-export expenses or payment obligations under a trade contract.',
  },
  {
    q: 'Do you arrange financing for gold purchases?',
    a: 'Kevin assesses gold purchase transactions supported by credible suppliers, verifiable product specifications, evidence of origin and ownership, appropriate regulatory documents and a clear buyer or repayment arrangement. Any financing opportunity depends on the transaction review and the requirements of prospective financiers.',
  },
  {
    q: 'Which minerals are eligible for assessment?',
    a: 'Transactions involving gold, copper, cobalt, lithium, manganese, tantalum, tin, tungsten, graphite, iron ore and other commercially traded minerals are considered. Eligibility depends on product specifications, legal status, counterparties, marketability and transaction economics.',
  },
  {
    q: 'Do you work with mineral businesses in Africa?',
    a: 'Yes. Kevin considers qualifying mineral and commodity transactions involving African markets and cross-border trade with counterparties in Europe, the Middle East and other regions. Each transaction must meet applicable legal, regulatory and compliance requirements.',
  },
  {
    q: 'What documents are required?',
    a: 'Initial review usually requires a company profile, supplier and buyer details, mineral specifications, evidence of origin and ownership, relevant licences, purchase or offtake contracts, a transaction cost breakdown and details of the financing requirement. Additional documents may be requested during due diligence.',
  },
  {
    q: 'Do you provide loans directly?',
    a: 'Kevin provides independent financial advisory and capital-sourcing support. He is not a direct lender. Where appropriate, he seeks to connect qualified transactions with potential financing partners. All financing decisions rest with the relevant financier and remain subject to due diligence, credit approval and definitive agreements.',
  },
  {
    q: 'Is financing guaranteed after an initial assessment?',
    a: 'No. An initial assessment does not constitute a financing commitment or approval. A financier must complete its own due diligence, risk assessment and approval process before offering terms or committing funds.',
  },
  {
    q: 'What transaction size do you consider?',
    a: 'Transaction size is assessed in context. Relevant factors include the commodity, jurisdiction, supplier and buyer credentials, transaction economics, documentation quality and the requirements of potential financing partners.',
  },
];

const FEES = {
  heading: 'Fees and engagement',
  // Keep in sync with FEES in EquityFinancing.jsx, FEE_BANNER in
  // ProjectFundersInvestors.jsx and FEE_NOTICE in ThankYou.jsx.
  body: 'Reviewing your enquiry is free. Where your transaction proposal, business plan or supporting documents need preparing or restructuring before financier engagement, a documentation alignment fee from USD 1,350 applies. Every client we deliver funding for pays a standard 1% success fee when the funding is delivered. If you are required to meet financiers or funders in person, travel costs — tickets, accommodation and logistics — are at your own expense. You receive a written engagement letter setting out scope, fees and timelines before any work starts. Fees are not a guarantee of funding.',
};

// Sent to the worker as `sector`, so Kevin's notification subject reads
// "New Funding Enquiry — Copper — 4,000,000".
const COMMODITIES = [
  'Gold & precious metals',
  'Copper',
  'Cobalt',
  'Lithium',
  'Manganese',
  'Tantalum / coltan',
  'Tin / tungsten',
  'Graphite',
  'Iron ore',
  'Other industrial minerals',
];

const FINANCING_TYPES = SERVICES.map(s => s.title).concat('Not sure yet');

const OFFTAKE_STATUS = [
  'Signed offtake / purchase agreement',
  'Buyer identified, contract in negotiation',
  'No buyer confirmed yet',
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
  if (isNaN(num) || num <= 0) return null;
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
  if (!val || !val.trim()) return 'A short transaction summary is required.';
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
   Posts to the shared PFI worker (name/org/email/phone/country/sector/range/
   summary). The commodity goes in `sector`; financing type and offtake
   position have no worker field, so they are prepended to the summary.
   No minimum amount: the brief says transaction size is assessed in context.
   ══════════════════════════════════════════════════════════════════════════ */
const EnquiryPanel = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    name: '', company: '', email: '', phone: '', country: '',
    commodity: '', financing: '', amount: '', offtake: '', description: '',
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
    if (!val.trim()) { setAmountError('Please enter the financing amount required.'); return false; }
    if (parseFundingAmount(val) === null) {
      setAmountError('Please enter a valid amount — e.g. 750,000 or 4,000,000');
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
      sector:  fields.commodity,
      range:   fields.amount,
      summary: `${SUMMARY_PREFIX} — Financing: ${fields.financing} — Buyer/offtake: ${fields.offtake}]\n\n${fields.description}`,
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
        navigate('/thank-you', { state: { token, source: 'mineral', email: fields.email, marketingOptIn } });
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
    <div className="pfi-enquiry-panel ef-enquiry-panel" id="enquiry" aria-label="Mineral trade finance enquiry form">

      <div className="pfi-ep-head">
        <div className="pfi-ep-head-title">
          <span className="pfi-ep-dot" aria-hidden="true" />
          Initial transaction assessment
        </div>
        <div className="pfi-ep-head-sub">Confidential · Reply within 48 hours</div>
      </div>

      <div className="pfi-ep-body">

        <div className="pfi-ef-row">
          <div className="pfi-ef">
            <label htmlFor="mtf-name">Name *</label>
            <input id="mtf-name" type="text" name="name" placeholder="Full name"
              value={fields.name} onChange={onChange} required aria-required="true"
              disabled={sending} />
          </div>
          <div className="pfi-ef">
            <label htmlFor="mtf-company">Company *</label>
            <input id="mtf-company" type="text" name="company" placeholder="Trading / mining entity"
              value={fields.company} onChange={onChange} required aria-required="true"
              disabled={sending} />
          </div>
        </div>

        <div className="pfi-ef-row">
          <div className="pfi-ef">
            <label htmlFor="mtf-email">Email *</label>
            <input id="mtf-email" type="email" name="email" placeholder="your@company.com"
              value={fields.email} onChange={onChange} required aria-required="true"
              disabled={sending} />
          </div>
          <div className="pfi-ef">
            <label htmlFor="mtf-phone">Phone (intl. format) *</label>
            <input id="mtf-phone" type="tel" name="phone" placeholder="+44 7700 900000"
              value={fields.phone} onChange={onChange} required aria-required="true"
              disabled={sending} />
            {phoneError && <span style={inlineErr}>{phoneError}</span>}
          </div>
        </div>

        <div className="pfi-ef-row">
          <div className="pfi-ef">
            <label htmlFor="mtf-country">Country *</label>
            <input id="mtf-country" type="text" name="country" placeholder="e.g. DRC, Ghana, UAE"
              value={fields.country} onChange={onChange} required aria-required="true"
              disabled={sending} />
          </div>
          <div className="pfi-ef">
            <label htmlFor="mtf-commodity">Commodity *</label>
            <select id="mtf-commodity" name="commodity" value={fields.commodity} onChange={onChange}
              required aria-required="true" disabled={sending}>
              <option value="">Select commodity</option>
              {COMMODITIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="pfi-ef-row">
          <div className="pfi-ef">
            <label htmlFor="mtf-financing">Financing type *</label>
            <select id="mtf-financing" name="financing" value={fields.financing} onChange={onChange}
              required aria-required="true" disabled={sending}>
              <option value="">Select type</option>
              {FINANCING_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="pfi-ef">
            <label htmlFor="mtf-amount">Financing required (USD) *</label>
            <input id="mtf-amount" type="text" name="amount" inputMode="numeric" placeholder="e.g. 4,000,000"
              value={fields.amount} onChange={onChange} required aria-required="true"
              disabled={sending} />
            {amountError && <span style={inlineErr}>{amountError}</span>}
          </div>
        </div>

        <div className="pfi-ef">
          <label htmlFor="mtf-offtake">Buyer / offtake position *</label>
          <select id="mtf-offtake" name="offtake" value={fields.offtake} onChange={onChange}
            required aria-required="true" disabled={sending}>
            <option value="">Select position</option>
            {OFFTAKE_STATUS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>

        <div className="pfi-ef">
          <label htmlFor="mtf-description">
            Transaction summary * <small style={{ fontWeight: 400, opacity: 0.7 }}>(min. {MIN_DESCRIPTION} chars)</small>
          </label>
          <textarea id="mtf-description" name="description"
            placeholder="Commodity, grade and quantity, supplier and buyer, delivery terms, use of funds and proposed repayment source."
            value={fields.description} onChange={onChange} required aria-required="true"
            disabled={sending}
            onBlur={() => { setDescTouched(true); setDescError(validateDescription(fields.description)); }}
          />
          {descTouched && descError && <span style={inlineErr}>{descError}</span>}
        </div>

        <div className="pfi-conf-row">
          <input type="checkbox" id="mtf-conf" checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            aria-required="true" disabled={sending} />
          <label htmlFor="mtf-conf">
            I understand this enquiry is confidential and consent to being
            contacted about mineral trade finance options. *
          </label>
        </div>

        <MarketingOptIn id="mtf-optin" checked={marketingOptIn}
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
            <><i className="fas fa-paper-plane" aria-hidden="true" /> &nbsp;Request an Initial Transaction Assessment</>
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
   DOCUMENT CHECKLIST
   ══════════════════════════════════════════════════════════════════════════ */
const DocumentChecklist = () => {
  const [checked, setChecked] = useState(() => DOCUMENTS.map(() => false));
  const count = checked.filter(Boolean).length;

  const toggle = (i) => setChecked(c => c.map((v, j) => (j === i ? !v : v)));

  let verdict = 'Tick the items you can provide today.';
  if (count >= 9)      verdict = 'Your file looks ready for an initial transaction assessment.';
  else if (count >= 1) verdict = 'Send what you have — material gaps will be identified during the documentation review.';

  return (
    <div className="ef-checklist">
      <ul className="ef-check-list mtf-doc-list">
        {DOCUMENTS.map((item, i) => (
          <li key={item}>
            <label className={`ef-check${checked[i] ? ' is-checked' : ''}`}>
              <input type="checkbox" checked={checked[i]} onChange={() => toggle(i)} />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className="ef-check-result" aria-live="polite">
        <div className="ef-check-score">{count}<span>/{DOCUMENTS.length}</span></div>
        <p>{verdict}</p>
        <button type="button" className="pfi-btn-gold" onClick={() => scrollToId('enquiry')}>
          <i className="fas fa-clipboard-check" aria-hidden="true" />
          Request an Assessment
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════════════════════════════════ */
const MineralTradeFinance = () => {
  const { hash } = useLocation();

  // Ad groups can land on section anchors (e.g. #minerals), so honour the
  // hash instead of always resetting to the top.
  useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView({ behavior: 'auto' });
    else window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [hash]);

  return (
    <div className="pfi-page ef-page mtf-page">

      <SEO
        title="Mineral Trade Finance"
        description="Kevin Graham provides mineral trade finance advisory and capital-sourcing support for eligible gold, copper, cobalt, lithium and commodity transactions."
        keywords="mineral trade finance, mineral trade financing, gold trade finance, commodity trade finance, mineral purchase financing, mining working capital finance, pre-export finance, international commodity financing, gold procurement finance, copper trade finance, Africa mineral trade finance"
        canonical={CANONICAL}
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              name: 'Mineral Trade Finance Advisory',
              description: 'Independent financial advisory and capital-sourcing support for eligible mineral and commodity trading transactions, including mineral purchase financing, pre-export finance, working capital, offtake-backed financing and trade finance instruments.',
              provider: {
                '@type': 'Person',
                name: 'Kevin Graham',
                url: 'https://grahamkarimi.com',
                telephone: '+447723339858',
                email: 'kevin.uk@grahamkarimi.com',
              },
              serviceType: 'Mineral Trade Finance Advisory',
              audience: {
                '@type': 'BusinessAudience',
                audienceType: 'Mineral traders, exporters, producers, commodity buyers and importers',
              },
              areaServed: [
                { '@type': 'Place', name: 'Africa' },
                { '@type': 'Place', name: 'Europe' },
                { '@type': 'Place', name: 'Middle East' },
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Mineral Trade Finance Advisory Services',
                itemListElement: SERVICES.map(s => ({
                  '@type': 'Offer',
                  itemOffered: { '@type': 'Service', name: s.title, description: s.desc },
                })),
              },
              url: CANONICAL,
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home',                  item: 'https://grahamkarimi.com/' },
                { '@type': 'ListItem', position: 2, name: 'Services',              item: 'https://grahamkarimi.com/services' },
                { '@type': 'ListItem', position: 3, name: 'Mineral Trade Finance', item: CANONICAL },
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
        <section className="pfi-hero ef-hero mtf-hero" aria-labelledby="top">
          <div className="pfi-hi">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.nav variants={staggerItem} className="pfi-breadcrumb" aria-label="Breadcrumb">
                <Link to="/"><i className="fas fa-home" aria-hidden="true" /> Home</Link>
                <span className="pfi-sep"><i className="fas fa-chevron-right" aria-hidden="true" /></span>
                <Link to="/services">Services</Link>
                <span className="pfi-sep"><i className="fas fa-chevron-right" aria-hidden="true" /></span>
                <span className="pfi-cur">Mineral Trade Finance</span>
              </motion.nav>

              <motion.div variants={staggerItem} className="pfi-eyebrow" aria-hidden="true">
                <div className="pfi-eyebrow-line" />
                <div className="pfi-eyebrow-text">International Financing Advisory</div>
              </motion.div>

              <motion.h1 variants={staggerItem} id="top" className="ef-anchor">
                Mineral Trade Finance<br />
                <em>advisory &amp; capital sourcing</em>
              </motion.h1>

              <motion.div variants={staggerItem} className="pfi-hero-rule" aria-hidden="true" />

              <motion.p variants={staggerItem} className="pfi-hero-body ef-hero-body">
                Kevin Graham provides independent financial advisory and capital-sourcing support
                for eligible mineral and commodity trading transactions — assessing financing
                requirements, reviewing transaction structures and connecting qualified businesses
                with potential banks, private credit providers, institutional financiers and
                investment partners.
              </motion.p>

              <motion.div variants={staggerItem} className="pfi-cta-btns ef-hero-btns">
                <button type="button" className="pfi-btn-outline" onClick={() => scrollToId('documents')}>
                  <i className="fas fa-clipboard-list" aria-hidden="true" />
                  What You Need for an Assessment
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

        {/* INTRO */}
        <section className="pfi-sec" aria-labelledby="mtf-intro-heading">
          <div className="pfi-inner">
            <span className="pfi-stag">Why trade finance</span>
            <h2 id="mtf-intro-heading" className="pfi-stitle">Capital for Commercially Supported Mineral Transactions</h2>
            <div className="ef-two-col">
              <div className="ef-panel">
                <h3>The Working Capital Gap</h3>
                <p>
                  Mineral transactions often require significant working capital to secure
                  supply, meet purchase commitments, arrange transportation and complete
                  delivery. Kevin works with businesses seeking financing for commercially
                  supported transactions involving gold, copper, cobalt, lithium, manganese and
                  other traded minerals.
                </p>
              </div>
              <div className="ef-panel">
                <h3>Assessed on Its Own Merits</h3>
                <p>
                  Support is available for qualifying transactions across Africa, Europe, the
                  Middle East and other international markets. Each opportunity is assessed on
                  its own commercial merits, documentation, counterparties, jurisdiction and
                  financing requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="pfi-sec-alt ef-anchor" id="services" aria-labelledby="mtf-services-heading">
          <div className="pfi-inner">
            <span className="pfi-stag">Advisory services</span>
            <h2 id="mtf-services-heading" className="pfi-stitle">Mineral Trade Finance Advisory Services</h2>
            <p className="pfi-ssub">
              Financing support across the mineral trade cycle — from procurement and pre-export
              preparation to delivery and payment.
            </p>
            <motion.div
              className="mtf-offer-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {SERVICES.map(s => (
                <motion.article key={s.title} className="ef-type-card mtf-offer-card" variants={staggerItem}>
                  <div className="mtf-offer-top">
                    <span className="mtf-offer-icon" aria-hidden="true"><i className={s.icon} /></span>
                    <div className="pfi-sc-type">{s.tag}</div>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* MINERALS */}
        <section className="pfi-sec ef-anchor" id="minerals" aria-labelledby="mtf-minerals-heading">
          <div className="pfi-inner">
            <span className="pfi-stag">Commodities</span>
            <h2 id="mtf-minerals-heading" className="pfi-stitle">Minerals and Commodities</h2>
            <p className="pfi-ssub">
              Kevin considers financing opportunities involving a range of commercially traded
              minerals and commodities, including:
            </p>
            <motion.ul
              className="mtf-minerals"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {MINERALS.map(m => (
                <motion.li key={m.name} className="mtf-mineral" variants={staggerItem}>
                  <span className="mtf-mineral-sym" aria-hidden="true">{m.symbol}</span>
                  <span className="mtf-mineral-name">{m.name}</span>
                  <span className="mtf-mineral-desc">{m.desc}</span>
                </motion.li>
              ))}
            </motion.ul>
            <div className="ef-panel mtf-factors">
              <h3>What the Assessment Considers</h3>
              <ul className="ef-chips">
                {ASSESSMENT_FACTORS.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* CLIENTS */}
        <section className="pfi-sec-alt ef-anchor" id="who-we-work-with" aria-labelledby="mtf-clients-heading">
          <div className="pfi-inner">
            <span className="pfi-stag">Clients and transactions</span>
            <h2 id="mtf-clients-heading" className="pfi-stitle">Who the Advisory Service Is For</h2>
            <div className="ef-two-col mtf-clients">
              <div className="ef-panel">
                <h3>The Service Is Relevant To</h3>
                <ul className="ef-ticks">
                  {CLIENTS.map(c => <li key={c}>{c}</li>)}
                </ul>
              </div>
              <div className="ef-panel mtf-priorities">
                <h3>Kevin Prioritises Transactions With</h3>
                <ul>
                  {PRIORITIES.map(p => (
                    <li key={p.label}>
                      <span className="mtf-priority-icon" aria-hidden="true"><i className={p.icon} /></span>
                      {p.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="pfi-sec ef-anchor" id="how-it-works" aria-labelledby="mtf-process-heading">
          <div className="pfi-inner">
            <span className="pfi-stag">Our process</span>
            <h2 id="mtf-process-heading" className="pfi-stitle">Transaction Assessment and Financing Process</h2>
            <p className="pfi-ssub">
              Six stages from first review to disbursement. Financing decisions rest with the
              financier at every stage.
            </p>
            <div className="pfi-steps mtf-steps" role="list" aria-label="Process steps">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.n}
                  className="pfi-step"
                  role="listitem"
                  variants={slideInLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.12 }}
                >
                  <div className={`pfi-step-circle${i === 0 ? ' active' : ''}`} aria-hidden="true">{s.n}</div>
                  <h3 className="pfi-step-t">{s.title}</h3>
                  <div className="pfi-step-d">{s.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DOCUMENTS */}
        <section className="pfi-sec-alt ef-anchor" id="documents" aria-labelledby="mtf-docs-heading">
          <div className="pfi-inner">
            <span className="pfi-stag">Preparation</span>
            <h2 id="mtf-docs-heading" className="pfi-stitle">Information Required for an Initial Assessment</h2>
            <p className="pfi-ssub">
              To support an initial review, prepare the following information where available.
              The exact requirements depend on the commodity, countries involved, transaction
              structure and prospective financier.
            </p>
            <DocumentChecklist />
          </div>
        </section>

        {/* WHY KEVIN */}
        <section className="pfi-sec" aria-labelledby="mtf-why-heading">
          <div className="pfi-inner">
            <span className="pfi-stag">Why Kevin Graham</span>
            <h2 id="mtf-why-heading" className="pfi-stitle">Why Work with Kevin Graham?</h2>
            <p className="pfi-ssub ef-ssub-wide">
              Kevin Graham provides independent financial advisory and capital-sourcing support
              focused on the commercial requirements of each transaction.
            </p>
            <div className="ef-two-col">
              <div className="ef-panel">
                <h3>His Approach Includes</h3>
                <ul className="ef-ticks">
                  {APPROACH.map(a => <li key={a}>{a}</li>)}
                </ul>
              </div>
              <div className="ef-panel mtf-role">
                <h3><i className="fas fa-balance-scale" aria-hidden="true" /> An Advisory and Facilitative Role</h3>
                <p>
                  Kevin is not presented as the lender, mineral buyer, mineral seller or issuing
                  bank in a transaction unless a separate written agreement expressly establishes
                  such a role.
                </p>
                <h4 className="ef-subhead mtf-related-h">Related Services</h4>
                <ul className="mtf-related">
                  {RELATED.map(r => (
                    <li key={r.to}><Link to={r.to}>{r.label} <i className="fas fa-arrow-right" aria-hidden="true" /></Link></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FEES */}
        <div className="pfi-no-fee-banner" role="region" aria-labelledby="mtf-fees-heading">
          <div className="pfi-nfb-inner">
            <h2 id="mtf-fees-heading" className="pfi-nfb-h">{FEES.heading}</h2>
            <p className="pfi-nfb-p">{FEES.body}</p>
          </div>
        </div>

        {/* FAQ */}
        <section className="pfi-sec-alt ef-anchor" id="faq" aria-labelledby="mtf-faq-heading">
          <div className="pfi-inner">
            <span className="pfi-stag">FAQs</span>
            <h2 id="mtf-faq-heading" className="pfi-stitle">Frequently Asked Questions</h2>
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
          aria-labelledby="mtf-start-heading"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <h2 id="mtf-start-heading">Submit a Mineral Trade Finance Enquiry</h2>
          <p>
            Seeking capital for mineral procurement, a gold purchase, a commodity supply contract,
            pre-export requirements or an established mineral trading operation? Provide a company
            profile and an investment-grade transaction proposal, business plan or presentation
            outlining the commodity, counterparties, contract position, funding requirement and
            proposed repayment source. Kevin will review the information and determine whether the
            opportunity is suitable for further assessment and potential capital-sourcing engagement.
          </p>
          <div className="pfi-cta-btns">
            <button type="button" className="pfi-btn-gold" onClick={() => scrollToId('enquiry')}>
              <i className="fas fa-file-signature" aria-hidden="true" />
              Request an Initial Transaction Assessment
            </button>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="pfi-btn-outline">
              <i className="fas fa-calendar-check" aria-hidden="true" />
              Prefer to talk? Schedule a call
            </a>
          </div>
          <p className="pfi-cta-disc">
            Kevin Graham provides independent financial advisory and capital-sourcing support. He
            is not a direct lender, mineral buyer, mineral seller or issuing bank. An initial
            assessment does not constitute a financing commitment or approval; all financing
            decisions rest with the relevant financier and remain subject to due diligence, credit
            approval and definitive agreements. All enquiries are subject to eligibility assessment
            and applicable legal, regulatory and compliance requirements.
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

export default MineralTradeFinance;
