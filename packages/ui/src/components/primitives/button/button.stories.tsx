import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loader2, Mail } from 'lucide-react';

import { Button } from './button';

const meta = {
  title: 'ui/Button',
  component: Button,
  argTypes: {
    children: {
      control: 'text',
      description: 'Changes the button text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    asChild: {
      control: 'boolean',
      description:
        'Changes the default rendered element for the one passed as a child, merging their props and behavior',
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    children: 'Button',
    disabled: false,
    asChild: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type ButtonStory = StoryObj<typeof Button>;

/**
 * The default form of the button, used for primary actions and commands.
 */
export const Default: ButtonStory = {};

/**
 * Use the `outline` button to reduce emphasis on secondary actions, such as
 * canceling or dismissing a dialog.
 */
export const Outline: ButtonStory = {
  args: {
    variant: 'outline',
  },
};

/**
 * Use the `ghost` button is minimalistic and subtle, for less intrusive
 * actions.
 */
export const Ghost: ButtonStory = {
  args: {
    variant: 'ghost',
  },
};

/**
 * Use the `secondary` button to call for less emphasized actions, styled to
 * complement the primary button while being less conspicuous.
 */
export const Secondary: ButtonStory = {
  args: {
    variant: 'secondary',
  },
};

/**
 * Use the `destructive` button to indicate errors, alerts, or the need for
 * immediate attention.
 */
export const Destructive: ButtonStory = {
  args: {
    variant: 'destructive',
  },
};

/**
 * Use the `link` button to reduce emphasis on tertiary actions, such as
 * hyperlink or navigation, providing a text-only interactive element.
 */
export const Link: ButtonStory = {
  args: {
    variant: 'link',
  },
};

/**
 * Add the `disabled` prop to a button to prevent interactions and add a
 * loading indicator, such as a spinner, to signify an in-progress action.
 */
export const Loading: ButtonStory = {
  render: (args) => (
    <Button {...args}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Button
    </Button>
  ),
  args: {
    ...Outline.args,
    disabled: true,
  },
};

/**
 * Add an icon element to a button to enhance visual communication and
 * providing additional context for the action.
 */
export const WithIcon: ButtonStory = {
  render: (args) => (
    <Button {...args}>
      <Mail className="mr-2 h-4 w-4" /> Login with Email Button
    </Button>
  ),
  args: {
    ...Secondary.args,
  },
};

/**
 * Use the `sm` size for a smaller button, suitable for interfaces needing
 * compact elements without sacrificing usability.
 */
export const Small: ButtonStory = {
  args: {
    size: 'sm',
  },
};

/**
 * Use the `lg` size for a larger button, offering better visibility and
 * easier interaction for users.
 */
export const Large: ButtonStory = {
  args: {
    size: 'lg',
  },
};

/**
 * Use the "icon" size for a button with only an icon.
 */
export const Icon: ButtonStory = {
  args: {
    ...Secondary.args,
    size: 'icon',
    children: <Mail />,
  },
};

/**
 * Add the `disabled` prop to prevent interactions with the button.
 */
export const Disabled: ButtonStory = {
  args: {
    disabled: true,
  },
};

/**
 * The default dark mode form of the button, used for primary actions and commands.
 */
export const Dark: ButtonStory = {
  parameters: {
    themes: {
      themeOverride: 'dark',
    },
  },
};

/**
 * The default mobile viewport form of the button, used for primary actions and commands.
 */
export const Mobile: ButtonStory = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
