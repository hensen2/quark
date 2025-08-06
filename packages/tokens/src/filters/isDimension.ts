import type { TransformedToken } from 'style-dictionary/types';

/**
 * @description Checks if token is of type `dimension`
 * @param arguments [TransformedToken](https://github.com/style-dictionary/style-dictionary/blob/main/types/DesignToken.ts)
 * @returns boolean
 */
export const isDimension = (token: TransformedToken): boolean => {
  return token.$type === 'dimension';
};
