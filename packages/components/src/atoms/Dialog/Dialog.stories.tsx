import type { Meta, StoryObj } from '@storybook/react-vite'

import { Dialog } from './Dialog'
import { dialogContent } from './Dialog.fixtures'
import { Button } from '../Button'
import { Input } from '../Input'
import { Label } from '../Label'

const meta = {
  title: 'Atoms/Dialog',
  component: Dialog,
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="outline">{dialogContent.trigger}</Button>
      </Dialog.Trigger>
      <Dialog.Content className="sm:max-w-[425px]">
        <Dialog.Header>
          <Dialog.Title>{dialogContent.title}</Dialog.Title>
          <Dialog.Description>{dialogContent.description}</Dialog.Description>
        </Dialog.Header>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <Dialog.Footer>
          <Button type="submit">{dialogContent.save}</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
}
