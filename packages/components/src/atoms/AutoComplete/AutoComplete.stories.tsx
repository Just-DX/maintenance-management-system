import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

import { AutoComplete } from './AutoComplete'
import { autoCompleteContent } from './AutoComplete.fixtures'

const meta = {
  title: 'Atoms/AutoComplete',
  component: AutoComplete,
  tags: ['autodocs'],
} satisfies Meta<typeof AutoComplete>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: autoCompleteContent.options,
    value: '',
    placeholder: 'Select item...',
    emptyMessage: 'No item found.',
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value || '')
    return <AutoComplete {...args} value={value} onSetValue={setValue} />
  },
}
