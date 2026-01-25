import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatusBadge } from './StatusBadge'
import type { StatusType } from './StatusBadge.constants'

const meta = {
  title: 'Atoms/StatusBadge',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

const statuses: StatusType[] = ['open', 'in-progress', 'on-hold', 'completed', 'canceled']

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {statuses.map((status) => (
        <StatusBadge key={status} status={status} />
      ))}
    </div>
  ),
}

export const Open: Story = {
  render: () => <StatusBadge status="open" />,
}

export const InProgress: Story = {
  render: () => <StatusBadge status="in-progress" />,
}

export const OnHold: Story = {
  render: () => <StatusBadge status="on-hold" />,
}

export const Completed: Story = {
  render: () => <StatusBadge status="completed" />,
}

export const Canceled: Story = {
  render: () => <StatusBadge status="canceled" />,
}
