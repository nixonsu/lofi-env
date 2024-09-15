#!/usr/bin/env bash
set -euo pipefail

echo "Installing dependencies..."

yarn install:all

echo "Running Backend tests..."

cd backend && yarn test

echo "Running Frontend tests..."

cd ../frontend && yarn test --watchAll=false --passWithNoTests
