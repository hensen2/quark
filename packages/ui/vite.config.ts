/// <reference types="vitest/config" />
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineConfig({
  plugins: [react(), tailwindcss(), dts()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/primitives/button.tsx'),
      name: 'react-ui',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled into library
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'React-dom',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
    target: 'es2022',
    minify: false,
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime', '@mdx-js/react', 'markdown-to-jsx'],
  },
  test: {
    coverage: {
      enabled: true,
      reporter: ['text', 'json', 'html'],
    },
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            provider: 'playwright',
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
          globals: true,
          setupFiles: ['./.storybook/vitest.storybook.setup.ts'],
        },
      },
    ],
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
  //       include: ['tests/unit/**/*.test.ts'],
  //       environment: 'node',
  //       setupFiles: ['./tests/vitest.node.setup.ts'],
  //     },
  //   },
  //   {
  //     extends: true,
  //     plugins: [
  //       storybookTest({
  //         configDir: path.join(__dirname, '.storybook'),
  //       }),
  //     ],
  //     test: {
  //       name: 'storybook',
  //       globals: true,
  //       browser: {
  //         enabled: true,
  //         headless: true,
  //         provider: 'playwright',
  //         instances: [
  //           {
  //             browser: 'chromium',
  //           },
  //         ],
  //       },
  //       setupFiles: [path.join('.storybook', 'vitest.storybook.setup.ts')],
  //     },
  //   },
  // ],
  // },
});
