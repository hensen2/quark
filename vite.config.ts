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
          include: ['tests/unit/**/*.{test,spec}.ts'],
          exclude: ['tests/browser/**/*.{test,spec}.ts(x)?'],
          name: 'unit',
          environment: 'node',
        },
      },
      {
        test: {
          include: ['tests/browser/**/*.{test,spec}.ts(x)?'],
          name: 'browser',
          browser: {
            enabled: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
                setupFiles: ['tests/browser/setup.ts'],
              },
            ],
          },
        },
      },
    ],
  },
});
