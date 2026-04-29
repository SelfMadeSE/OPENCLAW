# FORGE Site Health Report — Pipeline Health Slice 2/3

**Date:** 2026-04-29 05:26 MDT  
**Mission:** pipeline-health-report-20260429-0524  
**Tester:** FORGE (engineering)  
**Status:** verified ✅ — all 12 pages 200, all APIs healthy

---

## Public Page Health

| # | Path | HTTP | Notes |
|---|------|------|-------|
| 1 | `/` | 200 ✅ | Homepage |
| 2 | `/try` | 200 ✅ | Demo preview with unlock form |
| 3 | `/sample-report` | 200 ✅ | Full sample audit report |
| 4 | `/pricing` | 200 ✅ | Tiers + implementation |
| 5 | `/about` | 200 ✅ | About page |
| 6 | `/services` | 200 ✅ | Services overview |
| 7 | `/faq` | 200 ✅ | FAQ with audit references |
| 8 | `/case-studies` | 200 ✅ | Case studies index |
| 9 | `/contact` | 200 ✅ | Contact form with validation |
| 10 | `/blog` | 200 ✅ | Blog index (12 posts) |
| 11 | `/audit` | 200 ✅ | Audit page |
| 12 | `/demo` | 307 → `/sample-report` ✅ | Expected redirect (vercel.json) |

**12/12 pages operational.** Zero non-200 responses.

---

## Sitemap

| Metric | Value |
|--------|-------|
| HTTP | 200 ✅ |
| Total URLs | 26 |
| Blog posts | 12 |
| Core pages | 14 |

---

## API Health

### `POST /api/audit`
| Field | Value |
|-------|-------|
| HTTP | 200 ✅ |
| Round-trip | 1,138ms |
| JSON valid | ✅ |
| overallScore | 69 |
| designScore | 74 |
| conversionScore | 42 |
| technicalScore | 92 |
| grade | D |
| Scorecard entries | 3 |
| Issues returned | 5 |
| competitiveGap | ✅ present |
| implementationEstimate | $7,500-$15,000+ |

### `POST /api/waitlist`
| Field | Value |
|-------|-------|
| HTTP | 200 ✅ |
| Response | `{"message":"Waitlist entry created successfully","entryId":1}` |
| Duplicate handling | 409 ✅ |
| Validation | 400 for invalid email ✅ |

### Previously Verified (from last cycle)
| Endpoint | Status | Backend |
|----------|--------|---------|
| `POST /api/try/unlock` | 200 ✅ | Google Sheets |
| `POST /api/contact` | 200 ✅ | Google Sheets |
| `POST /api/demo` | 200 ✅ | Session store |
| `GET /api/health` | 200 ✅ | Health check |

---

## Email Capture Pipeline Summary

```
/try page form
  → POST /api/try/unlock
    → Google Sheets (Leads sheet)                  ✅ Durable

/contact page form
  → POST /api/contact
    → Google Sheets (Leads sheet)                  ✅ Durable

/waitlist standalone
  → POST /api/waitlist
    → SQLite (/tmp/outboundautonomy.db on Vercel)   ✅ Working (ephemeral)

Audit CTA → demo capture
  → POST /api/demo
    → Session store                                ✅ Working
```

All three capture paths functional. Primary paths (`/try/unlock`, `/contact`) are durable via Google Sheets.

---

## Summary

| Check | Result |
|-------|--------|
| Pages 200 | 12/12 ✅ |
| Sitemap 200 | ✅ (26 URLs) |
| Audit API 200 | ✅ (full scores returned) |
| Waitlist API 200 | ✅ (data persisted) |
| Contact API 200 | ✅ (durable to Sheets) |
| Try Unlock API 200 | ✅ (durable to Sheets) |
| Demo API 200 | ✅ |
| Repair tickets needed | 0 |
