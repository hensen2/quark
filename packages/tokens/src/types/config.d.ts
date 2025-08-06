import type { Config, LocalOptions, PlatformConfig } from 'style-dictionary/types';

export type PlatformOptions = {
  themes?: [string, string];
  themed?: boolean;
  framework?: string;
} & LocalOptions;

export type PlatformInitializer = (
  // the filename including the extension (e.g. `.css`) and any subfolders after the buildPath (e.g. `functional`)
  outputFile: string,
  // the prefix is prepended to all tokens
  prefix: string | undefined,
  // the build path in which the `outputFile` is placed
  buildPath: string,
  options?: PlatformOptions,
) => PlatformConfig;

export type ConfigGeneratorOptions = {
  buildPath: string;
  prefix?: string;
  themed?: boolean;
  themes?: [string, string];
  framework?: string;
};

export type StyleDictionaryConfigGenerator = (
  outputName: string,
  source: string[],
  include: string[],
  options: ConfigGeneratorOptions,
  platforms?: Record<string, PlatformConfig | undefined>,
) => Config;
