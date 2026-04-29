#!/usr/bin/env bash
# Manage the OpenClaw Autonomy Daemon
# Usage: bash scripts/autonomy.sh {status|tail|stop|restart|missions}
set -euo pipefail
cd "$(dirname "$0")/.."
PID_FILE="artifacts/autonomy-daemon.pid"
HB="artifacts/autonomy-daemon.heartbeat.json"
LOG="artifacts/autonomy-daemon.log"

cmd="${1:-status}"
case "$cmd" in
  status)
    if [[ -f "$PID_FILE" ]] && ps -p "$(cat $PID_FILE)" >/dev/null 2>&1; then
      echo "RUNNING pid=$(cat $PID_FILE)"
      [[ -f "$HB" ]] && cat "$HB"
    else
      echo "STOPPED"
    fi
    ;;
  tail)
    tail -f "$LOG"
    ;;
  stop)
    if [[ -f "$PID_FILE" ]]; then
      PID=$(cat $PID_FILE)
      kill "$PID" 2>/dev/null && echo "sent TERM to $PID" || echo "no process $PID"
      rm -f "$PID_FILE"
    fi
    ;;
  restart)
    bash "$0" stop || true
    sleep 2
    nohup env OPENCLAW_CYCLE_SLEEP=300 OPENCLAW_MISSION_TIMEOUT=900 \
      python3 scripts/autonomy_daemon.py > artifacts/autonomy-daemon.stdout.log 2>&1 &
    PID=$!
    disown $PID 2>/dev/null || true
    echo "$PID" > "$PID_FILE"
    echo "started pid=$PID"
    ;;
  missions)
    ls -t artifacts/missions/ | head -10
    ;;
  *)
    echo "Usage: $0 {status|tail|stop|restart|missions}"; exit 2 ;;
esac
