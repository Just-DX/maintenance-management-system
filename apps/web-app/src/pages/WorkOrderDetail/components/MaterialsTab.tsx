import { EmptyState } from '@justdx/components/atoms/EmptyState'
import { Table, TableCell, TableRow } from '@justdx/components/atoms/Table'
import { AutoArrayFields } from '@justdx/components/molecules/AutoField'
import { ClientTable } from '@justdx/components/organisms/ClientTable'
import { Package } from 'lucide-react'
import { type UseFormReturn } from 'react-hook-form'

import { type CreateWorkOrderFormData, type WorkOrderMaterial } from '@features/work-orders'
import { formatCurrency } from '@justdx/common'
import { materialsColumns } from '../config/table-columns'
import { workOrderDetailCopy } from '../constants/copy'

interface MaterialsTabProps {
  materials: WorkOrderMaterial[]
  isEditing?: boolean
  form?: UseFormReturn<CreateWorkOrderFormData>
}

// View Mode Component
function MaterialsViewMode({ materials }: { materials: WorkOrderMaterial[] }) {
  const copy = workOrderDetailCopy.materials

  const columns = materialsColumns

  const totalPlanCost = materials.reduce((sum, m) => sum + m.totalPlanCost, 0)
  const totalActualCost = materials.reduce((sum, m) => sum + (m.totalActualCost ?? 0), 0)

  const footer = (
    <Table.Body>
      <TableRow className="bg-muted/30 font-semibold hover:bg-muted/30">
        <TableCell colSpan={4} className="text-right">
          {copy.totalLabel}
        </TableCell>
        <TableCell className="text-right text-primary">{formatCurrency(totalPlanCost)}</TableCell>
        <TableCell className="text-right text-primary">{formatCurrency(totalActualCost)}</TableCell>
      </TableRow>
    </Table.Body>
  )

  return (
    <div className="bg-card rounded-lg border overflow-hidden">
      <ClientTable
        data={materials}
        columns={columns}
        emptyState={
          <EmptyState icon={Package} title={copy.empty} className="p-12 border-0 rounded-none" />
        }
        showPagination={materials.length > 5}
        pageSizeOptions={[5, 10, 20]}
        initialPageSize={5}
        footer={materials.length > 0 ? footer : undefined}
        className="border-0"
      />
    </div>
  )
}

// Edit Mode Component (using useFieldArray like MaterialsSection)
function MaterialsEditMode({ form }: { form: UseFormReturn<CreateWorkOrderFormData> }) {
  const copy = workOrderDetailCopy.materials

  return (
    <AutoArrayFields<CreateWorkOrderFormData>
      form={form}
      config={{
        name: 'materials',
        layout: 'table',
        itemFields: [
          {
            name: 'name',
            type: 'input',
            label: copy.columns.name,
            width: 'auto', // Was 'xl' in section, but auto might be better here? Or xl.
            placeholder: 'Material name',
          },
          {
            name: 'planQuantity',
            type: 'input',
            label: copy.columns.planQty,
            width: 'sm',
            placeholder: 'Qty',
            props: { type: 'number', min: 1, className: 'text-right' },
            rules: { valueAsNumber: true },
          },
          {
            name: 'actualQuantity',
            type: 'input',
            label: copy.columns.actualQty,
            width: 'sm',
            placeholder: '-',
            props: { type: 'number', min: 0, className: 'text-right' },
            rules: { valueAsNumber: true },
          },
          {
            name: 'unitCost',
            type: 'input',
            label: copy.columns.unitCost,
            width: 'sm',
            placeholder: '$0.00',
            props: { type: 'number', min: 0, step: '0.01', className: 'text-right' },
            rules: { valueAsNumber: true },
          },
          {
            name: 'total',
            type: 'custom',
            label: 'Total',
            width: 'sm',
            render: ({ form, index }) => {
              const qty = form.watch(`materials.${index}.planQuantity`) || 0
              const cost = form.watch(`materials.${index}.unitCost`) || 0
              return (
                <div className="text-right text-sm font-medium pr-2">
                  ${(qty * cost).toFixed(2)}
                </div>
              )
            },
          },
        ],
        defaultItem: {
          name: '',
          planQuantity: 1,
          actualQuantity: undefined,
          unitCost: 0,
          totalPlanCost: 0,
          totalActualCost: undefined,
        },
        emptyState: {
          icon: Package,
          title: copy.empty,
          className: 'p-12 border rounded-lg',
        },
        addButton: { label: 'Add Material' },
        title: copy.sectionTitle,
        footer: ({ form, fields }) => {
          if (fields.length === 0) return null

          const total = fields.reduce((sum, _, index) => {
            const qty = form.watch(`materials.${index}.planQuantity`) || 0
            const cost = form.watch(`materials.${index}.unitCost`) || 0
            return sum + qty * cost
          }, 0)

          return (
            <TableRow>
              <TableCell colSpan={4} className="text-right font-semibold">
                Total:
              </TableCell>
              <TableCell className="text-right text-sm font-medium pr-12">
                ${total.toFixed(2)}
              </TableCell>
              <TableCell />
            </TableRow>
          )
        },
      }}
    />
  )
}

export function MaterialsTab({ materials, isEditing = false, form }: MaterialsTabProps) {
  if (isEditing && form) {
    return <MaterialsEditMode form={form} />
  }
  return <MaterialsViewMode materials={materials} />
}
