import type { Parser } from 'style-dictionary/types';

/**
 * @description Parses a valid [JSON](https://json.org) file and replaces w3c standard properties (e.g., `$value` to `value` and `$description` to `comment`) to ensure input file is compatible with style-dictionary.
 * @pattern Supported file extensions: `.json`.
 */
export const jsonParser: Parser = {
  name: 'json-parser',
  pattern: /\.json?$/,
  parser: ({ filePath, contents }) => {
    // replace DTCG spec props so that style-dictionary recognizes it
    try {
      const input = contents
        .replace(/["|']?\$value["|']?:/g, '"value":') // $?value -> value
        .replace(/["|']?\$?description["|']?:/g, '"comment":') // $?description -> comment
        .replace(/["|']?\$?type["|']?:/g, '"type":') // $?type -> type
        .replace(/["|']?\$?deprecated["|']?:/g, '"deprecated":') // $?deprecated -> deprecated
        .replace(/["|']?\$?extensions["|']?:/g, '"attributes":') // $?extensions -> attributes
        .replace(/["|']?\$?org.quark.themes["|']?:/g, '"themes":'); // org.quark.themes -> themes

      return JSON.parse(input);
    } catch (error) {
      throw new Error(`Invalid JSON file "${filePath}". Error: ${error}`);
    }
  },
};
