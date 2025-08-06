import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface MockTokenFile {
  name: string;
  filePath: string;
  contents: string;
  parsed: any;
}

export const FIXTURES_PATH = join(import.meta.dirname, '../__fixtures__/tokens');

export const loadFixture = (filename: string): MockTokenFile => {
  const filePath = join(FIXTURES_PATH, filename);
  const contents = readFileSync(filePath, 'utf8');

  return {
    name: filename,
    filePath,
    contents,
    parsed: JSON.parse(contents),
  };
};
