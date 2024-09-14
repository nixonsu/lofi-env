#!/usr/bin/env bash
set -euo pipefail

LOCAL_IMAGE_NAME="lofi-env"
IMAGE_SUFFIX=$(git rev-parse --short HEAD)
REGISTRY_NAME=$USERNAME

echo "Logging in to DockerHub..."
docker login --username "$USERNAME" --password "$PASSWORD"

echo "Pulling image from DockerHub..."
docker pull "$REGISTRY_NAME/$LOCAL_IMAGE_NAME:$IMAGE_SUFFIX"

echo "Logging out from DockerHub..."
docker logout

echo "Deploying to fly.io..."
flyctl secrets set \
       DB_URI="$DB_URI" \
       PORT="$PORT" \
       JWT_SECRET="$JWT_SECRET" \
       ENV="$ENV" \
       -a "lofi-env"
flyctl deploy --config "./ops/deployment/fly.toml" -a "lofi-env" --image "$REGISTRY_NAME/$LOCAL_IMAGE_NAME:$IMAGE_SUFFIX" --remote-only
