import type { Meta, StoryObj } from '@storybook/react-vite'

import { EmptyState, EmptyStateTable } from './EmptyState'
import { emptyStateContent } from './EmptyState.fixtures'

const meta = {
  title: 'Atoms/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyState>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: emptyStateContent.title,
    description: emptyStateContent.description,
    action: {
      label: emptyStateContent.actionLabel,
      onClick: () => console.log('clicked'),
    },
  },
  render: (args) => <EmptyState {...args} />,
}

export const TableVariant: Story = {
  args: {
    title: 'No results found',
    description: 'Try adjusting your filters or search query.',
  },
  render: (args) => <EmptyStateTable {...args} />,
}
