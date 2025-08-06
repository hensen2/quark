import { transformGroups } from 'style-dictionary/enums';
import type { PlatformConfig } from 'style-dictionary/types';
import { isSource } from '../filters/isSource.ts';
import type { PlatformInitializer } from '../types/config.d.ts';

export const docJson: PlatformInitializer = (
  outputFile,
  prefix,
  buildPath,
  options,
): PlatformConfig => ({
  prefix,
  buildPath,
  preprocessors: ['themeOverrides'],
  transformGroup: transformGroups.css,
  options: {
    basePxFontSize: 16,
    themeOverrides: {
      theme: options?.themes,
    },
  },
  files: [
    {
      destination: outputFile,
      format: 'json',
      filter: isSource,
      options: {
        outputReferences: false,
        outputVerbose: true,
      },
    },
  ],
});
