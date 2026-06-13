import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../../assets/images/Graham.png';

const Header = () => {
  const navigate   = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goHomeAndScrollHero = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };

  const goToAboutAndScrollTop = (e) => {
    e.preventDefault();
    if (window.location.pathname === '/about') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      navigate('/about');
    }
  };

  const goToServicesAndScrollTop = (e) => {
    e.preventDefault();
    if (window.location.pathname === '/services') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      navigate('/services');
    }
  };

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/" className="site-logo" onClick={goHomeAndScrollHero}>
              <img src={logo} alt="Kevin Graham Logo" className="site-logo-image" />
            </Link>
          </div>
          <nav className="main-nav">
            <ul>
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/about" className="nav-link" onClick={goToAboutAndScrollTop}>About</Link></li>
              <li><Link to="/services" className="nav-link" onClick={goToServicesAndScrollTop}>Services</Link></li>
              <li><a href="#contact" className="nav-link contact-link">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
