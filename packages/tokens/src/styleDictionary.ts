import StyleDictionary from 'style-dictionary';
import { logVerbosityLevels } from 'style-dictionary/enums';
import { cssThemes } from '../experimental/cssThemes.ts';
import { cssAdvanced } from './formats/cssAdvanced.ts';
import { jsonParser } from './parsers/json-parser.ts';
import { newOverrides } from './preprocessors/newOverrides.ts';
import { themeOverrides } from './preprocessors/themeOverrides.ts';
import { attributePreview } from './trasformers/attributePreview.ts';
import { namePathToKebab } from './trasformers/namePathToKebab.ts';

StyleDictionary.registerParser(jsonParser);

StyleDictionary.registerPreprocessor(themeOverrides);

StyleDictionary.registerPreprocessor(newOverrides);

StyleDictionary.registerTransform(attributePreview);

StyleDictionary.registerTransform(namePathToKebab);

StyleDictionary.registerFormat(cssThemes);

StyleDictionary.registerFormat({
  name: 'css/advanced',
  format: cssAdvanced,
});

export const sd: StyleDictionary = new StyleDictionary({
  log: {
    verbosity: logVerbosityLevels.verbose,
  },
});
