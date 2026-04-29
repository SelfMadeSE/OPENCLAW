# Drafted Inventory Flush Results

**Date:** 2026-04-29 05:02 MDT
**Mission:** NEXUS drafted-inventory-flush-20260429-0501
**Slice:** 1/2

---

## Initial State

At mission start, `outreach_drafted` contained only **3 leads**. The remaining 7 were moved to `outreach_sent` by another agent (IDs 63-69) after email discovery and successful SMTP sends.

## Send Results

| Lead ID | Name | Score | Email Discovered | SMTP ID | Status | Provider Message ID |
|---------|------|-------|-----------------|---------|--------|-------------------|
| bd032a70b8b1 | Best Heating (BHC Air) | 71 | bhcallc@gmail.com (via mailto on site) | 70 | ✅ provider_accepted | `<177746065221...>` |
| fdc4a754e86d | Mountain View Mechanical | 83 | ❌ No email — site 404, WHOIS privacy (GoDaddy) | — | 🚫 blocked | — |
| 6792b00dccf4 | DenTech Heating & Air | 69 | ❌ No email — form-only site, WIX WHOIS (Matt Michaelis, no email field) | — | 🚫 blocked | — |

### BHC Air Email Details
- **Subject:** "Quick website audit for BHC Air"
- **Body hook:** Typo on homepage ("Motto" misspelled), missing alt text, form-only contact
- **Live audit scores:** Design 87, Conversion 100, Technical 91, **Overall 93 (A)**
- **CRM:** Stage updated to `outreach_sent`, email added to contact_info

## Pipeline State (Post-Flush)

| Stage | Count | Notes |
|-------|-------|-------|
| outreach_sent | 46 | All email-capable leads sent |
| outreach_drafted_email_missing | 2 | Moved — no email found |
| outreach_drafted | 0 | ✅ Pipeline zeroed |
| scored | 2 | Affordable Pest, Window Replacement Denver |
| archived | 14 | |
| lost | 2 | |
| prospect | 1 | Test |
| **Total** | **66** | |

## Email Ledger Summary (All Time)

| Status | Count |
|--------|-------|
| provider_accepted | ✅ 70 |
| failed | 6 (all app password expiry, retried successfully) |
| reconciled_superseded | 7 |
| **Total** | **83** |

## Remaining Stuck Leads (outreach_drafted_email_missing)

### Mountain View Mechanical (83)
- Site: mvmheatingandcooling.com — returns 404
- Phone: +1 719-648-4579
- WHOIS: GoDaddy privacy (Domains By Proxy)
- Google reviews: 132
- **Next step:** GBP scraping, Facebook search, or phone outreach

### DenTech Heating & Air Conditioning (69)
- Site: dentechvac.com — thin Wix site, form only
- Phone: (720) 874-9559
- WHOIS: Matt Michaelis, DenTech, Golden CO
- **Next step:** Facebook/Directory search, or phone outreach

## Zero Outreach Drafted

The drafted pipeline has been fully flushed. **0 leads remain in outreach_drafted.** All email-capable leads (46 total) have been sent with provider_accepted evidence.
