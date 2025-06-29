# @future.ai NestJS Libraries Monorepo

A collection of high-quality, reusable NestJS libraries published under the @future.ai organization. Currently focused on type-safe configuration management for enterprise NestJS applications.

## 📦 Packages

| Package | Version | Description |
|---------|---------|-------------|
| [@future.ai/config](./packages/config) | 0.2.1 | Type-safe configuration management for NestJS applications |

## ✨ @future.ai/config Features

Our flagship package provides enterprise-grade configuration management:

- 🔒 **Complete Type Safety**: Full TypeScript support with intelligent autocomplete
- 🏗️ **Flexible Registry**: Register configurations with custom keys and types  
- 🔍 **Path-based Access**: Access nested configuration values using dot notation
- 🌍 **Global Module**: Optional global configuration service
- ⚡ **High Performance**: Cached configuration values for fast access
- 🧪 **Testable**: Easy to mock and test configuration values

### Quick Example

```typescript
// Define your configurations
export const CONFIG_REGISTRY = {
  base: defineConfig('base', () => ({
    PORT: process.env.PORT || "3000",
  })),
  database: defineConfig('database', () => ({
    HOST: process.env.DB_HOST,
    PORT: parseInt(process.env.DB_PORT || "5432"),
  }))
} as const;

// Register in your app
@Module({
  imports: [ConfigModule.forRoot({ registry: CONFIG_REGISTRY })]
})
export class AppModule {}

// Use with full type safety
@Injectable()
export class DatabaseService {
  constructor(
    private configService: ConfigService<typeof CONFIG_REGISTRY>
  ) {}

  connect() {
    const host = this.configService.get('database.HOST'); // ✅ Type-safe!
    const port = this.configService.get('database.PORT'); // ✅ Autocomplete works!
  }
}
```

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

## 📦 Installing @future.ai/config

```bash
npm install @future.ai/config
# or
pnpm add @future.ai/config
# or  
yarn add @future.ai/config
```

See the [full documentation](./packages/config/README.md) for complete setup and usage instructions.

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
cd packages/config
pnpm run build
```

## 🧪 Testing

Run all tests:

```bash
pnpm test
```

Run tests for a specific package:

```bash
cd packages/config
pnpm test
```

## 📤 Publishing

Before publishing, ensure you're logged into npm with access to the @future.ai organization:

```bash
pnpm login
```

To publish all changed packages:

```bash
pnpm run publish:all
```

This will automatically:
1. Detect changed packages since last release
2. Generate version numbers based on conventional commits
3. Build packages
4. Publish to npm
5. Create git tags
6. No manual confirmation required (fully automated)

## 🏗️ Project Structure

```
future-ai-libs/
├── packages/              # All library packages
│   └── config/           # Type-safe configuration management
│       ├── src/          # Source code
│       │   ├── config.module.ts     # NestJS dynamic module
│       │   ├── config.service.ts    # Configuration service
│       │   ├── config.factory.ts    # Factory functions
│       │   ├── config.type.ts       # TypeScript types
│       │   └── index.ts             # Exports
│       ├── test/         # Comprehensive tests
│       └── package.json  # Package configuration
├── scripts/              # Build and utility scripts
├── lerna.json           # Lerna configuration (fully automated)
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