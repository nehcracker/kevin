import React from 'react';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import profilePhoto from '../../assets/images/Kevin-graham.png';
import Graham from '../../assets/images/Graham.png';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      
      <main>
        {/* Enhanced Hero Section */}
        <section className="hero-section">
          {/* Floating Particles */}
          <div className="floating-particles">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>

          <div className="container">
            <div className="hero-content">
              {/* Eyebrow Text */}
              <span className="hero-eyebrow">Trusted by Global Corporations</span>
              
              {/* Main Title */}
              <h1>Global Financial Advisor</h1>
              
              {/* Name with Credentials */}
              <h3>Kevin Graham Karimi</h3>
              <span className="hero-credentials">MBA | Director of Risk Management & Compliance</span>
              
              {/* Power Tagline */}
              <p className="hero-tagline">
                Transforming Complex Financial Challenges into Strategic Opportunities
              </p>
              
              {/* Stats Bar */}
              <div className="hero-stats">
                <div className="stat-card">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">$500M+</span>
                  <span className="stat-label">Transactions</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">100+</span>
                  <span className="stat-label">Corporate Clients</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">40+</span>
                  <span className="stat-label">Countries</span>
                </div>
              </div>
              
              {/* Description */}
              <p>
                Global financial advisor and Risk Management & Compliance Director specializing in 
                meeting the domestic and international investing needs of high-net-worth individuals, 
                and corporations. Expert in debt structuring, cross-border financial solutions, Project Funding & regulatory compliance.
              </p>
              
              {/* Enhanced CTA Buttons */}
              <div className="hero-cta">
                <a href="#contact" className="btn btn-primary">
                  <i className="fas fa-calendar-check"></i>
                  Schedule Consultation
                </a>
                <a href="#expertise" className="btn btn-secondary">
                  <i className="fas fa-arrow-down"></i>
                  Explore 6 Expertise Areas
                </a>
              </div>
              
              {/* Trust Badges */}
              <div className="trust-badges">
                <div className="trust-badge">
                  <i className="fas fa-certificate"></i>
                  <span>Certified Financial Advisor</span>
                </div>
                <div className="trust-badge">
                  <i className="fas fa-award"></i>
                  <span>Industry Leader</span>
                </div>
                <div className="trust-badge">
                  <i className="fas fa-shield-alt"></i>
                  <span>Regulatory Expert</span>
                </div>
              </div>
            </div>
            
            {/* Hero Image with Badge */}
            <div className="hero-image">
              <div className="hero-image-wrapper">
                <img src={profilePhoto} alt="Kevin Graham Karimi - Global Financial Strategist" />
                <div className="image-badge">
                  <i className="fas fa-star"></i> Top Rated
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="scroll-indicator">
            <i className="fas fa-chevron-down"></i>
            <span>Discover More</span>
          </div>
        </section>

        {/* Expertise Section */}
        <section id="expertise" className="expertise-section">
          <div className="container">
            <div className="section-header">
              <h2>Financial Agent</h2>
              <p>As a seasoned global financial agent and Director of Risk Management & 
                Compliance at InBest Consultant Solutions, Kevin Graham Karimi offers deep, 
                practical expertise across core pillars of financial structuring and regulatory 
                advisory:
              </p>
            </div>
            
            <div className="expertise-grid">
              <div className="expertise-card">
                <div className="expertise-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Sourcing Loans & Debt Advisory</h3>
                <p>Expert in connecting businesses and projects with credible local and 
                    international lenders. Specializes in structuring tailored debt solutions 
                    that align with client goals, risk appetite, and regulatory frameworks.</p>
              </div>
              
              <div className="expertise-card">
                <div className="expertise-icon">
                  <i className="fas fa-balance-scale"></i>
                </div>
                <h3>Credit Proposal Alignment</h3>
                <p>Provides strategic oversight to ensure project documents and business proposals 
                    meet investor, lender, and statutory expectations increasing fundability and 
                    reducing bottlenecks.</p>
              </div>
              
              <div className="expertise-card">
                <div className="expertise-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3>Debt, Restructuring & Recovery</h3>
                <p>Skilled in high-stakes negotiations with financial institutions and creditors, offering recovery pathways, 
                    restructuring plans, and sustainable repayment strategies for distressed assets and organizations.</p>
              </div>

              <div className="expertise-card">
                <div className="expertise-icon">
                  <i className="fas fa-balance-scale"></i>
                </div>
                <h3>Due Diligence & Statutory Services</h3>
                <p>Oversees comprehensive due diligence for both investors and investees. Ensures regulatory compliance, 
                    risk profiling, and statutory document verification across multiple jurisdictions.</p>
              </div>
              
              <div className="expertise-card">
                <div className="expertise-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3>Financial Market Networking</h3>
                <p>Maintains a high-level network across financial institutions, private equity firms, project sponsors, 
                    and sovereign investors. Leverages international relationships to unlock cross-border funding, trade, 
                    and joint venture opportunities.</p>
              </div>
              
              <div className="expertise-card">
                <div className="expertise-icon">
                  <i className="fas fa-globe"></i>
                </div>
                <h3>Risk & Regulatory Compliance</h3>
                <p>Designs and implements comprehensive risk frameworks for high-value transactions. Ensures full alignment with international 
                    regulatory standards, anti-money laundering (AML) policies, and compliance protocols across diverse industries.</p>
              </div>
            </div>
            
          </div>
        </section>
        
        {/* React Framework Section */}
        <section className="react-section">
          <div className="container">
            <div className="section-header">
              <h2>Expertise & Experience</h2>
            </div>
            
            <div className="react-content">
              <div className="react-info">
                <p>Kevin Graham Karimi brings over a decade of strategic insight and execution in global finance,
                    with a focus on risk management, compliance, and debt advisory. As Director of Risk Management 
                    & Compliance at 
                    <a 
                    href="https://inbestconsultant.com/" target="_blank" rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline font-semibold"
                    >
                    InBest Consultant Solutions
                    </a>, 
                    he has led numerous high-value transactions across sectors such as infrastructure, 
                    energy, trade finance, and real estate. 
                    <br></br>
                    
                    His core competencies include sourcing and structuring international loans, aligning complex business proposals with lender expectations,
                    and navigating multi-jurisdictional regulatory landscapes with precision. Kevin is especially known for his 
                    effectiveness in debt restructuring, negotiation, and recovery, delivering sustainable outcomes for distressed 
                    ventures and underperforming assets.</p>
                </div>
              <div className="react-logo">
                <img src={Graham} alt="Kevin Graham Professional" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;