import { getRelativeTime } from '@justdx/common'
import { Button } from '@justdx/components'
import { DropdownMenu } from '@justdx/components/atoms/DropdownMenu'
import { PriorityBadge, type PriorityLevel } from '@justdx/components/atoms/PriorityBadge'
import { StatusBadge, type StatusType } from '@justdx/components/atoms/StatusBadge'
import { PageHeader } from '@justdx/components/molecules/PageHeader'
import { TableToolbar } from '@justdx/components/molecules/TableToolbar'
import { RecordTable, type ColumnDef } from '@justdx/components/organisms/RecordTable'
import { MoreHorizontal, Plus } from 'lucide-react'

const SAMPLE = {
  ACTIVE_SITE_NAME: 'Main Campus',
  paginatedData: [
    {
      id: '1',
      code: 'WO-0001',
      title: 'Work Order 1',
      asset: 'Asset 1',
      location: 'Location 1',
      status: 'open',
      priority: 'high',
      assignee: 'Assignee 1',
      dueDate: '2024-01-15',
    },
    {
      id: '2',
      code: 'WO-0002',
      title: 'Work Order 2',
      asset: 'Asset 2',
      location: 'Location 2',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'Assignee 2',
      dueDate: '2024-01-20',
    },
    {
      id: '3',
      code: 'WO-0003',
      title: 'Work Order 3',
      asset: 'Asset 3',
      location: 'Location 3',
      status: 'open',
      priority: 'low',
      assignee: 'Assignee 3',
      dueDate: '2024-01-25',
    },
    {
      id: '4',
      code: 'WO-0004',
      title: 'Work Order 4',
      asset: 'Asset 4',
      location: 'Location 4',
      status: 'open',
      priority: 'high',
      assignee: 'Assignee 4',
      dueDate: '2024-01-30',
    },
    {
      id: '5',
      code: 'WO-0005',
      title: 'Work Order 5',
      asset: 'Asset 5',
      location: 'Location 5',
      status: 'open',
      priority: 'medium',
      assignee: 'Assignee 5',
      dueDate: '2024-02-05',
    },
    {
      id: '6',
      code: 'WO-0006',
      title: 'Work Order 6',
      asset: 'Asset 6',
      location: 'Location 6',
      status: 'on-hold',
      priority: 'low',
      assignee: 'Assignee 6',
      dueDate: '2024-02-10',
    },
    {
      id: '7',
      code: 'WO-0007',
      title: 'Work Order 7',
      asset: 'Asset 7',
      location: 'Location 7',
      status: 'open',
      priority: 'high',
      assignee: 'Assignee 7',
      dueDate: '2024-02-15',
    },
    {
      id: '8',
      code: 'WO-0008',
      title: 'Work Order 8',
      asset: 'Asset 8',
      location: 'Location 8',
      status: 'open',
      priority: 'medium',
      assignee: 'Assignee 8',
      dueDate: '2024-02-20',
    },
    {
      id: '9',
      code: 'WO-0009',
      title: 'Work Order 9',
      asset: 'Asset 9',
      location: 'Location 9',
      status: 'completed',
      priority: 'low',
      assignee: 'Assignee 9',
      dueDate: '2024-02-25',
    },
    {
      id: '10',
      code: 'WO-0010',
      title: 'Work Order 10',
      asset: 'Asset 10',
      location: 'Location 10',
      status: 'canceled',
      priority: 'critical',
      assignee: 'Assignee 10',
      dueDate: '2025-03-05',
    },
  ],
}

export interface WorkOrder {
  id: string
  code: string
  title: string
  asset: string
  location: string
  status: StatusType
  priority: PriorityLevel
  assignee: string
  dueDate: string
}

const workOrderColumns: ColumnDef<WorkOrder>[] = [
  {
    id: 'code',
    header: 'Work Order #',
    cell: (row) => <span className="font-medium">{row.code}</span>,
    sortable: true,
  },
  {
    id: 'title',
    header: 'Title',
    cell: (row) => row.title,
  },
  {
    id: 'asset',
    header: 'Asset/Location',
    cell: (row) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.asset}</span>
        <span className="text-sm text-muted-foreground">{row.location}</span>
      </div>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    cell: (row) => <StatusBadge status={row.status} />,
  },
  {
    id: 'priority',
    header: 'Priority',
    cell: (row) => <PriorityBadge priority={row.priority} />,
  },
  {
    id: 'assignee',
    header: 'Assignee',
    cell: (row) => row.assignee,
  },
  {
    id: 'dueDate',
    header: 'Due Date',
    cell: (row) => getRelativeTime(row.dueDate),
  },
  {
    id: 'actions',
    header: '',
    cell: () => (
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <MoreHorizontal className="w-4 h-4" />
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

export function WorkOrdersPage() {
  return (
    <div>
      <PageHeader
        title="Work Orders"
        description={`Manage maintenance work orders for ${SAMPLE.ACTIVE_SITE_NAME}`}
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New Work Order
          </Button>
        }
      />

      <div className="mt-6">
        <RecordTable
          data={SAMPLE.paginatedData as WorkOrder[]}
          columns={workOrderColumns}
          page={1}
          pageSize={10}
          total={SAMPLE.paginatedData.length}
          onPageChange={() => console.log('page changed')}
          onPageSizeChange={() => console.log('page size changed')}
          toolbar={
            <TableToolbar
              searchValue=""
              onSearchChange={(value) => {
                console.log('search changed', value)
              }}
              searchPlaceholder="Search users..."
            />
          }
        />
      </div>
    </div>
  )
}
