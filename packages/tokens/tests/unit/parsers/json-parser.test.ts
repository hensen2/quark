import { jsonParser } from '../../../src/parsers/json-parser.ts';
import { getMockParserInput } from '../../../src/test-utils/getMockParserInput.ts';
import { loadFixture } from '../../helpers/fixture-loader.ts';

describe('Parser: jsonParser', () => {
  describe('metadata', () => {
    it('should have correct name', () => {
      expect(jsonParser.name).toBe('json-parser');
    });

    it('should match .json file extensions', () => {
      expect(jsonParser.pattern.test('tokens.json')).toBe(true);
      expect(jsonParser.pattern.test('color/tokens.json')).toBe(true);
      expect(jsonParser.pattern.test('file.js')).toBe(false);
      expect(jsonParser.pattern.test('file.ts')).toBe(false);
      expect(jsonParser.pattern.test('file.yaml')).toBe(false);
    });
  });

  it('parses valid w3c json', () => {
    const fixture = loadFixture('dtcg-format.json');
    const result = jsonParser.parser(fixture);
    expect(result).not.toStrictEqual(fixture.parsed);
  });

  it('parses valid json', () => {
    const fixture = loadFixture('sd-format.json');
    const result = jsonParser.parser(fixture);
    expect(result).toStrictEqual(fixture.parsed);
  });

  it('it parses empty object `{}` json', () => {
    const result = jsonParser.parser(getMockParserInput('{}'));
    expect(result).toStrictEqual({});
  });

  it('throws an error while parsing invalid empty JSON', () => {
    expect(() => {
      jsonParser.parser(getMockParserInput('', 'invalidFile.json'));
    }).toThrow(`Invalid JSON file "invalidFile.json".`);
  });
});
