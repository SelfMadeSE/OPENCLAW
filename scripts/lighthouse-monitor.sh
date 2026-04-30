#!/bin/bash
#
# lighthouse-monitor.sh — Daily Lighthouse audit runner for outboundautonomy.com
#
# Usage:
#   ./scripts/lighthouse-monitor.sh                          # single run
#   0 8 * * * /Users/ryleebenson/Desktop/OPENCLAW/scripts/lighthouse-monitor.sh   # crontab: daily 8am
#
# Output: appends JSON record to /Users/ryleebenson/Desktop/OPENCLAW/data/lighthouse-report.jsonl
# Also writes dated summary to /Users/ryleebenson/Desktop/OPENCLAW/data/lighthouse/

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
AUDIT_SCRIPT="$REPO_DIR/scripts/lighthouse-audit.py"
URL="${1:-https://outboundautonomy.com}"
LOG_FILE="$REPO_DIR/data/lighthouse-report.jsonl"
SUMMARY_DIR="$REPO_DIR/data/lighthouse"

mkdir -p "$SUMMARY_DIR"

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
DATE_PART=$(date +"%Y-%m-%d")

echo "Running Lighthouse audit for $URL..."

RESULT=$(python3 "$AUDIT_SCRIPT" "$URL" 2>&1)
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
  echo "{\"ts\": \"$TIMESTAMP\", \"error\": \"Lighthouse failed\", \"detail\": $(echo "$RESULT" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read().strip()[:500]))')}" >> "$LOG_FILE"
  echo "Lighthouse audit FAILED for $URL"
  exit 1
fi

# Append to JSONL log
python3 -c "
import json, sys
result = json.loads(sys.stdin.read())
record = {
    'ts': '$TIMESTAMP',
    'date': '$DATE_PART',
    'url': result.get('url', '$URL'),
    'scores': result.get('scores', {}),
    'topIssueCount': len(result.get('topIssues', [])),
    'fetchTime': result.get('fetchTime', '')
}
with open('$LOG_FILE', 'a') as f:
    f.write(json.dumps(record) + '\n')
print(json.dumps(record, indent=2))
" <<< "$RESULT"

# Write dated summary
echo "$RESULT" > "$SUMMARY_DIR/lighthouse-$DATE_PART.json"

echo "Lighthouse audit complete for $URL at $TIMESTAMP"
