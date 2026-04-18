#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STACK_DIR="$(dirname "$SCRIPT_DIR")"
echo "🛑 Stopping OpenClaw Stack..."
docker compose --env-file "$STACK_DIR/.env" -f "$STACK_DIR/docker/docker-compose.yml" down
echo "✅ All services stopped"
