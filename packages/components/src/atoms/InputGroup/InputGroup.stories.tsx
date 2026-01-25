import type { Meta, StoryObj } from '@storybook/react-vite'

import { Kbd } from '../Kbd'
import { InputGroup, InputPassword, InputSearch } from './InputGroup'
import { inputGroupContent } from './InputGroup.fixtures'

const meta = {
  title: 'Atoms/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof InputGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <InputGroup placeholder="Input with group" {...args} />,
}

export const Search: Story = {
  render: () => <InputSearch placeholder={inputGroupContent.placeholder} />,
}

export const Password: Story = {
  render: () => <InputPassword placeholder="Password" />,
}

export const WithKbd: Story = {
  render: () => (
    <InputSearch
      placeholder="Search..."
      endIcon={
        <Kbd>
          <span className="text-xs">⌘</span>K
        </Kbd>
      }
    />
  ),
}
