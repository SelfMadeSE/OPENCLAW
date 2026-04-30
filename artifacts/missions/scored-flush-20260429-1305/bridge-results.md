# Scored Flush Results

**Date:** 2026-04-29 13:06 MDT
**Mission:** NEXUS scored-flush-20260429-1305
**Slice:** 1/1

---

## Send Results

**Target:** 7 scored leads with verified emails
**Result:** 0 sends — zero scored leads have a verified email.

| # | Name | Score | Email Status | Discovery Result |
|---|------|-------|-------------|-----------------|
| 1 | DenverHVACPros.com | 78 | ❌ No email in CRM (`{}`) | Site hacked (Chinese casino). No contact info available. |
| 2 | Denver Carpet Cleaning | 69 | ❌ `"unverified"` | Form-only site. `mailto:?subject=Denver` is a broken link, no actual email. Contact page uses `fprocess.php` form handler. |
| 3 | FB Mobile Detailing Denver | 65 | ❌ `"unverified"` | 22 script tags, but no email. Contact/About/FAQ all 404. |
| 4 | Denver Concrete Inc | 63 | ❌ No email in CRM (`{}`) | Static HTML site. No email on pages. |
| 5 | JusPainting, LLC | 63 | ❌ No email in CRM (`{}`) | Weebly template. Contact form only. |
| 6 | Affordable Pest | 7/10 | ❌ Empty string `""` | Near-perfect site (97/A). No email anywhere. |
| 7 | Window Replacement Denver | 7/10 | ❌ Empty string `""` | Near-perfect site (98/A). No email anywhere. |

## Before/After

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| provider_accepted | 112 | 112 | — |
| outreach_sent | 72 | 72 | — |
| scored | 7 | 7 | — |

## Conclusion

All 7 scored leads genuinely lack discoverable email addresses. The pipeline is fully flushed. No further SMTP sends are possible without new prospect sourcing.

## Next Actions

- **Email discovery needed** for Denver Carpet Cleaning, FB Mobile Detailing — try Facebook/Yelp/Google Business Profile scraping
- **Phone outreach consideration** for DenverHVACPros (hacked), Denver Concrete Inc, JusPainting — all have form-only contact
- **Affordable Pest & Window Replacement Denver** — near-perfect sites. Rylee decision whether to pursue despite low urgency and no email.
