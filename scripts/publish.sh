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

# Note: We don't check for clean working directory here because
# lerna publish will handle versioning and committing automatically

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