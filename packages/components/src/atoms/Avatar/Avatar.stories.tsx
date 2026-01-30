import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar, AvatarFallback, AvatarImage } from './Avatar'

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const WithBrokenImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="broken-image-url" alt="User avatar" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
}

export const Small: Story = {
  render: () => (
    <Avatar className="size-6">
      <AvatarFallback className="text-xs">JD</AvatarFallback>
    </Avatar>
  ),
}

export const Large: Story = {
  render: () => (
    <Avatar className="size-16">
      <AvatarFallback className="text-lg">JD</AvatarFallback>
    </Avatar>
  ),
}

export const WithCustomFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>
        <svg
          className="size-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </AvatarFallback>
    </Avatar>
  ),
}

export const MultipleAvatars: Story = {
  render: () => (
    <div className="flex -space-x-2">
      <Avatar className="size-8 border-2 border-background">
        <AvatarImage src="https://github.com/shadcn.png" alt="User 1" />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <Avatar className="size-8 border-2 border-background">
        <AvatarImage src="https://github.com/vercel.png" alt="User 2" />
        <AvatarFallback>U2</AvatarFallback>
      </Avatar>
      <Avatar className="size-8 border-2 border-background">
        <AvatarFallback>U3</AvatarFallback>
      </Avatar>
    </div>
  ),
}
