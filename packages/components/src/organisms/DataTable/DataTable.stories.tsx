import type { Meta, StoryObj } from '@storybook/react-vite'
import { MoreHorizontal, Plus } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '../../atoms/Badge'
import { Button } from '../../atoms/Button'
import { DropdownMenu } from '../../atoms/DropdownMenu'
import { TableToolbar } from '../../molecules/TableToolbar'
import { DataTable, type ColumnDef } from './DataTable'
import { mockInvoices, mockUsers, type MockInvoice, type MockUser } from './DataTable.fixtures'

// User columns
const userColumns: ColumnDef<MockUser>[] = [
  {
    id: 'name',
    header: 'Name',
    cell: (row) => <span className="font-medium">{row.name}</span>,
    sortable: true,
  },
  {
    id: 'email',
    header: 'Email',
    cell: (row) => row.email,
    sortable: true,
  },
  {
    id: 'role',
    header: 'Role',
    cell: (row) => <Badge variant="outline">{row.role}</Badge>,
    sortable: true,
  },
  {
    id: 'status',
    header: 'Status',
    cell: (row) => (
      <Badge
        variant={
          row.status === 'Active' ? 'success' : row.status === 'Inactive' ? 'secondary' : 'outline'
        }
      >
        {row.status}
      </Badge>
    ),
  },
  {
    id: 'createdAt',
    header: 'Created',
    cell: (row) => row.createdAt,
    sortable: true,
  },
  {
    id: 'actions',
    header: '',
    cell: (row) => (
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <MoreHorizontal className="w-4 h-4" />
            <span className="sr-only">Open menu for {row.name}</span>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Item>View</DropdownMenu.Item>
          <DropdownMenu.Item>Edit</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item className="text-destructive">Delete</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    ),
    className: 'w-12',
  },
]

// Invoice columns
const invoiceColumns: ColumnDef<MockInvoice>[] = [
  {
    id: 'invoice',
    header: 'Invoice',
    cell: (row) => <span className="font-medium">{row.invoice}</span>,
  },
  {
    id: 'customer',
    header: 'Customer',
    cell: (row) => row.customer,
  },
  {
    id: 'amount',
    header: 'Amount',
    cell: (row) => `$${row.amount.toFixed(2)}`,
    className: 'text-right',
  },
  {
    id: 'status',
    header: 'Status',
    cell: (row) => (
      <Badge
        variant={
          row.status === 'Paid' ? 'default' : row.status === 'Pending' ? 'secondary' : 'destructive'
        }
      >
        {row.status}
      </Badge>
    ),
  },
  {
    id: 'dueDate',
    header: 'Due Date',
    cell: (row) => row.dueDate,
  },
]

const meta = {
  title: 'Organisms/DataTable',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const paginatedData = mockUsers.slice((page - 1) * pageSize, page * pageSize)

    return (
      <DataTable
        data={paginatedData}
        columns={userColumns}
        page={page}
        pageSize={pageSize}
        total={mockUsers.length}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    )
  },
}

export const WithToolbar: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [search, setSearch] = useState('')

    const filteredData = mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    )
    const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize)

    return (
      <DataTable
        data={paginatedData}
        columns={userColumns}
        page={page}
        pageSize={pageSize}
        total={filteredData.length}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        toolbar={
          <TableToolbar
            searchValue={search}
            onSearchChange={(value) => {
              setSearch(value)
              setPage(1) // Reset to first page on search
            }}
            searchPlaceholder="Search users..."
            actions={
              <Button size="sm">
                <Plus className="w-4 h-4" />
                Add User
              </Button>
            }
          />
        }
      />
    )
  },
}

export const WithSorting: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [sortColumn, setSortColumn] = useState<string>('name')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

    const sortedData = [...mockUsers].sort((a, b) => {
      const aValue = a[sortColumn as keyof MockUser]
      const bValue = b[sortColumn as keyof MockUser]
      const comparison = String(aValue).localeCompare(String(bValue))
      return sortDirection === 'asc' ? comparison : -comparison
    })

    const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize)

    return (
      <DataTable
        data={paginatedData}
        columns={userColumns}
        page={page}
        pageSize={pageSize}
        total={mockUsers.length}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSortChange={(column, direction) => {
          setSortColumn(column)
          setSortDirection(direction)
          setPage(1)
        }}
      />
    )
  },
}

export const Loading: Story = {
  render: () => <DataTable data={[]} columns={userColumns} isLoading showPagination={false} />,
}

export const Empty: Story = {
  render: () => <DataTable data={[]} columns={userColumns} showPagination={false} />,
}

export const EmptyWithToolbar: Story = {
  render: () => {
    const [search, setSearch] = useState('nonexistent search term')

    return (
      <DataTable
        data={[]}
        columns={userColumns}
        showPagination={false}
        toolbar={
          <TableToolbar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search users..."
            actions={
              <Button size="sm">
                <Plus className="w-4 h-4" />
                Add User
              </Button>
            }
          />
        }
      />
    )
  },
}

export const Invoices: Story = {
  render: () => <DataTable data={mockInvoices} columns={invoiceColumns} showPagination={false} />,
}

export const SmallPageSize: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    const pageSize = 5

    const paginatedData = mockUsers.slice((page - 1) * pageSize, page * pageSize)

    return (
      <DataTable
        data={paginatedData}
        columns={userColumns}
        page={page}
        pageSize={pageSize}
        total={mockUsers.length}
        onPageChange={setPage}
        pageSizeOptions={[5, 10, 15]}
      />
    )
  },
}

export const LongContent: Story = {
  render: () => {
    const longContentData: MockUser[] = [
      {
        id: '1',
        name: 'Dr. Alexander Maximilian Worthington III, PhD',
        email: 'alexander.maximilian.worthington.third@verylongcompanyname.example.com',
        role: 'Admin',
        status: 'Active',
        createdAt: '2024-01-15',
      },
      {
        id: '2',
        name: 'Lady Elizabeth Victoria Pemberton-Hawthorne',
        email: 'elizabeth.pemberton.hawthorne@anotherverylongdomain.co.uk',
        role: 'Editor',
        status: 'Pending',
        createdAt: '2024-02-20',
      },
    ]

    return <DataTable data={longContentData} columns={userColumns} showPagination={false} />
  },
}
