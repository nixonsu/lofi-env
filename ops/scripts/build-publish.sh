#!/usr/bin/env bash
set -euo pipefail

LOCAL_IMAGE_NAME="lofi-env"
IMAGE_SUFFIX=$(git rev-parse --short HEAD)
REGISTRY_NAME=$USERNAME

echo "Logging in to DockerHub..."
docker login --username "$USERNAME" --password "$PASSWORD"

echo "Building docker image..."
docker build -t "$REGISTRY_NAME/$LOCAL_IMAGE_NAME:$IMAGE_SUFFIX" .

echo "Pushing image to DockerHub..."
docker push "$REGISTRY_NAME/$LOCAL_IMAGE_NAME:$IMAGE_SUFFIX"

echo "Logging out from DockerHub..."
docker logout
