import { Provider } from '@nestjs/common';

export interface ConfigRegistryEntry<T = any> {
  key: string;
  config: T;
  provider: Provider;
}

export type ConfigMap<TRegistry extends Record<string, ConfigRegistryEntry> = any> = {
  [K in keyof TRegistry]: TRegistry[K]['config'];
};

export type ConfigKey<TRegistry extends Record<string, ConfigRegistryEntry> = any> = keyof ConfigMap<TRegistry>;

export type PathsToStringProps<T> = T extends string | number | boolean | undefined
  ? never
  : {
    [K in keyof T]: K extends string
    ? T[K] extends string | number | boolean | undefined
    ? K
    : K | `${K}.${PathsToStringProps<T[K]>}`
    : never;
  }[keyof T];

export type PathValue<T, P extends string> = P extends keyof T
  ? T[P]
  : P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
  ? PathValue<T[K], Rest>
  : never
  : never;

export type ConfigPaths<TRegistry extends Record<string, ConfigRegistryEntry> = any> = {
  [K in ConfigKey<TRegistry>]: K extends string
  ? PathsToStringProps<ConfigMap<TRegistry>[K]> extends never
  ? K
  : K | `${K}.${PathsToStringProps<ConfigMap<TRegistry>[K]>}`
  : never;
}[ConfigKey<TRegistry>];

export function createKeysFromRegistry<TRegistry extends Record<string, ConfigRegistryEntry>>(
  registry: TRegistry
): ConfigKey<TRegistry>[] {
  return Object.keys(registry) as ConfigKey<TRegistry>[];
} 