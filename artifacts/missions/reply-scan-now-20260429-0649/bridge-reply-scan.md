# Reply Scan — Send Timeline & Reply Assessment

**Date:** 2026-04-29 06:50 MDT
**Mission:** NEXUS reply-scan-now-20260429-0649
**Slice:** 1/1

---

## Methods Used

| Method | Result |
|--------|--------|
| ✅ **CDP Browser (Gmail inbox scan)** | Gmail authenticated as owner@outboundautonomy.com. Scanned all 62 inbox conversations. |
| ✅ **SMTP logs (ledger query)** | 68 provider_accepted entries analyzed for timing. |
| ✅ **Sqlite query** | Full send timeline from ledger. |

## Reply Detection Result: ✅ NO REPLIES FOUND

**Zero prospect replies detected across all 57 unique prospect sends.** All outreach emails remain in prospect inboxes with no response.

## Send Timeline — Last 20 Verified Sends

| Time (MDT) | Lead | Score |
|------------|------|-------|
| 06:43 AM | Martin Mowing | 6 |
| 06:42 AM | Denver Tree Removal | 6 |
| 05:04 AM | Best Heating (BHC Air) | 71 |
| 05:00 AM | Fort Collins Heating | 73 |
| 05:00 AM | GE Heating and Air | 69 |
| 05:00 AM | Horsetooth Heating | 76 |
| 05:00 AM | Pure Pest Co | 9 |
| 05:00 AM | Fix-It Now HVAC | 69 |
| 05:00 AM | Skyline Landscape Design | 70 |
| 05:00 AM | Denver Lawn & Landscape | 72 |
| 04:39 AM | A.P. Pest Control | 6 |
| 04:28 AM | Sphere Electric | 8 |
| 03:10 AM | Colorado Chiropractic | 55 |
| 03:10 AM | Val Sopi | 57 |
| 03:09 AM | Harmony Painting Denver | 65 |
| 03:09 AM | B&E Services Inc. | 67 |
| 03:09 AM | Cherry Medical Aesthetics | 69 |
| 03:09 AM | Oak & Canyon Landscape | 73 |
| 03:09 AM | Believe That Carpet | 73 |
| 03:09 AM | Avalanche Home Systems | 76 |

## Volume Summary

| Metric | Value |
|--------|-------|
| Total provider_accepted | **68** (57 unique prospect emails) |
| Sent in last 2 hours (high reply window) | **10** |
| Sent in last 24 hours | **68** (all of them) |
| First send made | Apr 29, 01:48 AM MT |
| Last send made | Apr 29, 06:43 AM MT |
| Campaign duration | ~5 hours |

## Reply Probability Assessment

**LOW** — too early for replies. The entire campaign was sent within a ~5 hour window this morning. Most prospects have had the email for 2-6 hours. Service business owners typically check email:

- **Morning hours (8-10 AM local):** First inbox check — most of the campaign landed here
- **Lunch break (12-1 PM):** Second check
- **End of day (4-6 PM):** Final check

**Expected reply window:** 24-72 hours after send. If no replies by Apr 30 evening, the follow-up sequence should begin.

## Bounceback Summary (Not Replies)

These inbound emails are Mailer-Daemon delivery failures, not prospect responses:

| Time | Subject | Recipient | Issue |
|------|---------|-----------|-------|
| 3:07 PM | "Your garage door site is missing an email address" | dj@cologaragedoor.com | MailChannels relay reject (3rd bounce for this lead) |
| 2:00 PM | "Pure Pest Co — your site has no way to capture leads" | info@purepestco.com | Recipient unknown (Office 365) |
| 12:03 PM | "broncoprokleen.com — 339 Yelp reviews but no way to book online" | contact@broncoprokleen.com | Address not found |
| 12:03 PM | "Strong Heating — quick observation on your website" | office@strongheatingcooling.com | 550 5.1.1 address not found |
| 11:51 AM | "Your contact page works, but your quote pipeline doesn't" | dj@cologaragedoor.com | 550 5.7.1 address rejected |
| 11:31 AM | "Colorado Garage Door — your contact page is broken" | dj@cologaragedoor.com | 550 5.7.1 address rejected |
| Apr 28 | "Your HVAC site's emergency CTA is missing" | info@theweatherchangers.com | Address not found |
| Apr 28 | "Your plumbing site has a template problem" | info@paylessrooterdenver.com | 550 5.1.1 address not found |

**Note:** The original CDP sends used wrong addresses (info@ for some leads). The SMTP re-sends used corrected addresses (admin@ for Payless Rooter, service@ for The Weather Changers) and were accepted. The bouncebacks visible are from the failed CDP attempts, except Strong Heating, Bronco Pro Kleen, Pure Pest Co, and Colorado Garage Door where even the "discovered" email was wrong.

## RED Flag Assessment

**No RED flags.** Zero replies from prospects. Follow-up sequence should start:
- **Follow-up 1 (Day +3):** May 1-2
- **Follow-up 2 (Day +7):** May 5-6
- **Close (Day +14):** May 12-13
