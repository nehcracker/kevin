// Run: npm run test:workers  (node --test, no extra dependencies)
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { escapeHtml, cleanText, validate, verifyTurnstile, EMAIL_PATTERN } from './security.mjs';
import pfiWorker from '../pfi-enquiry/worker.js';
import pfWorker from '../pf-enquiry/worker.js';

const ORIGIN = 'https://grahamkarimi.com';
const ENV = { ALLOWED_ORIGINS: ORIGIN, ZEPTO_API_KEY: 'test' };

const VALID_PFI = {
  name: 'Jane Doe', org: 'Acme Ltd', email: 'jane@acme.test', phone: '+44 7700 900000',
  country: 'Kenya', sector: 'Healthcare', range: '2,500,000',
  summary: 'A chain of diagnostic clinics raising growth capital to open six new sites.',
};

let sent;
beforeEach(() => {
  sent = [];
  globalThis.fetch = async (url, init) => {
    if (String(url).includes('zeptomail')) {
      sent.push(JSON.parse(init.body));
      return new Response('{}', { status: 200 });
    }
    throw new Error(`unexpected fetch ${url}`);
  };
});

function post(body, { origin = ORIGIN, type = 'application/json', headers = {} } = {}) {
  return new Request('https://pfi-enquiry.example/', {
    method: 'POST',
    headers: { Origin: origin, 'Content-Type': type, 'CF-Connecting-IP': '203.0.113.9', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

/* ── Unit ─────────────────────────────────────────────────────────────── */

test('escapeHtml neutralises markup and attribute breakouts', () => {
  assert.equal(escapeHtml(`<a href="x" onclick='y'>&</a>`), '&lt;a href=&quot;x&quot; onclick=&#39;y&#39;&gt;&amp;&lt;/a&gt;');
});

test('cleanText strips control characters; single-line also strips newlines', () => {
  assert.equal(cleanText('Re: hi\r\nBcc: evil@x.test'), 'Re: hi Bcc: evil@x.test');
  assert.equal(cleanText('line1\r\nline2\u0000', { multiline: true }), 'line1\nline2');
});

test('validate enforces required, max length, patterns and string type', () => {
  const schema = { email: { label: 'Email', required: true, max: 254, pattern: EMAIL_PATTERN } };
  assert.match(validate({}, schema).error, /required/);
  assert.match(validate({ email: 'a'.repeat(300) }, schema).error, /254/);
  assert.match(validate({ email: 'not-an-email' }, schema).error, /not valid/);
  assert.match(validate({ email: ['x@y.z'] }, schema).error, /must be text/);
  assert.match(validate({ email: 'x@y.z, victim@z.test' }, schema).error, /not valid/);
  assert.deepEqual(validate({ email: ' x@y.co ' }, schema).fields, { email: 'x@y.co' });
});

test('verifyTurnstile is skipped when unconfigured and enforced when configured', async () => {
  assert.equal(await verifyTurnstile(undefined, '1.1.1.1', {}), true);
  const env = { TURNSTILE_SECRET_KEY: 's' };
  assert.equal(await verifyTurnstile(undefined, '1.1.1.1', env), false);
  const ok = async () => new Response(JSON.stringify({ success: true }));
  const bad = async () => new Response(JSON.stringify({ success: false }));
  assert.equal(await verifyTurnstile('tok', '1.1.1.1', env, ok), true);
  assert.equal(await verifyTurnstile('tok', '1.1.1.1', env, bad), false);
});

/* ── Handler (real pfi-enquiry worker) ────────────────────────────────── */

test('valid submission sends both emails', async () => {
  const res = await pfiWorker.fetch(post(VALID_PFI), ENV);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { success: true });
  assert.equal(sent.length, 2);
  assert.equal(res.headers.get('Access-Control-Allow-Origin'), ORIGIN);
  assert.equal(res.headers.get('X-Content-Type-Options'), 'nosniff');
});

test('user input is HTML-escaped in both emails', async () => {
  const payload = { ...VALID_PFI, name: '<a href="https://phish.test">Click</a>', summary: `${VALID_PFI.summary} <img src=x onerror=alert(1)>` };
  const res = await pfiWorker.fetch(post(payload), ENV);
  assert.equal(res.status, 200);
  for (const mail of sent) {
    assert.ok(!mail.htmlbody.includes('<a href="https://phish.test">'), 'raw link leaked into email');
    assert.ok(!mail.htmlbody.includes('<img src=x'), 'raw img leaked into email');
  }
  assert.ok(sent[0].htmlbody.includes('&lt;a href=&quot;https://phish.test&quot;&gt;'));
});

test('project-funding auto-reply escapes the greeting name', async () => {
  const res = await pfWorker.fetch(post({
    name: '<b>Evil</b>', email: 'jane@acme.test', phone: '+44 7700 900000',
    range: '1,000,000', summary: VALID_PFI.summary,
  }), ENV);
  assert.equal(res.status, 200);
  const reply = sent.find(m => m.to[0].email_address.address === 'jane@acme.test');
  assert.ok(reply.htmlbody.includes('Dear &lt;b&gt;Evil&lt;/b&gt;'));
});

test('rejects disallowed origins, without CORS headers', async () => {
  const res = await pfiWorker.fetch(post(VALID_PFI, { origin: 'https://evil.test' }), ENV);
  assert.equal(res.status, 403);
  assert.equal(res.headers.get('Access-Control-Allow-Origin'), null);
  assert.equal(sent.length, 0);

  const preflight = await pfiWorker.fetch(new Request('https://x/', { method: 'OPTIONS', headers: { Origin: 'https://evil.test' } }), ENV);
  assert.equal(preflight.status, 403);
});

test('rejects wrong method, content type, oversized and malformed bodies', async () => {
  assert.equal((await pfiWorker.fetch(new Request('https://x/', { method: 'GET', headers: { Origin: ORIGIN } }), ENV)).status, 405);
  assert.equal((await pfiWorker.fetch(post(VALID_PFI, { type: 'text/plain' }), ENV)).status, 415);
  assert.equal((await pfiWorker.fetch(post({ ...VALID_PFI, summary: 'x'.repeat(20000) }), ENV)).status, 413);
  assert.equal((await pfiWorker.fetch(post('{not json'), ENV)).status, 400);
  assert.equal((await pfiWorker.fetch(post('[1,2]'), ENV)).status, 400);
  assert.equal((await pfiWorker.fetch(post({ ...VALID_PFI, email: 'bad' }), ENV)).status, 422);
  assert.equal(sent.length, 0);
});

test('honeypot submissions get a silent success and send nothing', async () => {
  const res = await pfiWorker.fetch(post({ ...VALID_PFI, website: 'http://spam.test' }), ENV);
  assert.equal(res.status, 200);
  assert.equal(sent.length, 0);
});

test('rate limits per IP and per recipient return 429', async () => {
  const deny = { limit: async () => ({ success: false }) };
  const allow = { limit: async () => ({ success: true }) };
  assert.equal((await pfiWorker.fetch(post(VALID_PFI), { ...ENV, SUBMIT_LIMITER: deny })).status, 429);
  assert.equal((await pfiWorker.fetch(post(VALID_PFI), { ...ENV, SUBMIT_LIMITER: allow, RECIPIENT_LIMITER: deny })).status, 429);
  assert.equal(sent.length, 0);
});

test('Turnstile is required once the secret is configured', async () => {
  const res = await pfiWorker.fetch(post(VALID_PFI), { ...ENV, TURNSTILE_SECRET_KEY: 's' });
  assert.equal(res.status, 403);
  assert.equal(sent.length, 0);
});

test('provider failures return a generic 502 without leaking details', async () => {
  globalThis.fetch = async () => new Response('secret provider detail jane@acme.test', { status: 500 });
  const errors = [];
  const original = console.error;
  console.error = (...args) => errors.push(args.join(' '));
  try {
    const res = await pfiWorker.fetch(post(VALID_PFI), ENV);
    assert.equal(res.status, 502);
    const body = await res.json();
    assert.ok(!JSON.stringify(body).includes('secret provider detail'));
    assert.ok(!errors.join(' ').includes('jane@acme.test'), 'PII written to logs');
  } finally {
    console.error = original;
  }
});
