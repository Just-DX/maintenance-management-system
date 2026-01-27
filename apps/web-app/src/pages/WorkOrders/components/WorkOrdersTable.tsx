import { RecordTable } from '@justdx/components/organisms/RecordTable'

import { Button, TableToolbar } from '@justdx/components'
import { Dialog } from '@justdx/components/atoms/Dialog'
import { Plus } from 'lucide-react'
import { workOrdersColumns } from '../config/table-columns'
import type { WorkOrder } from '../types'

interface WorkOrdersTableProps {
  data: WorkOrder[]
  isLoading?: boolean
}

export function WorkOrdersTable({ data, isLoading }: WorkOrdersTableProps) {
  return (
    <RecordTable
      data={data}
      columns={workOrdersColumns}
      showPagination={true}
      total={data.length}
      page={1}
      pageSize={10}
      isLoading={isLoading}
      onPageChange={(page) => console.log('Page changed to:', page)}
      toolbar={
        <TableToolbar
          searchPlaceholder="Search work orders..."
          actions={
            <Dialog.Trigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4" />
                Add Work Order
              </Button>
            </Dialog.Trigger>
          }
        />
      }
    />
  )
}
