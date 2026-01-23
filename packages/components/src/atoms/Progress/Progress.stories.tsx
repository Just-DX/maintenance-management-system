import type { Meta, StoryObj } from '@storybook/react-vite'

import { Progress } from './Progress'
import { progressContent } from './Progress.fixtures'

const meta = {
  title: 'Atoms/Progress',
  component: Progress,
  tags: ['autodocs'],
} satisfies Meta<typeof Progress>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <Progress value={progressContent.value} className="w-[60%]" {...args} />,
}
