#!/bin/sh
set -e

echo "[entrypoint] applying database migrations..."
cd /app/backend && alembic upgrade head

echo "[entrypoint] starting: $*"
cd /app && exec "$@"
