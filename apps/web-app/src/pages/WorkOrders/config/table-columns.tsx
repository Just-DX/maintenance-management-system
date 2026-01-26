import { Avatar, AvatarFallback } from '@justdx/components'
import { StatusBadge } from '@justdx/components/atoms/StatusBadge'
import { type ColumnDef } from '@justdx/components/organisms/RecordTable'

import { getInitials } from '@justdx/common'
import { WorkOrderDueDateCell } from '../components/WorkOrderDueDateCell'
import { WorkOrderQuickActions } from '../components/WorkOrderQuickActions'
import type { WorkOrder } from '../types'

export const workOrdersColumns: ColumnDef<WorkOrder>[] = [
  {
    id: 'id',
    header: 'ID',
    cell: (row) => <span className="font-mono text-xs text-muted-foreground">{row.id}</span>,
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
    cell: (row) => (
      <WorkOrderDueDateCell date={row.dueDate} isCompleted={row.status === 'completed'} />
    ),
  },
  {
    id: 'assignedTo',
    header: 'Assigned',
    cell: (row) => (
      <div className="flex items-center justify-end gap-3 group">
        <WorkOrderQuickActions />
        {row.assignedTo ? (
          <Avatar className="h-8 w-8 border">
            <AvatarFallback>{getInitials(row.assignedTo.name)}</AvatarFallback>
          </Avatar>
        ) : null}
      </div>
    ),
    className: 'text-right',
  },
]
