import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronRight, Plus } from 'lucide-react'

import { Button } from './index'

const variants = ['default', 'secondary', 'outline', 'ghost', 'link', 'destructive'] as const

const textSizes = ['default', 'sm', 'lg'] as const
const iconSizes = ['icon', 'icon-sm', 'icon-lg'] as const

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
    },
    size: {
      control: 'select',
      options: [...textSizes, ...iconSizes],
    },
    asChild: {
      control: 'boolean',
    },
    className: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    variant: 'default',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <span className="text-xs text-muted-foreground">{variant}</span>
          <Button variant={variant}>{variant}</Button>
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        {textSizes.map((size) => (
          <Button key={size} size={size}>
            {size}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {iconSizes.map((size) => (
          <Button key={size} size={size} variant="outline" aria-label={size}>
            <Plus />
          </Button>
        ))}
      </div>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <Plus />
        Create
      </Button>
      <Button variant="secondary">
        Continue
        <ChevronRight />
      </Button>
      <Button variant="outline" size="icon" aria-label="Add">
        <Plus />
      </Button>
    </div>
  ),
}

export const AsChild: Story = {
  render: () => (
    <Button asChild>
      <a href="https://example.com">Link button</a>
    </Button>
  ),
}
