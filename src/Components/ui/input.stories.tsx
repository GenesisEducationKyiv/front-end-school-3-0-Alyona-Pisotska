import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    'aria-invalid': false,
    disabled: false,
    value: '',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'number'],
      description: 'The type of the input field',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when the field is empty',
    },
    disabled: {
      control: 'boolean',
      description: 'Makes the field inactive.',
    },
    'aria-invalid': {
      control: 'boolean',
      description: 'Indicates an invalid state to demonstrate error styles',
    },
    value: {
      control: 'text',
      description: 'The value of the input field',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '▶️ Default',
  args: {
    type: 'text',
    placeholder: 'Enter text...',
  },
};
