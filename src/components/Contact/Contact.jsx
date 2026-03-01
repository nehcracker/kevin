import React, { useState } from 'react';
import './Contact.css';

const PHONE     = '447723339858';
const EMAIL     = 'kevin.karimi@inbestconsultant.com';
const CALENDLY  = 'https://calendly.com/kevingraham';
const TELEGRAM  = 'https://t.me/kevingrahamUK';
const LINKEDIN  = 'https://linkedin.com/in/kevingrahamkarimi';
const FACEBOOK  = 'https://www.facebook.com/kevingrahamkarimi';

const SERVICES = [
  'Project Funding',
  'International Financial Advisory',
  'Risk & Compliance',
  'Document Alignment Services',
  'Business Funding & Loans',
  'General Enquiry',
];

const Contact = () => {
  const [waService, setWaService]   = useState('');
  const [waModalOpen, setWaModal]   = useState(false);

  const openWa  = () => { setWaService(''); setWaModal(true); };
  const closeWa = () => setWaModal(false);

  const proceedWa = () => {
    if (!waService) return;
    const msg = `Hi Kevin, I'm interested in: ${waService}.\n\nPlease let me know your availability — I understand you operate on London (GMT/BST) time and will respond promptly.`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    closeWa();
  };

  return (
    <>
      {/* ── CONTACT SECTION ──────────────────────────────────────────── */}
      <section id="contact" className="contact-section">
        <div className="contact-inner">

          {/* HEADER */}
          <div className="contact-header">
            <span className="contact-eyebrow">Get In Touch</span>
            <h2>Let's Work Together</h2>
            <p>
              Choose your preferred channel. Kevin operates on{' '}
              <strong>London (GMT/BST)</strong> time and responds promptly.
            </p>
          </div>

          {/* PRIMARY CTA ROW — big action cards */}
          <div className="contact-primary-row">

            {/* Schedule */}
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="contact-card card-schedule">
              <div className="cc-icon">
                <i className="fas fa-calendar-check"></i>
              </div>
              <div className="cc-body">
                <span className="cc-label">Fastest Way</span>
                <h3>Schedule a Meeting</h3>
                <p>Book a dedicated time slot directly on Kevin's calendar.</p>
              </div>
              <div className="cc-arrow"><i className="fas fa-arrow-right"></i></div>
            </a>

            {/* WhatsApp — opens service picker */}
            <button onClick={openWa} className="contact-card card-whatsapp">
              <div className="cc-icon">
                <i className="fab fa-whatsapp"></i>
              </div>
              <div className="cc-body">
                <span className="cc-label">Chat Now</span>
                <h3>WhatsApp</h3>
                <p>Message Kevin directly with your enquiry or project details.</p>
              </div>
              <div className="cc-arrow"><i className="fas fa-arrow-right"></i></div>
            </button>

            {/* Email */}
            <a href={`mailto:${EMAIL}`} className="contact-card card-email">
              <div className="cc-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="cc-body">
                <span className="cc-label">Write to Us</span>
                <h3>Send an Email</h3>
                <p>For detailed proposals, documentation, or formal enquiries.</p>
              </div>
              <div className="cc-arrow"><i className="fas fa-arrow-right"></i></div>
            </a>

          </div>

          {/* SECONDARY ROW — phone, telegram, social */}
          <div className="contact-secondary-row">

            <a href={`tel:+${PHONE}`} className="contact-pill pill-phone">
              <i className="fas fa-phone"></i>
              <span>Call Direct</span>
            </a>

            <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="contact-pill pill-telegram">
              <i className="fab fa-telegram"></i>
              <span>Telegram</span>
            </a>

            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="contact-pill pill-linkedin">
              <i className="fab fa-linkedin"></i>
              <span>LinkedIn</span>
            </a>

            <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" className="contact-pill pill-facebook">
              <i className="fab fa-facebook-f"></i>
              <span>Facebook</span>
            </a>

          </div>

          {/* TIMEZONE NOTE */}
          <div className="contact-tz-note">
            <i className="fas fa-clock"></i>
            <span>London (GMT/BST) · Typically responds within 24 hours</span>
          </div>

        </div>
      </section>

      {/* ── WHATSAPP SERVICE PICKER MODAL ────────────────────────────── */}
      {waModalOpen && (
        <div
          className="wa-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="wa-modal-title"
          onClick={(e) => e.target === e.currentTarget && closeWa()}
        >
          <div className="wa-modal">

            {/* Header */}
            <div className="wa-modal__header">
              <div className="wa-modal__icon"><i className="fab fa-whatsapp"></i></div>
              <div className="wa-modal__header-text">
                <h2 id="wa-modal-title" className="wa-modal__title">Chat on WhatsApp</h2>
                <p className="wa-modal__subtitle">Select the service you're interested in</p>
              </div>
              <button className="wa-modal__close" onClick={closeWa} aria-label="Close">
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Services */}
            <ul className="wa-modal__services" role="listbox" aria-label="Services">
              {SERVICES.map((svc) => (
                <li
                  key={svc}
                  role="option"
                  aria-selected={waService === svc}
                  className={`wa-modal__service-item ${waService === svc ? 'selected' : ''}`}
                  onClick={() => setWaService(svc)}
                >
                  <span className="wa-modal__radio"></span>
                  {svc}
                </li>
              ))}
            </ul>

            {/* Timezone note */}
            <p className="wa-modal__note">
              <i className="fas fa-clock"></i>
              Kevin operates on <strong>London (GMT/BST)</strong> time and will respond promptly.
            </p>

            {/* Actions */}
            <div className="wa-modal__actions">
              <button className="wa-modal__btn-cancel" onClick={closeWa}>Cancel</button>
              <button
                className={`wa-modal__btn-proceed ${waService ? 'active' : ''}`}
                onClick={proceedWa}
                disabled={!waService}
              >
                <i className="fab fa-whatsapp"></i> Open WhatsApp
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Contact;