#!/usr/bin/env bash

set -e

# Always run paths relative to this script's location
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

CLIENT_PID=""
SERVER_PID=""

cleanup() {
  echo ""
  echo "Stopping BuggyBoard..."

  if [ -n "$CLIENT_PID" ]; then
    kill "$CLIENT_PID" 2>/dev/null || true
  fi

  if [ -n "$SERVER_PID" ]; then
    kill "$SERVER_PID" 2>/dev/null || true
  fi

  exit 0
}

trap cleanup INT TERM

# Optional CLI argument
if [ "${1:-}" = "res_db" ]; then
  cp "$ROOT_DIR/server/db.seed.json" "$ROOT_DIR/server/db.json"
  echo "Database reset from db.seed.json"
elif [ -n "${1:-}" ]; then
  echo "Unknown argument: $1"
  echo "Usage: ./start_sc.sh [res_db]"
  exit 1
fi

# Start client
cd "$ROOT_DIR/client"
npm run dev &
CLIENT_PID=$!

# Start server
cd "$ROOT_DIR/server"
npm run dev &
SERVER_PID=$!

wait "$CLIENT_PID" "$SERVER_PID"