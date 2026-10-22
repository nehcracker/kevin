/**
 * Cloudflare Worker — Project Funding Enquiry Handler
 * Receives form POST from grahamkarimi.com/services/project-funding
 * Sends two emails via ZeptoMail:
 *   1. Notification to kevin.uk@grahamkarimi.com
 *   2. Auto-reply to the enquirer
 *
 * Environment secrets (set via: wrangler secret put <NAME>):
 *   ZEPTO_API_KEY         — ZeptoMail encoded API key
 *   TURNSTILE_SECRET_KEY  — Cloudflare Turnstile secret (enforced once set)
 *
 * Environment vars (set in wrangler.toml [vars]):
 *   FROM_ADDRESS    — kevin.uk@grahamkarimi.com
 *   FROM_NAME       — Kevin Graham
 *   KEVIN_EMAIL     — kevin.uk@grahamkarimi.com
 *   KEVIN_NAME      — Kevin Graham
 *   ALLOWED_ORIGINS — comma-separated origins allowed to submit
 *
 * Rate-limit bindings (wrangler.toml [[ratelimits]]):
 *   SUBMIT_LIMITER, RECIPIENT_LIMITER
 *
 * Request hardening (origin allowlist, validation, HTML escaping, rate
 * limits, honeypot, Turnstile) lives in ../enquiry-shared/security.mjs.
 * Email builders receive only HTML-escaped values.
 */

import {
  createEnquiryHandler,
  EMAIL_PATTERN,
  PHONE_PATTERN,
} from '../enquiry-shared/security.mjs';

const ZEPTO_ENDPOINT = 'https://api.zeptomail.com/v1.1/email';

/* ── ZeptoMail sender ─────────────────────────────────────────────────────── */
async function sendEmail({ to, toName, subject, htmlBody, replyTo, env }) {
  const payload = {
    from: {
      address: env.FROM_ADDRESS || 'kevin.uk@grahamkarimi.com',
      name:    env.FROM_NAME    || 'Kevin Graham',
    },
    to: [
      {
        email_address: {
          address: to,
          name:    toName,
        },
      },
    ],
    subject,
    htmlbody: htmlBody,
  };

  if (replyTo) {
    payload.reply_to = [{ address: replyTo }];
  }

  const res = await fetch(ZEPTO_ENDPOINT, {
    method:  'POST',
    signal:  AbortSignal.timeout(10_000),
    headers: {
      Accept:         'application/json',
      'Content-Type': 'application/json',
      Authorization:  `Zoho-enczapikey ${env.ZEPTO_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`ZeptoMail error ${res.status}`);
  }

  return res.json();
}

/* ── Table helpers ────────────────────────────────────────────────────────── */
function row(label, value) {
  return `
    <tr style="border-bottom:1px solid #E8EDF8;">
      <td style="padding:12px 18px;font-size:12px;font-weight:600;
                  color:#90A4AE;letter-spacing:0.04em;text-transform:uppercase;
                  background:#F9FAFC;width:38%;border-right:1px solid #E8EDF8;">
        ${label}
      </td>
      <td style="padding:12px 18px;font-size:13px;color:#1a2340;font-weight:500;">
        ${value}
      </td>
    </tr>`;
}

function rowFull(label, value) {
  return `
    <tr>
      <td colspan="2" style="padding:0;">
        <div style="padding:12px 18px 6px;font-size:12px;font-weight:600;
                     color:#90A4AE;letter-spacing:0.04em;text-transform:uppercase;
                     background:#F9FAFC;border-bottom:1px solid #E8EDF8;">
          ${label}
        </div>
        <div style="padding:14px 18px 16px;font-size:13px;color:#1a2340;
                     line-height:1.7;white-space:pre-wrap;">
          ${value}
        </div>
      </td>
    </tr>`;
}

function checklist(items, color = '#1565C0') {
  return items
    .map(
      item => `
      <p style="margin:0 0 8px;font-size:13px;color:#37474F;line-height:1.6;
                 display:flex;align-items:flex-start;gap:10px;">
        <span style="color:${color};font-weight:700;flex-shrink:0;margin-top:1px;">•</span>
        <span>${item}</span>
      </p>`
    )
    .join('');
}

/* ── Email 1: Notification to Kevin ──────────────────────────────────────── */
function buildKevinEmail(f, optIn) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>New Project Funding Enquiry</title>
</head>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="620" cellpadding="0" cellspacing="0"
               style="background:#ffffff;border-radius:10px;overflow:hidden;
                      box-shadow:0 4px 24px rgba(13,27,78,0.10);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0D1B4E 0%,#1565C0 100%);
                        padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:3px;
                         text-transform:uppercase;color:rgba(255,255,255,0.55);">
                grahamkarimi.com
              </p>
              <h1 style="margin:10px 0 0;font-size:22px;font-weight:700;
                          color:#ffffff;letter-spacing:-0.5px;">
                New Project Funding Enquiry
              </h1>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.65);">
                Submitted via the Project Funding &amp; Debt Structuring page
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 24px;font-size:14px;color:#546E7A;line-height:1.7;">
                A new project funding enquiry has been submitted. Details below.
              </p>

              <!-- Details table -->
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="border:1px solid #E8EDF8;border-radius:8px;overflow:hidden;">
                ${row('Full Name',        f.name)}
                ${row('Email',            f.email)}
                ${row('Phone',            f.phone)}
                ${row('Funding Required', f.range)}
                ${row('Marketing Opt-in', optIn ? 'Yes' : 'No')}
                ${rowFull('Project Overview', f.summary)}
              </table>

              <p style="margin:28px 0 0;font-size:13px;color:#90A4AE;line-height:1.6;">
                An auto-reply has been sent to the enquirer at
                <strong style="color:#546E7A;">${f.email}</strong>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F5F7FA;padding:20px 40px;
                        border-top:1px solid #E8EDF8;text-align:center;">
              <p style="margin:0;font-size:11px;color:#90A4AE;">
                grahamkarimi.com &nbsp;·&nbsp; London, UK &nbsp;·&nbsp;
                kevin.uk@grahamkarimi.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ── Email 2: Auto-reply to enquirer ─────────────────────────────────────── */
function buildAutoReply(f) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Thank you for your project funding enquiry</title>
</head>
<body style="margin:0;padding:0;background:#f4f6fb;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="620" cellpadding="0" cellspacing="0"
               style="background:#ffffff;border-radius:10px;overflow:hidden;
                      box-shadow:0 4px 24px rgba(13,27,78,0.10);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0D1B4E 0%,#1565C0 100%);
                        padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:3px;
                         text-transform:uppercase;color:rgba(255,255,255,0.55);">
                grahamkarimi.com
              </p>
              <h1 style="margin:10px 0 0;font-size:22px;font-weight:700;
                          color:#ffffff;letter-spacing:-0.5px;">
                Kevin Graham &nbsp;|&nbsp; UK
              </h1>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.65);">
                Global Financial Advisor &amp; Director of Risk Management
              </p>
            </td>
          </tr>

          <!-- Gold accent bar -->
          <tr>
            <td style="background:#facc15;height:4px;"></td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">

              <p style="margin:0 0 20px;font-size:15px;color:#1a2340;line-height:1.7;">
                Dear Sir / Madam,
              </p>

              <p style="margin:0 0 20px;font-size:14px;color:#37474F;line-height:1.8;">
                Thank you for contacting us regarding your project financing requirement.
              </p>

              <p style="margin:0 0 20px;font-size:14px;color:#37474F;line-height:1.8;">
                We understand that you are seeking financing for your project and would like to
                understand the financing conditions, payment terms, and application process.
              </p>

              <p style="margin:0 0 16px;font-size:14px;color:#37474F;line-height:1.8;">
                To proceed with the initial assessment, kindly send us your
                <strong>Investment-Grade Pitch Deck, Business Plan, or Project Proposal</strong>
                outlining:
              </p>

              <!-- Checklist -->
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="background:#F5F7FB;border:1px solid #E8EDF8;
                            border-left:4px solid #1565C0;border-radius:6px;
                            margin:0 0 24px;">
                <tr>
                  <td style="padding:20px 24px;">
                    ${checklist([
                      'Project overview',
                      'Funding requirement and use of funds',
                      'Business model',
                      'Market opportunity',
                      'Implementation plan',
                      'Financial projections',
                      'Management team',
                      'Expected returns, where applicable',
                    ])}
                  </td>
                </tr>
              </table>

              <!-- Document rules -->
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="background:#FFFBF0;border:1px solid #FDE68A;
                            border-left:4px solid #D97706;border-radius:6px;
                            margin:0 0 24px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0;font-size:13px;color:#92400E;line-height:1.75;">
                      Please submit the document in <strong>PDF format</strong>, in
                      <strong>English</strong>, and <strong>without password protection</strong>
                      for ease of review, to
                      <a href="mailto:kevin.uk@grahamkarimi.com"
                         style="color:#92400E;font-weight:600;">kevin.uk@grahamkarimi.com</a>.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 20px;font-size:14px;color:#37474F;line-height:1.8;">
                Once received, we will provide a <strong>complimentary initial review and
                advisory assessment</strong>. This will help us assess the project's funding
                position and advise on the appropriate financing route and next steps.
              </p>

              <p style="margin:0 0 20px;font-size:14px;color:#37474F;line-height:1.8;">
                Financing conditions, repayment structure, payment terms, pricing, tenor,
                security requirements, and other commercial terms depend on the project and the
                financing route identified during assessment. These terms are therefore discussed
                after the initial review rather than presented as standard terms before the
                project has been assessed.
              </p>

              <!-- Documentation fee notice — keep in sync with the Home hero notice -->
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="background:#FFF8E1;border:1px solid #FFE082;
                            border-left:4px solid #FFB300;border-radius:6px;
                            margin:0 0 28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 10px;font-size:13px;font-weight:700;
                               color:#7A4F00;letter-spacing:0.04em;
                               text-transform:uppercase;">
                      No pitch deck yet, or not at financing standard?
                    </p>
                    <p style="margin:0 0 10px;font-size:13px;color:#5D4300;line-height:1.75;">
                      If you don't have an Investment-Grade Pitch Deck, Business Plan or Project
                      Proposal yet, or yours doesn't meet the financing threshold, fees from
                      <strong>USD 1,350</strong> apply for preparing and aligning your documents
                      before funding is realised. Scope, fee and timeline are confirmed in a written
                      engagement letter before any work begins.
                    </p>
                    <p style="margin:0;font-size:13px;color:#5D4300;line-height:1.75;">
                      To request this service, email
                      <a href="mailto:kevin.uk@grahamkarimi.com"
                         style="color:#7A4F00;font-weight:600;">kevin.uk@grahamkarimi.com</a>.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Success fee — applies to every funded client -->
              <p style="margin:0 0 28px;font-size:14px;color:#37474F;line-height:1.8;">
                <strong>Success fee:</strong> every client we deliver funding for pays a standard
                <strong>1% success fee</strong> when the funding is delivered. This applies whether
                or not your documents needed alignment.
              </p>

              <!-- Sign-off -->
              <p style="margin:0 0 6px;font-size:14px;color:#37474F;line-height:1.7;">
                Kind regards,
              </p>
              <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#0D1B4E;">
                Kevin Graham
              </p>
              <p style="margin:0 0 4px;font-size:13px;color:#546E7A;">
                Global Financial Advisor &amp; Project Funding Specialist
              </p>
              <p style="margin:0;font-size:13px;color:#546E7A;">
                Cheapside, EC2V, London, United Kingdom
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F5F7FA;padding:20px 40px;
                        border-top:1px solid #E8EDF8;text-align:center;">
              <p style="margin:0 0 4px;font-size:11px;color:#90A4AE;">
                kevin.uk@grahamkarimi.com &nbsp;·&nbsp;
                <a href="https://grahamkarimi.com"
                   style="color:#1565C0;text-decoration:none;">grahamkarimi.com</a>
              </p>
              <p style="margin:0;font-size:10px;color:#B0BEC5;">
                You can reply to this email directly with your documents attached,
                or send them to kevin.uk@grahamkarimi.com.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ── Validation ───────────────────────────────────────────────────────────── */
const SCHEMA = {
  name:    { label: 'Name',             required: true, max: 100, maxLinks: 0 },
  email:   { label: 'Email',            required: true, max: 254, pattern: EMAIL_PATTERN },
  phone:   { label: 'Phone',            required: true, max: 32,  pattern: PHONE_PATTERN },
  range:   { label: 'Funding amount',   required: true, max: 40 },
  summary: { label: 'Project overview', required: true, max: 5000, min: 20, multiline: true, maxLinks: 2 },
};

/* ── Main handler ─────────────────────────────────────────────────────────── */
export default createEnquiryHandler({
  schema: SCHEMA,
  formOf: () => 'project-funding',
  // `fields` is plain text (subjects, API params); `html` is escaped for templates.
  async send(fields, html, env, { marketingOptIn }) {
    await Promise.all([
      // 1. Notification to Kevin
      sendEmail({
        to:       env.KEVIN_EMAIL || 'kevin.uk@grahamkarimi.com',
        toName:   env.KEVIN_NAME  || 'Kevin Graham',
        subject:  `New Project Funding Enquiry — ${fields.range}`,
        htmlBody: buildKevinEmail(html, marketingOptIn),
        replyTo:  fields.email,
        env,
      }),
      // 2. Auto-reply to enquirer
      sendEmail({
        to:       fields.email,
        toName:   fields.name,
        subject:  'Project Submission Requirements and Review Process | Kevin Graham, UK',
        htmlBody: buildAutoReply(html),
        env,
      }),
    ]);
  },
});
