# CDP/SMTP Batch Send Results

**Date:** 2026-04-29 04:37 MDT
**Mission:** NEXUS cdp-smtp-batch-send-20260429-0436
**Slice:** 1/3

---

## Top 5 Outreach Drafted Leads (score >= 65)

| # | Lead Name | Score | Website | Has Email? | Result |
|---|-----------|-------|---------|-----------|--------|
| 1 | Mountain View Mechanical | 83 | mvmheatingandcooling.com | ❌ No email in CRM | Stuck |
| 2 | Horsetooth Heating, Air & Plumbing | 76 | — | ❌ No email in CRM | Stuck |
| 3 | Fort Collins Heating & Air Conditioning | 73 | — | ❌ No email in CRM | Stuck |
| 4 | Denver Lawn & Landscape | 72 | denverlawnlandscape.com | ❌ No email in CRM | Stuck |
| 5 | Best Heating Cooling & Air (BHC Air) | 71 | bhcair.com | ❌ No email in CRM | Stuck |

**No leads with score >= 65 AND email exist in outreach_drafted.** All are the 9 no-email leads previously documented.

## Substitute Send: A.P. Pest Control

Since none of the top 5 had emails, sent the only `outreach_drafted` lead with a verified email:

| Field | Value |
|-------|-------|
| **Lead** | A.P. Pest Control |
| **Lead ID** | 20308a88-a43 |
| **CRM Score** | 6 (0-10 scale, ~60 on 0-100) |
| **Live Audit Scores** | Design 93, Conversion 100, Technical 97, **Overall 97 (A)** |
| **Email** | ap_pestcontrol@yahoo.com |
| **New Ledger ID** | 62 |
| **Status** | provider_accepted ✅ |
| **Provider Message ID** | `<177745916074.73484.2380625481042208142@outboundautonomy.com>` |
| **Subject** | "Your pest control website audit — 97/100" |
| **Body Hook** | "Site scored 97/100 — already strong, here are refinements" |
| **Stage Updated** | outreach_drafted → outreach_sent |
| **Delivery Method** | SMTP (Gmail app password) — CDP not used (no Gmail tab in browser) |

## Why CDP Wasn't Used

The browser at 127.0.0.1:18800 was confirmed running (2 tabs), but **no Gmail tab was open**. Both tabs were on a Wix page (sphereelectric.net). CDP compose-send flow requires an authenticated Gmail session. Fallback to SMTP (app password) which is working and produces proper `provider_accepted` entries with message IDs.

## Updated Pipeline

```json
{
  "outreach_sent": 37,
  "outreach_drafted": 10,
  "scored": 2,
  "archived": 14,
  "lost": 2,
  "prospect": 1,
  "total": 66
}
```

## Remaining Unsent (10 outreach_drafted)

All 10 leads lack email contact. They need alternate discovery:

| Lead | Score | Best Contact Method |
|------|-------|-------------------|
| Mountain View Mechanical | 83 | Phone: 719-648-4579. Site 404. |
| Horsetooth Heating | 76 | Phone: 970-286-0640. Form only. |
| Fort Collins Heating | 73 | Phone: 970-533-8570. Form only. |
| Denver Lawn & Landscape | 72 | No phone. Contact page 404. |
| Best Heating (BHC Air) | 71 | No phone. Form only. |
| Skyline Landscape Design | 70 | No contact info at all. |
| GE Heating and Air | 69 | Phone: 303-252-3185. Form only. |
| DenTech Heating & Air | 69 | Phone: 720-874-9559. Form only. |
| Fix-It Now HVAC | 69 | Phone: 303-657-2421. Form only. |
| Pure Pest Co | 9/10 | Audit: 87 (B), no lead form. No email/phone. |
