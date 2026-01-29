import { EmptyState } from '@justdx/components/atoms/EmptyState'
import { Table, TableCell, TableRow } from '@justdx/components/atoms/Table'
import { AutoArrayFields } from '@justdx/components/molecules/AutoField'
import { ClientTable } from '@justdx/components/organisms/ClientTable'
import { Receipt } from 'lucide-react'
import { type UseFormReturn } from 'react-hook-form'

import { type CreateWorkOrderFormData, type OtherCost } from '@features/work-orders'
import { formatCurrency } from '@justdx/common'
import { otherCostsColumns } from '../config/table-columns'
import { workOrderDetailCopy } from '../constants/copy'

interface OtherCostsTabProps {
  otherCosts: OtherCost[]
  isEditing?: boolean
  form?: UseFormReturn<CreateWorkOrderFormData>
}

// View Mode Component
function OtherCostsViewMode({ otherCosts }: { otherCosts: OtherCost[] }) {
  const copy = workOrderDetailCopy.otherCosts

  const columns = otherCostsColumns

  const total = otherCosts.reduce((sum, c) => sum + c.quantity * c.cost, 0)

  const footer = (
    <Table.Body>
      <TableRow className="bg-muted/30 font-semibold hover:bg-muted/30">
        <TableCell colSpan={3} className="text-right">
          {copy.totalLabel}
        </TableCell>
        <TableCell className="text-right text-primary">{formatCurrency(total)}</TableCell>
      </TableRow>
    </Table.Body>
  )

  return (
    <div className="bg-card rounded-lg border overflow-hidden">
      <ClientTable
        data={otherCosts}
        columns={columns}
        emptyState={
          <EmptyState icon={Receipt} title={copy.empty} className="p-12 border-0 rounded-none" />
        }
        showPagination={otherCosts.length > 5}
        pageSizeOptions={[5, 10, 20]}
        initialPageSize={5}
        footer={otherCosts.length > 0 ? footer : undefined}
        className="border-0"
      />
    </div>
  )
}

// Edit Mode Component (using useFieldArray)
function OtherCostsEditMode({ form }: { form: UseFormReturn<CreateWorkOrderFormData> }) {
  const copy = workOrderDetailCopy.otherCosts

  return (
    <AutoArrayFields<CreateWorkOrderFormData>
      form={form}
      config={{
        name: 'otherCosts',
        layout: 'table',
        itemFields: [
          {
            name: 'description',
            type: 'input',
            label: copy.columns.description,
            width: 'auto',
            placeholder: 'Cost description',
          },
          {
            name: 'quantity',
            type: 'input',
            label: copy.columns.quantity,
            width: 'sm',
            placeholder: 'Qty',
            props: { type: 'number', min: 1, className: 'text-right' },
            rules: { valueAsNumber: true },
          },
          {
            name: 'cost',
            type: 'input',
            label: copy.columns.cost,
            width: 'sm',
            placeholder: '$0.00',
            props: { type: 'number', step: '0.01', min: 0, className: 'text-right' },
            rules: { valueAsNumber: true },
          },
          {
            name: 'total',
            type: 'custom',
            label: 'Total',
            width: 'sm',
            render: ({ form, index }) => {
              const qty = form.watch(`otherCosts.${index}.quantity`) || 0
              const cost = form.watch(`otherCosts.${index}.cost`) || 0
              return (
                <div className="text-right text-sm font-medium pr-2">
                  ${(qty * cost).toFixed(2)}
                </div>
              )
            },
          },
        ],
        defaultItem: { description: '', quantity: 1, cost: 0 },
        emptyState: {
          icon: Receipt,
          title: copy.empty,
          className: 'p-12 border rounded-lg',
        },
        addButton: { label: 'Add Cost' },
        title: copy.sectionTitle,
        footer: ({ form, fields }) => {
          if (fields.length === 0) return null

          const total = fields.reduce((sum, _, index) => {
            const qty = form.watch(`otherCosts.${index}.quantity`) || 0
            const cost = form.watch(`otherCosts.${index}.cost`) || 0
            return sum + qty * cost
          }, 0)

          return (
            <TableRow>
              <TableCell colSpan={3} className="text-right font-semibold">
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

export function OtherCostsTab({ otherCosts, isEditing = false, form }: OtherCostsTabProps) {
  if (isEditing && form) {
    return <OtherCostsEditMode form={form} />
  }
  return <OtherCostsViewMode otherCosts={otherCosts} />
}
