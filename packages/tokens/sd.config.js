import StyleDictionary from 'style-dictionary';

StyleDictionary.registerFilter({
  name: 'isDark',
  filter: (token) => token.path.includes('dark'),
});

StyleDictionary.registerFilter({
  name: 'isLight',
  filter: (token) => token.path.includes('light'),
});

StyleDictionary.registerFormat({
  name: 'custom',
  format: ({ dictionary }) => {
    const names = [];
    dictionary.allTokens.map((token) => {
      names.push(`  --color-${token.name.split('-', 2).join('-')}: ${token.value};`);
    });

    return `:root {\n${names.join('\n')}\n}\n`;
  },
});

export default {
  source: ['src/core/colors.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'light-vars.css',
          format: 'css/variables',
          filter: 'isLight',
        },
        {
          destination: 'dark-vars.css',
          format: 'css/variables',
          filter: 'isDark',
          options: {
            selector: '.dark',
          },
        },
        {
          destination: 'vars.css',
          format: 'custom',
          filter: 'isLight',
        },
      ],
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'build/ts/',
      files: [
        {
          destination: 'vars.ts',
          format: 'javascript/esm',
        },
        {
          format: 'typescript/module-declarations',
          destination: 'vars.d.ts',
        },
      ],
    },
  },
};
