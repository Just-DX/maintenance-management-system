import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import { Chart } from './Chart'
import { chartContent } from './Chart.fixtures'

const meta = {
  title: 'Atoms/Chart',
  component: Chart,
  tags: ['autodocs'],
} satisfies Meta<typeof Chart>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    config: chartContent.config,
    children: <div />, // Satisfy required children prop
  },
  render: (args) => (
    <Chart className="min-h-[200px] w-full" {...args}>
      <BarChart accessibilityLayer data={chartContent.data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Chart.Tooltip content={<Chart.TooltipContent />} />
        <Chart.Legend content={<Chart.LegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </Chart>
  ),
}
