import React from 'react';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import profilePhoto from '../../assets/images/Kevin-kevin.jpg';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <Header />
      
      <main>
        {/* Page Header */}
        <section className="page-header">
          <div className="container">
            <h1>Financial Advisor & consultant</h1>
            <h2>Kevin Graham Karimi</h2>
            <p>Learn more about my background, expertise, and professional journey</p>
          </div>
        </section>
        
        {/* Bio Section */}
        <section className="bio-section">
          <div className="container">
            <div className="bio-content">
              <div className="bio-image">
                <img src={profilePhoto} alt="Kevin Graham Karimi" className="profile-photo1" />
                <div className="experience-badge">
                  <span className="experience-years">15+</span>
                  <span className="experience-text">Years Experience</span>
                </div>
              </div>
              
              <div className="bio-text">
                <h2>Professional Background</h2>
                <p className="position">Director, Risk Management & Compliance</p>
                
                <p>As Director of Risk Management & Compliance at InBest Consultant Solutions, 
                  Kevin Graham Karimi brings a wealth of expertise in safeguarding investments, 
                  ensuring regulatory excellence, and structuring high-value financial solutions
                  across global markets. His keen ability to anticipate potential compliance challenges and 
                  proactively address them has made him a cornerstone in every project he undertakes.</p>
                  <p>Kevin is dedicated to protecting client interests, promoting transparency, and fostering 
                  sustainable growth in every transaction. His commitment to excellence, combined with a forward-thinking
                  approach to international finance, positions him as a key player in today's evolving financial landscape.</p>
                
                <div className="bio-highlights">
                  <h3>Career Highlights</h3>
                  <ul>
                    <li>Led the implementation of comprehensive risk assessment frameworks for multinational financial institutions</li>
                    <li>Orchestrated compliance strategies for high-profile international transactions</li>
                    <li>Advised on regulatory matters across diverse global markets</li>
                    <li>Developed innovative approaches to complex financial risk management</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Philosophy Section */}
        <section className="philosophy-section">
          <div className="container">
            <div className="section-header">
              <h2>Professional Philosophy</h2>
              <p>Guiding principles that drive my approach to risk management and compliance</p>
            </div>
            
            <div className="philosophy-grid">
              <div className="philosophy-card">
                <h3>Proactive Risk Management</h3>
                <p>Identifying and addressing potential risks before they materialize is always more effective than reactive management.</p>
              </div>
              
              <div className="philosophy-card">
                <h3>Regulatory Excellence</h3>
                <p>Viewing compliance not as a constraint but as a foundation for sustainable business growth and stakeholder trust.</p>
              </div>
              
              <div className="philosophy-card">
                <h3>Transparent Communication</h3>
                <p>Maintaining clear, open dialogue with all stakeholders to ensure alignment and informed decision-making.</p>
              </div>
              
              <div className="philosophy-card">
                <h3>Continuous Improvement</h3>
                <p>Constantly evaluating and enhancing risk management processes to adapt to evolving market conditions.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="about-cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to work together?</h2>
              <p>Let's discuss how my expertise can benefit your organization</p>
              <a href="#contact" className="btn btn-primary">Get in Touch</a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
