import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService, ConfigModule, defineConfig } from '../src';

describe('ConfigService', () => {
  let service: ConfigService;

  const appConfig = defineConfig('app', () => ({
    name: 'Test App',
    port: 3000,
    database: {
      host: 'localhost',
      port: 5432
    }
  }));

  const authConfig = defineConfig('auth', () => ({
    secret: 'test-secret',
    expiresIn: '1h'
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          registry: {
            app: appConfig,
            auth: authConfig
          }
        })
      ]
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get configuration by key', () => {
    const appConf = service.get('app');
    expect(appConf.name).toBe('Test App');
    expect(appConf.port).toBe(3000);
  });

  it('should get configuration by path', () => {
    const appName = service.get('app.name');
    const dbHost = service.get('app.database.host');
    const dbPort = service.get('app.database.port');

    expect(appName).toBe('Test App');
    expect(dbHost).toBe('localhost');
    expect(dbPort).toBe(5432);
  });

  it('should throw error for unknown config key', () => {
    expect(() => service.get('unknown' as any)).toThrow('Unknown config key: unknown');
  });
}); 