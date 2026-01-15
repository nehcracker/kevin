import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const goHomeAndScrollHero = (e) => {
    e.preventDefault();
    // Check if we're already on home page
    if (window.location.pathname === '/') {
      // Just scroll to hero
      const hero = document.getElementById('hero');
      if (hero) hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      // Navigate to home using React Router
      navigate('/');
    }
  };

  const goToAboutAndScrollTop = (e) => {
    e.preventDefault();
    // Check if we're already on about page
    if (window.location.pathname === '/about') {
      // Just scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      // Navigate to about using React Router
      navigate('/about');
    }
  };

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/" className="site-logo" onClick={goHomeAndScrollHero}>
              <h1>Kevin Graham Karimi</h1>
              <span className="tagline">financial advisor, Risk Management & compliance director</span>
            </Link>
          </div>
          
          <nav className="main-nav">
            <ul>
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/about" className="nav-link" onClick={goToAboutAndScrollTop}>About</Link></li>
              <li><a href="#contact" className="nav-link contact-link">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;