import React from 'react';
import '../../pages/Home/Home.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <h2>Get in touch with financial Advisor</h2>
          <p>Connect with Kevin Graham Karimi through these channels</p>
        </div>

        <div className="social-media-container">
          <h3>Connect With Me Now</h3>
          <div className="social-icons-grid">
            <a href="https://linkedin.com/in/kevingrahamkarimi" className="social-icon" title="LinkedIn Profile">
              <i className="fab fa-linkedin"></i>
              <span className="icon-popup">LinkedIn</span>
            </a>
            <a href="https://www.facebook.com/kevingrahamkarimi" className="social-icon" title="Facebook Profile">
              <i className="fab fa-facebook-f"></i>
              <span className="icon-popup">Facebook</span>
            </a>
            <a href="https://t.me/kevingrahamkarimi" className="social-icon" title="Telegram">
              <i className="fab fa-telegram"></i>
              <span className="icon-popup">Telegram</span>
            </a>

            <a href="https://wa.me/+447445323529" className="social-icon" title="WhatsApp">
              <i className="fab fa-whatsapp"></i>
              <span className="icon-popup">WhatsApp</span>
            </a>
            <a href="tel:+447445323529" className="social-icon" title="Phone">
              <i className="fas fa-phone"></i>
              <span className="icon-popup">Call</span>
            </a>
            <a href="mailto:kevin.karimi@inbestconsultant.com" className="social-icon" title="Email">
              <i className="fas fa-envelope"></i>
              <span className="icon-popup">Email</span>
            </a>
          </div>

          <div className="contact-cta">
            <a href="https://calendly.com/kevingraham" className="btn btn-primary">Schedule a Meeting</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
