import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService, ConfigModule, defineConfig } from '../src';

describe('ConfigService', () => {
  let service: ConfigService;

  // Following the CONFIG_REGISTRY pattern for better type safety
  const BASE_CONFIG_ENTRY = defineConfig('base', () => ({
    PORT: '3000',
    APP_NAME: 'Test App'
  }));

  const DATABASE_CONFIG_ENTRY = defineConfig('database', () => ({
    DB_HOST: 'localhost',
    DB_PORT: 5432,
    DB_NAME: 'test_db'
  }));

  const AUTH_CONFIG_ENTRY = defineConfig('auth', () => ({
    JWT_SECRET: 'test-secret',
    JWT_EXPIRES_IN: '1h'
  }));

  // ⚠️ CRITICAL: Using 'as const' for proper type inference
  const CONFIG_REGISTRY = {
    base: BASE_CONFIG_ENTRY,
    database: DATABASE_CONFIG_ENTRY,
    auth: AUTH_CONFIG_ENTRY
  } as const;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          registry: CONFIG_REGISTRY
        })
      ]
    }).compile();

    service = module.get<ConfigService<typeof CONFIG_REGISTRY>>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get configuration by key', () => {
    const baseConf = service.get('base');
    expect(baseConf.PORT).toBe('3000');
    expect(baseConf.APP_NAME).toBe('Test App');

    const dbConf = service.get('database');
    expect(dbConf.DB_HOST).toBe('localhost');
    expect(dbConf.DB_PORT).toBe(5432);
  });

  it('should get configuration by path', () => {
    const appName = service.get('base.APP_NAME');
    const dbHost = service.get('database.DB_HOST');
    const dbPort = service.get('database.DB_PORT');
    const jwtSecret = service.get('auth.JWT_SECRET');

    expect(appName).toBe('Test App');
    expect(dbHost).toBe('localhost');
    expect(dbPort).toBe(5432);
    expect(jwtSecret).toBe('test-secret');
  });

  it('should throw error for unknown config key', () => {
    expect(() => service.get('unknown' as any)).toThrow('Unknown config key: unknown');
  });

  it('should provide type safety with CONFIG_REGISTRY pattern', () => {
    // This test demonstrates type safety - these would fail at compile time with proper typing
    const baseConfig = service.get('base');
    expect(typeof baseConfig.PORT).toBe('string');
    expect(typeof baseConfig.APP_NAME).toBe('string');

    const dbConfig = service.get('database');
    expect(typeof dbConfig.DB_HOST).toBe('string');
    expect(typeof dbConfig.DB_PORT).toBe('number');
  });
}); 