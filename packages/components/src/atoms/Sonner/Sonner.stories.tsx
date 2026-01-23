import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast } from 'sonner'

import { Button } from '../Button'
import { Toaster } from './Sonner'
import { sonnerContent } from './Sonner.fixtures'

const meta = {
  title: 'Atoms/Sonner',
  component: Toaster,
  tags: ['autodocs'],
} satisfies Meta<typeof Toaster>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button
        variant="outline"
        onClick={() =>
          toast(sonnerContent.message, {
            description: sonnerContent.description,
            action: {
              label: sonnerContent.actionLabel,
              onClick: () => console.log('Undo'),
            },
          })
        }
      >
        Show Toast
      </Button>
    </div>
  ),
}
