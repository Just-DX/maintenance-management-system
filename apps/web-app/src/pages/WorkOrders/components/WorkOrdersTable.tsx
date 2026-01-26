import { Avatar, AvatarFallback, AvatarImage, cn } from '@justdx/components'
import { StatusBadge } from '@justdx/components/atoms/StatusBadge'
import { RecordTable, type ColumnDef } from '@justdx/components/organisms/RecordTable'
import { format, formatDistanceToNow } from 'date-fns'
import type { WorkOrder } from '../types'
import { WorkOrderQuickActions } from './WorkOrderQuickActions'

interface WorkOrdersTableProps {
  data: WorkOrder[]
}

const columns: ColumnDef<WorkOrder>[] = [
  {
    id: 'id',
    header: 'ID',
    cell: (row) => <span className="font-mono text-xs text-muted-foreground">{row.id}</span>,
    className: 'w-[100px]',
  },
  {
    id: 'title',
    header: 'Title',
    cell: (row) => (
      <div className="flex flex-col">
        <span>{row.title}</span>
        {row.priority === 'critical' && (
          <span className="text-[10px] text-destructive font-semibold">CRITICAL</span>
        )}
      </div>
    ),
  },
  {
    id: 'asset',
    header: 'Asset',
    cell: (row) => (
      <div className="flex flex-col text-sm">
        <span className="font-medium">{row.assetName}</span>
        <span className="text-xs text-muted-foreground">{row.assetId}</span>
      </div>
    ),
  },
  {
    id: 'location',
    header: 'Location',
    cell: (row) => <span className="text-muted-foreground">{row.location}</span>,
  },
  {
    id: 'status',
    header: 'Status',
    cell: (row) => <StatusBadge status={row.status} />,
  },
  {
    id: 'dueDate',
    header: 'Due Date',
    cell: (row) => <DueDateCell date={row.dueDate} isCompleted={row.status === 'completed'} />,
  },
  {
    id: 'assignedTo',
    header: 'Assigned',
    cell: (row) => (
      <div className="flex items-center justify-end gap-3 group">
        <WorkOrderQuickActions />
        {row.assignedTo ? (
          <Avatar className="h-8 w-8 border">
            <AvatarImage src={row.assignedTo.avatar} alt={row.assignedTo.name} />
            <AvatarFallback>{row.assignedTo.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
        ) : null}
      </div>
    ),
    className: 'text-right',
  },
]

export function WorkOrdersTable({ data }: WorkOrdersTableProps) {
  return (
    <div className="rounded-md border bg-card shadow-sm overflow-hidden">
      <RecordTable data={data} columns={columns} showPagination={true} pageSize={10} />
    </div>
  )
}

function DueDateCell({ date, isCompleted }: { date: string; isCompleted: boolean }) {
  const dateObj = new Date(date)
  const isOverdue = !isCompleted && dateObj < new Date()
  const isDueSoon = !isCompleted && !isOverdue && dateObj.getTime() - Date.now() < 86400000 * 2

  return (
    <div
      className={cn('flex flex-col text-sm', {
        'text-destructive font-medium': isOverdue,
        'text-orange-500 font-medium': isDueSoon,
        'text-muted-foreground': !isOverdue && !isDueSoon,
      })}
    >
      <span>{format(dateObj, 'MMM d, yyyy')}</span>
      <span className="text-[10px] opacity-80">
        {isCompleted ? 'Done' : formatDistanceToNow(dateObj, { addSuffix: true })}
      </span>
    </div>
  )
}
