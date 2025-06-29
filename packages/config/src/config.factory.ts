import { ConfigRegistryEntry } from './config.type';

export function createConfig<T extends Record<string, any>>(
  key: string,
  config: T
): ConfigRegistryEntry<T> {
  return {
    key,
    config,
    provider: {
      provide: key,
      useValue: config,
    },
  };
}

export function defineConfig<T extends Record<string, any>>(
  key: string,
  configFactory: () => T
): ConfigRegistryEntry<T> {
  const config = configFactory();
  return createConfig(key, config);
} 