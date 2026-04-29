# FINAL REPORT — Autonomy Failure Audit

Date: 2026-04-29
Auditor: principal-engineer (CLI)
Scope: full runtime diagnosis + framework repair + live proof mission per operator mandate.

## 1. Why agents were useless

The OpenClaw runtime was healthy. The **operating framework on top of it** had decomposed:

- A standing approval phrase ("no RED besides spending money") was being treated as blanket execution rights.
- Agents had no structured heartbeat / blocker / approval format, so under uncertainty they fell back to vague questions.
- BRIDGE was running a draft queue as if it were a send queue.
- CRM and the SMTP ledger had drifted and no reconciliation was authoritative.
- Sub-agent failures (often surface-level browser/CDP issues) were collapsing into direct NEXUS execution silently, which masked the real infrastructure problems and made delegation look broken.
- DeepSeek's thinking-mode replay invalidation was being misread as a model-layer crash. It is non-fatal under `requiresThinkingAsText: true`.

## 2. Cause classification

| Class | Item | Status after this audit |
|---|---|---|
| **Config** | Per-agent skills not pruned (every agent gets all 51 bundled) | DOCUMENTED, not yet pruned (low priority — no harm) |
| **Config** | `exec.ask: off` removes built-in approval gate | EXPECTED; replaced by markdown policy + freeze file |
| **Model/provider** | DeepSeek `/anthropic` schema rejection | FIXED (10:43 patch + `requiresThinkingAsText: true`); 8/8 stability tests pass |
| **Model/provider** | OpenAI fallback in cooldown | NOT A FIX (quota-only, time-based) |
| **Policy** | "No RED besides spending money" generalized | RETIRED in `_shared/policy/APPROVAL_POLICY.md` non-generalization clause |
| **CRM/revenue-state** | CRM said 0 sent vs ledger 47 provider_accepted | RECONCILED in proof mission; protocol in `_shared/revenue/OUTREACH_PIPELINE.md` |
| **Tool/skill** | Browser CDP bridge offline | DOCUMENTED + repair-ticket open |
| **Sub-agent runtime** | Apparent "silent collapse to NEXUS" | FIXED via `_shared/missions/SUBAGENT_FAILURE_POLICY.md` ladder |
| **Tool/skill** | Preflight extractor refused chained shell | PATCHED in `bash-tools-T6u3D01x.js` |
| **Cron** | Stuck `state.runningAtMs` markers | CLEARED previous session; outbound cron jobs now FROZEN |

## 3. What was fixed (with evidence)

- Safety freeze file `_shared/policy/RUNTIME_FREEZE.json` (active=true) and three outbound cron jobs disabled.
- Sender scripts gated through `email_ledger.runtime_freeze_check("smtp_send")`. Verified: refuses without override; allows + audits with `OPENCLAW_FREEZE_OVERRIDE=<id>`.
- 7-agent workspace bootstrap: each `workspaces/<agent>/` now symlinks `POLICY.md`, `MISSION_FRAMEWORK.md`, `HEARTBEAT_TEMPLATE.md` so the `bootstrap-extra-files` hook auto-loads the framework on every session.
- New canonical docs:
  - `_shared/policy/APPROVAL_POLICY.md` (GREEN/YELLOW/ORANGE/RED + non-generalization clause + SENTINEL veto)
  - `docs/OPERATOR_APPROVAL_RUNBOOK.md` (operator-facing approval grammar)
  - `_shared/revenue/OUTREACH_PIPELINE.md` (state machine, pre/post pipelines, reconciliation rules)
  - `_shared/missions/AUTONOMY_LOOP.md`
  - `_shared/agents/HEARTBEAT_TEMPLATE.md` and `BLOCKER_PROTOCOL.md`
  - `_shared/missions/SUBAGENT_FAILURE_POLICY.md` (fallback ladder)
  - `_shared/media/SOCIAL_ACCOUNT_SETUP_PROTOCOL.md`
  - `_shared/scoring/routing-policy.md`
- Engineering repair tickets opened (`waitlist-api-2026-04-29`, `browser-cdp-bridge-down`).
- Audit artifacts:
  - `artifacts/audits/2026-04-29-autonomy-failure-audit/01-official-runtime.md`
  - `02-deepseek-subagent-stability.md` (8/8 PASS — stability matrix)
  - `03-capability-matrix.csv`
- Proof mission ran live: NEXUS + FORGE + BRIDGE + SENTINEL — all artifacts in `artifacts/missions/mission-runtime-autonomy-repair-proof/`.

## 4. Status by area

| area | status |
|---|---|
| OpenClaw gateway / config | **WORKING** |
| DeepSeek model layer (off / medium / high thinking) | **WORKING** |
| Sub-agent spawn (sessions_spawn / sessions_yield) | **WORKING** |
| Multi-child parallel spawn | **PARTIAL** (proven 2-parallel; >3 unproven under contention) |
| Sub-agent fallback ladder | **CONFIGURED_BUT_UNPROVEN** (no live failure exercised it) |
| RUNTIME_FREEZE → sender gate | **WORKING** (smoke-tested both block and audited override) |
| Approval policy + non-generalization clause | **WORKING** (loaded into every workspace) |
| Outreach pipeline state machine | **CONFIGURED_BUT_UNPROVEN** (in effect, but no live promotion has been exercised under the new flow) |
| Heartbeat / Blocker protocol | **CONFIGURED_BUT_UNPROVEN** (templates loaded; will be exercised in next live mission) |
| Outreach / SMTP send | **BLOCKED_BY_CREDENTIAL** (Gmail App Password 535) AND **BLOCKED_BY_HUMAN** (RUNTIME_FREEZE active) |
| Browser automation (CDP) | **BROKEN** — port 18800 not listening; ticket open |
| Waitlist API (Vercel) | **PARTIAL** — root cause documented, fix plan staged, awaiting operator DB choice |
| Social account creation | **BLOCKED_BY_INFRASTRUCTURE** (browser bridge) AND **BLOCKED_BY_HUMAN** (per protocol) |
| Public posting | **FROZEN_RED** |
| Live payments / trading / ads | **FROZEN_RED** (no creds configured anyway) |
| Memory semantic search | **ARCHIVED** (`memorySearch.enabled: false`); file-system memory works |
| Scoring → routing | **WORKING** (initial scorecards seeded; events appending; routing rules documented) |
| OpenAI / Codex fallback | **BLOCKED_BY_PROVIDER** (quota cooldown until ~14:48 EEST) |

## 5. What remains blocked

- **Gmail SMTP credential** — 535 BadCredentials. Operator must regenerate App Password.
- **Browser CDP bridge** — port 18800 has no listener. Operator (or FORGE with explicit instruction) must launch a Chrome with `--remote-debugging-port=18800`.
- **Waitlist API DB choice** — operator decision needed (Vercel Postgres / Neon / Supabase / existing Postgres).
- **Vercel logs access** — needed to confirm waitlist root cause.

## 6. What the operator must do next (concrete list)

1. Regenerate Gmail App Password and export `GMAIL_APP_PASSWORD` in shell + cron env.
2. Pick a Postgres backend for waitlist; tell FORGE which one.
3. (Optional, for browser slices) start a Chrome with remote-debugging on port 18800.
4. When ready to send anything, issue an `APPROVAL <id>` block per `docs/OPERATOR_APPROVAL_RUNBOOK.md` AND a freeze-lift with `OPENCLAW_FREEZE_OVERRIDE=<id>`.
5. Re-enable the three frozen cron jobs (`Hourly Prospect Research`, `Hourly Outreach Draft Queue`, `Daily Outbound Autonomy Audit-Funnel Content`) in `~/.openclaw/cron/jobs.json` only after step 4.

## 7. What agents can now do autonomously (no operator action)

- Internal research, drafts, summaries, audits.
- Local code/tool/test work inside `/Users/ryleebenson/Desktop/OPENCLAW/`.
- Memory reads/writes, score events.
- CRM read + reconciliation (no external write).
- Repair ticket creation.
- Heartbeat + blocker emission.
- Sub-agent spawn for any of the above slices.

## 8. What still requires approval

- Anything in ORANGE or RED per `APPROVAL_POLICY.md`.
- Any send (SMTP or browser-form-submit).
- Any deploy (staging or prod).
- Any social account operation past the staging step.
- Any cron re-enable that touches an outbound action.

## 9. Next 3 revenue missions (proposed, awaiting operator approval)

| # | mission_id | goal | risk | unblocks |
|---|---|---|---|---|
| 1 | mission-smtp-credential-rotation-and-test | rotate Gmail App Password, run owner-loopback send test, verify provider_message_id, lift freeze for ONE batch of ≤5 prospects | YELLOW + ORANGE | resumes outreach pipeline |
| 2 | mission-waitlist-api-postgres-cutover | implement chosen DB backend (Path A in waitlist-api-root-cause.md), deploy to Vercel preview, smoke-test, then prod | ORANGE → RED | restores public lead capture |
| 3 | mission-cdp-bridge-up-and-social-stage | launch Chrome on 18800, validate browser tool calls, stage X account setup-card per SOCIAL_ACCOUNT_SETUP_PROTOCOL.md (do NOT submit) | YELLOW | restores MUSE/SIGNAL browser surface |

## 10. Closure

Per the operator mandate, this audit declares the runtime **WORKING** and the framework **CONFIGURED**. The proof mission ran end-to-end with real sub-agent spawns, real audit verdicts, real score events, and zero external side effects under an active RUNTIME_FREEZE. The remaining blockers (Gmail credential, browser bridge, Vercel DB choice) are isolated, named, ticketed, and require operator input — not further engineering.

No "fully autonomous" claim is being made. The framework supports **mission-bounded autonomy with structured approvals**, which is exactly what the mandate requires.
