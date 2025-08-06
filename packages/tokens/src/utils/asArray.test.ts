import { asArray } from './asArray.ts';

describe('Utils: asArray', () => {
  it('returns an array from an input string', () => {
    expect(asArray('string')).toStrictEqual(['string']);
  });

  it('returns an array from an input array of strings', () => {
    expect(asArray(['string', 'string2'])).toStrictEqual(['string', 'string2']);
  });

  it('returns an empty array from undefined input', () => {
    expect(asArray(undefined)).toStrictEqual([]);
    expect(asArray([undefined])).toStrictEqual([]);
  });
});
