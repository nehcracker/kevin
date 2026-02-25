import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import './Services.css';

const services = [
  {
    id: 'project-funding',
    number: '01',
    title: 'International Project Funding',
    subtitle: '& Debt Structuring',
    cardClass: 'card-blue',
    icon: 'fas fa-landmark',
    iconLabel: 'Project Finance',
    bgClass: 'bg-white',
    description:
      'Kevin Graham Karimi specializes in securing structured financing for large-scale infrastructure, energy, real estate, and corporate expansion projects. With direct access to a global network of lenders, private equity sponsors, and institutional investors, he delivers tailored debt solutions that align with your project scope, risk appetite, and regulatory environment.',
    solutions: [
      'Project Finance',
      'Debt Structuring & Restructuring',
      'Syndicated Loans',
      'Private Capital Placement',
      'Acquisition & Expansion Funding',
    ],
    keywords: [
      'Project Funding Services',
      'International Project Finance',
      'Debt Structuring Advisory',
      'Corporate Funding Solutions',
      'Large Scale Business Financing',
    ],
  },
  {
    id: 'cross-border',
    number: '02',
    title: 'Cross Border Financial Advisory',
    subtitle: '& Investment Structuring',
    cardClass: 'card-teal',
    icon: 'fas fa-globe-americas',
    iconLabel: 'Global Advisory',
    bgClass: 'bg-light',
    reverse: true,
    description:
      'Structuring international transactions requires deep knowledge of cross-border regulations, capital flow mechanisms, and multi-jurisdictional compliance. Kevin provides high-net-worth individuals and corporations with strategic advisory services to optimize their international investment structures, minimize regulatory exposure, and maximize capital efficiency across global markets.',
    solutions: [
      'Cross Border Transaction Structuring',
      'Offshore Investment Planning',
      'Capital Raising Strategy',
      'Investment Risk Assessment',
      'International Financial Compliance',
    ],
    keywords: [
      'Cross Border Finance Advisory',
      'International Investment Structuring',
      'Global Capital Advisory',
      'Offshore Investment Strategy',
      'International Financial Consulting',
    ],
  },
  {
    id: 'risk-compliance',
    number: '03',
    title: 'Risk Management',
    subtitle: '& Regulatory Compliance Advisory',
    cardClass: 'card-purple',
    icon: 'fas fa-shield-alt',
    iconLabel: 'Risk & Compliance',
    bgClass: 'bg-white',
    description:
      'As Director of Risk Management & Compliance at InBest Consultant Solutions, Kevin designs and implements comprehensive risk frameworks that protect investors and corporations throughout high-value transactions. His expertise spans anti-money laundering protocols, regulatory audits, and corporate governance systems across multiple international jurisdictions.',
    solutions: [
      'Regulatory Compliance Advisory',
      'AML & KYC Framework Support',
      'Corporate Governance Structuring',
      'Risk Audits & Internal Controls',
      'Financial Compliance Review',
    ],
    keywords: [
      'Financial Risk Management Services',
      'Regulatory Compliance Advisory',
      'Corporate Governance Consulting',
      'AML Compliance Advisory',
      'Investment Risk Assessment',
    ],
  },
  {
    id: 'document-alignment',
    number: '04',
    title: 'Document Alignment Services',
    subtitle: '(DAS)',
    cardClass: 'card-indigo',
    icon: 'fas fa-file-contract',
    iconLabel: 'Document Alignment',
    bgClass: 'bg-light',
    reverse: true,
    description:
      'A well-structured funding proposal is the difference between capital secured and capital lost. Kevin aligns your business documentation — from feasibility studies to financial models — with the precise standards demanded by international lenders, institutional investors, and regulatory bodies. This service dramatically increases fundability and eliminates bottlenecks in the approval process.',
    solutions: [
      'Business Plan Writing & Review',
      'Investment Proposal Development',
      'Financial Model Alignment',
      'Feasibility Study Review',
      'Funding Submission Pack Preparation',
    ],
    keywords: [
      'Business Plan Writing Services',
      'Investment Proposal Writing',
      'Funding Document Preparation',
      'Financial Model Review',
      'Project Proposal Alignment',
    ],
  },
  {
    id: 'global-hr',
    number: '05',
    title: 'Global HR & International',
    subtitle: 'Job Placement Services',
    cardClass: 'card-green',
    icon: 'fas fa-users',
    iconLabel: 'Global Workforce',
    bgClass: 'bg-white',
    description:
      'Corporate growth demands the right talent in the right markets. Kevin supports companies and professionals with international workforce solutions — from executive search and overseas job sourcing to talent mobility strategy and cross-border recruitment compliance. Whether expanding into new markets or building specialist teams, this service delivers workforce solutions aligned with your global ambitions.',
    solutions: [
      'Overseas Job Sourcing',
      'Executive Search Services',
      'Talent Mobility Strategy',
      'Corporate Workforce Expansion',
      'International Recruitment Compliance',
    ],
    keywords: [
      'International Job Placement Services',
      'Overseas Recruitment Agency',
      'Global Executive Search',
      'Workforce Mobility Solutions',
      'International Employment Consulting',
    ],
  },
];

const Services = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="services-page">
      <Helmet>
        <title>Services | Kevin Graham Karimi – Project Funding, Risk Advisory & International Finance</title>
        <meta
          name="description"
          content="Explore Kevin Graham Karimi's services: international project funding, cross-border advisory, risk & compliance, document alignment, and global HR placement."
        />
        <meta
          name="keywords"
          content="project funding services, international project finance, debt structuring advisory, cross border finance advisory, financial risk management, regulatory compliance advisory, business plan writing services, international job placement"
        />
        <link rel="canonical" href="https://grahamkarimi.com/services" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Services | Kevin Graham Karimi – Global Financial Advisory" />
        <meta
          property="og:description"
          content="From project funding to regulatory compliance — expert financial advisory services for corporations and high-net-worth clients worldwide."
        />
        <meta property="og:url" content="https://grahamkarimi.com/services" />
        <meta property="og:image" content="https://grahamkarimi.com/Kevin-graham.png" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Kevin Graham Karimi Financial Advisory Services',
            url: 'https://grahamkarimi.com/services',
            description:
              'Professional financial advisory services: project funding, cross-border investment structuring, risk management, document alignment, and global HR placement.',
            provider: {
              '@type': 'Person',
              name: 'Kevin Graham Karimi',
              jobTitle: 'Global Financial Advisor & Director of Risk Management',
            },
            serviceType: services.map((s) => `${s.title} ${s.subtitle}`),
            areaServed: { '@type': 'Country', name: 'Global' },
          })}
        </script>
      </Helmet>

      <main id="main-content">
        {/* Page Header */}
        <section className="services-page-header">
          <div className="container">
            <h1>Our Services</h1>
            <p>
              Comprehensive financial solutions for corporations, project promoters, and high-net-worth
              clients — spanning funding, compliance, investment structuring, and global workforce advisory.
            </p>
          </div>
        </section>

        {/* Quick Nav Strip */}
        <nav className="services-quicknav" aria-label="Services navigation">
          <div className="container">
            <ul className="quicknav-pills">
              {services.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>
                    {s.number} {s.title.split(' ').slice(0, 3).join(' ')}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Service Sections */}
        {services.map((service) => (
          <section
            key={service.id}
            id={service.id}
            className={`service-section ${service.bgClass}`}
          >
            <div className="container">
              <div className={`service-layout${service.reverse ? ' reverse' : ''}`}>
                {/* Content */}
                <div className="service-content">
                  <div className="service-number">{service.number}</div>
                  <h2>
                    {service.title}
                    <span>{service.subtitle}</span>
                  </h2>
                  <p className="service-description">{service.description}</p>

                  <div className="core-solutions">
                    <h4>Core Solutions</h4>
                    <ul className="solutions-list">
                      {service.solutions.map((sol, i) => (
                        <li key={i}>{sol}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="keyword-tags">
                    {service.keywords.map((kw, i) => (
                      <span key={i} className="keyword-tag">{kw}</span>
                    ))}
                  </div>

                  <a href="#contact" className="service-cta-link">
                    Get in Touch <i className="fas fa-arrow-right"></i>
                  </a>
                </div>

                {/* Visual */}
                <div className="service-visual">
                  <div className={`service-icon-card ${service.cardClass}`}>
                    <i className={service.icon}></i>
                    <span className="icon-label">{service.iconLabel}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Why Choose Section */}
        <section className="why-choose-section">
          <div className="container">
            <div className="section-header">
              <h2>Why Work With Kevin Graham Karimi</h2>
              <p>A track record built on results, relationships, and regulatory excellence across global markets.</p>
            </div>
            <div className="stats-grid">
              {[
                { number: '15+', label: 'Years Experience' },
                { number: '$500M+', label: 'Managed Transactions' },
                { number: '40+', label: 'Countries Served' },
                { number: '100+', label: 'Corporate Clients' },
              ].map((stat, i) => (
                <div key={i} className="stat-item">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="services-cta-section">
          <div className="container">
            <h2>Ready to Explore the Right Solution?</h2>
            <p>Let's discuss how my expertise can support your goals and drive results.</p>
            <div className="cta-buttons">
              <a href="#contact" className="btn btn-primary">
                <i className="fas fa-calendar-check"></i> Schedule a Consultation
              </a>
              <a href="mailto:kevin.karimi@inbestconsultant.com" className="btn-outline">
                <i className="fas fa-envelope"></i> Send an Email
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Services;