# Site Audit Funnel Readiness Report

Date: 2026-04-24

## Verified Changes

- Homepage hero now leads with the audit wedge: "Enter your URL. Get a website audit with targeted fixes."
- Homepage metadata now describes the free website audit instead of leading with custom AI systems.
- `components/site-audit/SiteAuditTool.tsx` now has a read-only audit preview, scorecard, observed signals, issue list, reference implementation examples, and full-plan email gate.
- `app/api/audit/route.ts` now performs a lightweight live HTML scan instead of random demo scoring.
- The audit API blocks local/private URLs and only accepts HTTP/HTTPS URLs.
- The full-plan gate submits to `/api/contact` using the existing lead endpoint.

## Local Verification

- `npm run lint`: pass.
- `npm run build`: pass.
- Local homepage render on built app: `200`, 42052 bytes.
- `POST /api/audit` with `https://outboundautonomy.com`: returned scored JSON with source URL, final URL, scores, issues, recommendations, estimate, and disclaimer.
- `POST /api/audit` with `example.com`: normalized to HTTPS and returned factual issue output.
- `POST /api/audit` with invalid URL: returned `{"error":"Invalid URL"}`.
- `POST /api/audit` with local URL: returned `{"error":"Local/private URLs cannot be audited"}`.
- `POST /api/contact` with an audit lead payload: returned a successful local lead response.
- Preview deployment initially failed `/api/contact` with `SQLITE_READONLY` because Vercel cannot write to the deployed bundle. `lib/db.ts` was updated to use `/tmp/outboundautonomy.db` when `VERCEL` is set.
- Redeployed preview: `https://outboundautonomy-69phriy1l-owner-3355s-projects.vercel.app`.
- Preview homepage via authenticated Vercel curl: HTTP 200.
- Preview `POST /api/audit` with `example.com`: returned new factual report shape with `sourceUrl`, `finalUrl`, `issues`, `referenceExamples`, `implementationEstimate`, and disclaimer.
- Preview `POST /api/contact` with audit lead payload: returned `{"message":"Lead created successfully","leadId":1}` after `/tmp` DB path fix.
- Added direct Google Sheets lead storage through the owner Workspace OAuth credentials.
- Verified preview deployment: `https://outboundautonomy-q3ea7isgh-owner-3355s-projects.vercel.app`.
- Preview `POST /api/contact`: returned `destination:"google_sheets"`, `durable:true`, `leadId:"Leads!A2:M2"`.
- Production deployment promoted and aliased: `https://outboundautonomy.com`.
- Production `POST /api/audit` with `https://example.com`: returned score `69`, grade `D`, `4` issues, and `3` recommendations.
- Production `POST /api/contact`: returned `destination:"google_sheets"`, `durable:true`, `leadId:"Leads!A3:M3"`.
- Production lead row was verified in the Workspace Sheet.

## Remaining Limits

- The audit is a lightweight HTML scan, not Lighthouse, analytics, PageSpeed, or true competitor crawling.
- No real account creation exists yet; the current gate is email lead capture, not user accounts.
- The full report is unlocked in-session after lead capture; email delivery of a saved report is not implemented yet.

## Recommendation

The audit funnel is launch-safe for organic promotion and outreach. Avoid paid traffic until the next iteration adds saved report delivery, stronger crawling, and clearer analytics attribution.
