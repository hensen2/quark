import StyleDictionary from 'style-dictionary';

StyleDictionary.registerFilter({
  name: 'isDark',
  filter: (token) => token.path.includes('dark'),
});

StyleDictionary.registerFilter({
  name: 'isLight',
  filter: (token) => token.path.includes('light'),
});

export default {
  source: ['src/colors/spectrum2/colors.json'],
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
