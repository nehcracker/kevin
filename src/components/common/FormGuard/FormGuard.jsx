import React, { useEffect, useRef } from 'react';

/**
 * Bot protection for the enquiry forms, enforced server-side by
 * enquiry-shared/security.mjs in the Workers.
 *
 *   <Honeypot>   hidden field humans never fill; bots that do are dropped.
 *   <Turnstile>  Cloudflare Turnstile challenge. Active only when
 *                REACT_APP_TURNSTILE_SITE_KEY is set at build time — set it
 *                together with the Workers' TURNSTILE_SECRET_KEY secret.
 */

const SITE_KEY   = process.env.REACT_APP_TURNSTILE_SITE_KEY || '';
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

export const TURNSTILE_ENABLED = Boolean(SITE_KEY);
export const HONEYPOT_FIELD    = 'website'; // must match HONEYPOT_FIELD in security.mjs

const offscreen = {
  position: 'absolute', left: '-10000px', top: 'auto',
  width: '1px', height: '1px', overflow: 'hidden',
};

export const Honeypot = ({ value, onChange }) => (
  <div style={offscreen} aria-hidden="true">
    <label>
      Leave this field empty
      <input
        type="text"
        name={HONEYPOT_FIELD}
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </label>
  </div>
);

let scriptPromise = null;
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src   = SCRIPT_SRC;
      script.async = true;
      script.onload  = () => resolve(window.turnstile);
      script.onerror = () => { scriptPromise = null; reject(new Error('Turnstile failed to load')); };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

/**
 * Calls onToken(token) when solved and onToken('') when the token expires or
 * errors. Tokens are single-use: remount (change `key`) after a failed submit.
 */
export const Turnstile = ({ onToken }) => {
  const container = useRef(null);
  const callback  = useRef(onToken);
  callback.current = onToken;

  useEffect(() => {
    if (!TURNSTILE_ENABLED) return undefined;
    let widgetId = null;
    let cancelled = false;

    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !container.current) return;
        widgetId = turnstile.render(container.current, {
          sitekey:            SITE_KEY,
          theme:              'dark',
          callback:           t => callback.current(t),
          'expired-callback': () => callback.current(''),
          'error-callback':   () => callback.current(''),
        });
      })
      .catch(() => callback.current(''));

    return () => {
      cancelled = true;
      if (widgetId !== null && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, []);

  if (!TURNSTILE_ENABLED) return null;
  return <div ref={container} style={{ margin: '10px 0' }} />;
};
