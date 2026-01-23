import type { Meta, StoryObj } from '@storybook/react-vite'
import { Download, Filter, Plus } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '../../atoms/Badge'
import { Button } from '../../atoms/Button'
import { TableToolbar } from './TableToolbar'
import { mockTableToolbarProps } from './TableToolbar.fixtures'

const meta = {
  title: 'Molecules/TableToolbar',
  component: TableToolbar,
  tags: ['autodocs'],
  args: mockTableToolbarProps,
  argTypes: {
    searchPlaceholder: { control: 'text' },
    showSearch: { control: 'boolean' },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof TableToolbar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithSearch: Story = {
  render: () => {
    const [search, setSearch] = useState('')
    return (
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search users..."
      />
    )
  },
}

export const WithActions: Story = {
  render: () => {
    const [search, setSearch] = useState('')
    return (
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search..."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Add New
            </Button>
          </>
        }
      />
    )
  },
}

export const WithFilters: Story = {
  render: () => {
    const [search, setSearch] = useState('')
    return (
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search requests..."
        filters={
          <>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Badge variant="secondary">Status: Open</Badge>
            <Badge variant="secondary">Priority: High</Badge>
          </>
        }
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New Request
          </Button>
        }
      />
    )
  },
}

export const SearchOnly: Story = {
  args: {
    showSearch: true,
  },
  render: (args) => {
    const [search, setSearch] = useState('')
    return (
      <TableToolbar
        {...args}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search items..."
      />
    )
  },
}

export const ActionsOnly: Story = {
  args: {
    showSearch: false,
  },
  render: (args) => (
    <TableToolbar
      {...args}
      actions={
        <>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Add New
          </Button>
        </>
      }
    />
  ),
}
