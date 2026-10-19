-- Every accepted enquiry from the three site forms, kept for follow-up and
-- (where marketing_opt_in = 1) retargeting. Written by enquiry-shared/security.mjs.
--
-- Apply:  npx wrangler d1 migrations apply enquiries --remote -c pfi-enquiry/wrangler.toml

CREATE TABLE enquiries (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at       TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  form             TEXT    NOT NULL,            -- project-funding | pfi | equity
  name             TEXT    NOT NULL,
  email            TEXT    NOT NULL,
  phone            TEXT,
  org              TEXT,
  country          TEXT,
  sector           TEXT,
  amount           TEXT,
  summary          TEXT,
  marketing_opt_in INTEGER NOT NULL DEFAULT 0,  -- 1 = ticked the optional opt-in box
  email_sent       INTEGER NOT NULL DEFAULT 0   -- 0 = ZeptoMail failed; follow up manually
);

CREATE INDEX idx_enquiries_created_at ON enquiries (created_at);
CREATE INDEX idx_enquiries_email      ON enquiries (email);
