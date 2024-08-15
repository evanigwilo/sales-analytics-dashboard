#!/bin/sh

docker-compose --env-file .env \
-p sales-analytics-dashboard-dev-stack \
-f docker-compose.dev.yml 
down -v --remove-orphans
