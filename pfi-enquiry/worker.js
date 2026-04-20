/**
 * Cloudflare Worker — PFI Enquiry Handler
 * Receives form POST from grahamkarimi.com, sends two emails via ZeptoMail:
 *   1. Notification to kevin.uk@grahamkarimi.com
 *   2. Auto-reply to the enquirer
 *
 * Environment secrets (set via: wrangler secret put <NAME>):
 *   ZEPTO_API_KEY   — ZeptoMail encoded API key
 *
 * Environment vars (set in wrangler.toml [vars]):
 *   FROM_ADDRESS    — noreply@grahamkarimi.com
 *   FROM_NAME       — Graham Karimi
 *   KEVIN_EMAIL     — kevin.uk@grahamkarimi.com
 *   KEVIN_NAME      — Kevin Graham
 *   ALLOWED_ORIGIN  — https://grahamkarimi.com
 */

const ZEPTO_ENDPOINT = 'https://api.zeptomail.com/v1.1/email';

/* ── CORS headers ─────────────────────────────────────────────────────────── */
function corsHeaders(origin, env) {
  const allowed = env.ALLOWED_ORIGIN || 'https://grahamkarimi.com';
  const isAllowed =
    origin === allowed ||
    origin === 'http://localhost:3000' ||
    origin === 'http://localhost:3001';

  return {
    'Access-Control-Allow-Origin':  isAllowed ? origin : allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age':       '86400',
  };
}

function optionsResponse(origin, env) {
  return new Response(null, { status: 204, headers: corsHeaders(origin, env) });
}

function jsonResponse(body, status, origin, env) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(origin, env),
    },
  });
}

/* ── ZeptoMail sender ─────────────────────────────────────────────────────── */
async function sendEmail({ to, toName, subject, htmlBody, replyTo, env }) {
  const payload = {
    from: {
      address: env.FROM_ADDRESS || 'noreply@grahamkarimi.com',
      name:    env.FROM_NAME    || 'Graham Karimi',
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
    headers: {
      Accept:         'application/json',
      'Content-Type': 'application/json',
      Authorization:  `Zoho-enczapikey ${env.ZEPTO_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`ZeptoMail error ${res.status}: ${err}`);
  }

  return res.json();
}

/* ── Email 1: Notification to Kevin ──────────────────────────────────────── */
function buildKevinEmail(f) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>New Funding Enquiry</title>
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
                New Funding Enquiry
              </h1>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.65);">
                Submitted via the Project Funders &amp; Investors page
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">

              <p style="margin:0 0 24px;font-size:14px;color:#546E7A;line-height:1.7;">
                A new confidential funding enquiry has been submitted. Details below.
              </p>

              <!-- Details table -->
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="border:1px solid #E8EDF8;border-radius:8px;overflow:hidden;">
                ${row('Full Name',          f.name)}
                ${row('Organisation',       f.org       || '—')}
                ${row('Email',              f.email)}
                ${row('Phone',              f.phone)}
                ${row('Country of Project', f.country   || '—')}
                ${row('Project Sector',     f.sector)}
                ${row('Funding Required',   f.range)}
                ${rowFull('Project Summary', f.summary)}
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

/* ── Email 2: Auto-reply to enquirer ─────────────────────────────────────── */
function buildAutoReply(f) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Thank you for your enquiry</title>
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
                Thank you for contacting Mr Kevin Graham, UK.
              </p>

              <p style="margin:0 0 20px;font-size:14px;color:#37474F;line-height:1.8;">
                I work with project sponsors, intermediaries, board representatives, and
                consultants seeking funding or investor participation across industries and
                countries. I focus on identifying suitable financiers and facilitating
                introductions between project owners and funding partners for commercially
                viable projects.
              </p>

              <p style="margin:0 0 16px;font-size:14px;color:#37474F;line-height:1.8;">
                To proceed, kindly send the following for the project you wish to present:
              </p>

              <!-- Checklist -->
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="background:#F5F7FB;border:1px solid #E8EDF8;
                            border-left:4px solid #1565C0;border-radius:6px;
                            margin:0 0 24px;">
                <tr>
                  <td style="padding:20px 24px;">
                    ${checklist([
                      'Comprehensive pitch deck',
                      'Funding amount required',
                      'Brief explanation of the project and industry',
                      'Country of operation',
                      'Current stage of the project',
                      'Expected investor return or repayment structure',
                      'Certificate of incorporation or registration',
                      'Shareholding structure showing beneficial owners',
                      'Recent bank statement — at least 6 months — showing account name and detailed transactions',
                      'Board resolution approving external financing and / or borrowing',
                    ])}
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 16px;font-size:14px;font-weight:600;
                          color:#1a2340;line-height:1.7;">
                Please ensure all documents are:
              </p>

              <!-- Document rules -->
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="background:#FFFBF0;border:1px solid #FDE68A;
                            border-left:4px solid #D97706;border-radius:6px;
                            margin:0 0 24px;">
                <tr>
                  <td style="padding:20px 24px;">
                    ${checklist([
                      'PDF format only',
                      'In English language only',
                      'Not password protected',
                      'Clear scanned copies for ease of review',
                    ], '#D97706')}
                    <p style="margin:14px 0 0;font-size:13px;color:#92400E;
                               font-weight:500;line-height:1.6;">
                      For security reasons, we do not accept links or other file formats.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Additionally block -->
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="background:#F0F4FF;border:1px solid #C5CAE9;
                            border-left:4px solid #1565C0;border-radius:6px;
                            margin:0 0 28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 10px;font-size:13px;font-weight:700;
                               color:#1a2340;letter-spacing:0.04em;
                               text-transform:uppercase;">
                      Additionally
                    </p>
                    <p style="margin:0 0 12px;font-size:13px;color:#37474F;line-height:1.75;">
                      Once I receive your documents, I will review them and provide a
                      <strong>complimentary assessment report</strong> outlining gaps, risks,
                      and alignment with funding requirements.
                    </p>
                    <p style="margin:0 0 12px;font-size:13px;color:#37474F;line-height:1.75;">
                      If the submission does not meet the required standard for a financier
                      presentation, I will advise on the necessary adjustments. I will also
                      offer to align and restructure the documentation to a fundable standard
                      at an agreed-upon upfront cost, subject to your approval.
                    </p>
                    <p style="margin:0;font-size:13px;color:#37474F;line-height:1.75;">
                      Once I receive the project information, our team will review each
                      opportunity and advise on the suitable funding pathway and next steps.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Sign-off -->
              <p style="margin:0 0 6px;font-size:14px;color:#37474F;line-height:1.7;">
                Kind regards,
              </p>
              <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#0D1B4E;">
                Kevin Graham
              </p>
              <p style="margin:0 0 4px;font-size:13px;color:#546E7A;">
                Global Financial Advisor & Project Funding Specialist
              </p>
              <p style="margin:0;font-size:13px;color:#546E7A;">
                Cheapside , EC2V, London, United Kingdom.
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
                This is an automated response. Please do not reply directly to this email.
                Send your documents to kevin.uk@grahamkarimi.com
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

/* ── Validation ───────────────────────────────────────────────────────────── */
const REQUIRED = ['name', 'org', 'email', 'phone', 'country', 'sector', 'range', 'summary'];

function validateFields(f) {
  for (const key of REQUIRED) {
    if (!f[key] || !String(f[key]).trim()) {
      return `Missing required field: ${key}`;
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
    return 'Invalid email address.';
  }
  return null;
}

/* ── Main handler ─────────────────────────────────────────────────────────── */
const handler = {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    // Preflight
    if (request.method === 'OPTIONS') {
      return optionsResponse(origin, env);
    }

    // Only POST allowed
    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed.' }, 405, origin, env);
    }

    // Parse body
    let fields;
    try {
      fields = await request.json();
    } catch {
      return jsonResponse({ error: 'Invalid JSON body.' }, 400, origin, env);
    }

    // Validate
    const validationError = validateFields(fields);
    if (validationError) {
      return jsonResponse({ error: validationError }, 422, origin, env);
    }

    // Send both emails in parallel
    try {
      await Promise.all([
        // 1. Notification to Kevin
        sendEmail({
          to:       env.KEVIN_EMAIL || 'kevin.uk@grahamkarimi.com',
          toName:   env.KEVIN_NAME  || 'Kevin Graham',
          subject:  `New Funding Enquiry — ${fields.sector} — ${fields.range}`,
          htmlBody: buildKevinEmail(fields),
          replyTo:  fields.email,
          env,
        }),
        // 2. Auto-reply to enquirer
        sendEmail({
          to:       fields.email,
          toName:   fields.name,
          subject:  'Project Submission Requirements and Review Process | Kevin Graham, UK',
          htmlBody: buildAutoReply(fields),
          env,
        }),
      ]);

      return jsonResponse({ success: true }, 200, origin, env);

    } catch (err) {
      console.error('Email send failed:', err.message);
      return jsonResponse(
        { error: 'Failed to send email. Please try again or contact us directly.' },
        500,
        origin,
        env
      );
    }
  },
};

export default handler;

