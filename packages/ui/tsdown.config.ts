import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/components/primitives/button-tv.tsx'],
  platform: 'browser',
  outDir: 'build',
  dts: true,
  tsconfig: 'tsconfig.lib.json',
});
