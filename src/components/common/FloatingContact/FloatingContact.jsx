import React, { useState, useEffect, useRef } from 'react';
import './FloatingContact.css';

const SERVICES = [
  'Project Funding',
  'Business Funding & Loans',
  'International Financial Advisory',
  'Risk & Compliance',
  'Document Alignment Services',
  'Business Consultant',
  'Project Funders & Investors',
  'General Enquiry',
];

const PHONE = '447723339858'; // no + or spaces

const buildWhatsAppUrl = (service) => {
  const message =
    `Hi Kevin, I'm interested in: ${service}.\n\n` +
    `Please let me know your availability — I understand you operate on London (GMT/BST) time and will respond promptly.`;
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
};

const FloatingContact = () => {
  const [visible, setVisible]     = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected]   = useState('');
  const modalRef                  = useRef(null);

  /* ── Slide-in delay ──────────────────────────────────────────── */
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  /* ── Close modal on outside click or Escape ──────────────────── */
  useEffect(() => {
    if (!modalOpen) return;
    const handleClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) closeModal();
    };
    const handleKey = (e) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [modalOpen]);

  const openModal  = (e) => { e.preventDefault(); setSelected(''); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);

  const handleProceed = () => {
    if (!selected) return;
    window.open(buildWhatsAppUrl(selected), '_blank', 'noopener,noreferrer');
    closeModal();
  };

  return (
    <>
      {/* ── Floating buttons ─────────────────────────────────────── */}
      <div className="floating-contact" aria-label="Quick contact buttons">

        {/* WhatsApp — opens service picker modal */}
        <button
          onClick={openModal}
          className={`floating-btn whatsapp ${visible ? 'visible' : ''}`}
          aria-label="Contact on WhatsApp"
          title="WhatsApp"
        >
          <span className="btn-label">WhatsApp</span>
          <i className="fab fa-whatsapp"></i>
        </button>

        {/* Email */}
        <a
          href="mailto:kevin.uk@grahamkarimi.com"
          className={`floating-btn email ${visible ? 'visible' : ''}`}
          aria-label="Send an email"
          title="Email"
        >
          <span className="btn-label">Email Us</span>
          <i className="fas fa-envelope"></i>
        </a>

      </div>

      {/* ── Service Picker Modal ─────────────────────────────────── */}
      {modalOpen && (
        <div className="wa-overlay" role="dialog" aria-modal="true" aria-labelledby="wa-modal-title">
          <div className="wa-modal" ref={modalRef}>

            {/* Header */}
            <div className="wa-modal__header">
              <div className="wa-modal__icon">
                <i className="fab fa-whatsapp"></i>
              </div>
              <div className="wa-modal__header-text">
                <h2 id="wa-modal-title" className="wa-modal__title">Chat on WhatsApp</h2>
                <p className="wa-modal__subtitle">Select the service you're interested in</p>
              </div>
              <button className="wa-modal__close" onClick={closeModal} aria-label="Close">
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Service list */}
            <ul className="wa-modal__services" role="listbox" aria-label="Services">
              {SERVICES.map((svc) => (
                <li
                  key={svc}
                  role="option"
                  aria-selected={selected === svc}
                  className={`wa-modal__service-item ${selected === svc ? 'selected' : ''}`}
                  onClick={() => setSelected(svc)}
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
              <button className="wa-modal__btn-cancel" onClick={closeModal}>Cancel</button>
              <button
                className={`wa-modal__btn-proceed ${selected ? 'active' : ''}`}
                onClick={handleProceed}
                disabled={!selected}
              >
                <i className="fab fa-whatsapp"></i>
                Open WhatsApp
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default FloatingContact;