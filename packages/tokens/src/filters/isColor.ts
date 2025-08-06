import type { TransformedToken } from 'style-dictionary/types';

export const isColor = (token: TransformedToken): boolean => {
  const typeValue = token.type ?? token.$type;
  return typeValue === 'color';
};
