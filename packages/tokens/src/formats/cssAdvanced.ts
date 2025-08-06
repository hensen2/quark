import { propertyFormatNames } from 'style-dictionary/enums';
import type { FormatFn, FormatFnArguments } from 'style-dictionary/types';
import { formattedVariables, getReferences } from 'style-dictionary/utils';

const wrapWithSelector = (css: string, selector: string | false): string => {
  // return without selector
  if (selector === false || selector.trim().length === 0) {
    return css;
  }
  // return with selector
  return `${selector} {\n${css}\n}`;
};

export const cssAdvanced: FormatFn = ({
  dictionary: originalDictionary,
  options = {
    selectors: [':root'],
  },
}: FormatFnArguments) => {
  // get options
  const { selectors, usesDtcg } = options;

  const dictionary = { ...originalDictionary };

  // init output array by adding optional file header
  const output = [];

  // add single theme css
  for (const selector of selectors) {
    const { selector: cssSelector, theme } = selector;

    // map over tokens and change token values if theme is dark
    const filteredDictionary = {
      ...dictionary,
      allTokens: dictionary.allTokens.map((token) => {
        if (theme === 'dark' && dictionary.unfilteredTokens) {
          const [original] = getReferences(token.original.value, dictionary.unfilteredTokens);
          // @ts-ignore
          token.value = original.attributes?.themes?.dark;
        }
        if (theme === 'tailwind' && dictionary.unfilteredTokens) {
          token.original.value = token.value;
          token.value = `var(--${token.name})`;
          token.name = `color-${token.name}`;
        }

        return token;
      }),
    };

    // add tokens into root
    const css = formattedVariables({
      format: propertyFormatNames.css,
      dictionary: filteredDictionary,
      outputReferences: theme === 'tailwind',
      usesDtcg,
    });

    // wrap with selector
    const cssWithSelector = wrapWithSelector(css, cssSelector);

    // add css to the output
    output.push(cssWithSelector);
  }

  return output.join('\n\n');
};
