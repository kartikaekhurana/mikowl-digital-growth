# MikOwl — Roadmap

## Done
- Full site build (single-page, sections, LinkedIn link wired).
- Lovable Cloud enabled.
- DB tables created: `audit_submissions`, `contact_submissions` (anon insert only, RLS enabled, no read access).
- Server functions `submitAudit` / `submitContact` (src/lib/submissions.functions.ts) with zod validation; forms wired with required-field validation, sending state, error handling, success cards.
- Verified end-to-end in browser: both forms submit, rows land in DB, empty required fields blocked, no console errors. Build OK.

## Open
- Email notifications to kartikaekhurana@gmail.com — BLOCKED: no sender email domain configured for the project. Waiting on the user to set up a sender domain via the email setup dialog. Once done: scaffold email templates, create audit-confirmation + contact-notification templates, wire sends into the server functions (insert first, then send; record email_sent), verify delivery.
