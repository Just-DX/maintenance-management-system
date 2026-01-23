import type { Meta, StoryObj } from '@storybook/react-vite'

import { Label } from './Label'
import { labelContent } from './Label.fixtures'

const meta = {
  title: 'Atoms/Label',
  component: Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Label>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: labelContent.text,
    htmlFor: 'email',
  },
}
