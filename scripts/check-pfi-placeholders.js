// Fails the build if the Project Funders & Investors page still contains
// its known content placeholders (Track Record figures, fee-policy wording).
// These are intentionally unfinished until Kevin supplies real content —
// see docs/superpowers/plans/2026-09-02-pfi-navy-executive-redesign.md, Task 7.

const fs = require('fs');
const path = require('path');

const PAGE_PATH = path.join(
  __dirname,
  '..',
  'src',
  'pages',
  'Services',
  'ProjectFundersInvestors',
  'ProjectFundersInvestors.jsx'
);

const source = fs.readFileSync(PAGE_PATH, 'utf8');
const problems = [];

if (/value:\s*null/.test(source)) {
  problems.push(
    'TRACK_RECORD still has a null value — real track-record figures have not been supplied yet.'
  );
}

if (source.includes('PLACEHOLDER')) {
  problems.push(
    'NO_FEE_BANNER still contains placeholder text — real fee-policy wording has not been supplied yet.'
  );
}

if (problems.length > 0) {
  console.error('\nBuild blocked: ProjectFundersInvestors.jsx still has unfinished placeholder content.\n');
  problems.forEach((p) => console.error(`  - ${p}`));
  console.error('\nSee docs/superpowers/plans/2026-09-02-pfi-navy-executive-redesign.md, Task 7.\n');
  process.exit(1);
}
