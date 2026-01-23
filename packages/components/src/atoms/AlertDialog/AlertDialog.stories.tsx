import type { Meta, StoryObj } from '@storybook/react-vite'

import { AlertDialog } from './AlertDialog'
import { alertDialogContent } from './AlertDialog.fixtures'
import { Button } from '../Button'

const meta = {
  title: 'Atoms/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
} satisfies Meta<typeof AlertDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialog.Trigger asChild>
        <Button variant="outline">{alertDialogContent.trigger}</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>{alertDialogContent.title}</AlertDialog.Title>
          <AlertDialog.Description>{alertDialogContent.description}</AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>{alertDialogContent.cancel}</AlertDialog.Cancel>
          <AlertDialog.Action>{alertDialogContent.action}</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  ),
}
