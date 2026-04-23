# Telephony Exposure Closeout — 2026-04-22

## Objective
Disable/quarantine public receptionist + Twilio exposure so the public site no longer ships active receptionist behavior.

## What was changed

### 1) Public Twilio endpoints disabled (production-safe)
All Twilio API handlers now return retired responses and do not import or execute receptionist/Twilio business logic:

- `app/api/twilio/voice/route.ts` → returns `410` + TwiML hangup
- `app/api/twilio/gather/route.ts` → returns `410` + TwiML hangup
- `app/api/twilio/recording/route.ts` → returns `410` + TwiML hangup
- `app/api/twilio/sms/route.ts` → returns `410` + empty TwiML response
- `app/api/twilio/sms-confirm/route.ts` → returns `410` JSON retired message

Result: no active receptionist callflow, no SMS relay, no voicemail processing, no appointment confirmation automation.

### 2) Receptionist runtime code quarantined
Legacy receptionist implementation was removed from runtime paths and moved to archive:

- moved: `lib/receptionist/*` → `artifacts/archive/receptionist-legacy/*`

Archived files:
- `artifacts/archive/receptionist-legacy/scripts.ts`
- `artifacts/archive/receptionist-legacy/session-store.ts`
- `artifacts/archive/receptionist-legacy/twilio-utils.ts`
- `artifacts/archive/receptionist-legacy/types.ts`

Additionally, TypeScript config now excludes archive code from compile/typecheck:
- `tsconfig.json` (`exclude` now includes `artifacts/archive/**`)

### 3) Demo session code decoupled from receptionist namespace
To keep demo shell behavior while removing receptionist runtime coupling:

- added: `lib/demo/types.ts`
- added: `lib/demo/session-store.ts`
- updated imports in:
  - `app/api/demo/route.ts`
  - `app/api/demo/[sessionId]/route.ts`
  - `app/api/health/route.ts`

### 4) Public health endpoint no longer exposes Twilio config state
`app/api/health/route.ts` was updated to report telephony disabled status (instead of reflecting Twilio credential config/phone numbers).

### 5) Schema/validation metadata scrubbed of receptionist-specific options
Receptionist-specific values were removed from active schema/validation defaults:

- `lib/validations.ts`
  - removed `ai_receptionist` from `service_interest` enum

- `db/schema.sql`
  - `subscriptions.plan_type` check changed from receptionist plans to non-receptionist plan values
  - `leads.service_interest` check removed `ai_receptionist`

- `db/seed.sql`
  - replaced receptionist sample data with non-telephony automation-oriented sample data

- `app/api/webhook/stripe/route.ts`
  - default fallback `plan_type` changed from `ai_receptionist_standard` to `automation_starter`

- `lib/stripe.ts`
  - removed `ai_receptionist` pricing group from exported active pricing map

### 6) Twilio dependency removed from active package deps
- `package.json` updated to remove `twilio`
- lockfile updated via `npm install` (twilio-related packages removed)

## Verification / smoke

### Build + lint
- `npm run lint` ✅ (passes; existing unrelated warning in `components/layout/Header.tsx`)
- `npm run build` ✅ (successful production build)

### Runtime smoke
Started app on alternate port due local `:3000` collision and verified:

- `GET /api/health` → `200` with:
  - `telephony.enabled: false`
- `POST /api/twilio/voice` → `410` with retired TwiML hangup

## Remaining blockers (non-code)
1. **Twilio Console webhook cleanup**: if Twilio number/webhooks still point at production URLs, update/remove those webhooks in Twilio Console to complete operational decommissioning.
2. **Hosted environment variables**: remove obsolete `TWILIO_*` and `OWNER_PHONE_NUMBER` env vars from hosting platform settings to avoid policy drift.
3. **Historical docs**: root historical deployment docs still reference prior Twilio setup (`DEPLOYMENT_*`, migration notes). These are non-runtime docs but may be archived or annotated as deprecated for compliance clarity.

## Notes
Website shell and non-telephony public routes continue to build and serve normally.