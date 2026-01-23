import type { Meta, StoryObj } from '@storybook/react-vite'

import { Field } from './Field'
import {
  mockDisabledField,
  mockFieldProps,
  mockFieldWithDescription,
  mockFieldWithError,
  mockRequiredField,
} from './Field.fixtures'

const meta = {
  title: 'Molecules/Field',
  component: Field,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
} satisfies Meta<typeof Field>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: mockFieldProps.label,
    placeholder: mockFieldProps.placeholder,
    type: 'email',
  },
}

export const WithDescription: Story = {
  args: {
    label: mockFieldWithDescription.label,
    description: mockFieldWithDescription.description,
    placeholder: mockFieldWithDescription.placeholder,
  },
}

export const WithError: Story = {
  args: {
    label: mockFieldWithError.label,
    error: mockFieldWithError.error,
    placeholder: mockFieldWithError.placeholder,
    type: 'password',
  },
}

export const Required: Story = {
  args: {
    label: mockRequiredField.label,
    required: mockRequiredField.required,
    placeholder: mockRequiredField.placeholder,
  },
}

export const Disabled: Story = {
  args: {
    label: mockDisabledField.label,
    disabled: mockDisabledField.disabled,
    value: mockDisabledField.value,
  },
}

export const FullExample: Story = {
  args: {
    label: 'Company Email',
    description: 'We will use this for account recovery.',
    placeholder: 'you@company.com',
    type: 'email',
    required: true,
  },
}
