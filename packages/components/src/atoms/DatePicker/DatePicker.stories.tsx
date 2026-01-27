import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

import { DatePicker } from './DatePicker'
import { datePickerContent } from './DatePicker.fixtures'

const meta = {
  title: 'Atoms/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    date: datePickerContent.date,
    onDateChange: () => {},
  },
  render: (args) => {
    const [date, setDate] = React.useState<Date | undefined>(args.date)
    return <DatePicker {...args} date={date} onDateChange={setDate} />
  },
}
