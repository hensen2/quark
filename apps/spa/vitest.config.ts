import { defineProject } from 'vitest/config';

export default defineProject({
  test: {
    projects: [
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
    ],
  },
});
