import React from 'react';
import './Partners.css';

/* ── Partner data ────────────────────────────────────────────────────────────
   Swap icon / label / accent as real logos arrive.
   Each entry maps to one card in the marquee track.
──────────────────────────────────────────────────────────────────────────── */
const PARTNERS = [
  { id: 'gbg',   icon: 'fas fa-landmark',        label: 'Global Bridge Group',       accent: '#1565C0' },
  { id: 'ibc',   icon: 'fas fa-building',         label: 'InBest Consultants',        accent: '#0D1B4E' },
  { id: 'lcg',   icon: 'fas fa-city',             label: 'London Capital Group',      accent: '#1976D2' },
  { id: 'mra',   icon: 'fas fa-shield-alt',       label: 'Meridian Risk Advisory',    accent: '#6A1B9A' },
  { id: 'aib',   icon: 'fas fa-university',       label: 'Atlas Investment Bank',     accent: '#00695C' },
  { id: 'stc',   icon: 'fas fa-balance-scale',    label: 'Sterling Compliance',       accent: '#B45309' },
  { id: 'ntf',   icon: 'fas fa-ship',             label: 'Nexus Trade Finance',       accent: '#0891B2' },
  { id: 'cag',   icon: 'fas fa-crown',            label: 'Crown Advisory Group',      accent: '#CA8A04' },
  { id: 'pgi',   icon: 'fas fa-globe-americas',   label: 'Pacific Gateway Inc.',      accent: '#059669' },
  { id: 'vcp',   icon: 'fas fa-chart-line',       label: 'Vanguard Capital Partners', accent: '#DC2626' },
];

/* The track is rendered twice so the CSS marquee can loop seamlessly */
const Track = () => (
  <>
    {PARTNERS.map((p) => (
      <div className="partners-card" key={p.id} aria-label={p.label}>
        <div
          className="partners-card__icon"
          style={{ '--accent': p.accent }}
          aria-hidden="true"
        >
          <i className={p.icon}></i>
        </div>
        <span className="partners-card__label">{p.label}</span>
      </div>
    ))}
  </>
);

/* ── Component ───────────────────────────────────────────────────────────── */
const Partners = () => (
  <section
    className="partners-section"
    aria-labelledby="partners-heading"
  >
    {/* Decorative grid texture */}
    <div className="partners-texture" aria-hidden="true" />

    <div className="partners-inner">

      {/* Header */}
      <div className="partners-header">
        <span className="partners-eyebrow">Trusted Partnerships</span>
        <h2 id="partners-heading" className="partners-title">
          Our Global Partners &amp; Associates
        </h2>
        <p className="partners-subtitle">
          Working alongside leading institutions, advisory firms, and financial
          partners across <strong>40+ countries</strong>.
        </p>
      </div>

      {/* Marquee */}
      <div className="partners-marquee" role="region" aria-label="Partner logos">
        {/* Edge fade masks */}
        <div className="partners-fade partners-fade--left"  aria-hidden="true" />
        <div className="partners-fade partners-fade--right" aria-hidden="true" />

        <div className="partners-track-wrap">
          {/* Two identical tracks — CSS animates the combined width (200%) by -50% */}
          <div className="partners-track" aria-hidden="true">
            <Track />
            <Track />
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="partners-note">
        <i className="fas fa-handshake" aria-hidden="true"></i>
        Partnership &amp; co-advisory enquiries welcome —{' '}
        <a href="mailto:kevin.uk@grahamkarimi.com">reach out directly</a>.
      </p>

    </div>
  </section>
);

export default Partners;