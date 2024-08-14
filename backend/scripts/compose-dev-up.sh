#!/bin/sh

# DOCKER_BUILDKIT=1
BUILDKIT_PROGRESS=plain \
docker-compose --env-file .env \
-p sales-analytics-dashboard-dev-stack \
-f docker-compose.yml \
up --build -d 