# Social Memory — Trust & Reputation Schema

Captures inter-agent performance history so delegation improves over time.

## Files
- `edges.jsonl` — append-only trust signals
  - `{ts, from_agent, to_agent, event, weight, mission_id?, notes?}`
  - `event`: `delegated_success`, `delegated_failure`, `audit_pass`, `audit_flag`, `message_useful`, `message_ignored`, `collab_win`, `collab_loss`
- `reputation.json` — aggregate per-agent reputation vector (rebuilt nightly)
- `trust_matrix.json` — pairwise trust `from_agent → to_agent` scalar in [-1, 1]

## Usage
- Orchestrator reads `trust_matrix.json` before delegation
- Auditor writes `delegated_failure` / `audit_flag` events
- Agents may self-report `collab_win` after sub-agent returns useful work

## Anti-gaming
- Only Auditor can write `audit_pass` / `audit_flag`
- Self-reports decay faster than Auditor-written events
- Orchestrator cannot write trust about itself
