# New Prospect Research Results

**Date:** 2026-04-29 06:58 MDT
**Mission:** NEXUS new-prospect-research-20260429-0658
**Slice:** 1/2

---

## Summary

| Vertical | Target | Found | Status |
|----------|--------|-------|--------|
| Locksmith | 1 | 1 ✅ | Front Range Locksmith |
| Movers | 1 | 0 ❌ | No email-capable mover found |
| Auto Glass | 1 | 1 ✅ | Competition Auto Glass |
| Landscaping | 2 | 1 ⚠️ | Colorado Green Landscaping (only 1) |

## Prospect Details

### 1. Front Range Locksmith (locksmith) — Score: 8/10 ✅

| Field | Value |
|-------|-------|
| **CRM ID** | `18205fea-e6f` |
| **Website** | https://frontrangelocksmith.com |
| **Email** | frontrangelocksmith@gmail.com ✅ |
| **Audit Score** | Design 93, Conversion 77, Technical 100, **Overall 90 (A)** |
| **Top Issues** | No lead-capture form detected, primary CTA weak, no contact form |
| **Assessment** | Strong prospect. 2 critical conversion gaps make for a specific, actionable hook. |

### 2. Competition Auto Glass (auto-glass) — Score: 5/10 ⚠️

| Field | Value |
|-------|-------|
| **CRM ID** | `09045987-6c5` |
| **Website** | https://competitionautoglass.com |
| **Email** | info@competitionautoglass.com ✅ |
| **Audit Score** | Design 100, Conversion 100, Technical 100, **Overall 100 (A)** |
| **Top Issues** | None — near-perfect site |
| **Assessment** | Low urgency. 61 years in business, 600+ reviews, very polished site. Keep for low-priority outreach or ignore. |

### 3. Colorado Green Landscaping (landscaping) — Score: 7/10 ✅

| Field | Value |
|-------|-------|
| **CRM ID** | `85df6e45-3c7` |
| **Website** | https://www.coloradogreenlandscaping.com |
| **Email** | george@coloradogreenlandscaping.com ✅ |
| **Audit Score** | Design 93, Conversion 92, Technical 90, **Overall 92 (A)** |
| **Top Issues** | Missing meta description, Wix site with minimal content depth, no service-area pages |
| **Assessment** | Decent prospect. 20+ years experience, owner-operated. Site is mid-tier — lots of room for service-area content and SEO. |

### 4. Mover Vertical — SLOT UNFILLED ❌

| Field | Value |
|-------|-------|
| **Domains checked** | 10+ (bellmoving.com, peaktopeakmovers.com, rockymountainmoving.com, denvermovingpros.com, elitemoversdenver.com, movinghelpdenver.com, firstchoicemovers.com, movingcolorado.com, premiummoversdenver.com, tlcmovingdenver.com, + more) |
| **Result** | None found with a verified email AND not already sent. Denver Express Movers was sent via batch (ID 45). Most mover sites are JS-rendered SPA or form-only contact. |
| **Recommendation** | Use Google Maps scraping or X/Yelp directory search when APIs are available. Many Colorado movers exist but hide emails behind contact forms. |

### 5. Landscaping #2 — SLOT UNFILLED ❌

| Field | Value |
|-------|-------|
| **Domains checked** | 10+ (evergreenlandscapedenver.com, frontrangelandscapedenver.com, denverlandscapellc.com, highalonelandscaping.com, milehighlandscape.com was burning domain, timelinelandscapedenver.com, coloradocountrylandscaping.com, + more) |
| **Result** | No email-capable landscaping site found. All prior landscaping leads (Martin Mowing, Denver Lawn & Landscape, Skyline, Oak & Canyon) were already searched and sent. |
| **Recommendation** | Broaden to Boulder/Fort Collins with Google Maps search. |

## CRM Actions

3 leads inserted into CRM at `outreach_drafted` stage. Prospect research JSON files written to `artifacts/prospects/`. Placeholders created for unfilled slots.

## Pipeline State

| Stage | Before | After |
|-------|--------|-------|
| outreach_sent | 47 | 47 |
| outreach_drafted | 0 | **3** |
| outreach_drafted_email_missing | 2 | 2 |
| scored | 2 | 2 |
| archived | 14 | 14 |
| prospect | 2 | 2 |
| lost | 2 | 2 |
| **Total** | 69 | **72** |

## Next for Slice 2/2

- Send personalized SMTP emails to the 2 email-capable leads (Front Range Locksmith, Colorado Green Landscaping)
- Skip Competition Auto Glass (100/A, too perfect)
- Fill mover + 2nd landscaping slots via directory search when tools available
