import React, { useEffect } from 'react';
import SEO from '../../components/common/SEO/SEO';
import profilePhoto from '../../assets/images/Kevin-kevin.jpg';
import './About.css';

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="about-page">

      {/* ── PAGE SEO ─────────────────────────────────────────────────── */}
      <SEO
        title="Financial Advisor & Risk Management Director"
        description="With international experience, he advises corporations & high-net-worth investors on regulatory compliance, risk frameworks, and global financial strategy."
        keywords="Kevin Graham, financial advisor background, risk management director, InBest Consultant Solutions, international compliance expert, regulatory advisory experience"
        canonical="https://grahamkarimi.com/about"
        ogType="profile"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          name: 'Kevin Graham',
          url: 'https://grahamkarimi.com/about',
          mainEntity: {
            '@type': 'Person',
            name: 'Kevin Graham',
            jobTitle: 'Director of Risk Management & Compliance',
            worksFor: {
              '@type': 'Organization',
              name: 'InBest Consultant Solutions',
              url: 'https://inbestconsultant.com',
            },
          },
        }}
      />
      {/* ─────────────────────────────────────────────────────────────── */}

      <main id="main-content">

        <section className="page-header">
          <div className="container">
            <h1>Financial Advisor & Consultant</h1>
            <h2>Kevin Graham</h2>
            <p>Learn more about my background, expertise, and professional journey</p>
          </div>
        </section>

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
                <p className="position">Director, Risk Management, global finance, & Compliance</p>
                <p>
                  As Director of Risk Management & Compliance at InBest Consultant Solutions,
                  Kevin Graham Karimi brings a wealth of expertise in safeguarding investments,
                  ensuring regulatory excellence, and structuring high-value financial solutions
                  across global markets.
                </p>
                <p>
                  Kevin is dedicated to protecting client interests, promoting transparency, and
                  fostering sustainable growth in every transaction. His commitment to excellence,
                  combined with a forward-thinking approach to international finance, positions him
                  as a key player in today's evolving financial landscape.
                </p>
                <div className="bio-highlights">
                  <h3>Career Highlights</h3>
                  <ul>
                    <li>Led implementation of comprehensive risk assessment frameworks for multinational financial institutions</li>
                    <li>Orchestrated compliance strategies for high-profile international transactions</li>
                    <li>Advised on regulatory matters across diverse global markets</li>
                    <li>Developed innovative approaches to complex financial risk management</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="philosophy-section">
          <div className="container">
            <div className="section-header">
              <h2>Professional Philosophy</h2>
              <p>Guiding principles that drive my approach to risk management and compliance</p>
            </div>
            <div className="philosophy-grid">
              {[
                { title: 'Proactive Risk Management', body: 'Identifying and addressing potential risks before they materialize is always more effective than reactive management.' },
                { title: 'Regulatory Excellence', body: 'Viewing compliance not as a constraint but as a foundation for sustainable business growth and stakeholder trust.' },
                { title: 'Transparent Communication', body: 'Maintaining clear, open dialogue with all stakeholders to ensure alignment and informed decision-making.' },
                { title: 'Collaborative Approach', body: 'Collaborating with clients, regulators, and stakeholders to understand their needs and challenges.' },
                { title: 'Customer Focus', body: 'Providing personalized solutions that align with client goals and objectives.' },
                { title: 'Continuous Improvement', body: 'Constantly evaluating and enhancing risk management processes to adapt to evolving market conditions.' },
              ].map((card, i) => (
                <div key={i} className="philosophy-card">
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

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
    </div>
  );
};

export default About;