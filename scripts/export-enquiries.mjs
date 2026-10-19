#!/usr/bin/env node
/**
 * Exports enquiries from the D1 enquiry store to CSV in ./exports/ (gitignored).
 *
 *   npm run export:enquiries                       every enquiry, all columns
 *   npm run export:enquiries -- --opted-in         only leads who ticked the opt-in
 *   npm run export:enquiries -- --customer-match   opted-in leads, Google Ads
 *                                                  Customer Match upload format
 *   ... -- --since 2026-11-01                      only enquiries from that date
 *
 * Reads through wrangler (your Cloudflare login), so there is no public
 * export endpoint. Leads without marketing_opt_in = 1 must not be uploaded
 * to ad platforms or added to marketing lists.
 */
import { execSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const customerMatch = args.includes('--customer-match');
const optedIn = customerMatch || args.includes('--opted-in');
const sinceIdx = args.indexOf('--since');
const since = sinceIdx >= 0 ? args[sinceIdx + 1] : null;

if (since !== null && !/^\d{4}-\d{2}-\d{2}$/.test(since || '')) {
  console.error('--since needs a date like 2026-11-01');
  process.exit(1);
}

const where = [
  optedIn ? 'marketing_opt_in = 1' : null,
  since ? `created_at >= '${since}'` : null, // validated above
].filter(Boolean);
const sql = `SELECT * FROM enquiries${where.length ? ` WHERE ${where.join(' AND ')}` : ''} ORDER BY created_at`;

const raw = execSync(
  `npx wrangler d1 execute enquiries --remote --json -c pfi-enquiry/wrangler.toml --command "${sql}"`,
  { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'], maxBuffer: 64 * 1024 * 1024 }
);
const rows = JSON.parse(raw)[0].results;

// Quote every cell; neutralise spreadsheet formulas in free-text values.
const cell = (value, { formulaSafe = true } = {}) => {
  let s = value === null || value === undefined ? '' : String(value);
  if (formulaSafe && /^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

let header;
let lines;
if (customerMatch) {
  // https://support.google.com/google-ads/answer/7659867 — Google hashes on upload.
  header = ['Email', 'Phone', 'First Name', 'Last Name'];
  lines = rows.map((r) => {
    const [first, ...rest] = String(r.name).trim().split(/\s+/);
    const digits = String(r.phone || '').replace(/[\s\-().]/g, '');
    const phone = /^\+\d{7,15}$/.test(digits) ? digits : ''; // E.164 only
    return [
      cell(String(r.email).trim().toLowerCase()),
      cell(phone, { formulaSafe: false }),
      cell(first),
      cell(rest.join(' ')),
    ].join(',');
  });
} else {
  header = ['id', 'created_at', 'form', 'name', 'email', 'phone', 'org', 'country',
    'sector', 'amount', 'summary', 'marketing_opt_in', 'email_sent'];
  lines = rows.map(r => header.map(k => cell(r[k], { formulaSafe: k !== 'phone' })).join(','));
}

const kind = customerMatch ? 'customer-match' : optedIn ? 'opted-in' : 'all';
const file = join('exports', `enquiries-${kind}-${new Date().toISOString().slice(0, 10)}.csv`);
mkdirSync('exports', { recursive: true });
writeFileSync(file, [header.join(','), ...lines].join('\r\n') + '\r\n');
console.log(`${rows.length} enquiries written to ${file}`);
