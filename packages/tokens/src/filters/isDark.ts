import type { TransformedToken } from 'style-dictionary/types';

export const isDark = (token: TransformedToken): boolean => token.filePath.includes('dark');
