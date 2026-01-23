import type { Meta, StoryObj } from '@storybook/react-vite'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card'
import { cardContent } from './Card.fixtures'

const meta = {
  title: 'Atoms/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Card className="w-[350px]" {...args}>
      <CardHeader>
        <CardTitle>{cardContent.title}</CardTitle>
        <CardDescription>{cardContent.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{cardContent.content}</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">{cardContent.footer}</p>
      </CardFooter>
    </Card>
  ),
}
