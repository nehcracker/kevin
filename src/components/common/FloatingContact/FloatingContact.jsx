import React, { useState, useEffect } from 'react';
import './FloatingContact.css';

/**
 * FloatingContact
 *
 * Two buttons fixed to the RIGHT edge of the screen on every page.
 * They start off-screen and slide in 1.5 s after mount.
 * On hover each button expands to reveal its label.
 *
 * Place once in App.js — no changes needed to any page file.
 */

const FloatingContact = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Delay slide-in so it doesn't compete with page load paint
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="floating-contact" aria-label="Quick contact buttons">

      {/* ── WhatsApp ────────────────────────────────────────────── */}
      <a
        href="https://wa.me/+44773339858"
        target="_blank"
        rel="noopener noreferrer"
        className={`floating-btn whatsapp ${visible ? 'visible' : ''}`}
        aria-label="Contact on WhatsApp"
        title="WhatsApp"
      >
        <span className="btn-label">WhatsApp</span>
        <i className="fab fa-whatsapp"></i>
      </a>

      {/* ── Email ───────────────────────────────────────────────── */}
      <a
        href="mailto:kevin.karimi@inbestconsultant.com"
        className={`floating-btn email ${visible ? 'visible' : ''}`}
        aria-label="Send an email"
        title="Email"
      >
        <span className="btn-label">Email Us</span>
        <i className="fas fa-envelope"></i>
      </a>

    </div>
  );
};

export default FloatingContact;