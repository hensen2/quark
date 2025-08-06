import type { PlatformConfig } from 'style-dictionary/types';
import { outputReferencesFilter, outputReferencesTransformed } from 'style-dictionary/utils';
import { isSource } from '../filters/isSource.ts';
import type { PlatformInitializer } from '../types/config.d.ts';

type CssOptions = {
  themes?: [string, string];
  framework?: string;
};

const getCssSelectors = ({ themes, framework }: CssOptions) => {
  // if no themes exist, return early with ':root' selector only
  if (!themes) {
    return [{ selector: ':root' }];
  }

  // init output array of css selectors
  const selectors = [];

  for (const theme of themes) {
    const selector = theme === 'dark' ? '.dark' : ':root';
    selectors.push({ selector, theme });
  }

  if (framework === 'tailwind') {
    selectors.push({ selector: '@theme inline', theme: 'tailwind' });
  }

  return selectors;
};

export const css: PlatformInitializer = (
  outputFile,
  prefix,
  buildPath,
  options,
): PlatformConfig => {
  return {
    prefix,
    buildPath,
    preprocessors: ['themes-overrides'],
    transforms: ['name/pathToKebab'], //'attribute/preview'
    options: {
      basePxFontSize: 16,
      overrides: {
        themes: options?.themes,
      },
    },
    files: [
      {
        destination: `${outputFile}`,
        format: 'css/advanced',
        filter: (token) => isSource(token) && options?.themed === true,
        options: {
          showFileHeader: false,
          outputReferences: (token, platformOptions) =>
            outputReferencesFilter(token, platformOptions) &&
            outputReferencesTransformed(token, platformOptions),
          descriptions: false,
          selectors: getCssSelectors({
            themes: options?.themes,
            framework: options?.framework,
          }),
          ...options?.options,
        },
      },
    ],
  };
};
