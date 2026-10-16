/**
 * Shared request hardening for the enquiry Workers (pfi-enquiry, pf-enquiry).
 *
 * Each Worker supplies a field schema and a `send` callback; this module owns
 * everything between the raw request and that callback:
 *
 *   origin allowlist → method / content-type / body-size limits → per-IP rate
 *   limit → JSON parse → honeypot → schema validation → Turnstile verification
 *   → per-recipient rate limit → send
 *
 * `send` receives two views of the submission:
 *   fields — trimmed, control-character-free plain text (subjects, API params)
 *   html   — the same values HTML-escaped, the ONLY values email templates
 *            should interpolate
 *
 * Environment (wrangler.toml [vars] / secrets):
 *   ALLOWED_ORIGINS       comma-separated origins allowed to submit
 *   TURNSTILE_SECRET_KEY  secret; when set, a valid Turnstile token is required
 *   SUBMIT_LIMITER        rate-limit binding keyed by client IP
 *   RECIPIENT_LIMITER     rate-limit binding keyed by submitted email address
 */

export const MAX_BODY_BYTES = 16 * 1024;
export const HONEYPOT_FIELD = 'website';
export const TURNSTILE_FIELD = 'turnstileToken';
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const DEFAULT_ORIGINS = ['https://grahamkarimi.com'];

export const EMAIL_PATTERN = /^[^\s@<>"',;]{1,64}@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;
export const PHONE_PATTERN = /^\+?[\d\s\-().]{7,25}$/;

/* ── Sanitising ────────────────────────────────────────────────────────── */

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Removes C0/C1 control characters. Multi-line fields keep \n and \t;
// single-line fields lose them too, so nothing can break a header or subject.
export function cleanText(value, { multiline = false } = {}) {
  // Line/paragraph separators (U+2028/9) are built from code points so the
  // characters never appear raw in source, where they act as line breaks.
  const seps = String.fromCharCode(0x2028, 0x2029);
  const pattern = multiline
    ? new RegExp(`[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F-\\u009F${seps}]`, 'g')
    : new RegExp(`[\\u0000-\\u001F\\u007F-\\u009F${seps}]`, 'g');
  return String(value).replace(/\r\n?/g, '\n').replace(pattern, multiline ? '' : ' ').trim();
}

/* ── Validation ────────────────────────────────────────────────────────── */

/**
 * schema: { [field]: { label, required?, max, min?, multiline?, pattern? } }
 * Unknown keys in the body are ignored. Returns { fields } or { error }.
 */
export function validate(body, schema) {
  const fields = {};
  for (const [key, rule] of Object.entries(schema)) {
    const raw = body[key];
    if (raw !== undefined && raw !== null && typeof raw !== 'string') {
      return { error: `${rule.label} must be text.` };
    }
    const value = cleanText(raw ?? '', { multiline: rule.multiline });
    if (!value) {
      if (rule.required) return { error: `${rule.label} is required.` };
      fields[key] = '';
      continue;
    }
    if (value.length > rule.max) return { error: `${rule.label} must be ${rule.max} characters or fewer.` };
    if (rule.min && value.length < rule.min) return { error: `${rule.label} must be at least ${rule.min} characters.` };
    if (rule.pattern && !rule.pattern.test(value)) return { error: `${rule.label} is not valid.` };
    fields[key] = value;
  }
  return { fields };
}

/* ── HTTP helpers ──────────────────────────────────────────────────────── */

export function allowedOrigins(env) {
  const list = (env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  return list.length ? list : DEFAULT_ORIGINS;
}

function baseHeaders(origin, env) {
  const headers = {
    'Content-Type':           'application/json',
    'Cache-Control':          'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Vary':                   'Origin',
  };
  if (origin && allowedOrigins(env).includes(origin)) {
    headers['Access-Control-Allow-Origin']  = origin;
    headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type';
    headers['Access-Control-Max-Age']       = '86400';
  }
  return headers;
}

function json(body, status, origin, env) {
  return new Response(JSON.stringify(body), { status, headers: baseHeaders(origin, env) });
}

const clientIp = (request) =>
  request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || 'unknown';

// A missing binding (e.g. local dev) never blocks; a present one is enforced.
async function underLimit(binding, key) {
  if (!binding || typeof binding.limit !== 'function') return true;
  const { success } = await binding.limit({ key });
  return success;
}

export async function verifyTurnstile(token, ip, env, fetchImpl = fetch) {
  if (!env.TURNSTILE_SECRET_KEY) return true; // not configured yet
  if (!token || typeof token !== 'string' || token.length > 2048) return false;

  const form = new FormData();
  form.append('secret', env.TURNSTILE_SECRET_KEY);
  form.append('response', token);
  if (ip && ip !== 'unknown') form.append('remoteip', ip);

  try {
    const res  = await fetchImpl(TURNSTILE_VERIFY_URL, { method: 'POST', body: form });
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}

/* ── Handler factory ───────────────────────────────────────────────────── */

export function createEnquiryHandler({ schema, send, fetchImpl }) {
  return {
    async fetch(request, env) {
      const origin  = request.headers.get('Origin') || '';
      const allowed = allowedOrigins(env).includes(origin);

      if (request.method === 'OPTIONS') {
        return allowed
          ? new Response(null, { status: 204, headers: baseHeaders(origin, env) })
          : json({ error: 'Forbidden.' }, 403, origin, env);
      }
      if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405, origin, env);
      if (!allowed)                  return json({ error: 'Forbidden.' }, 403, origin, env);

      const type = request.headers.get('Content-Type') || '';
      if (!type.toLowerCase().startsWith('application/json')) {
        return json({ error: 'Unsupported content type.' }, 415, origin, env);
      }

      const declared = Number(request.headers.get('Content-Length') || 0);
      if (declared > MAX_BODY_BYTES) return json({ error: 'Request too large.' }, 413, origin, env);

      const ip = clientIp(request);
      if (!(await underLimit(env.SUBMIT_LIMITER, `ip:${ip}`))) {
        return json({ error: 'Too many requests. Please wait a minute and try again.' }, 429, origin, env);
      }

      const text = await request.text();
      if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) {
        return json({ error: 'Request too large.' }, 413, origin, env);
      }

      let body;
      try {
        body = JSON.parse(text);
      } catch {
        return json({ error: 'Invalid request.' }, 400, origin, env);
      }
      if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return json({ error: 'Invalid request.' }, 400, origin, env);
      }

      // Bots fill every field; humans never see this one. Pretend success so
      // the bot gets no signal, but send nothing.
      if (typeof body[HONEYPOT_FIELD] === 'string' && body[HONEYPOT_FIELD].trim()) {
        return json({ success: true }, 200, origin, env);
      }

      const { fields, error } = validate(body, schema);
      if (error) return json({ error }, 422, origin, env);

      if (!(await verifyTurnstile(body[TURNSTILE_FIELD], ip, env, fetchImpl || fetch))) {
        return json({ error: 'Verification failed. Please refresh the page and try again.' }, 403, origin, env);
      }

      if (fields.email && !(await underLimit(env.RECIPIENT_LIMITER, `to:${fields.email.toLowerCase()}`))) {
        return json({ error: 'Too many requests. Please wait a minute and try again.' }, 429, origin, env);
      }

      const html = Object.fromEntries(
        Object.entries(fields).map(([k, v]) => [k, escapeHtml(v)])
      );

      try {
        await send(fields, html, env);
        return json({ success: true }, 200, origin, env);
      } catch (err) {
        // Log the provider error only — never the submission's personal data.
        console.error('Enquiry send failed:', err && err.message);
        return json(
          { error: 'Failed to send your enquiry. Please try again or email kevin.uk@grahamkarimi.com.' },
          502,
          origin,
          env
        );
      }
    },
  };
}
