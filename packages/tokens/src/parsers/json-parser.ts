import type { DesignToken, DesignTokens, Parser } from 'style-dictionary/types';

function isPlainObjects(obj: DesignTokens | DesignToken): boolean {
  return obj != null && typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype;
}

/**
 * @param {DesignTokens} tokens
 * @returns {DesignTokens}
 */
export function typeDtcgDelegate(tokens: DesignTokens): DesignTokens {
  // create deep clone with native global funtion 'structuredClone'
  const clone = structuredClone(tokens);
  let type = '';

  const recurse = (token: DesignTokens | DesignToken) => {
    // let type = typeProp;
    const keys = Object.keys(token);

    // if token is missing 'type' prop, has 'value' prop, and group type is set, then add type to token
    if (!keys.includes('type') && type && keys.includes('value')) {
      token.type = type;
    }

    if (token.type && typeof token.type === 'string') {
      type = token.type;
      // remove group level type
      if (token.value === undefined) {
        const key = 'type';
        delete token[key];
      }
    }

    Object.values(token).forEach((val) => {
      if (isPlainObjects(val)) {
        recurse(val);
      }
    });
  };

  recurse(clone);
  return clone;
}

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

      const obj = JSON.parse(input);

      return typeDtcgDelegate(obj);
    } catch (error) {
      throw new Error(`Invalid JSON file "${filePath}". Error: ${error}`);
    }
  },
};
