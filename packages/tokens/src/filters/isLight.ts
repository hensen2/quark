import type { TransformedToken } from 'style-dictionary/types';

export const isLight = (token: TransformedToken): boolean => token.filePath.includes('light');
