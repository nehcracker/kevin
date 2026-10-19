import React from 'react';
import './MarketingOptIn.css';

/**
 * Optional marketing consent for the enquiry forms. Unticked by default and
 * never required: only a ticked box (sent as `marketingOptIn: true`, see
 * MARKETING_FIELD in enquiry-shared/security.mjs) lets a lead be used for
 * follow-up marketing or ad audiences such as Google Ads Customer Match.
 */
const MarketingOptIn = ({ id, checked, onChange, disabled }) => (
  <div className="mkt-optin">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      disabled={disabled}
    />
    <label htmlFor={id}>
      Optional: keep me informed about funding opportunities and services from
      Kevin Graham. You can opt out at any time by emailing kevin.uk@grahamkarimi.com.
    </label>
  </div>
);

export default MarketingOptIn;
