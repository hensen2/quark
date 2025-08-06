import type { Config } from 'style-dictionary/types';
import { css } from '../src/platforms/css.ts';
import { docJson } from '../src/platforms/json.ts';
import { sd } from '../src/styleDictionary.ts';
import type {
  ConfigGeneratorOptions,
  StyleDictionaryConfigGenerator,
} from '../src/types/config.d.ts';

/**
 * getStyleDictionaryConfig
 * @param filename output file name without extension
 * @param source array of source token json files
 * @param include array of included token json files (will not be present in output btu values are used when referenced)
 * @param options options object
 * @returns style dictionary config object
 */
const getStyleDictionaryConfig: StyleDictionaryConfigGenerator = (
  filename,
  source,
  include,
  options,
  platforms = {},
): Config => ({
  log: {
    warnings: 'disabled', // 'warn' | 'error' | 'disabled'
    verbosity: 'silent', // 'default' | 'silent' | 'verbose'
    errors: {
      brokenReferences: 'throw', // 'throw' | 'console'
    },
  },
  source, // build the special formats
  include,
  parsers: ['json-parser'],
  platforms: Object.fromEntries(
    Object.entries({
      css: css(`experimental/${filename}.css`, options.prefix, options.buildPath, {
        themed: options.themed,
        themes: options.themes,
        framework: options.framework,
      }),
      docJson: docJson(`docs/${filename}.json`, options.prefix, options.buildPath, {
        themes: options.themes,
      }),
      // styleLint: styleLint(`styleLint/${filename}.json`, options.prefix, options.buildPath, {
      //   theme: options.theme,
      // }),
      ...platforms,
    }).filter((entry: [string, unknown]) => entry[1] !== undefined),
  ),
});

const buildDesignTokens = async (buildOptions: ConfigGeneratorOptions): Promise<void> => {
  /** -----------------------------------
   * Colors, shadows & borders
   * ----------------------------------- */
  try {
    // build functional scales
    const extendedSD = await sd.extend(
      getStyleDictionaryConfig(
        'base/theme',
        ['src/tokens/functional/color/background.json'],
        ['src/tokens/core/palette.json'],
        {
          themed: true,
          themes: ['light', 'dark'],
          ...buildOptions,
        },
      ),
    );
    await extendedSD.buildAllPlatforms();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('🛑 Error trying to build Colors, shadows & borders for code output:', e);
  }

  /** -----------------------------------
   * Tailwind CSS
   * ----------------------------------- */
  try {
    // build functional scales
    const extendedSD = await sd.extend(
      getStyleDictionaryConfig(
        'tailwind/theme',
        ['src/tokens/functional/color/background.json'],
        ['src/tokens/core/palette.json'],
        {
          themed: true,
          themes: ['light', 'dark'],
          framework: 'tailwind',
          ...buildOptions,
        },
      ),
    );
    await extendedSD.buildAllPlatforms();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('🛑 Error trying to build Colors, shadows & borders for code output:', e);
  }
};

/** -----------------------------------
 * Run build script
 * ----------------------------------- */
// build to dist
await buildDesignTokens({
  buildPath: 'dist/',
});
