import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell, Download, Filter, Home, Plus } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '../atoms/Badge'
import { Breadcrumb } from '../atoms/Breadcrumb'
import { Button } from '../atoms/Button'
import { Sidebar } from '../atoms/Sidebar'
import { PageHeader } from '../molecules/PageHeader'
import { TableToolbar } from '../molecules/TableToolbar'
import { AppShell } from '../organisms/AppShell'
import { mockAppShellProps, mockNavigationItems } from '../organisms/AppShell/AppShell.fixtures'
import { PageLayout } from '../organisms/PageLayout'
import { RecordTable, type ColumnDef } from '../organisms/RecordTable'
import { mockUsers, type MockUser } from '../organisms/RecordTable/RecordTable.fixtures'

const meta = {
  title: 'Templates/ListPageTemplate',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

// Reusable sidebar for templates
const TemplateSidebar = () => (
  <Sidebar variant="inset">
    <Sidebar.Header>
      <Sidebar.MenuButton size="lg">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Home className="size-4" />
        </div>
        <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden!">
          <span className="font-semibold">{mockAppShellProps.appName}</span>
        </div>
      </Sidebar.MenuButton>
    </Sidebar.Header>
    <Sidebar.Content>
      <Sidebar.Group>
        <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            {mockNavigationItems.map((item) => (
              <Sidebar.MenuItem key={item.label}>
                <Sidebar.MenuButton isActive={item.isActive} tooltip={item.label}>
                  <item.icon className="size-4" />
                  <span>{item.label}</span>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            ))}
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>
    </Sidebar.Content>
    <Sidebar.Footer>
      <Sidebar.Menu>
        <Sidebar.MenuItem>
          <Sidebar.MenuButton tooltip={mockAppShellProps.user.name}>
            <div className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
              {mockAppShellProps.user.avatar}
            </div>
            <span>{mockAppShellProps.user.name}</span>
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
      </Sidebar.Menu>
    </Sidebar.Footer>
    <Sidebar.Rail />
  </Sidebar>
)

// User columns for the list page
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
          row.status === 'Active' ? 'default' : row.status === 'Inactive' ? 'secondary' : 'outline'
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
]

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [search, setSearch] = useState('')
    const [sortColumn, setSortColumn] = useState<string>('name')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

    // Filter and sort data
    const filteredData = mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    )

    const sortedData = [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn as keyof MockUser]
      const bValue = b[sortColumn as keyof MockUser]
      const comparison = String(aValue).localeCompare(String(bValue))
      return sortDirection === 'asc' ? comparison : -comparison
    })

    const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize)

    return (
      <AppShell
        sidebar={<TemplateSidebar />}
        header={
          <AppShell.Header>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">Users</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="size-4" />
              </Button>
            </div>
          </AppShell.Header>
        }
      >
        <PageLayout
          variant="list"
          header={
            <PageHeader
              title="Users"
              description="Manage your team members and their permissions."
              breadcrumb={
                <Breadcrumb>
                  <Breadcrumb.List>
                    <Breadcrumb.Item>
                      <Breadcrumb.Link href="/">Dashboard</Breadcrumb.Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator />
                    <Breadcrumb.Item>
                      <Breadcrumb.Page>Users</Breadcrumb.Page>
                    </Breadcrumb.Item>
                  </Breadcrumb.List>
                </Breadcrumb>
              }
              actions={
                <Button size="sm">
                  <Plus className="h-4 w-4" />
                  Add User
                </Button>
              }
            />
          }
        >
          <RecordTable
            data={paginatedData}
            columns={userColumns}
            page={page}
            pageSize={pageSize}
            total={filteredData.length}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSortChange={(column, direction) => {
              setSortColumn(column)
              setSortDirection(direction)
              setPage(1)
            }}
            toolbar={
              <TableToolbar
                searchValue={search}
                onSearchChange={(value) => {
                  setSearch(value)
                  setPage(1)
                }}
                searchPlaceholder="Search users..."
                filters={
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                }
                actions={
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                }
              />
            }
          />
        </PageLayout>
      </AppShell>
    )
  },
}

export const EmptyState: Story = {
  render: () => {
    const [search, setSearch] = useState('nonexistent user xyz')

    return (
      <AppShell
        sidebar={<TemplateSidebar />}
        header={
          <AppShell.Header>
            <h1 className="text-lg font-semibold">Users</h1>
          </AppShell.Header>
        }
      >
        <PageLayout
          variant="list"
          header={
            <PageHeader
              title="Users"
              description="Manage your team members and their permissions."
              actions={
                <Button size="sm">
                  <Plus className="h-4 w-4" />
                  Add User
                </Button>
              }
            />
          }
        >
          <RecordTable
            data={[]}
            columns={userColumns}
            showPagination={false}
            toolbar={
              <TableToolbar
                searchValue={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search users..."
              />
            }
          />
        </PageLayout>
      </AppShell>
    )
  },
}

export const Loading: Story = {
  render: () => (
    <AppShell
      sidebar={<TemplateSidebar />}
      header={
        <AppShell.Header>
          <h1 className="text-lg font-semibold">Users</h1>
        </AppShell.Header>
      }
    >
      <PageLayout
        variant="list"
        header={
          <PageHeader
            title="Users"
            description="Manage your team members and their permissions."
            actions={
              <Button size="sm">
                <Plus className="h-4 w-4" />
                Add User
              </Button>
            }
          />
        }
      >
        <RecordTable
          data={[]}
          columns={userColumns}
          isLoading
          showPagination={false}
          toolbar={<TableToolbar searchPlaceholder="Search users..." />}
        />
      </PageLayout>
    </AppShell>
  ),
}
