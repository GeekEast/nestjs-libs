import { Injectable } from '@nestjs/common';
import {
  ConfigMap,
  ConfigKey,
  ConfigPaths,
  PathValue,
  ConfigRegistryEntry,
  createKeysFromRegistry
} from './config.type';

@Injectable()
export class ConfigService<TRegistry extends Record<string, ConfigRegistryEntry> = any> {
  private configCache = new Map<string, any>();
  private registry!: TRegistry;

  setRegistry(registry: TRegistry): void {
    this.registry = registry;
    this.initializeCache();
  }

  private initializeCache(): void {
    if (!this.registry) return;

    const keys = createKeysFromRegistry(this.registry);
    for (const key of keys) {
      this.configCache.set(key as string, this.registry[key].config);
    }
  }

  get<K extends ConfigKey<TRegistry>>(key: K): ConfigMap<TRegistry>[K];
  get<P extends ConfigPaths<TRegistry>>(path: P): PathValue<ConfigMap<TRegistry>, P>;
  get<K extends ConfigKey<TRegistry> | ConfigPaths<TRegistry>>(keyOrPath: K): any {
    if (typeof keyOrPath === 'string' && keyOrPath.includes('.')) {
      return this.getByPath(keyOrPath as ConfigPaths<TRegistry>);
    }

    const key = keyOrPath as ConfigKey<TRegistry>;
    const config = this.configCache.get(key as string);

    if (config === undefined) {
      throw new Error(`Unknown config key: ${String(key)}`);
    }

    return config;
  }

  private getByPath(path: ConfigPaths<TRegistry>): any {
    const [rootKey, ...nestedPath] = (path as string).split('.');
    const rootConfig = this.get(rootKey as ConfigKey<TRegistry>);

    return nestedPath.reduce((current, key) => {
      return current?.[key];
    }, rootConfig);
  }
} 