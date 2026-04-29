# Postmortem — mission-runtime-autonomy-repair-proof

## What worked

- Sub-agent spawn from NEXUS via `sessions_spawn` was clean (0 failures across 2 children, then a third for SENTINEL audit).
- DeepSeek (v4-pro for NEXUS+FORGE, v4-flash for BRIDGE+SENTINEL) handled tool-using turns including `exec`, `write`, `read`, `process` with no provider schema rejections.
- The `bootstrap-extra-files` hook delivered `MISSION.md` + `POLICY.md` + `MISSION_FRAMEWORK.md` into each child's session as designed.
- SENTINEL produced a real verdict (one approved, one blocked) — not rubber-stamped.
- Score events landed in `_shared/scoring/history.jsonl` with proper attribution.
- RUNTIME_FREEZE held: zero send attempts even though BRIDGE explicitly inspected the SMTP path and saw the credential failure.

## What needed correction mid-run

- NEXUS's session cwd is the orchestrator workspace (`workspaces/orchestrator/`), not the repo root. Children inherit their own workspace cwd. Outputs landed under `workspaces/<agent>/artifacts/missions/...` and had to be consolidated into the canonical `artifacts/missions/...` folder by hand. **Fix in next iteration:** instructions to NEXUS should use absolute repo paths, OR NEXUS should be taught to copy outputs into the canonical folder as its final step.
- BRIDGE hit a transient `sqlite3 database is locked` on its first read. It retried and succeeded automatically. Acceptable; consider WAL mode on `data/crm.sqlite`.
- NEXUS's first turn ended after `sessions_yield` without spawning SENTINEL — SENTINEL was spawned in a follow-up CLI call. **Fix:** AUTONOMY_LOOP.md should explicitly require NEXUS to chain SENTINEL after children return in a single mission run.

## What was discovered

- 47 `provider_accepted` rows (not 2 as the prior session checkpoint stated) — outbound has been more active than I had recorded.
- The Gmail App Password is dead (`535 BadCredentials`). Until rotated, all SMTP is blocked at the credential layer in addition to the freeze.
- The 7 `unverified_claim` rows are a clean, batch-imported set with identical timestamps and no provider IDs — they can be dropped or reclassified safely.

## What stays unproven

- Multi-spawn under contention (>3 children at once with overlapping IO). The proof mission only fired 2 in parallel + 1 sequential.
- Fallback ladder behavior under a live model failure. Today the models all succeeded; the ladder code path was not exercised in the wild.

## Score adjustments applied
- engineering +0.2 execution_reliability (forge slice complete with evidence)
- outreach +0.2 evidence_quality (bridge ledger reconciliation)
- (no penalty applied for FORGE's "blocked" verdict — the verdict was about completeness of remediation note, not execution)
