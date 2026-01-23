import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

import { Calendar } from './Calendar'
import { calendarContent } from './Calendar.fixtures'

const meta = {
  title: 'Atoms/Calendar',
  component: Calendar,
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [date, setDate] = React.useState<Date | undefined>(calendarContent.selected)

    return (
      <Calendar
        mode="single"
        selected={date as any}
        onSelect={setDate as any}
        className="rounded-md border"
        {...args}
      />
    )
  },
}
