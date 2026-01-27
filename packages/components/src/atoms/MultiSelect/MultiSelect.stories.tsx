import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

import { MultiSelect } from './MultiSelect'
import { multiSelectContent } from './MultiSelect.fixtures'

const meta = {
  title: 'Atoms/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof MultiSelect>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: multiSelectContent.options,
    placeholder: 'Select assignees...',
    searchPlaceholder: 'Search people...',
    emptyMessage: 'No people found.',
  },
  render: (args) => {
    const [value, setValue] = React.useState<string[]>([])
    return (
      <div className="w-[350px]">
        <MultiSelect {...args} value={value} onValueChange={setValue} />
      </div>
    )
  },
}

export const WithSelectedItems: Story = {
  args: {
    options: multiSelectContent.options,
    placeholder: 'Select assignees...',
  },
  render: (args) => {
    const [value, setValue] = React.useState<string[]>(['john-doe', 'jane-smith'])
    return (
      <div className="w-[350px]">
        <MultiSelect {...args} value={value} onValueChange={setValue} />
      </div>
    )
  },
}

export const ManySelected: Story = {
  args: {
    options: multiSelectContent.options,
    placeholder: 'Select assignees...',
    maxDisplayed: 2,
  },
  render: (args) => {
    const [value, setValue] = React.useState<string[]>([
      'john-doe',
      'jane-smith',
      'bob-johnson',
      'alice-williams',
    ])
    return (
      <div className="w-[350px]">
        <MultiSelect {...args} value={value} onValueChange={setValue} />
      </div>
    )
  },
}

export const Technicians: Story = {
  args: {
    options: multiSelectContent.technicians,
    placeholder: 'Assign technicians...',
    searchPlaceholder: 'Search technicians...',
    emptyMessage: 'No technicians found.',
  },
  render: (args) => {
    const [value, setValue] = React.useState<string[]>([])
    return (
      <div className="w-[350px]">
        <MultiSelect {...args} value={value} onValueChange={setValue} />
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    options: multiSelectContent.options,
    placeholder: 'Select assignees...',
    disabled: true,
  },
  render: (args) => {
    const [value, setValue] = React.useState<string[]>(['john-doe'])
    return (
      <div className="w-[350px]">
        <MultiSelect {...args} value={value} onValueChange={setValue} />
      </div>
    )
  },
}
