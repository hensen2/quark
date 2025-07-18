/// <reference types="vitest/config" />
import path from 'node:path';
// https://vite.dev/config/
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'quark': path.resolve(__dirname, '../../packages/ui/src'),
    },
  },
  build: {
    target: 'es2022',
    minify: false,
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@utils'], // Exclude workspace packages
  },
  // test: {
  // coverage: {
  //   enabled: true,
  //   reporter: ['text', 'json', 'html'],
  // },
  // projects: [
  //   {
  //     extends: true,
  //     test: {
  //       name: 'unit',
  //       globals: true,
  //       include: ['**/*.test.ts'],
  //       environment: 'node',
  //       setupFiles: ['src/test/vitest.node.setup.ts'],
  //     },
  //   },
  //   {
  //     extends: true,
  //     test: {
  //       name: 'browser',
  //       globals: true,
  //       include: ['**/*.browser.test.ts(x)?'],
  //       browser: {
  //         enabled: true,
  //         provider: 'playwright',
  //         instances: [
  //           {
  //             browser: 'chromium',
  //             setupFiles: ['src/test/vitest.browser.setup.ts'],
  //           },
  //         ],
  //       },
  //     },
  //   },
  // ],
  // },
});
