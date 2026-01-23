import type { Meta, StoryObj } from '@storybook/react-vite'

import { Select } from './Select'
import { selectContent } from './Select.fixtures'

const meta = {
  title: 'Atoms/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select>
      <Select.Trigger className="w-[180px]">
        <Select.Value placeholder={selectContent.placeholder} />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Fruits</Select.Label>
          {selectContent.items.map((item) => (
            <Select.Item key={item} value={item.toLowerCase()}>
              {item}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select>
  ),
}
