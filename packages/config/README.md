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

### Step 1: Create Config Registry (Critical for Type Safety!)

First, create a centralized config registry. The `CONFIG_REGISTRY` constant with `as const` is **essential** for proper TypeScript type inference:

```typescript
// src/common/config/index.ts
import { defineConfig } from '@future.ai/config';

export const BASE_CONFIG_ENTRY = defineConfig('base', () => ({
  PORT: process.env.PORT || "3000",
}));

export const POSTGRES_CONFIG_ENTRY = defineConfig('postgres', () => ({
  POSTGRES_HOST: process.env.DB_HOST,
  POSTGRES_PORT: parseInt(process.env.DB_PORT || "5432", 10),
  POSTGRES_USERNAME: process.env.DB_USERNAME,
  POSTGRES_PASSWORD: process.env.DB_PASSWORD,
  POSTGRES_DATABASE: process.env.DB_NAME,
}));

// ⚠️ CRITICAL: The 'as const' is essential for proper type inference!
export const CONFIG_REGISTRY = {
  base: BASE_CONFIG_ENTRY,
  postgres: POSTGRES_CONFIG_ENTRY,
} as const;
```

### Step 2: Register in App Module

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@future.ai/config';
import { CONFIG_REGISTRY } from './common/config';

@Module({
  imports: [
    ConfigModule.forRoot({ registry: CONFIG_REGISTRY })
  ]
})
export class AppModule {}
```

### Step 3: Use in Services with Full Type Safety

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@future.ai/config';
import { CONFIG_REGISTRY } from '../common/config';

@Injectable()
export class DatabaseService {
  constructor(
    private configService: ConfigService<typeof CONFIG_REGISTRY>
  ) {}

  async connect() {
    // ✅ Fully type-safe access to configuration
    const dbConfig = this.configService.get('postgres');
    const host = dbConfig.POSTGRES_HOST;     // string | undefined
    const port = dbConfig.POSTGRES_PORT;     // number
    
    // ✅ Path-based access with type safety
    const dbHost = this.configService.get('postgres.POSTGRES_HOST');
    const basePort = this.configService.get('base.PORT');
    
    // TypeScript will catch errors at compile time!
    // const invalid = this.configService.get('nonexistent'); // ❌ Error!
  }
}
```

## 🚨 Why CONFIG_REGISTRY and 'as const' are Critical

### The Problem Without Proper Type Registry

```typescript
// ❌ DON'T DO THIS - Loses type safety!
const badRegistry = {
  base: defineConfig('base', () => ({ PORT: "3000" })),
  postgres: defineConfig('postgres', () => ({ HOST: "localhost" }))
}; // Missing 'as const'

// ConfigService<typeof badRegistry> won't have proper type inference
// You'll lose autocomplete and type checking!
```

### The Solution: Centralized Registry with 'as const'

```typescript
// ✅ DO THIS - Perfect type safety!
export const CONFIG_REGISTRY = {
  base: BASE_CONFIG_ENTRY,
  postgres: POSTGRES_CONFIG_ENTRY,
} as const; // This makes TypeScript preserve exact literal types
```

### Benefits of This Pattern

1. **🔒 Complete Type Safety**: TypeScript knows exactly what keys and values exist
2. **🎯 Intellisense**: Full autocomplete in your IDE
3. **🛡️ Compile-time Errors**: Catch typos and invalid access patterns before runtime
4. **📚 Self-documenting**: The registry serves as documentation of all available configs
5. **🧪 Testable**: Easy to mock and test configuration values

### Type Safety in Action

```typescript
// With proper CONFIG_REGISTRY setup:
const service = new ConfigService<typeof CONFIG_REGISTRY>();

// ✅ These work with full type checking:
service.get('postgres')                    // Type: { POSTGRES_HOST: string | undefined, ... }
service.get('postgres.POSTGRES_HOST')      // Type: string | undefined
service.get('base.PORT')                   // Type: string

// ❌ These cause compile-time errors:
service.get('nonexistent')                 // Error: Argument of type 'nonexistent' is not assignable
service.get('postgres.WRONG_FIELD')        // Error: Property 'WRONG_FIELD' does not exist
```

## 🏆 Best Practices

### 1. Always Use a Central Registry File

```typescript
// src/common/config/index.ts - Single source of truth
export const CONFIG_REGISTRY = {
  // All your configs here
} as const;
```

### 2. Type Your ConfigService

```typescript
// Always import and type your ConfigService
import { CONFIG_REGISTRY } from '../common/config';

constructor(
  private configService: ConfigService<typeof CONFIG_REGISTRY>
) {}
```

### 3. Use Environment Variables with Defaults

```typescript
export const API_CONFIG_ENTRY = defineConfig('api', () => ({
  port: parseInt(process.env.API_PORT || '3000'),
  host: process.env.API_HOST || 'localhost',
  timeout: parseInt(process.env.API_TIMEOUT || '5000'),
}));
```

### 4. Group Related Configurations

```typescript
export const DATABASE_CONFIG_ENTRY = defineConfig('database', () => ({
  // All database-related configs together
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  // ... other db configs
}));
```

## License

MIT License - see LICENSE file for details. 