/// <reference types="vitest/config" />
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
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
    ],
  },
});
