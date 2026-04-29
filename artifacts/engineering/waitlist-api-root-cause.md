# Waitlist API — Root Cause Investigation

Status: **PARTIAL** (root cause not yet verified against live Vercel logs)
Owner: FORGE (engineering)
Date: 2026-04-29

## Symptoms (transcript)

- `/api/waitlist` POST returning 500 / write failure on Vercel.
- Conflicting prior diagnoses:
  1. "DB_PATH read-only on Vercel"
  2. "Code already has a /tmp fallback so it should work"
  3. "better-sqlite3 native addon is incompatible with Vercel runtime"

## Facts that ARE established (without log access)

- Vercel serverless functions run on AWS Lambda. The filesystem is **read-only EXCEPT `/tmp` (512 MB, ephemeral per execution context)**.
- `better-sqlite3` is a native N-API addon. It builds against Node's ABI for the deploy target. If the Vercel build does not produce the correct prebuilt for the function runtime (currently nodejs20.x or nodejs22.x), `require('better-sqlite3')` throws at cold start.
- Even when better-sqlite3 loads, an SQLite database in `/tmp` is **per-instance and ephemeral**. Two concurrent invocations in different containers will not see each other's writes; container teardown loses the DB.
- A waitlist that accepts public submissions and is expected to retain them MUST NOT persist to `/tmp`.

## What still needs to be verified (do not fix blindly)

1. Pull the Vercel runtime logs for at least 3 recent failing requests:
   - `vercel logs <project> --json --since 24h | jq 'select(.path=="/api/waitlist")'`
   - capture exact stack: is it the `require('better-sqlite3')` line? Is it `db.prepare(...)`? Is it `EROFS` from a non-`/tmp` path?
2. Confirm the function runtime declared in `vercel.json` / route config (`nodejs20.x`?) matches the better-sqlite3 prebuilt.
3. Confirm `DB_PATH` env in Vercel project settings (production + preview) — is it pointing inside `/tmp` or at a read-only path?
4. Confirm whether `data/` is being included in the deployment bundle (it often isn't — `.vercelignore`/`vercel.json.functions[...].includeFiles`).

## Recommended fix plan (after log verification)

### Path A (production-correct, recommended)
Replace SQLite with a persistent serverless DB. Choose ONE based on operator preference:
- **Vercel Postgres** (zero ops if already in the Vercel team)
- **Neon** (serverless Postgres, generous free tier)
- **Supabase Postgres** (also gives auth + storage if needed later)

Implementation steps:
1. Provision DB; obtain `DATABASE_URL`.
2. `pnpm add @vercel/postgres` OR `pnpm add @neondatabase/serverless`.
3. Create `waitlist` table:
   ```sql
   create table if not exists waitlist (
     id uuid primary key default gen_random_uuid(),
     email text unique not null,
     source text,
     metadata jsonb,
     created_at timestamptz default now()
   );
   ```
4. Replace `better-sqlite3` calls with the new client.
5. Add `DATABASE_URL` to Vercel env (production + preview).
6. Smoke test: `curl -X POST https://<project>.vercel.app/api/waitlist -d '{"email":"smoke+$(date +%s)@example.com"}'` then verify in DB.

### Path B (temporary, only if no DB available right now)
- Disable SQLite write entirely.
- Forward each waitlist submission to:
  - operator email via SMTP (using existing `gmail-smtp-send.py` flow — owner-only recipient, GREEN class), AND
  - append to a JSONL on a 24h Vercel KV / Upstash Redis store (~10 LOC).
- Document the API as **temporary, not durable** and link to this file.
- Schedule a 7-day deadline for Path A.

### Path C (do nothing, mark API broken)
Not acceptable for a public site that solicits emails. Reject this path.

## Decision needed from operator

> Which database backend to provision for Path A?
> - Vercel Postgres
> - Neon
> - Supabase
> - I'll provide a `DATABASE_URL` for an existing Postgres-compatible DB
>
> If unanswered, FORGE defaults to **Path B** (forward to email + Upstash Redis stash) and opens a 7-day repair ticket for Path A.

## Repair ticket

`artifacts/engineering/repair-tickets.jsonl` row:
```jsonc
{ "id": "waitlist-api-2026-04-29", "owner": "engineering", "severity": "high", "blocker": "no log access from this CLI session", "next_action": "operator runs `vercel logs --since 24h` and pastes; OR provides Vercel access", "fallback": "Path B implementation" }
```
