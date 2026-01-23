import type { Meta, StoryObj } from '@storybook/react-vite'

import { Switch } from './Switch'
import { switchContent } from './Switch.fixtures'
import { Label } from '../Label'

const meta = {
  title: 'Atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" {...args} />
      <Label htmlFor="airplane-mode">{switchContent.label}</Label>
    </div>
  ),
}
