# Pipeline Health Report

**Date:** 2026-04-29 05:25 MDT
**Mission:** NEXUS pipeline-health-report-20260429-0524
**Slice:** 1/3

---

## 1. Stage Distribution

| Stage | Count | Avg Score |
|-------|-------|-----------|
| outreach_sent | 45 | 66.8 |
| archived | 14 | 9.2 |
| scored | 2 | 7.0 (0-10 scale) |
| outreach_drafted_email_missing | 2 | 76.0 |
| lost | 2 | 0.0 |
| prospect | 1 | 0.0 |
| **Total** | **66** | |

## 2. Email Ledger Summary

| Status | Count |
|--------|-------|
| ✅ **provider_accepted** | **57** |
| 🔄 reconciled_superseded | 7 |
| ❌ failed | 6 (all app-password expiry — retried successfully) |
| **Total** | **70** |

## 3. Evidence Classification (outreach_sent + outreach_drafted)

| Classification | Count | Definition |
|---------------|-------|------------|
| ✅ **verified_send** | **44** | Has provider_accepted with valid provider message ID |
| ⚠️ **suspect** | 1 | Junk Genius — has failed attempt (app password expired on retry) but earlier attempt ID 43 succeeded provider_accepted |
| 👻 **ghost** | 2 | Mountain View Mechanical (83), DenTech HVAC (69) — no email, no attempt, no contact |

**Note:** The 1 "suspect" (Junk Genius) is a false positive — the `failed` row (ID 60) was a duplicate retry attempt after password expiry. The original send (ID 43) was `provider_accepted`. Not a genuine suspect.

## 4. Full Pipeline Health Table (47 leads)

| Score | Name | Stage | Email | Evidence |
|------|------|-------|-------|----------|
| 90 | Denver Legal Marketing | sent | meranda@denverlegalmarketing.com | ✅ verified |
| 88 | Atlantic Dental | sent | manager@myatlanticdental.com | ✅ verified |
| 87 | Strong Heating and Cooling | sent | office@strongheatingcooling.com | ✅ verified |
| 85 | Payless Rooter | sent | admin@paylessrooterdenver.com | ✅ verified |
| 85 | LogicHVACR | sent | logic@logichvacr.com | ✅ verified |
| 83 | **Mountain View Mechanical** | **email_missing** | **NO EMAIL** | 👻 **ghost** |
| 83 | Hooley Heating & Air | sent | office@hooleyhvac.com | ✅ verified |
| 83 | Hard Launch Digital | sent | hello@hardlaunchdigital.com | ✅ verified |
| 81 | DC Plumbing Colorado | sent | sales@dcplumbingcolorado.com | ✅ verified |
| 81 | Colorado Native Plumbing | sent | nativefamily.plumbingandheating@gmail.com | ✅ verified |
| 80 | Apex Roofing Denver | sent | info@apexroofingdenver.com | ✅ verified |
| 78 | The Weather Changers | sent | service@theweatherchangers.com | ✅ verified |
| 77 | Peak to Peak Roofing | sent | info@peaktopeakroofing.com | ✅ verified |
| 76 | Royal Services Plumbing | sent | royalservicesplumbing@gmail.com | ✅ verified |
| 76 | Avalanche Home Systems | sent | avalanchehomesystems@gmail.com | ✅ verified |
| 76 | Horsetooth Heating | sent | dispatch@horsetoothheatingandair.com | ✅ verified |
| 75 | Sparks Heating and Air | sent | rsparks9@hotmail.com | ✅ verified |
| 75 | Davey Heating & Air | sent | help@daveyheating.com | ✅ verified |
| 73 | Believe That Carpet | sent | believethatcarpets@gmail.com | ✅ verified |
| 73 | Fort Collins Heating | sent | service@fortcollinsheating.com | ✅ verified |
| 73 | Oak & Canyon Landscape | sent | info@oakandcanyon.com | ✅ verified |
| 73 | Bug Man Inc. | sent | denverpestcontrol@denverpestcontrol.com | ✅ verified |
| 72 | Denver Lawn & Landscape | sent | denverlawnlandscape@gmail.com | ✅ verified |
| 72 | Junk Genius | sent | denver@junkgenius.com | ⚠️ suspect (false positive) |
| 71 | Denver Roofing Co. | sent | bids@denverroofingco.com | ✅ verified |
| 71 | Best Heating (BHC Air) | sent | bhcallc@gmail.com | ✅ verified |
| 70 | Denver Tree Company | sent | info@denvertreecompany.com | ✅ verified |
| 70 | Skyline Landscape Design | sent | info@skylinelandscapedesign.com | ✅ verified |
| 69 | GE Heating and Air | sent | office@geheating.com | ✅ verified |
| 69 | **DenTech Heating & Air** | **email_missing** | **NO EMAIL** | 👻 **ghost** |
| 69 | Cherry Medical Aesthetics | sent | reception@cherrymedispa.com | ✅ verified |
| 69 | Mighty Bee Electric | sent | mtybeeinfo@gmail.com | ✅ verified |
| 69 | Fix-It Now HVAC | sent | office@fixitnowhvac.com | ✅ verified |
| 68 | Good People Tree Service | sent | office@goodpeopletreeservice.com | ✅ verified |
| 67 | My Denver Plumber | sent | info@mydenverplumber.net | ✅ verified |
| 67 | B&E Services Inc. | sent | beservices@live.com | ✅ verified |
| 65 | Harmony Painting Denver | sent | info@harmonypaintingdenver.com | ✅ verified |
| 61 | Denver Concierge | sent | denverconcierge@gmail.com | ✅ verified |
| 60 | Bronco Pro Kleen | sent | contact@broncoprokleen.com | ✅ verified |
| 59 | Denver Appliance Repair | sent | info@denverappliance.co | ✅ verified |
| 57 | Val Sopi | sent | hello@handmadespaceships.com | ✅ verified |
| 55 | Colorado Chiropractic | sent | coloradochiropracticcenter@gmail.com | ✅ verified |
| 55 | COS Plumbing | sent | cosplumbing14@gmail.com | ✅ verified |
| 9 | Pure Pest Co | sent | info@purepestco.com | ✅ verified |
| 8 | Sphere Electric | sent | sphere.electric@gmail.com | ✅ verified |
| 6 | A.P. Pest Control | sent | ap_pestcontrol@yahoo.com | ✅ verified |
| 0 | Colorado Garage Door | sent | dj@cologaragedoor.com | ✅ verified |

## 5. Top-5 Next-Send Priority Queue

| Rank | Lead | Score | Status | Reason |
|------|------|-------|--------|--------|
| 1 | **Mountain View Mechanical** | 83 | 👻 ghost — no email | Site 404, GoDaddy privacy. Needs GBP scraping or phone outreach (+1 719-648-4579) |
| 2 | **DenTech Heating & Air** | 69 | 👻 ghost — no email | Form-only Wix site. WHOIS: Matt Michaelis. Phone (720) 874-9559. Try Facebook/social discovery |
| 3 | **Affordable Pest** | 7/10 | scored — no email | Site 97/100 A. Low urgency. Needs email discovery before sending |
| 4 | **Window Replacement Denver** | 7/10 | scored — no email | Site 98/100 A. Low urgency. Needs email discovery before sending |
| 5 | — | — | — | No other unsent leads with score >= 65 in pipeline |

**Bottom line: There are NO email-capable, unsent leads with meaningful scores in the pipeline.** All 44 leads with verified emails have been sent and verified.

## 6. Revenue Metrics

| Metric | Value |
|--------|-------|
| Total leads processed | 66 |
| Sent outreach (verified) | 44 |
| Response pipeline | 0 (no replies yet — first batch sent ~12h ago) |
| Negotiating | 0 |
| Won | 0 |
| Awaiting email discovery | 2 |
| Awaiting Rylee decision | 2 (Affordable Pest, Window Replacement Denver — both near-perfect sites) |

## 7. Next Actions

1. **Email discovery** for Mountain View Mechanical (83) and DenTech (69) — GBP, Facebook, phone call outreach
2. **Phone outreach program** — 6+ leads have verified phone numbers but no email (Mountain View Mechanical, BHC Air now resolved, DenTech, etc.)
3. **Prospect sourcing** — Pipeline is drained. Need new prospects with visible website problems to replenish `outreach_drafted`
4. **Follow-up 1** — First batch sent ~12h ago. Follow-up emails due in 2-3 days
