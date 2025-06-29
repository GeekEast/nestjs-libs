# @future.ai/config

Type-safe configuration management for NestJS applications.

## Features

- 🔒 **Type Safety**: Full TypeScript support with intelligent autocomplete
- 🏗️ **Flexible Registry**: Register configurations with custom keys and types
- 🔍 **Path-based Access**: Access nested configuration values using dot notation
- 🌍 **Global Module**: Optional global configuration service
- ⚡ **Performance**: Cached configuration values for fast access

## Installation

```bash
npm install @future.ai/config
# or
pnpm add @future.ai/config
# or
yarn add @future.ai/config
```

## Usage

### Basic Setup

```typescript
import { ConfigModule, defineConfig } from '@future.ai/config';

// Define your configurations
const appConfig = defineConfig('app', () => ({
  name: 'My App',
  port: 3000,
  version: '1.0.0'
}));

const databaseConfig = defineConfig('database', () => ({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  name: process.env.DB_NAME || 'myapp'
}));

// Register configurations
@Module({
  imports: [
    ConfigModule.forRoot({
      registry: {
        app: appConfig,
        database: databaseConfig
      },
      isGlobal: true // Optional, defaults to true
    })
  ]
})
export class AppModule {}
```

### Using Configuration Service

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@future.ai/config';

@Injectable()
export class SomeService {
  constructor(private configService: ConfigService) {}

  someMethod() {
    // Type-safe access to configuration
    const appName = this.configService.get('app').name;
    const dbHost = this.configService.get('database').host;
    
    // Path-based access
    const appPort = this.configService.get('app.port');
    const dbPort = this.configService.get('database.port');
  }
}
```

### Advanced Configuration Factory

```typescript
import { createConfig } from '@future.ai/config';

const advancedConfig = createConfig('advanced', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    ttl: 3600
  },
  features: {
    enableCache: process.env.ENABLE_CACHE === 'true',
    maxRetries: parseInt(process.env.MAX_RETRIES || '3')
  }
});
```

## API Reference

### ConfigModule

- `forRoot<TRegistry>(options: ConfigModuleOptions<TRegistry>): DynamicModule`

### ConfigService

- `get<K>(key: K): ConfigMap[K]` - Get configuration by key
- `get<P>(path: P): PathValue<ConfigMap, P>` - Get configuration by path

### Factory Functions

- `defineConfig<T>(key: string, factory: () => T): ConfigRegistryEntry<T>`
- `createConfig<T>(key: string, config: T): ConfigRegistryEntry<T>`

## License

MIT License - see LICENSE file for details. 