export const parserOutput = {
  color: {
    value: 'red',
    comment: 'a red color',
    $type: 'color',
    $extensions: {},
    alpha: 0.5,
  },
};

const parserInput: { [Property in jsonFormats]: string } = {
  'json.w3c': `{
    "color": {
      "$value": 'red',
      "$description": "a red color",
      "$type": "color",
      "$extensions": {},
      "alpha": 0.5
    }
  }`,
  'json.default': `{
    "color": {
      "value": 'red',
      "description": "a red color",
      "type": "color",
      "extensions": {},
      "alpha": 0.5
    }
  }`,
};

type jsonFormats = 'json.default' | 'json.w3c';
/**
 *
 * @param contents jsonFormats or string taht replaces content in return
 * @returns predefined json string or override
 */
export const getMockParserInput = (
  contents: jsonFormats | string,
  filePath?: string,
): { filePath: string; contents: string } => {
  console.log(import.meta.dirname);
  // use predefined if no override
  if (['json.default', 'json.w3c'].includes(contents)) {
    contents = parserInput[contents as jsonFormats];
  }
  console.log(contents);

  return {
    filePath: filePath || 'path/to/file/token.json',
    contents,
  };
};
