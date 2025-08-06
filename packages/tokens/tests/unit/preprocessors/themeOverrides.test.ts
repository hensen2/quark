import { newOverrides } from '../../../src/preprocessors/newOverrides.ts';
import { getMockDictionary } from '../../../src/test-utils/getMockDictionary.ts';
import { getMockToken } from '../../../src/test-utils/getMockToken.ts';

describe('Preprocessor: themeOverrides', () => {
  it('works with default settings', () => {
    const dictionary = getMockDictionary({
      valueOverride: getMockToken({
        name: 'red',
        description: 'This is a description',
        value: 'transformedValue',
        alpha: 0.6,
        path: ['tokens', 'subgroup', 'red'],
        extensions: {
          'org.quark.themes': {
            dark: 'darkValue',
          },
        },
      }),
      objectOverride: getMockToken({
        name: 'red',
        description: 'This is a description',
        value: 'transformedValue',
        path: ['tokens', 'subgroup', 'red'],
        extensions: {
          'org.quark.themes': {
            dark: {
              value: 'darkValue',
              description: 'DarkMode description',
            },
          },
        },
      }),
      alphaOnlyOverride: getMockToken({
        name: 'red',
        description: 'This is a description',
        value: 'transformedValue',
        alpha: 0.6,
        path: ['tokens', 'subgroup', 'red'],
        extensions: {
          'org.quark.themes': {
            dark: {
              alpha: 0.75,
            },
          },
        },
      }),
    });

    const resultDictionary = getMockDictionary({
      valueOverride: getMockToken({
        name: 'red',
        description: 'This is a description',
        value: 'darkValue',
        alpha: 0.6,
        path: ['tokens', 'subgroup', 'red'],
        extensions: {
          'org.quark.themes': {
            dark: 'darkValue',
          },
        },
      }),
      objectOverride: getMockToken({
        name: 'red',
        description: 'DarkMode description',
        value: 'darkValue',
        path: ['tokens', 'subgroup', 'red'],
        extensions: {
          'org.quark.themes': {
            dark: {
              value: 'darkValue',
              description: 'DarkMode description',
            },
          },
        },
      }),
      alphaOnlyOverride: getMockToken({
        name: 'red',
        description: 'This is a description',
        value: 'transformedValue',
        alpha: 0.75,
        path: ['tokens', 'subgroup', 'red'],
        extensions: {
          'org.quark.themes': {
            dark: {
              alpha: 0.75,
            },
          },
        },
      }),
    });

    expect(newOverrides.preprocessor(dictionary.tokens, {})).toStrictEqual(dictionary.tokens);
    expect(
      newOverrides.preprocessor(dictionary.tokens, {
        options: { themeOverrides: { theme: 'dark' } },
      }),
    ).toStrictEqual(resultDictionary.tokens);
  });

  it('works with custom configuration', () => {
    const dictionary = getMockDictionary({
      valueOverride: getMockToken({
        name: 'red',
        description: 'This is a description',
        value: 'transformedValue',
        path: ['tokens', 'subgroup', 'red'],
        extensions: {
          theme: {
            dark: 'darkValue',
          },
        },
      }),
      objectOverride: getMockToken({
        name: 'red',
        description: 'This is a description',
        value: 'transformedValue',
        path: ['tokens', 'subgroup', 'red'],
        extensions: {
          theme: {
            dark: {
              value: 'darkValue',
              description: 'DarkMode description',
            },
          },
        },
      }),
    });

    const resultDictionary = getMockDictionary({
      valueOverride: getMockToken({
        name: 'red',
        description: 'This is a description',
        value: 'darkValue',
        path: ['tokens', 'subgroup', 'red'],
        extensions: {
          theme: {
            dark: 'darkValue',
          },
        },
      }),
      objectOverride: getMockToken({
        name: 'red',
        description: 'DarkMode description',
        value: 'darkValue',
        path: ['tokens', 'subgroup', 'red'],
        extensions: {
          theme: {
            dark: {
              value: 'darkValue',
              description: 'DarkMode description',
            },
          },
        },
      }),
    });

    expect(
      newOverrides.preprocessor(dictionary.tokens, {
        themeOverrides: {
          extensionProp: 'theme',
        },
      }),
    ).toStrictEqual(dictionary.tokens);
    expect(
      newOverrides.preprocessor(dictionary.tokens, {
        options: { themeOverrides: { theme: 'dark', extensionProp: 'theme' } },
      }),
    ).toStrictEqual(resultDictionary.tokens);
  });

  it('works with non-string values', () => {
    const dictionary = getMockDictionary({
      objectValueOverride: getMockToken({
        name: 'red',
        description: 'This is a description',
        value: 'transformedValue',
        path: ['tokens', 'subgroup', 'red'],
        extensions: {
          theme: {
            dark: {
              value: { test: 'value' },
            },
          },
        },
      }),
      arrayValueOverride: getMockToken({
        name: 'red',
        description: 'This is a description',
        value: 'transformedValue',
        path: ['tokens', 'subgroup', 'red'],
        extensions: {
          theme: {
            dark: {
              value: [
                {
                  value: 'darkValue',
                  description: 'DarkMode description',
                },
              ],
            },
          },
        },
      }),
    });

    const resultDictionary = getMockDictionary({
      objectValueOverride: getMockToken({
        name: 'red',
        description: 'This is a description',
        value: { test: 'value' },
        path: ['tokens', 'subgroup', 'red'],
        extensions: {
          theme: {
            dark: {
              value: { test: 'value' },
            },
          },
        },
      }),
      arrayValueOverride: getMockToken({
        name: 'red',
        description: 'This is a description',
        value: [
          {
            value: 'darkValue',
            description: 'DarkMode description',
          },
        ],
        path: ['tokens', 'subgroup', 'red'],
        extensions: {
          theme: {
            dark: {
              value: [
                {
                  value: 'darkValue',
                  description: 'DarkMode description',
                },
              ],
            },
          },
        },
      }),
    });

    expect(
      newOverrides.preprocessor(dictionary.tokens, {
        themeOverrides: {
          valueProp: 'value',
          extensionProp: 'theme',
        },
      }),
    ).toStrictEqual(dictionary.tokens);
    expect(
      newOverrides.preprocessor(dictionary.tokens, {
        options: { themeOverrides: { theme: 'dark', valueProp: 'value', extensionProp: 'theme' } },
      }),
    ).toStrictEqual(resultDictionary.tokens);
  });
});
