import type { Meta, StoryObj } from '@storybook/react-vite'
import { PriorityBadge } from './PriorityBadge'
import type { PriorityLevel } from './PriorityBadge.constants'

const meta = {
  title: 'Atoms/PriorityBadge',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

const priorities: PriorityLevel[] = ['low', 'medium', 'high', 'critical']

export const AllPriorities: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {priorities.map((priority) => (
        <PriorityBadge key={priority} priority={priority} />
      ))}
    </div>
  ),
}

export const Low: Story = {
  render: () => <PriorityBadge priority="low" />,
}

export const Medium: Story = {
  render: () => <PriorityBadge priority="medium" />,
}

export const High: Story = {
  render: () => <PriorityBadge priority="high" />,
}

export const Critical: Story = {
  render: () => <PriorityBadge priority="critical" />,
}
