import { type ColumnDef } from '@justdx/components/organisms/ClientTable'

import { type OtherCost, type WorkOrderMaterial } from '@features/work-orders'
import { formatCurrency } from '@justdx/common'

import { workOrderDetailCopy } from '../constants/copy'

export const materialsColumns: ColumnDef<WorkOrderMaterial>[] = [
  {
    id: 'name',
    header: workOrderDetailCopy.materials.columns.name,
    cell: (row) => <span className="font-medium">{row.name}</span>,
    sortable: true,
  },
  {
    id: 'planQuantity',
    header: workOrderDetailCopy.materials.columns.planQty,
    cell: (row) => row.planQuantity,
    sortable: true,
    className: 'text-right',
  },
  {
    id: 'actualQuantity',
    header: workOrderDetailCopy.materials.columns.actualQty,
    cell: (row) => row.actualQuantity ?? '-',
    sortable: true,
    className: 'text-right',
  },
  {
    id: 'unitCost',
    header: workOrderDetailCopy.materials.columns.unitCost,
    cell: (row) => formatCurrency(row.unitCost),
    sortable: true,
    className: 'text-right',
  },
  {
    id: 'totalPlanCost',
    header: workOrderDetailCopy.materials.columns.totalPlanCost,
    cell: (row) => formatCurrency(row.totalPlanCost),
    sortable: true,
    className: 'text-right',
  },
  {
    id: 'totalActualCost',
    header: workOrderDetailCopy.materials.columns.totalActualCost,
    cell: (row) => (row.totalActualCost !== undefined ? formatCurrency(row.totalActualCost) : '-'),
    sortable: true,
    className: 'text-right',
  },
]

export const otherCostsColumns: ColumnDef<OtherCost>[] = [
  {
    id: 'description',
    header: workOrderDetailCopy.otherCosts.columns.description,
    cell: (row) => <span className="font-medium">{row.description}</span>,
    sortable: true,
  },
  {
    id: 'quantity',
    header: workOrderDetailCopy.otherCosts.columns.quantity,
    cell: (row) => row.quantity,
    sortable: true,
    className: 'text-right',
  },
  {
    id: 'cost',
    header: workOrderDetailCopy.otherCosts.columns.cost,
    cell: (row) => formatCurrency(row.cost),
    sortable: true,
    className: 'text-right',
  },
  {
    id: 'total',
    header: 'Total',
    cell: (row) => formatCurrency(row.quantity * row.cost),
    sortable: true,
    className: 'text-right',
  },
]
