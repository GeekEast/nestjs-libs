# @future.ai NestJS Libraries Monorepo

A collection of high-quality, reusable NestJS libraries published under the @future.ai organization.

## 📦 Packages

| Package | Version | Description |
|---------|---------|-------------|
| [@future.ai/common](./packages/common) | 0.0.1 | Common utilities and decorators for NestJS applications |

## 🚀 Getting Started

### Prerequisites

- Node.js >= 16
- pnpm >= 8

### Installation

```bash
# Clone the repository
git clone https://github.com/future-ai/nestjs-libs.git
cd future-ai-libs

# Install dependencies
pnpm install

# Bootstrap packages
pnpm run bootstrap
```

### Development

```bash
# Build all packages
pnpm run build

# Run tests
pnpm test

# Lint code
pnpm run lint

# Format code
pnpm run format
```

## 📝 Creating a New Package

Use the provided script to create a new package:

```bash
./scripts/create-package.sh my-new-package
```

This will create a new package with:
- TypeScript configuration
- Jest testing setup
- Build scripts
- Package.json configured for @future.ai organization

## 🔨 Building

To build all packages:

```bash
pnpm run build
```

To build a specific package:

```bash
cd packages/common
pnpm run build
```

## 🧪 Testing

Run all tests:

```bash
pnpm test
```

Run tests for a specific package:

```bash
cd packages/common
pnpm test
```

## 📤 Publishing

Before publishing, ensure you're logged into npm with access to the @future.ai organization:

```bash
pnpm login
```

To publish all changed packages:

```bash
./scripts/publish.sh
```

This script will:
1. Ensure you're on the main branch
2. Run tests
3. Build all packages
4. Use Lerna to version and publish packages

## 🏗️ Project Structure

```
future-ai-libs/
├── packages/              # All library packages
│   └── common/           # Common utilities package
│       ├── src/          # Source code
│       ├── test/         # Tests
│       └── package.json  # Package configuration
├── scripts/              # Build and utility scripts
├── lerna.json           # Lerna configuration
├── package.json         # Root package.json with workspaces
├── tsconfig.json        # Root TypeScript configuration
└── jest.config.js       # Root Jest configuration
```

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Write/update tests
4. Run `pnpm test` and `pnpm run lint`
5. Submit a pull request

## 📄 License

MIT © Future AI

## 🔗 Links

- [npm Organization](https://www.npmjs.com/org/future.ai)
- [Documentation](https://future.ai/docs)