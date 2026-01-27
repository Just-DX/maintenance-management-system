import type { Meta, StoryObj } from '@storybook/react'

import { Attachments } from './Attachments'
import { attachmentsFixtures } from './Attachments.fixtures'

const meta: Meta<typeof Attachments> = {
  title: 'Molecules/Attachments',
  component: Attachments,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Attachments>

export const ListVariant: Story = {
  args: {
    attachments: attachmentsFixtures.sampleAttachments,
    variant: 'list',
    showActions: true,
    onRemove: (id) => console.log('Remove:', id),
    onDownload: (attachment) => console.log('Download:', attachment.fileName),
    onPreview: (attachment) => console.log('Preview:', attachment.fileName),
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
}

export const GridVariant: Story = {
  args: {
    attachments: attachmentsFixtures.imageAttachments,
    variant: 'grid',
    showActions: true,
    onRemove: (id) => console.log('Remove:', id),
    onDownload: (attachment) => console.log('Download:', attachment.fileName),
    onPreview: (attachment) => console.log('Preview:', attachment.fileName),
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
}

export const Empty: Story = {
  args: {
    attachments: attachmentsFixtures.emptyAttachments,
    variant: 'list',
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
}

export const ReadOnly: Story = {
  args: {
    attachments: attachmentsFixtures.sampleAttachments,
    variant: 'list',
    showActions: false,
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
}
