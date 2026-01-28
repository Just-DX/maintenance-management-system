'use client'

import { Package } from 'lucide-react'
import { type UseFormReturn } from 'react-hook-form'

import { type CreateWorkOrderFormData } from '@features/work-orders'
import { TableCell, TableRow } from '@justdx/components/atoms/Table'
import { AutoArrayFields } from '@justdx/components/molecules/AutoField'
import { createWorkOrderCopy } from '../constants/copy'

interface MaterialsSectionProps {
  form: UseFormReturn<CreateWorkOrderFormData>
}

export function MaterialsSection({ form }: MaterialsSectionProps) {
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
            label: createWorkOrderCopy.materials.name,
            width: 'xl',
            placeholder: createWorkOrderCopy.materials.name,
          },
          {
            name: 'planQuantity',
            type: 'input',
            label: createWorkOrderCopy.materials.planQuantity,
            width: 'sm',
            placeholder: 'Qty',
            props: { type: 'number', min: 1, className: 'text-right' },
            rules: { valueAsNumber: true },
          },
          {
            name: 'unitCost',
            type: 'input',
            label: createWorkOrderCopy.materials.unitCost,
            width: 'sm',
            placeholder: '$0.00',
            props: { type: 'number', min: 0, step: '0.01', className: 'text-right' },
            rules: { valueAsNumber: true },
          },
          {
            name: 'total',
            type: 'custom',
            label: createWorkOrderCopy.materials.totalPlanCost,
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
          unitCost: 0,
          totalPlanCost: 0,
        },
        emptyState: {
          icon: Package,
          title: createWorkOrderCopy.materials.empty,
          className: 'p-8 border-dashed',
        },
        addButton: { label: createWorkOrderCopy.materials.add },
        title: createWorkOrderCopy.sections.materials,
        footer: ({ form, fields }) => {
          if (fields.length === 0) return null

          const total = fields.reduce((sum, _, index) => {
            const qty = form.watch(`materials.${index}.planQuantity`) || 0
            const cost = form.watch(`materials.${index}.unitCost`) || 0
            return sum + qty * cost
          }, 0)

          return (
            <TableRow className="bg-muted/30 font-semibold border-t">
              <TableCell colSpan={3} className="text-right">
                Total:
              </TableCell>
              <TableCell className="text-right text-primary pr-12">${total.toFixed(2)}</TableCell>
              <TableCell />
            </TableRow>
          )
        },
      }}
    />
  )
}
