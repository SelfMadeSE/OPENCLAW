# Google Workspace Lead Storage Setup

Date: 2026-04-24

## What Changed

- `/api/contact` now routes leads through `lib/lead-storage.ts`.
- If direct Google Sheets OAuth env vars are configured, leads are appended to the Workspace-owned Google Sheet.
- Apps Script webhook support remains as a legacy fallback, but Workspace access policy blocked anonymous web-app access during setup.
- If those env vars are missing, local/dev falls back to SQLite.
- On Vercel, SQLite fallback is only temporary because `/tmp` is ephemeral.
- Verified preview deployment: `https://outboundautonomy-q3ea7isgh-owner-3355s-projects.vercel.app`.
- Verified production deployment: `https://outboundautonomy.com`.

## Google Sheet Setup

Created Workspace Sheet:

- Name: `Outbound Autonomy Leads`
- URL: `https://docs.google.com/spreadsheets/d/1Sm1bTd5vigNJHfB1Yjfs-FIMmyGSw9nQGRNsTD4MXNQ/edit`
- Sheet tab: `Leads`

The production path should use direct Google Sheets API credentials exported from the `owner@outboundautonomy.com` `gws` auth session.

## Vercel Env Vars Needed

- `GOOGLE_OAUTH_CLIENT_ID`
- `GOOGLE_OAUTH_CLIENT_SECRET`
- `GOOGLE_OAUTH_REFRESH_TOKEN`
- `GOOGLE_LEADS_SPREADSHEET_ID`: `1Sm1bTd5vigNJHfB1Yjfs-FIMmyGSw9nQGRNsTD4MXNQ`
- `GOOGLE_LEADS_SHEET_NAME`: `Leads`

Added to Production and Preview, then redeployed.

## Verification

Final verification:

- Preview `POST /api/contact`: returned `destination: "google_sheets"`, `durable: true`, `leadId: "Leads!A2:M2"`.
- Production `POST /api/contact`: returned `destination: "google_sheets"`, `durable: true`, `leadId: "Leads!A3:M3"`.
- Production `POST /api/audit`: returned factual report data for `https://example.com/` with score `69`, grade `D`, `4` issues, and `3` recommendations.
- Google Sheet rows were verified with `gws sheets spreadsheets values get`.

Manual endpoint test:

```bash
vercel curl /api/contact --deployment <deployment-url> -- --request POST --header 'content-type: application/json' --data '{"name":"Audit Test","email":"audit-test@example.com","company":"example.com","service_interest":"web_design","budget_range":"not_sure","message":"Website audit request test."}'
```

Expected response:

```json
{
  "message": "Lead created successfully",
  "leadId": "Leads!A2:M2",
  "destination": "google_sheets",
  "durable": true
}
```

If the response still says `destination: "sqlite"` or `durable: false`, the Google webhook env vars are missing from that deployment.
