#!/bin/bash
#
# uptime-monitor.sh — Free health-check pinger for outboundautonomy.com
#
# Usage:
#   ./scripts/uptime-monitor.sh                          # single run
#   */15 * * * * /Users/ryleebenson/Desktop/OPENCLAW/scripts/uptime-monitor.sh   # crontab entry
#
# Output: appends JSONL lines to /Users/ryleebenson/Desktop/OPENCLAW/data/uptime.json
#
# Endpoints checked:
#   1. /api/health   — general health (expect 200)
#   2. /api/audit    — audit endpoint (expect non-5xx, POST required so may be 405/400)

set -euo pipefail

BASE_URL="https://outboundautonomy.com"
LOG_FILE="/Users/ryleebenson/Desktop/OPENCLAW/data/uptime.json"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
EPOCH=$(date +%s)

mkdir -p "$(dirname "$LOG_FILE")"

# --- Helper: check a single endpoint ---
check_endpoint() {
  local path="$1"
  local method="${2:-GET}"
  local expect_status="${3:-200}"
  local start_ns
  start_ns=$(python3 -c 'import time; print(int(time.time() * 1_000_000_000))' 2>/dev/null || echo 0)

  local http_code response_body curl_exit
  if [ "$method" = "POST" ]; then
    response_body=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL$path" -H "Content-Type: application/json" -d '{}' --max-time 10 2>&1)
  else
    response_body=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$path" --max-time 10 2>&1)
  fi
  curl_exit=$?
  http_code="${response_body: -3}"
  # strip trailing newlines
  http_code=$(echo "$http_code" | tr -d '[:space:]')

  local end_ns
  end_ns=$(python3 -c 'import time; print(int(time.time() * 1_000_000_000))' 2>/dev/null || echo 0)
  local duration_ms=0
  if [ "$start_ns" != "0" ] && [ "$end_ns" != "0" ]; then
    duration_ms=$(( (end_ns - start_ns) / 1000000 ))
  fi

  local status="ok"
  if [ "$curl_exit" -ne 0 ]; then
    status="connection_error"
  elif [ "$http_code" -ge 500 ]; then
    status="server_error"
  elif [ "$method" = "GET" ] && [ "$http_code" != "$expect_status" ]; then
    status="unexpected_status"
  fi

  python3 -c "
import json, sys
record = {
    'ts': '$TIMESTAMP',
    'epoch': $EPOCH,
    'endpoint': '$path',
    'method': '$method',
    'http_code': $http_code if '${http_code}'.isdigit() else 0,
    'duration_ms': $duration_ms,
    'status': '$status',
    'curl_exit': $curl_exit
}
with open('$LOG_FILE', 'a') as f:
    f.write(json.dumps(record) + '\n')
"
}

# Check endpoints
check_endpoint "/api/health" "GET" "200"
# Audit needs POST — may return 405 or 400, both are acceptable (non-fatal)
check_endpoint "/api/audit" "POST" "200"  # we track the actual code, this is just the "expected" marker

echo "Uptime check complete at $TIMESTAMP"
