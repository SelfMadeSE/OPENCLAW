#!/usr/bin/env bash
# OPENCLAW Log Rotation and Pruning
# Retains last 30 days of JSONL event logs and last 10 run summaries.
# Safe to run daily via cron or manually.

set -euo pipefail
LOGS_DIR="$(cd "$(dirname "$0")/.." && pwd)/logs"
ARTIFACTS_DIR="$(cd "$(dirname "$0")/.." && pwd)/artifacts/runs"

echo "=== Log Rotation ==="

# Rotate JSONL files older than 30 days
if [ -d "$LOGS_DIR" ]; then
  find "$LOGS_DIR" -name "*.jsonl" -mtime +30 -print -delete 2>/dev/null || true
  echo "Pruned JSONL files older than 30 days"
  
  # Show current sizes
  echo "Current log sizes:"
  du -sh "$LOGS_DIR"/*.jsonl 2>/dev/null || echo "  (no logs yet)"
fi

# Prune old run summaries (keep last 50)
if [ -d "$ARTIFACTS_DIR" ]; then
  SUMMARY_COUNT=$(find "$ARTIFACTS_DIR" -name "summary-*.json" | wc -l | tr -d ' ')
  if [ "$SUMMARY_COUNT" -gt 50 ]; then
    PRUNE_COUNT=$((SUMMARY_COUNT - 50))
    find "$ARTIFACTS_DIR" -name "summary-*.json" -print0 | \
      sort -z | head -z -n "$PRUNE_COUNT" | xargs -0 rm -f
    echo "Pruned $PRUNE_COUNT old summaries (kept 50)"
  else
    echo "Summaries: $SUMMARY_COUNT (under 50 limit)"
  fi
fi

echo "Done."
