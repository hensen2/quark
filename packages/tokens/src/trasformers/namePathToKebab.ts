import type { PlatformConfig, Transform, TransformedToken } from 'style-dictionary/types';

/**
 * @description Converts the [TransformedToken's] `.path` array to a kebab case string, preserves casing of parts
 * @type Name transformer
 * @matcher Matches all
 * @transformer Returns `string` in kebab case
 */
export const namePathToKebab: Transform = {
  name: 'name/pathToKebab',
  type: 'name',
  transform: (token: TransformedToken, config?: PlatformConfig): string => {
    return (
      [config?.prefix, ...token.path]
        // remove undefined if exists
        .filter((path: unknown): path is string => typeof path === 'string')
        .join('-')
    );
  },
};
