import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from './Input'
import { inputContent } from './Input.fixtures'

const meta = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: inputContent.placeholder,
    type: inputContent.type,
  },
}

export const File: Story = {
  args: {
    type: 'file',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
}
