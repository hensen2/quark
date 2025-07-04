import path from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        enabled: true,
        reporter: ['text', 'json', 'html'],
      },
      projects: [
        {
          extends: true,
          test: {
            name: 'unit',
            globals: true,
            include: ['tests/unit/**/*.test.ts'],
            environment: 'node',
            setupFiles: ['./tests/vitest.node.setup.ts'],
          },
        },
        {
          extends: true,
          plugins: [
            storybookTest({
              configDir: path.join(__dirname, '.storybook'),
            }),
          ],
          test: {
            name: 'storybook',
            globals: true,
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
            setupFiles: [path.join('.storybook', 'vitest.storybook.setup.ts')],
          },
        },
      ],
    },
  }),
);
