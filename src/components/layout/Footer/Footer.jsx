import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">

          <div className="footer-info">
<h3><a href="https://register.fca.org.uk/s/individual?id=003b000000LUZUPAA5" target="_blank" rel="noopener noreferrer">Kevin Graham</a></h3>
            <p>
              With over 15 years of global experience, Kevin delivers specialist advisory across
              project funding, international financial strategy, risk &amp; compliance, and document
              alignment services, serving high-net-worth corporations across 40+ countries.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/services/project-funding">Project Funding</a></li>
              <li><a href="/services/business-consultant">Business Consultant</a></li>
              <li><a href="/services/document-alignment-services">Document Alignment Services</a></li>
            </ul>
          </div>

          <div className="footer-social">
            <h4>Connect</h4>
            <div className="social-icons">

              <a
                href="https://linkedin.com/in/kevingrahamkarimi"
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
                <span className="icon-popup">LinkedIn</span>
              </a>

              <a
                href="https://www.facebook.com/kevingrahamkarimi"
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
              >
                <i className="fab fa-facebook"></i>
                <span className="icon-popup">Facebook</span>
              </a>

              {/* imo.im requires no + prefix */}
              <a
                href="https://imo.im/447723339858"
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IMO"
                title="IMO"
              >
                <i className="fas fa-comment-dots"></i>
                <span className="icon-popup">IMO</span>
              </a>

              <a
                href="mailto:kevin.uk@grahamkarimi.com"
                className="social-icon"
                aria-label="Email"
                title="Email"
              >
                <i className="fas fa-envelope"></i>
                <span className="icon-popup">Email</span>
              </a>

            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Kevin Graham. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;