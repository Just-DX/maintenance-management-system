import type { Meta, StoryObj } from '@storybook/react'

import { ClientTable } from './ClientTable'

const meta: Meta<typeof ClientTable> = {
  title: 'Organisms/ClientTable',
  component: ClientTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ClientTable>

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  lastLogin: string
}

const users: User[] = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Editor' : 'Viewer',
  status: i % 2 === 0 ? 'active' : 'inactive',
  lastLogin: new Date(Date.now() - i * 86400000).toISOString().split('T')[0] || '',
}))

const columns = [
  {
    id: 'name',
    header: 'Name',
    cell: (row: User) => <span className="font-medium">{row.name}</span>,
    sortable: true,
  },
  {
    id: 'email',
    header: 'Email',
    cell: (row: User) => row.email,
    sortable: true,
  },
  {
    id: 'role',
    header: 'Role',
    cell: (row: User) => row.role,
    sortable: true,
  },
  {
    id: 'status',
    header: 'Status',
    cell: (row: User) => (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          row.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}
      >
        {row.status}
      </span>
    ),
    sortable: true,
  },
  {
    id: 'lastLogin',
    header: 'Last Login',
    cell: (row: User) => row.lastLogin,
    sortable: true,
  },
]

export const Default: Story = {
  args: {
    data: users,
    // @ts-expect-error - storybook inference
    columns: columns,
    initialPageSize: 5,
  },
}

export const Empty: Story = {
  args: {
    data: [],
    // @ts-expect-error - storybook inference
    columns: columns,
  },
}

export const Loading: Story = {
  args: {
    data: [],
    // @ts-expect-error - storybook inference
    columns: columns,
    isLoading: true,
  },
}
