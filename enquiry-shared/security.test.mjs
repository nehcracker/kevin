// Run: npm run test:workers  (node --test, no extra dependencies)
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { escapeHtml, cleanText, validate, verifyTurnstile, countLinks, EMAIL_PATTERN } from './security.mjs';
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
    // Real pages send how long the form took to fill; default to a human pace.
    body: typeof body === 'string' ? body : JSON.stringify({ fillMs: 8000, ...body }),
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
  const payload = { ...VALID_PFI, name: '<a href="#claim">Click</a>', summary: `${VALID_PFI.summary} <img src=x onerror=alert(1)>` };
  const res = await pfiWorker.fetch(post(payload), ENV);
  assert.equal(res.status, 200);
  for (const mail of sent) {
    assert.ok(!mail.htmlbody.includes('<a href="#claim">'), 'raw link leaked into email');
    assert.ok(!mail.htmlbody.includes('<img src=x'), 'raw img leaked into email');
  }
  assert.ok(sent[0].htmlbody.includes('&lt;a href=&quot;#claim&quot;&gt;'));
});

test('auto-replies never echo the submitted name to the recipient', async () => {
  // The auto-reply goes to whatever address was submitted, so any free text
  // it repeats is a relay for someone else's message. Greeting is fixed.
  const res = await pfWorker.fetch(post({
    name: 'Call 555 0100 to claim', email: 'jane@acme.test', phone: '+44 7700 900000',
    range: '1,000,000', summary: VALID_PFI.summary,
  }), ENV);
  assert.equal(res.status, 200);
  const reply = sent.find(m => m.to[0].email_address.address === 'jane@acme.test');
  assert.ok(reply.htmlbody.includes('Dear Sir / Madam'));
  assert.ok(!reply.htmlbody.includes('to claim'));
});

test('PFI auto-reply names the sector (escaped) and the equity route', async () => {
  await pfiWorker.fetch(post({ ...VALID_PFI, sector: '<b>Health</b>' }), ENV);
  const pfiReply = sent.find(m => m.to[0].email_address.address === VALID_PFI.email);
  assert.ok(pfiReply.htmlbody.includes('project financing requirement in the &lt;b&gt;health&lt;/b&gt; sector'));

  sent.length = 0;
  await pfiWorker.fetch(post({
    ...VALID_PFI, sector: 'Other',
    summary: '[Equity Financing enquiry — Stage: Growth]\n\n' + VALID_PFI.summary,
  }), ENV);
  const eqReply = sent.find(m => m.to[0].email_address.address === VALID_PFI.email);
  assert.ok(/regarding your equity financing requirement./.test(eqReply.htmlbody));
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

/* ── Bot filters: fill time and links ─────────────────────────────────── */

test('countLinks counts http(s) and www. links', () => {
  assert.equal(countLinks('see https://a.test and http://b.test or www.c.test'), 3);
  assert.equal(countLinks('a 5,000,000 solar plant'), 0);
});

test('submissions faster than the minimum fill time are silently dropped', async () => {
  const res = await pfiWorker.fetch(post({ ...VALID_PFI, fillMs: 400 }), ENV);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { success: true });
  assert.equal(sent.length, 0);
});

test('a missing fill time (direct POST or stale page) is refused, not sent', async () => {
  const req = new Request('https://x/', {
    method: 'POST',
    headers: { Origin: ORIGIN, 'Content-Type': 'application/json' },
    body: JSON.stringify(VALID_PFI),
  });
  const res = await pfiWorker.fetch(req, ENV);
  assert.equal(res.status, 400);
  assert.equal(sent.length, 0);
  assert.equal((await pfiWorker.fetch(post({ ...VALID_PFI, fillMs: '9000' }), ENV)).status, 400);
});

test('links are refused in names and capped in the project text', async () => {
  const nameLink = await pfWorker.fetch(post({
    name: 'Win www.prize.test', email: 'jane@acme.test', phone: '+44 7700 900000',
    range: '1,000,000', summary: VALID_PFI.summary,
  }), ENV);
  assert.equal(nameLink.status, 422);
  assert.match((await nameLink.json()).error, /Name must not contain links/);

  const orgLink = await pfiWorker.fetch(post({ ...VALID_PFI, org: 'https://spam.test' }), ENV);
  assert.equal(orgLink.status, 422);

  const threeLinks = await pfiWorker.fetch(post({
    ...VALID_PFI, summary: VALID_PFI.summary + ' https://a.test https://b.test https://c.test',
  }), ENV);
  assert.equal(threeLinks.status, 422);

  const twoLinks = await pfiWorker.fetch(post({
    ...VALID_PFI, summary: VALID_PFI.summary + ' https://acme.test www.acme.test/deck',
  }), ENV);
  assert.equal(twoLinks.status, 200);
  assert.equal(sent.length, 2);
});
