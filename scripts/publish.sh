#!/bin/bash

# Exit on error
set -e

echo "🚀 Publishing @future.ai packages..."

# Ensure we're on the main branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ] && [ "$BRANCH" != "master" ]; then
  echo "❌ You must be on main/master branch to publish. Current branch: $BRANCH"
  exit 1
fi

# Ensure working directory is clean
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ Working directory is not clean. Please commit or stash changes."
  exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Run tests
echo "🧪 Running tests..."
pnpm test

# Build all packages
echo "🔨 Building packages..."
pnpm run build

# Version and publish
echo "📝 Versioning and publishing..."
npx lerna publish --conventional-commits

echo "✅ Publishing complete!"