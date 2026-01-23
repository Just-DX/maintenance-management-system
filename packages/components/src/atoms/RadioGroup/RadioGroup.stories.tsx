import type { Meta, StoryObj } from '@storybook/react-vite'

import { RadioGroup } from './RadioGroup'
import { radioGroupContent } from './RadioGroup.fixtures'
import { Label } from '../Label'

const meta = {
  title: 'Atoms/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      {radioGroupContent.options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroup.Item value={option.value} id={`r-${option.value}`} />
          <Label htmlFor={`r-${option.value}`}>{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
}
