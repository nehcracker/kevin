import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const goHomeAndScrollHero = (e) => {
    e.preventDefault();
    // Check if we're already on home page
    if (window.location.pathname === '/') {
      // Just scroll to hero
      const hero = document.getElementById('hero');
      if (hero) hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      // Navigate to home and scroll
      window.location.href = '/#hero';
    }
  };

  const goToAboutAndScrollTop = (e) => {
    e.preventDefault();
    // Check if we're already on about page
    if (window.location.pathname === '/about') {
      // Just scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      // Navigate to about and scroll to top
      window.location.href = '/about';
    }
  };

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <a href="/" className="site-logo" onClick={goHomeAndScrollHero}>
              <h1>Kevin Graham Karimi</h1>
              <span className="tagline">financial advisor, Risk Management & compliance director</span>
            </a>
          </div>
          
          <nav className="main-nav">
            <ul>
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><a href="/about" className="nav-link" onClick={goToAboutAndScrollTop}>About</a></li>
              <li><a href="#contact" className="nav-link contact-link">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
