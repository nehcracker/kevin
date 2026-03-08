import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Contact.css';

/* ── Constants ───────────────────────────────────────────────────────────── */
const PHONE    = '447723339858';
const EMAIL    = 'kevin.uk@grahamkarimi.com';
const CALENDLY = 'https://calendly.com/kevingraham';
const TELEGRAM = 'https://t.me/kevingrahamUK';
const LINKEDIN = 'https://linkedin.com/in/kevingrahamkarimi';
const FACEBOOK = 'https://www.facebook.com/kevingrahamkarimi';

const SERVICES = [
  { id: 'project-funding',      label: 'Project Funding' },
  { id: 'intl-advisory',        label: 'Intl. Financial Advisory' },
  { id: 'risk-compliance',      label: 'Risk & Compliance' },
  { id: 'document-alignment',   label: 'Document Alignment' },
  { id: 'business-funding',     label: 'Business Funding & Loans' },
  { id: 'Business-Consultant',  label: 'Business Consultant'},
  { id: 'general-enquiry',      label: 'General Enquiry' },
];

const RESET_DELAY = 3200; // ms before panel auto-resets after confirmation

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function buildWaUrl(service) {
  const msg =
    `Hi Kevin, I'm interested in: ${service}.\n\n` +
    `Please let me know your availability — I understand you operate on London (GMT/BST) time and will respond promptly.`;
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
}

function buildEmailUrl(service) {
  const subject = encodeURIComponent(`Enquiry: ${service}`);
  const body    = encodeURIComponent(
    `Hi Kevin,\n\nI would like to discuss: ${service}.\n\nPlease let me know your availability.`
  );
  return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
}

/* ══════════════════════════════════════════════════════════════════════════
   CONTACT PANEL  (right-side static panel)
══════════════════════════════════════════════════════════════════════════ */
const ContactPanel = () => {
  const [stage,    setStage]    = useState(1);   // 1 | 2 | 3
  const [service,  setService]  = useState('');
  const [channel,  setChannel]  = useState('');  // 'wa' | 'email'
  const resetTimer = useRef(null);

  /* cleanup on unmount */
  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const goStage = useCallback((n) => setStage(n), []);

  const handleServiceClick = useCallback((label) => {
    setService(label);
  }, []);

  const handleContinue = useCallback(() => {
    if (service) goStage(2);
  }, [service, goStage]);

  const handleBack = useCallback(() => {
    goStage(1);
  }, [goStage]);

  const handleChannel = useCallback((ch) => {
    setChannel(ch);
    const url = ch === 'wa' ? buildWaUrl(service) : buildEmailUrl(service);
    window.open(url, '_blank', 'noopener,noreferrer');
    goStage(3);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => {
      setService('');
      setChannel('');
      goStage(1);
    }, RESET_DELAY);
  }, [service, goStage]);

  /* Panel title per stage */
  const panelTitles = [
    'What can Kevin help you with?',
    'Choose your channel',
    channel === 'wa' ? 'Message ready!' : 'Email ready!',
  ];

  return (
    <div className="cp-panel" aria-label="Quick contact panel">

      {/* ── Panel Header ── */}
      <div className="cp-header">
        <p className="cp-eyebrow">
          <span className="cp-eyebrow-dot"></span>
          Quick Contact
        </p>
        <h3 className="cp-title">{panelTitles[stage - 1]}</h3>

        {/* Progress dots */}
        <div className="cp-dots" role="progressbar" aria-valuenow={stage} aria-valuemin={1} aria-valuemax={3}>
          {[1, 2, 3].map(n => (
            <span
              key={n}
              className={`cp-dot ${n === stage ? 'cp-dot--active' : ''} ${n < stage ? 'cp-dot--done' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* ── Stage 1 — Service Selection ── */}
      {stage === 1 && (
        <div className="cp-stage cp-stage-1" key="stage-1">
          <ul className="cp-service-list" role="listbox" aria-label="Select a service">
            {SERVICES.map(svc => (
              <li
                key={svc.id}
                role="option"
                aria-selected={service === svc.label}
                className={`cp-service-item ${service === svc.label ? 'cp-service-item--selected' : ''}`}
                onClick={() => handleServiceClick(svc.label)}
              >
                <span className="cp-radio" aria-hidden="true"></span>
                {svc.label}
              </li>
            ))}
          </ul>

          <button
            className={`cp-continue-btn ${service ? 'cp-continue-btn--ready' : ''}`}
            onClick={handleContinue}
            disabled={!service}
            aria-disabled={!service}
          >
            Continue <i className="fas fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      )}

      {/* ── Stage 2 — Channel Selection ── */}
      {stage === 2 && (
        <div className="cp-stage cp-stage-2" key="stage-2">
          <div className="cp-selected-badge">
            <i className="fas fa-check-circle" aria-hidden="true"></i>
            <span>{service}</span>
          </div>

          <p className="cp-channel-label">How would you like to reach Kevin?</p>

          <div className="cp-channel-grid">
            <button
              className="cp-channel-btn cp-channel-btn--wa"
              onClick={() => handleChannel('wa')}
              aria-label="Contact via WhatsApp"
            >
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
              <span>WhatsApp</span>
              <small>Opens chat</small>
            </button>

            <button
              className="cp-channel-btn cp-channel-btn--email"
              onClick={() => handleChannel('email')}
              aria-label="Contact via Email"
            >
              <i className="fas fa-envelope" aria-hidden="true"></i>
              <span>Email</span>
              <small>Opens mail app</small>
            </button>
          </div>

          <button className="cp-back-btn" onClick={handleBack} aria-label="Go back to service selection">
            <i className="fas fa-arrow-left" aria-hidden="true"></i> Change service
          </button>
        </div>
      )}

      {/* ── Stage 3 — Confirmation ── */}
      {stage === 3 && (
        <div className="cp-stage cp-stage-3" key="stage-3">
          <div className="cp-confirm">
            <div className={`cp-confirm-icon ${channel === 'wa' ? 'cp-confirm-icon--wa' : 'cp-confirm-icon--email'}`}>
              <i className={channel === 'wa' ? 'fab fa-whatsapp' : 'fas fa-envelope'} aria-hidden="true"></i>
            </div>
            <h4>{channel === 'wa' ? 'Opening WhatsApp…' : 'Opening your email app…'}</h4>
            <p>
              {channel === 'wa'
                ? 'Your pre-filled message is ready. Kevin will respond within 24 hours (GMT/BST).'
                : 'Subject and message are pre-filled for you. Kevin replies within 24 hours.'}
            </p>
            <div className="cp-reset-bar" role="progressbar" aria-label="Resetting panel">
              <div className="cp-reset-bar-fill"></div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   MAIN CONTACT COMPONENT
══════════════════════════════════════════════════════════════════════════ */
const Contact = () => (
  <section id="contact" className="contact-section" aria-labelledby="contact-heading">

    {/* Decorative background blobs */}
    <span className="contact-blob contact-blob--tr" aria-hidden="true"></span>
    <span className="contact-blob contact-blob--bl" aria-hidden="true"></span>

    <div className="contact-inner">

      {/* ── Header ── */}
      <div className="contact-header">
        <span className="contact-eyebrow">Get In Touch</span>
        <h2 id="contact-heading">Let's Work Together</h2>
        <p>
          Choose your preferred channel. Kevin operates on{' '}
          <strong>London (GMT/BST)</strong> time and responds promptly.
        </p>
      </div>

      {/* ── Two-column grid ── */}
      <div className="contact-grid">

        {/* ── LEFT — action cards + pills ── */}
        <div className="contact-left">

          {/* Primary CTA cards */}
          <div className="contact-primary-cards">

            {/* Schedule — full width */}
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card contact-card--schedule"
            >
              <div className="cc-icon"><i className="fas fa-calendar-check" aria-hidden="true"></i></div>
              <div className="cc-body">
                <span className="cc-label">Fastest Way</span>
                <h3>Schedule a Meeting</h3>
                <p>Book a dedicated time slot directly on Kevin's calendar via Calendly.</p>
              </div>
              <div className="cc-arrow"><i className="fas fa-arrow-right" aria-hidden="true"></i></div>
            </a>

            {/* WhatsApp + Email side by side */}
            <div className="contact-card-pair">
              <a
                href={buildWaUrl('General Enquiry')}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card contact-card--whatsapp"
                aria-label="Open WhatsApp chat"
              >
                <div className="cc-icon"><i className="fab fa-whatsapp" aria-hidden="true"></i></div>
                <div className="cc-body">
                  <span className="cc-label">Chat Now</span>
                  <h3>WhatsApp</h3>
                  <p>Quick direct message.</p>
                </div>
                <div className="cc-arrow"><i className="fas fa-arrow-right" aria-hidden="true"></i></div>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="contact-card contact-card--email"
                aria-label="Send an email"
              >
                <div className="cc-icon"><i className="fas fa-envelope" aria-hidden="true"></i></div>
                <div className="cc-body">
                  <span className="cc-label">Write to Us</span>
                  <h3>Send an Email</h3>
                  <p>Formal proposals & docs.</p>
                </div>
                <div className="cc-arrow"><i className="fas fa-arrow-right" aria-hidden="true"></i></div>
              </a>
            </div>
          </div>

          {/* Secondary pills */}
          <div className="contact-pills">
            <a href={`tel:+${PHONE}`} className="contact-pill contact-pill--phone">
              <i className="fas fa-phone" aria-hidden="true"></i>
              <span>Call Direct</span>
            </a>
            <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="contact-pill contact-pill--telegram">
              <i className="fab fa-telegram" aria-hidden="true"></i>
              <span>Telegram</span>
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="contact-pill contact-pill--linkedin">
              <i className="fab fa-linkedin" aria-hidden="true"></i>
              <span>LinkedIn</span>
            </a>
            <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" className="contact-pill contact-pill--facebook">
              <i className="fab fa-facebook-f" aria-hidden="true"></i>
              <span>Facebook</span>
            </a>
          </div>

          {/* Timezone note */}
          <div className="contact-tz">
            <i className="fas fa-clock" aria-hidden="true"></i>
            <span>London (GMT/BST) · Typically responds within 24 hours</span>
          </div>

        </div>
        {/* end left */}

        {/* ── RIGHT — static contact panel ── */}
        <div className="contact-right">
          <ContactPanel />
        </div>

      </div>
      {/* end grid */}

    </div>
  </section>
);

export default Contact;