import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

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
  // build: {
  //   lib: {
  //     entry: path.resolve(__dirname, './src/components/primitives/button.tsx'),
  //     name: 'react-ui',
  //     formats: ['es', 'cjs'],
  //   },
  //   rollupOptions: {
  //     // Externalize deps that shouldn't be bundled into library
  //     external: ['react', 'react-dom', 'react/jsx-runtime', 'tailwindcss'],
  //     output: {
  //       globals: {
  //         react: 'React',
  //         'react-dom': 'React-dom',
  //         'react/jsx-runtime': 'react/jsx-runtime',
  //         tailwindcss: 'tailwindcss',
  //       },
  //     },
  //   },
  //   target: 'es2022',
  //   minify: false,
  //   sourcemap: true,
  // },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime'],
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
