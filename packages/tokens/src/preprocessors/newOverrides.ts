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

export const newOverrides: Preprocessor = {
  name: 'theme-overrides',
  preprocessor: (dictionary: PreprocessedTokens, config: PlatformConfig): PreprocessedTokens => {
    if (!config.options?.overrides?.themed) {
      return dictionary;
    }

    const tokens = transformTokens(dictionary, (token) => {
      // return early if no theme value is set
      // @ts-ignore
      if (!token.attributes?.themes?.dark) {
        // set token as not themeable
        token.themeable = false;
        return token;
      }

      // set token as themeable
      token.themeable = true;

      return token;
    });

    return tokens;
  },
};
