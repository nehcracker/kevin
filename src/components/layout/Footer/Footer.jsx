import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <h3>Kevin Graham Karimi</h3>
            <p>Global Financial Advisor, Risk Management & Compliance expert in international investment strategies 
              & financing for high-net-worth corporations.</p>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="#expertise">Expertise</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-social">
            <h4>Connect</h4>
            <div className="social-icons">
              <a href="https://linkedin.com/in/kevingrahamkarimi" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://www.facebook.com/kevingrahamkarimi" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://wa.me/+447445323529" className="social-icon" title="WhatsApp">
                  <i className="fab fa-whatsapp"></i>
                  <span className="icon-popup">WhatsApp</span>
                </a>
              <a href="mailto:kevin.karimi@inbestconsultant.com" className="social-icon" title="Email">
                  <i className="fas fa-envelope"></i>
                  <span className="icon-popup">Email</span>
                </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Kevin Graham Karimi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
