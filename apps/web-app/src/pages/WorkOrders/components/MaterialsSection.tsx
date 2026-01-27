'use client'

import { Button } from '@justdx/components/atoms/Button'
import { EmptyState } from '@justdx/components/atoms/EmptyState'
import { Input } from '@justdx/components/atoms/Input'
import { Package, Plus, Trash2 } from 'lucide-react'
import { useFieldArray, type UseFormReturn } from 'react-hook-form'

import type { CreateWorkOrderFormData } from '../config/schema'
import { createWorkOrderCopy } from '../constants/copy'

interface MaterialsSectionProps {
  form: UseFormReturn<CreateWorkOrderFormData>
}

export function MaterialsSection({ form }: MaterialsSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'materials',
  })

  const handleAddMaterial = () => {
    append({
      name: '',
      planQuantity: 1,
      unitCost: 0,
      totalPlanCost: 0,
    })
  }

  // Calculate total cost when quantity or unit cost changes
  const calculateTotal = (index: number) => {
    const quantity = form.watch(`materials.${index}.planQuantity`) || 0
    const unitCost = form.watch(`materials.${index}.unitCost`) || 0
    return quantity * unitCost
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Package className="h-4 w-4" />
          {createWorkOrderCopy.sections.materials}
        </h4>
        <Button type="button" variant="outline" size="sm" onClick={handleAddMaterial}>
          <Plus className="h-4 w-4 mr-1" />
          {createWorkOrderCopy.materials.add}
        </Button>
      </div>

      {fields.length === 0 ? (
        <EmptyState
          icon={Package}
          title={createWorkOrderCopy.materials.empty}
          className="p-8 border-dashed"
          action={{
            label: createWorkOrderCopy.materials.add,
            onClick: handleAddMaterial,
          }}
        />
      ) : (
        <div className="space-y-3">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 px-4 text-xs font-medium text-muted-foreground">
            <div className="col-span-4">{createWorkOrderCopy.materials.name}</div>
            <div className="col-span-2 text-right">
              {createWorkOrderCopy.materials.planQuantity}
            </div>
            <div className="col-span-2 text-right">{createWorkOrderCopy.materials.unitCost}</div>
            <div className="col-span-3 text-right">
              {createWorkOrderCopy.materials.totalPlanCost}
            </div>
            <div className="col-span-1" />
          </div>

          {/* Material Rows */}
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-12 gap-2 items-center rounded-lg border p-3 bg-muted/30 group hover:border-primary/50 transition-colors"
            >
              {/* Material Name */}
              <div className="col-span-4">
                <Input
                  {...form.register(`materials.${index}.name`)}
                  placeholder={createWorkOrderCopy.materials.name}
                />
              </div>

              {/* Plan Quantity */}
              <div className="col-span-2">
                <Input
                  type="number"
                  {...form.register(`materials.${index}.planQuantity`, { valueAsNumber: true })}
                  placeholder="Qty"
                  className="text-right"
                  min={1}
                />
              </div>

              {/* Unit Cost */}
              <div className="col-span-2">
                <Input
                  type="number"
                  {...form.register(`materials.${index}.unitCost`, { valueAsNumber: true })}
                  placeholder="$0.00"
                  className="text-right"
                  step="0.01"
                  min={0}
                />
              </div>

              {/* Total Cost (Computed) */}
              <div className="col-span-3 text-right pr-2">
                <span className="text-sm font-medium">${calculateTotal(index).toFixed(2)}</span>
              </div>

              {/* Delete Button */}
              <div className="col-span-1 flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {/* Total Row */}
          {fields.length > 0 && (
            <div className="grid grid-cols-12 gap-2 px-4 pt-2 border-t">
              <div className="col-span-8 text-sm font-medium text-right">Total:</div>
              <div className="col-span-3 text-right">
                <span className="text-sm font-semibold text-primary">
                  ${fields.reduce((sum, _, index) => sum + calculateTotal(index), 0).toFixed(2)}
                </span>
              </div>
              <div className="col-span-1" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
