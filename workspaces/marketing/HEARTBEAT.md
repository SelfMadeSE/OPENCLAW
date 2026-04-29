# Marketing Heartbeat

On each heartbeat cycle:

1. Read `/Users/ryleebenson/Desktop/OPENCLAW/memory/shared/outbound-autonomy-mission.md`.
2. Ignore or quarantine OpenClaw/SPECTOR/beats/music drafts unless Rylee explicitly reactivated them.
3. Check `artifacts/oa-content-drafts/`, `artifacts/campaigns/`, and the Outbound Autonomy site copy for audit-led positioning gaps.
4. Produce or update one concrete asset: homepage positioning, one-sentence offer, CTA stack, audit-report copy, email angle, social post, or campaign calendar.
5. Brief MUSE or SIGNAL only with the audit-led offer: URL analysis, score, targeted fixes, proposal, implementation.
6. Save outputs to `artifacts/oa-content-drafts/` or `artifacts/campaigns/`.
7. Do not write `HEARTBEAT_OK` unless a current Outbound Autonomy marketing artifact was created or a specific blocker was logged.

Primary message: "Enter your URL. Get a website audit with targeted fixes."

---

## Last Boot Check: 2026-04-29 — 6:54 AM Cycle

**Action taken (this cycle):**
1. **Blocker #5 RESOLVED** — Emails found and verified for all 4 Grande Prairie prospects:
   - Alpine HVAC: ryan@alpine-hvac.ca ✅ (already known)
   - Hardline Heating: info@hardlineheating.com ✅ (found on /contact-us/)
   - Silvertip Plumbing: info@silvertipltd.com ✅ (found on /contact/)
   - Quinn's Heating: quinnpotoski@gmail.com ✅ (found in /contact-us/ mailto:)
2. **Artifact written** — `oa-prospect-emails-resolved-2026-04-29.md` with updated outreach angles and full contact details.
3. **Day 0 template updated** — Quinn's email corrected from quinn@quinnsheating.ca→quinnpotoski@gmail.com, subject line updated, outreach angle corrected (site is live and well-built, not down).
4. **Quinn's site correction** — Previous assessment flagged `quinnshvac.ca` as DNS down, but `quinnsheatingandairconditioning.ca` resolves fine. The short domain is the one that fails. Site is a professional Wix build — outreach angle updated accordingly.
5. **Referral & partner program page copy written** — `oa-referral-partner-program-copy-2026-04-29.md`. Covers partner white-label (3 tiers) and referral commission (15%) programs. Fills last remaining content gap.
6. **Tested himalaya** — Confirmed IMAP/SMTP still blocked. No change.
7. **Blockers remaining:** #1 (PageSpeed API key — needs Google Cloud key in Vercel env), #2 (social accounts), #3 (Gmail app password — ~3 min fix, instructions at `oa-gmail-app-password-guide-2026-04-28.md`).

### Content Pipeline Progress ✅✅✅ ALL 13 ARTICLES ON SITE ✅✅✅

| # | Article | Slug | Status |
|---|---------|------|--------|
| 1 | 4 Signals Your Service Business Website Needs an Audit (C1 pillar) | `/blog/4-signals-website-audit` | ✅ On Site |
| 2 | Free Website Audit vs. SEOptimer/WooRank/PageSpeed | `/blog/free-website-audit-what-it-checks` | ✅ On Site |
| 3 | How to Read Your Website Audit Score | `/blog/how-to-read-website-audit-score` | ✅ On Site |
| 4 | Why Your Service Business Website Is Leaking Leads (C2 pillar) | `/blog/website-leaking-leads-pillar` | ✅ On Site |
| 5 | One Button. Every Page. The CTA Fix | `/blog/cta-deep-dive` | ✅ On Site |
| 6 | The One Form Every Service Business Website Needs | `/blog/form-deep-dive` | ✅ On Site |
| 7 | Local SEO Starter Kit for HVAC, Plumbing, Electrical (C3 pillar) | `/blog/local-seo-starter-kit` | ✅ On Site |
| 8 | Google Maps & Local SEO for Grande Prairie | `/blog/grande-prairie-local-seo-google-maps` | ✅ On Site |
| 9 | Using Schema Markup to Steal Local Search Traffic | `/blog/schema-markup-local-seo` | ✅ On Site |
| 10 | How Much Should a Service Business Website Cost in 2026? (C4 pillar) | `/blog/service-business-website-cost-2026` | ✅ On Site |
| 11 | Website Redesign vs. Incremental Fix | `/blog/service-business-website-leads` | ✅ On Site |
| 12 | Automation for Service Businesses | `/blog/automation-for-service-businesses` | ✅ On Site |
| 13 | From Audit to Booking: Full Service Business Workflow (capstone) | `/blog/audit-to-booking-workflow` | ✅ On Site **← New** |

### Blockers (still need Rylee):

**🔴 Technical — affects every audit live right now:**
1. **PageSpeed API quota exhausted** — No Lighthouse/screenshot data on audits. Homepage promises "Lighthouse scoring" that's currently N/A. Needs Google Cloud API key added to Vercel as `PAGESPEED_API_KEY`.

**🟡 Execution — prevents sending/publishing:**
2. **Social accounts** — No X or LinkedIn. All campaign content blocked.
3. **Gmail App Password** — IMAP/SMTP rejects current password. Email is GREEN per shared state but cannot send without credentials. Instructions at `oa-gmail-app-password-guide-2026-04-28.md`.
4. ~~Blog route — not implemented~~ ✅ **RESOLVED — All 13 articles deployed and live.**
5. ~~Prospect email research — Only Alpine HVAC had confirmed email~~ ✅ **RESOLVED — All 4 emails found**
6. ~~OG images — not deployed~~ ✅ **RESOLVED — All 13 OG images verified serving**

**Standing:** HEARTBEAT_OK — All content assets drafted (13 blog posts, referral/partner page, one-pager, case study template). No remaining content gaps. Blockers unchanged.
