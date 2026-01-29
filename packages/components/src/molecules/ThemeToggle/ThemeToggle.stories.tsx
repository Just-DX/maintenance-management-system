import type { Meta, StoryObj } from '@storybook/react-vite'

import { ThemeProvider } from '../../providers/theme-provider'
import { ThemeToggle } from './ThemeToggle'

const meta: Meta<typeof ThemeToggle> = {
  title: 'Molecules/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex justify-end p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
