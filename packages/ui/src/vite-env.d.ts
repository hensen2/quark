/// <reference types="vite/client" />
/// <reference types="vitest" />
/// <reference types="@vitest/browser" />

// Extend Vite's environment variables if needed
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // Add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Global test utilities (if using Vitest globals)
declare global {
  const vi: typeof import('vitest').vi;
  const describe: typeof import('vitest').describe;
  const it: typeof import('vitest').it;
  const expect: typeof import('vitest').expect;
  const test: typeof import('vitest').test;
  const beforeAll: typeof import('vitest').beforeAll;
  const afterAll: typeof import('vitest').afterAll;
  const beforeEach: typeof import('vitest').beforeEach;
  const afterEach: typeof import('vitest').afterEach;
}
