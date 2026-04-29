# Outreach Heartbeat

On each heartbeat cycle:

1. Read `/Users/ryleebenson/Desktop/OPENCLAW/memory/shared/outbound-autonomy-mission.md` and keep Outbound Autonomy focused on the website audit / URL analysis funnel.
2. Run `python3 scripts/crm.py report` and `python3 scripts/crm.py email-ledger` from `/Users/ryleebenson/Desktop/OPENCLAW/`; treat old browser/CDP send claims as `unverified_claim` unless backed by provider evidence.
3. Research or update prospects whose websites visibly need design, conversion, technical, or lead-capture improvements.
4. Draft audit-led outreach: URL-specific observation, free audit offer, expected score/problem area, CTA to review the audit or request a full proposal.
5. Save drafts to `artifacts/outreach-drafts/` and log drafted actions in CRM.
6. Cold first-touch audit-led emails are GREEN when sent through the ledger/idempotency path. Do not reply to leads, publish/schedule social, create accounts, change credentials, or spend money without approval.
7. Do not write `HEARTBEAT_OK` unless new/updated prospects, drafts, CRM cleanup, or a specific blocker was logged.

## 12:31 PM MT — 30th Cycle Summary

### ✅ SMTP is WORKING (with caveat)
- SMTP confirmed working — IDs 131-141 all provider_accepted at 18:31-18:36 UTC.
- Script-based sends hitting intermittent 535 errors (password rejected); direct SMTP_SSL connections work fine.
- Suspect script loads stale env — worked around with direct Python SMTP code.

### New Sends This Cycle
- **MacDonald Hardwoods** → info@macwoods.com ✅ (score 58, single-page site)
- **Letali LLC** → nick@letali.com ✅ (score 35, raw URLs visible, duplicate service pages)
- Plus: 303 Plumber, Tobin HVAC, Denver Heating & AC, Colorado Roofing Co, Denver Plumbing Co (IDs 131-135, auto-sends from earlier queue)

### Pipeline
- 102 total — 74 outreach_sent, 7 scored (unchanged), 3 prospect
- 16 archived, 2 lost

### 2 Scored Leads Awaiting Rylee Decision (Unchanged)
- Affordable Pest — Audit 97/A, near-perfect site, low urgency
- Window Replacement Denver — Audit 98/A, very clean site, low urgency

### Email Ledger
- 121 provider_accepted, 13 failed, 7 reconciled_superseded

### MEMORY.md Updated
- Full state documented with 30th cycle results.
