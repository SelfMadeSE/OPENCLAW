# Pipeline Reconciliation Audit

**Date:** 2026-04-29 04:13 MDT
**Mission:** NEXUS pipeline-reconciliation-20260429-0412
**Slice:** 1/3

---

## Summary

| Metric | Value |
|--------|-------|
| Total leads in CRM | 61 |
| outreach_sent (before reconciliation) | 31 |
| outreach_drafted (before reconciliation) | 13 |
| archived, lost, prospect | 17 |
| Total email_attempts | 60 |
| provider_accepted | 47 |
| failed (app password expired) | 6 |
| reconciled_superseded (was unverified_claim) | 7 |

## Outreach Sent Verification (31 leads)

**0 ghosts, 0 suspects, 31 verified.** All 31 leads in `outreach_sent` stage have matching `provider_accepted` email attempts with valid provider message IDs.

| Classification | Count | Meaning |
|---------------|-------|---------|
| ✅ verified | 31 | Has `provider_accepted` entry with message_id |
| ⚠️ suspect | 0 | Has `unverified_claim` entry but no SMTP proof |
| 👻 ghost | 0 | No email_attempt row at all |

### Full Sent Lead Table

| # | Lead Name | Score | Verified | Email Sent To | Email Attempt ID |
|---|-----------|-------|----------|--------------|-----------------|
| 1 | Denver Legal Marketing | 90 | ✅ | meranda@denverlegalmarketing.com | 9 |
| 2 | Atlantic Dental | 88 | ✅ | manager@myatlanticdental.com | 15 |
| 3 | Strong Heating and Cooling | 87 | ✅ | office@strongheatingcooling.com | 16 |
| 4 | Payless Rooter | 85 | ✅ | admin@paylessrooterdenver.com | 17 |
| 5 | LogicHVACR | 85 | ✅ | logic@logichvacr.com | 18 |
| 6 | Hooley Heating & Air | 83 | ✅ | office@hooleyhvac.com | 19 |
| 7 | Hard Launch Digital | 83 | ✅ | hello@hardlaunchdigital.com | 12 |
| 8 | DC Plumbing Colorado | 81 | ✅ | sales@dcplumbingcolorado.com | 20 |
| 9 | Colorado Native Plumbing | 81 | ✅ | nativefamily.plumbingandheating@gmail.com | 21 |
| 10 | Apex Roofing Denver | 80 | ✅ | info@apexroofingdenver.com | 22 |
| 11 | The Weather Changers | 78 | ✅ | service@theweatherchangers.com | 14 |
| 12 | Peak to Peak Roofing | 77 | ✅ | info@peaktopeakroofing.com | 11 |
| 13 | Royal Services Plumbing | 76 | ✅ | royalservicesplumbing@gmail.com | 13 |
| 14 | Avalanche Home Systems | 76 | ✅ | avalanchehomesystems@gmail.com | 50 |
| 15 | Sparks Heating and Air | 75 | ✅ | rsparks9@hotmail.com | 32 |
| 16 | Davey Heating & Air | 75 | ✅ | help@daveyheating.com | 31 |
| 17 | Believe That Carpet | 73 | ✅ | believethatcarpets@gmail.com | 51 |
| 18 | Oak & Canyon Landscape | 73 | ✅ | info@oakandcanyon.com | 52 |
| 19 | Bug Man Inc. (Denver Pest Control) | 73 | ✅ | denverpestcontrol@denverpestcontrol.com | 28 |
| 20 | Denver Roofing Co. | 71 | ✅ | bids@denverroofingco.com | 30 |
| 21 | Denver Tree Company | 70 | ✅ | info@denvertreecompany.com | 29 |
| 22 | Cherry Medical Aesthetics | 69 | ✅ | reception@cherrymedispa.com | 53 |
| 23 | Mighty Bee Electric | 69 | ✅ | mtybeeinfo@gmail.com | 35 |
| 24 | My Denver Plumber | 67 | ✅ | info@mydenverplumber.net | 33 |
| 25 | B&E Services Inc. | 67 | ✅ | beservices@live.com | 54 |
| 26 | Harmony Painting Denver | 65 | ✅ | info@harmonypaintingdenver.com | 55 |
| 27 | Denver Concierge | 61 | ✅ | denverconcierge@gmail.com | 27 |
| 28 | Denver Appliance Repair | 59 | ✅ | info@denverappliance.co | 26 |
| 29 | Val Sopi (Blogmaker) | 57 | ✅ | hello@handmadespaceships.com | 56 |
| 30 | Colorado Chiropractic | 55 | ✅ | coloradochiropracticcenter@gmail.com | 57 |
| 31 | Colorado Garage Door Service | 0 | ✅ | dj@cologaragedoor.com | 34 |

### Corrected During Reconciliation

4 leads were in `outreach_drafted` but had already been sent via SMTP (email IDs 43, 47, 48, 49 recorded with `lead_id=unknown`). Updated:

| Lead | Score | Email | SMTP ID | Action Taken |
|------|-------|-------|---------|-------------|
| Junk Genius | 72 | denver@junkgenius.com | 43 | Stage updated to outreach_sent |
| Good People Tree Service | 68 | office@goodpeopletreeservice.com | 49 | Stage updated to outreach_sent |
| Bronco Pro Kleen | 60 | contact@broncoprokleen.com | 48 | Stage updated to outreach_sent |
| COS Plumbing | 55 | cosplumbing14@gmail.com | 47 | Stage updated to outreach_sent |

### Legacy Claim Resolution

7 `unverified_claim` email attempts from legacy browser/CDP were marked as `reconciled_superseded` — each had a matching `provider_accepted` SMTP entry for the same recipient.

---

## Unsent Inventory — Top 5 Highest-Scored with Email but No Email Attempt

**NONE.** There are no `outreach_drafted` leads with a verified email address that have NOT been sent. All leads with emails have been sent.

### 9 Truly Stuck Leads (No Email Found)

These leads are in `outreach_drafted` with no email in CRM or contact_info. They cannot be sent outreach through SMTP until an email is discovered:

| # | Lead Name | Score | Phone | Website | Notes |
|---|-----------|-------|-------|---------|-------|
| 1 | Mountain View Mechanical | 83 | +1 719-648-4579 | mvmheatingandcooling.com | Site returns 404. WHOIS protected. |
| 2 | Horsetooth Heating, Air & Plumbing | 76 | 970-286-0640 | (not in CRM) | Lennox partner site, contact form only |
| 3 | Fort Collins Heating & Air Conditioning | 73 | 970-533-8570 | (not in CRM) | 85+ years, staging URL leaked, form only |
| 4 | Denver Lawn & Landscape | 72 | (not in CRM) | denverlawnlandscape.com | No phone on site, contact page 404 |
| 5 | Best Heating Cooling & Air (BHC Air) | 71 | Denver, CO | bhcair.com | Generic template, contact form only |
| 6 | Skyline Landscape Design | 70 | (not in CRM) | (not in CRM) | No contact info at all |
| 7 | GE Heating and Air | 69 | (303) 252-3185 | geheating.com | Thin template, contact form only |
| 8 | DenTech Heating & Air Conditioning | 69 | (720) 874-9559 | dentechvac.com | Minimal site, contact form only |
| 9 | Fix-It Now Heating & Cooling | 69 | (303) 657-2421 | fixitnowhvac.com | Basic template, contact form only |

---

## Updated Pipeline State (post-reconciliation)

| Stage | Count | Avg Score |
|-------|-------|-----------|
| outreach_sent | **35** (+4 reconciled) | 72.3 |
| outreach_drafted | **9** (-4 reconciled) | 71.2 (all no-email) |
| archived | 14 | 9 |
| lost | 2 | 0 |
| prospect | 1 | 0 |
| **Total** | **61** | |

---

## Email Ledger Health

| Status | Count | Details |
|--------|-------|---------|
| provider_accepted | 47 | Legitimate sends via SMTP |
| failed | 6 | All due to expired app password; none are actual delivery failures to real prospects |
| reconciled_superseded | 7 | Legacy browser claims superseded by SMTP proof |
| **Total** | **60** | |

---

## Next Actions

1. **No-email leads (9)** — Need alternative contact discovery: Google Business Profile scraping, Facebook/Directory search, phone call outreach
2. **Gmail app password** — Expired (535 errors). Need fresh password from Rylee to resume sending drafted follow-ups
3. **Follow-up 1 emails** — 35 sent leads are due for Follow-up 1 (+3d). First batch was sent ~04-28 at ~08:00 UTC, so follow-ups start ~04-30
