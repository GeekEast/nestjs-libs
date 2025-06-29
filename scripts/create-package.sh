#!/bin/bash

# Exit on error
set -e

# Check if package name is provided
if [ -z "$1" ]; then
  echo "❌ Please provide a package name"
  echo "Usage: ./scripts/create-package.sh <package-name>"
  exit 1
fi

PACKAGE_NAME=$1
PACKAGE_DIR="packages/$PACKAGE_NAME"

# Check if package already exists
if [ -d "$PACKAGE_DIR" ]; then
  echo "❌ Package $PACKAGE_NAME already exists"
  exit 1
fi

echo "📦 Creating new package: @future.ai/$PACKAGE_NAME"

# Create package directory structure
mkdir -p "$PACKAGE_DIR/src"
mkdir -p "$PACKAGE_DIR/test"

# Create package.json
cat > "$PACKAGE_DIR/package.json" << EOF
{
  "name": "@future.ai/$PACKAGE_NAME",
  "version": "0.0.1",
  "description": "$PACKAGE_NAME library for NestJS applications",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "rimraf dist && tsc -p tsconfig.build.json",
    "test": "jest",
    "lint": "eslint \"{src,test}/**/*.ts\" --fix",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "prepublishOnly": "npm run build"
  },
  "keywords": [
    "nestjs",
    "$PACKAGE_NAME"
  ],
  "author": "Future AI",
  "license": "MIT",
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/future-ai/nestjs-libs.git",
    "directory": "packages/$PACKAGE_NAME"
  },
  "peerDependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.0.0"
  },
  "devDependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1"
  }
}
EOF

# Create tsconfig.json
cat > "$PACKAGE_DIR/tsconfig.json" << EOF
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test", "**/*spec.ts"]
}
EOF

# Create tsconfig.build.json
cat > "$PACKAGE_DIR/tsconfig.build.json" << EOF
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "**/*spec.ts"]
}
EOF

# Create jest.config.js
cat > "$PACKAGE_DIR/jest.config.js" << EOF
module.exports = {
  displayName: '@future.ai/$PACKAGE_NAME',
  preset: '../../jest.config.js',
  rootDir: '.',
  testMatch: ['<rootDir>/test/**/*.spec.ts'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/index.ts',
  ],
};
EOF

# Create index.ts
cat > "$PACKAGE_DIR/src/index.ts" << EOF
// Export your modules here
EOF

# Create README.md
cat > "$PACKAGE_DIR/README.md" << EOF
# @future.ai/$PACKAGE_NAME

$PACKAGE_NAME library for NestJS applications.

## Installation

\`\`\`bash
npm install @future.ai/$PACKAGE_NAME
\`\`\`

## Usage

\`\`\`typescript
import { /* your exports */ } from '@future.ai/$PACKAGE_NAME';
\`\`\`

## License

MIT
EOF

echo "✅ Package @future.ai/$PACKAGE_NAME created successfully!"
echo "📝 Next steps:"
echo "  1. Implement your library code in $PACKAGE_DIR/src"
echo "  2. Add tests in $PACKAGE_DIR/test"
echo "  3. Run 'npm install' to install dependencies"
echo "  4. Run 'npm run build' to build the package"