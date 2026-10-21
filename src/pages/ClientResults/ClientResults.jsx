import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/common/SEO/SEO';
import { fadeUp, staggerContainer, staggerItem } from '../../utils/motion';
import './ClientResults.css';

// ── Status definitions ──────────────────────────────────────────────────────
// Order here is the order of the filter tabs and hero stats.
const STATUSES = {
  'fully-funded':     { label: 'Fully Funded' },
  'funding-received': { label: 'Funding Received' },
  'in-progress':      { label: 'In Progress' },
};

// ── Client list ─────────────────────────────────────────────────────────────
// SAMPLE DATA — replace with real clients before publishing.
// status:    one of the STATUSES keys above
// client:    display name; set anonymous: true to hide it and show "<sector> client"
// amount:    free text so any currency/format works (e.g. '$2.5M', '€800K')
// year:      year the engagement started or closed
// note:      one or two sentences on what was delivered
const CLIENTS = [
  {
    client: 'Sample Solar Developer Ltd',
    anonymous: false,
    sector: 'Renewable Energy',
    country: 'Kenya',
    service: 'Project Funding',
    amount: '$4.2M',
    status: 'fully-funded',
    year: 2025,
    note: 'Structured the funding package and investor documentation for a 12MW solar installation.',
  },
  {
    client: 'Sample Agritech Co.',
    anonymous: true,
    sector: 'Agriculture',
    country: 'Nigeria',
    service: 'Equity Financing',
    amount: '$1.5M',
    status: 'funding-received',
    year: 2025,
    note: 'First tranche received from a strategic equity partner; second tranche on milestone.',
  },
  {
    client: 'Sample Property Group',
    anonymous: false,
    sector: 'Real Estate',
    country: 'United Kingdom',
    service: 'Business Funding & Loans',
    amount: '£2.8M',
    status: 'in-progress',
    year: 2026,
    note: 'Document alignment complete; term sheet under review with the lender.',
  },
  {
    client: 'Sample Healthcare Provider',
    anonymous: true,
    sector: 'Healthcare',
    country: 'Ghana',
    service: 'Grants & Donations',
    amount: '$650K',
    status: 'fully-funded',
    year: 2024,
    note: 'Secured grant funding for a regional diagnostic clinic expansion.',
  },
  {
    client: 'Sample Logistics Firm',
    anonymous: false,
    sector: 'Logistics',
    country: 'UAE',
    service: 'Project Funders & Investors',
    amount: '$9M',
    status: 'in-progress',
    year: 2026,
    note: 'Introduced to three qualified funders; due diligence underway.',
  },
  {
    client: 'Sample Manufacturing Plc',
    anonymous: true,
    sector: 'Manufacturing',
    country: 'South Africa',
    service: 'Project Funding',
    amount: '$3.1M',
    status: 'funding-received',
    year: 2025,
    note: 'Bridge facility drawn down; long-term facility in final approval.',
  },
];

const FILTERS = [{ key: 'all', label: 'All Clients' }].concat(
  Object.entries(STATUSES).map(([key, { label }]) => ({ key, label }))
);

const displayName = (c) => (c.anonymous ? `${c.sector} client` : c.client);

const ClientResults = () => {
  const [filter, setFilter] = useState('all');

  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); }, []);

  const counts = useMemo(() => {
    const out = { all: CLIENTS.length };
    Object.keys(STATUSES).forEach((k) => { out[k] = CLIENTS.filter((c) => c.status === k).length; });
    return out;
  }, []);

  const countries = useMemo(() => new Set(CLIENTS.map((c) => c.country)).size, []);

  const visible = filter === 'all' ? CLIENTS : CLIENTS.filter((c) => c.status === filter);

  return (
    <div className="client-results-page">
      <SEO
        title="Client Results – Funded Projects & Success Stories"
        description="Clients Kevin Graham has helped secure funding: fully funded projects, funding received and deals in progress across sectors and countries."
        keywords="Kevin Graham clients, funded projects, project funding results, client success stories, funding advisor track record"
        canonical="https://grahamkarimi.com/client-results"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Client Results',
          url: 'https://grahamkarimi.com/client-results',
          description: 'Track record of clients who have received funding with Kevin Graham’s advisory.',
        }}
      />

      <main id="main-content">

        <section className="cr-hero">
          <div className="container">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.p className="cr-eyebrow" variants={staggerItem}>Track Record</motion.p>
              <motion.h1 variants={staggerItem}>Client Results</motion.h1>
              <motion.p className="cr-lead" variants={staggerItem}>
                Businesses and projects that have secured funding through my advisory, from deals
                in progress to fully funded.
              </motion.p>
            </motion.div>

            <motion.div
              className="cr-stats"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {Object.entries(STATUSES).map(([key, { label }]) => (
                <motion.div key={key} className="cr-stat" variants={staggerItem}>
                  <span className="cr-stat-value">{counts[key]}</span>
                  <span className="cr-stat-label">{label}</span>
                </motion.div>
              ))}
              <motion.div className="cr-stat" variants={staggerItem}>
                <span className="cr-stat-value">{countries}</span>
                <span className="cr-stat-label">Countries</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="cr-list-section">
          <div className="container">
            <div className="cr-filters" role="group" aria-label="Filter clients by funding status">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={filter === f.key}
                  className={`cr-filter${filter === f.key ? ' is-active' : ''}`}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                  <span className="cr-filter-count">{counts[f.key]}</span>
                </button>
              ))}
            </div>

            <motion.ul
              key={filter}
              className="cr-grid"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {visible.map((c) => (
                <motion.li
                  key={`${c.client}-${c.year}`}
                  className={`cr-card cr-card--${c.status}`}
                  variants={staggerItem}
                >
                  <div className="cr-card-top">
                    <span className={`cr-badge cr-badge--${c.status}`}>{STATUSES[c.status].label}</span>
                    <span className="cr-year">{c.year}</span>
                  </div>
                  <h3 className="cr-card-name">{displayName(c)}</h3>
                  <p className="cr-card-meta">{c.sector} · {c.country}</p>
                  <p className="cr-card-amount">{c.amount}</p>
                  <p className="cr-card-service">{c.service}</p>
                  <p className="cr-card-note">{c.note}</p>
                </motion.li>
              ))}
            </motion.ul>

            {visible.length === 0 && (
              <p className="cr-empty">No clients in this category yet.</p>
            )}
          </div>
        </section>

        <section className="cr-cta">
          <div className="container">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <h2>Want to be the next success story?</h2>
              <p>Tell me about your project and I’ll outline the funding routes that fit.</p>
              <a href="#contact" className="cr-cta-btn">Start a Conversation</a>
            </motion.div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default ClientResults;
