import type {
  DesignToken,
  PlatformConfig,
  PreprocessedTokens,
  Preprocessor,
} from 'style-dictionary/types';

/**
 * jsonToNestedValue
 * @description creates a nested json tree where every final value is the `.value` prop
 * @param token StyleDictionary.DesignToken
 * @returns nested json three
 */
const transformTokens = (
  token: DesignToken | Record<string, unknown>,
  transform: (token: DesignToken) => DesignToken,
) => {
  // is non-object value
  if (typeof token !== 'object') {
    return token;
  }
  // is design token
  if ('value' in token) {
    return transform(token as DesignToken);
  }
  // is obj
  const nextObj = {};
  for (const [prop, value] of Object.entries(token)) {
    // @ts-expect-error: can't predict type
    nextObj[prop] = transformTokens(value, transform);
  }
  return nextObj;
};

export const themeOverrides: Preprocessor = {
  name: 'themeOverrides',
  preprocessor: (dictionary: PreprocessedTokens, config: PlatformConfig): PreprocessedTokens => {
    const extensionProp = config.options?.themeOverrides?.extensionProp || 'org.quark.themes'; // Custom theme, else use default theme sets
    const theme = config.options?.themeOverrides?.theme || 'light';

    const tokens = transformTokens(dictionary, (token) => {
      // return early if no theme value is set
      if (theme === 'light' || !token.extensions?.[extensionProp]) {
        return token;
      }

      // get override
      const override = token.extensions[extensionProp][theme];

      // token an theme value exist
      return {
        ...token,
        ...(typeof override === 'object' ? override : { value: override }),
      };
    });

    return tokens;
  },
};
