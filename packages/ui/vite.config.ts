/// <reference types="vitest/config" />
import path from 'node:path';
// https://vite.dev/config/
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@vite-react-ts/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@utils': path.resolve(__dirname, '../../packages/utils/src'),
    },
  },
  build: {
    target: 'es2022',
    minify: 'esbuild',
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@utils'], // Exclude workspace packages
  },
  test: {
    coverage: {
      enabled: true,
      reporter: ['text', 'json', 'html'],
    },
    workspace: [
      {
        extends: true,
        test: {
          name: 'unit',
          globals: true,
          include: ['**/*.test.ts'],
          environment: 'node',
          setupFiles: ['src/test/vitest.node.setup.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'browser',
          globals: true,
          include: ['**/*.browser.test.ts(x)?'],
          browser: {
            enabled: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
                setupFiles: ['src/test/vitest.browser.setup.ts'],
              },
            ],
          },
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/writing-tests/test-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.storybook.setup.ts'],
        },
      },
    ],
  },
});
