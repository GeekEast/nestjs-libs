import { DynamicModule, Module } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { ConfigRegistryEntry } from "./config.type";

export interface ConfigModuleOptions<TRegistry extends Record<string, ConfigRegistryEntry>> {
  registry: TRegistry;
  isGlobal?: boolean;
}

export const CONFIG_REGISTRY_TOKEN = Symbol('CONFIG_REGISTRY_TOKEN');

@Module({})
export class ConfigModule {

  static forRoot<TRegistry extends Record<string, ConfigRegistryEntry>>(
    options: ConfigModuleOptions<TRegistry>
  ): DynamicModule {
    const { registry, isGlobal = true } = options;

    return {
      module: ConfigModule,
      global: isGlobal,
      providers: [
        {
          provide: CONFIG_REGISTRY_TOKEN,
          useValue: registry,
        },
        {
          provide: ConfigService,
          useFactory: (configRegistry: TRegistry) => {
            const configService = new ConfigService<TRegistry>();
            configService.setRegistry(configRegistry);
            return configService;
          },
          inject: [CONFIG_REGISTRY_TOKEN],
        },
      ],
      exports: [ConfigService]
    };
  }
} 