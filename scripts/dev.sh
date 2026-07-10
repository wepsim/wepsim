#!/bin/bash
set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

cleanup() {
    echo ""
    echo "Shutting down..."
    kill $NODEMON_PID $HTTP_PID 2>/dev/null
    exit 0
}
trap cleanup SIGINT SIGTERM

echo ""
echo "==> Starting Python HTTP server on :8000 (ws_dist/)..."
cd "$ROOT_DIR"
python3 -m http.server 8000 &
HTTP_PID=$!

echo "==> Starting nodemon (watching src dirs)..."
cd "$ROOT_DIR"
nodemon \
    --verbose \
    --watch sim_core \
    --watch sim_hw \
    --watch sim_sw \
    --watch wepsim_core \
    --watch wepsim_web \
    --watch wepsim_i18n \
    --watch wepsim_nodejs \
    --watch external \
    --ignore ts_out \
    --ext js,ts,json,html,css \
    --exec "bash devel/mk_dist_parallel.sh" &
NODEMON_PID=$!

echo ""
echo "Press Ctrl+C to stop."
echo ""

wait $NODEMON_PID
