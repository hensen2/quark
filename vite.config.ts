/// <reference types="vitest/config" />
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
        test: {
          name: 'unit',
          include: ['src/**/*.unit.{test,spec}.ts'],
          environment: 'node',
        },
      },
      {
        test: {
          name: 'browser',
          include: ['**/*.browser.{test,spec}.ts(x)?'],
          browser: {
            enabled: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
                setupFiles: ['./vitest.browser.setup.ts'],
              },
            ],
          },
        },
      },
    ],
  },
});
