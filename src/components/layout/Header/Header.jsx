import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <h1>Kevin Graham Karimi</h1>
              <span className="tagline">financial advisor, Risk Management & compliance director</span>
            </Link>
          </div>
          
          <nav className="main-nav">
            <ul>
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/about" className="nav-link">About</Link></li>
              <li><a href="#expertise" className="nav-link">Expertise</a></li>
              <li><a href="#contact" className="nav-link contact-link">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
