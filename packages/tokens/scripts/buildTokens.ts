import type { Config } from 'style-dictionary/types';
import { css } from '../src/platforms/css.ts';
import { docJson } from '../src/platforms/json.ts';
import { sd } from '../src/styleDictionary.ts';
import { themes } from '../src/tokens.ts';
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
      css: css(`css/${filename}.css`, options.prefix, options.buildPath, {
        themed: options.themed,
        themes: options.themes,
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
   * Internal Colors
   * ----------------------------------- */
  try {
    for (const { filename, source, include } of themes) {
      // build functional scales
      const extendedSD = await sd.extend({
        source: [...source, ...include], // build the special formats
        include,
        parsers: ['json-parser'],
        platforms: {
          css: css(`internalCss/${filename}.css`, buildOptions.prefix, buildOptions.buildPath, {
            themed: true,
            themes: ['light', 'dark'],
          }),
        },
      });
      await extendedSD.buildAllPlatforms();
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('🛑 Error trying to build internal css colors for code output:', e);
  }

  /** -----------------------------------
   * Colors, shadows & borders
   * ----------------------------------- */
  try {
    for (const { filename, source, include } of themes) {
      // build functional scales
      const extendedSD = await sd.extend(
        getStyleDictionaryConfig(`functional/themes/${filename}`, source, include, {
          themed: true,
          themes: ['light', 'dark'],
          ...buildOptions,
        }),
      );
      await extendedSD.buildAllPlatforms();
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('🛑 Error trying to build Colors, shadows & borders for code output:', e);
  }

  /** -----------------------------------
   * Tailwind CSS Theme
   * ----------------------------------- */
  try {
    const extendedSD = await sd.extend({
      source: [
        'src/tokens/core/spacing.json',
        'src/tokens/core/layout.json',
        'src/tokens/functional/color/*.json',
      ],
      include: [
        'src/tokens/core/palette.json',
        'src/tokens/core/semantic.json',
        'src/tokens/core/layout.json',
      ],
      parsers: ['json-parser'],
      platforms: {
        css: css('tailwind/theme.css', buildOptions.prefix, buildOptions.buildPath, {
          themed: false,
          themes: ['light', 'dark'],
        }),
      },
    });
    await extendedSD.buildAllPlatforms();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('🛑 Error trying to build internal css colors for code output:', e);
  }
};

/** -----------------------------------
 * Run build script
 * ----------------------------------- */
// build to dist
await buildDesignTokens({
  buildPath: 'dist/',
});
