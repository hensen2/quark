import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-vitest',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
  ],
  core: {
    //   builder: {
    //     name: '@storybook/builder-vite',
    //     options: {
    //       viteConfigPath: './vitest.config.ts',
    //     },
    //   },
    disableWhatsNewNotifications: true,
    disableTelemetry: true,
  },
};

export default config;
