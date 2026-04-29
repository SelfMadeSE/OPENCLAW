# Social Account Setup Protocol

ORANGE risk class. Browser automation should NEVER fight phone/captcha/2FA verification walls for more than one short attempt before escalating.

## Two-phase ownership

**Phase 1 — Agent (MUSE + SIGNAL):**
- Generate username candidates and check availability.
- Prepare bio, header image, avatar (handed off from MUSE creative drafts).
- Stage profile copy in `artifacts/social/<platform>/<handle>/`.
- Identify required verification path (email-only, phone, ID, OAuth-only).
- Write a single `setup-card.md` with: platform, handle, bio, avatar path, verification requirements, expected human time.

**Phase 2 — Operator (human, 5–10 min):**
- Completes signup, phone verification, captcha, OAuth connect.
- Confirms `LOGIN_DONE <handle>` to NEXUS.

**Phase 3 — Agent (resumes):**
- Logs into the now-real account via approved credential vault entry.
- Fills profile fields from the staged setup-card.
- Posts the first scheduled artifact ONLY after the operator issues a separate `APPROVAL post-first-<handle>` block.

## Hard rules

- No agent attempts to solve a captcha.
- No agent attempts to receive an SMS code.
- No agent uses operator's email/SMS apps to fish for codes (pause, escalate via BLOCKER instead).
- Maximum one verification-wall encounter per session before escalation.
- Account creation is ORANGE; first public post is RED.

## What counts as evidence the account exists

- A logged-in screenshot (when bridge is up) OR an HTTP-200 fetch of the public profile URL with the agent's avatar bytes matching.
- Recorded in `artifacts/social/<platform>/<handle>/proof.json` with timestamp and hash.

## Currently blocked

Browser CDP bridge at `127.0.0.1:18800` is offline. Until FORGE brings it up (repair ticket pending), every social account setup attempt halts at Phase 1 step 1 and emits a BLOCKER with `infra_unavailable`.
