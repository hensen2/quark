import type { TransformedToken } from 'style-dictionary/types';

export const isSource = (token: TransformedToken): boolean => {
  return token.isSource === true;
};
