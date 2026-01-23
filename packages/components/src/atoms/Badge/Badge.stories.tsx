import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from './Badge'
import { variants } from './Badge.constants'
import { badgeContent } from './Badge.fixtures'

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
    },
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: badgeContent.label,
    variant: 'default',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2">
      {variants.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
}
