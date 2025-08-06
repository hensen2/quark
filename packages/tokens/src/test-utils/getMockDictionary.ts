import type { Dictionary, TransformedToken, TransformedTokens } from 'style-dictionary/types';
import { convertTokenData } from 'style-dictionary/utils';
import { getMockToken } from './getMockToken.ts';

const flattenTokens = (tokenTree: TransformedTokens): TransformedToken[] => {
  const output: TransformedToken[] = [];

  const getToken = (tokens: TransformedTokens, flatTokens: TransformedToken[]) => {
    for (const token of Object.values(tokens)) {
      if (Object.hasOwn(token, 'name')) {
        flatTokens.push(token as TransformedToken);
        continue;
      }
      getToken(token, flatTokens);
    }
  };

  getToken(tokenTree, output);

  return output;
};

const mockDictionaryDefault = {
  tokens: {
    subgroup: {
      red: getMockToken({
        name: 'red',
        description: 'This is a description',
        value: 'transformedValue',
        path: ['tokens', 'subgroup', 'red'],
      }),
    },
  },
};

export const getMockDictionary = (tokens?: TransformedTokens): Dictionary => {
  const allTokens = flattenTokens(tokens || mockDictionaryDefault);
  const tokenMap = convertTokenData(allTokens, { output: 'map' }) as Map<string, TransformedToken>;

  return {
    allTokens,
    tokens: tokens || mockDictionaryDefault,
    tokenMap,
  };
};
