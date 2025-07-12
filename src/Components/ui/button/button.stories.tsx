import type { Meta, StoryObj } from '@storybook/react';
import { Check } from 'lucide-react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Turns off the button',
      type: { name: 'boolean' },
    },
    asChild: {
      control: 'boolean',
      description: 'Passes properties to a child element',
    },
    children: {
      control: false,
      description: 'The content displayed inside the button. Type: React.ReactNode',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: <>Click</>,
  },
};

export const WithIcon: Story = {
  name: '🧩 With Icon',
  args: {
    ...Default.args,
    children: (
      <>
        <Check />
        <span>Click</span>
      </>
    ),
  },
};

export const IconOnly: Story = {
  name: '🖼️ Icon Only',
  args: {
    variant: 'outline',
    size: 'icon',
    children: <Check size={20} />,
  },
};

export const AsLink: Story = {
  name: '🔗 As Link (asChild)',
  args: {
    ...Default.args,
    variant: 'link',
    asChild: true,
    children: (
      <a href='https://storybook.js.org/' target='_blank'>
        Link
      </a>
    ),
  },
};
