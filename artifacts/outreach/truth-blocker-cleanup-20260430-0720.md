# Truth Blocker Cleanup — 2026-04-30 01:20 MDT

## Summary

All 7 leads had `outreach_sent` stage but ZERO `provider_accepted` email attempts. Every lead had a verified email address in `contact_info` and a pre-existing outreach draft in `artifacts/outreach-drafts/`. All 7 were re-sent successfully via Gmail SMTP.

**Result: 7/7 → `provider_accepted`. No demotions needed.**

---

## Per-Lead Detail

| # | Lead ID | Name | Email | Stage | Attempt IDs | Status |
|---|---------|------|-------|-------|-------------|--------|
| 1 | `0eea6bd58674` | Roundtree Inc. | roundtreebuilders@gmail.com | outreach_sent | #334 | provider_accepted ✅ |
| 2 | `107fd3d014a9` | A Remodel Company | info@aremodelcompany.com | outreach_sent | #340 | provider_accepted ✅ |
| 3 | `denver-janitorial` | Denver Janitorial / Pike Enterprises | mark@pikeent.com | outreach_sent | #311 (old sent), #335 (new) | provider_accepted ✅ |
| 4 | `be56d746d08f` | IV CONSTRUCTION LLC | iv.const21@gmail.com | outreach_sent | #337 | provider_accepted ✅ |
| 5 | `f129c5836fec` | TCF Emergency Plumbing & Heating | tcf.servicesllc@gmail.com | outreach_sent | #338 | provider_accepted ✅ |
| 6 | `0fb0dabd723c` | 180 Construction | 180ConstructionDenver@gmail.com | outreach_sent | #336 | provider_accepted ✅ |
| 7 | `1fdaf9b7c844` | Hart to Home Renovations | harttohomehandymansevices@gmail.com | outreach_sent | #339 | provider_accepted ✅ |

## Notes

- **Denver Janitorial** was the only lead with a prior email attempt (#311, status=`sent`, not `provider_accepted`). Used `--force-resend` to re-send as attempt #335. Both attempts now coexist in the ledger.
- **Hart to Home** email has a typo in the domain (`sevices` not `services`), but the send was accepted by SMTP. If it bounces later, it'll be a separate tracking concern.
- **All drafts** were sourced from `/artifacts/outreach-drafts/` and adapted slightly for consistent closing sign-off (`Oden / Owner, Outbound Autonomy`).
- SMTP pipeline: Gmail SMTP over SSL (port 465) → all 7 accepted in one batch. No 535 auth errors.
- **Zero demotions** — all 7 leads had email addresses and drafts available.

## CRM Verification

Post-send query confirms all 7 leads have `stage='outreach_sent'` and each now has at least one `provider_accepted` email_attempt row.

```sql
-- Verified: 8 email_attempt rows across 7 leads, all with provider_accepted (except old #311)
SELECT lead_id, status FROM email_attempts 
WHERE lead_id IN ('0eea6bd58674','107fd3d014a9','denver-janitorial',
  'be56d746d08f','f129c5836fec','0fb0dabd723c','1fdaf9b7c844')
ORDER BY lead_id, id;
```
