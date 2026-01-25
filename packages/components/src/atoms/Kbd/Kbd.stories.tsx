import type { Meta, StoryObj } from '@storybook/react'

import { Kbd } from './Kbd'

const meta = {
  title: 'Atoms/Kbd',
  component: Kbd,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '⌘ K',
  },
}

export const Split: Story = {
  args: {
    children: (
      <>
        <span className="text-xs">⌘</span>J
      </>
    ),
  },
}

export const Combined: Story = {
  args: {
    children: (
      <>
        <span className="text-xs">⌘</span>
        <span>+</span>
        <span className="text-xs">⇧</span>
        <span>+</span>
        <span>B</span>
      </>
    ),
  },
}
