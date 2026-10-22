import React, { useState, useEffect } from 'react';
import './FloatingContact.css';

// WhatsApp was removed: chats can't be tracked as conversions and drew
// unqualified enquiries. Serious leads go through the tracked enquiry forms.
const FloatingContact = () => {
  const [visible, setVisible] = useState(false);

  /* ── Slide-in delay ──────────────────────────────────────────── */
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="floating-contact" aria-label="Quick contact buttons">
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
  );
};

export default FloatingContact;
