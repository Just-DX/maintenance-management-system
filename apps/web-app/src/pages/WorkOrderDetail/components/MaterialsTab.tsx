import { Button } from '@justdx/components/atoms/Button'
import { EmptyState } from '@justdx/components/atoms/EmptyState'
import { Input } from '@justdx/components/atoms/Input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@justdx/components/atoms/Table'
import { Package, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

import type { WorkOrderMaterial } from '@features/work-orders'
import { workOrderDetailCopy } from '../constants/copy'

interface MaterialsTabProps {
  materials: WorkOrderMaterial[]
  isEditing?: boolean
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

// View Mode Component
function MaterialsViewMode({ materials }: { materials: WorkOrderMaterial[] }) {
  const copy = workOrderDetailCopy.materials

  if (materials.length === 0) {
    return <EmptyState icon={Package} title={copy.empty} className="p-12 border rounded-lg" />
  }

  const totalPlanCost = materials.reduce((sum, m) => sum + m.totalPlanCost, 0)
  const totalActualCost = materials.reduce((sum, m) => sum + (m.totalActualCost ?? 0), 0)

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">{copy.columns.name}</TableHead>
            <TableHead className="text-right font-semibold">{copy.columns.planQty}</TableHead>
            <TableHead className="text-right font-semibold">{copy.columns.actualQty}</TableHead>
            <TableHead className="text-right font-semibold">{copy.columns.unitCost}</TableHead>
            <TableHead className="text-right font-semibold">{copy.columns.totalPlanCost}</TableHead>
            <TableHead className="text-right font-semibold">
              {copy.columns.totalActualCost}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.map((material) => (
            <TableRow key={material.id}>
              <TableCell className="font-medium">{material.name}</TableCell>
              <TableCell className="text-right">{material.planQuantity}</TableCell>
              <TableCell className="text-right">{material.actualQuantity ?? '-'}</TableCell>
              <TableCell className="text-right">{formatCurrency(material.unitCost)}</TableCell>
              <TableCell className="text-right">{formatCurrency(material.totalPlanCost)}</TableCell>
              <TableCell className="text-right">
                {material.totalActualCost !== undefined
                  ? formatCurrency(material.totalActualCost)
                  : '-'}
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-muted/30 font-semibold">
            <TableCell colSpan={4} className="text-right">
              {copy.totalLabel}
            </TableCell>
            <TableCell className="text-right text-primary">
              {formatCurrency(totalPlanCost)}
            </TableCell>
            <TableCell className="text-right text-primary">
              {formatCurrency(totalActualCost)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

interface EditableMaterial {
  id: string
  name: string
  planQuantity: number
  actualQuantity?: number
  unitCost: number
}

// Edit Mode Component
function MaterialsEditMode({ materials }: { materials: WorkOrderMaterial[] }) {
  const copy = workOrderDetailCopy.materials
  const [items, setItems] = useState<EditableMaterial[]>(
    materials.map((m) => ({
      id: m.id,
      name: m.name,
      planQuantity: m.planQuantity,
      actualQuantity: m.actualQuantity,
      unitCost: m.unitCost,
    }))
  )

  const addMaterial = () => {
    setItems([
      ...items,
      {
        id: `new-${Date.now()}`,
        name: '',
        planQuantity: 1,
        actualQuantity: undefined,
        unitCost: 0,
      },
    ])
  }

  const removeMaterial = (id: string) => {
    setItems(items.filter((m) => m.id !== id))
  }

  const updateMaterial = (id: string, field: keyof EditableMaterial, value: string | number) => {
    setItems(items.map((m) => (m.id === id ? { ...m, [field]: value } : m)))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold">{copy.sectionTitle}</h3>
        <Button type="button" variant="outline" size="sm" onClick={addMaterial}>
          <Plus className="h-4 w-4 mr-2" />
          Add Material
        </Button>
      </div>

      {items.length === 0 ? (
        <EmptyState icon={Package} title={copy.empty} className="p-12 border rounded-lg" />
      ) : (
        <div className="rounded-lg border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">{copy.columns.name}</TableHead>
                <TableHead className="text-right font-semibold w-24">
                  {copy.columns.planQty}
                </TableHead>
                <TableHead className="text-right font-semibold w-24">
                  {copy.columns.actualQty}
                </TableHead>
                <TableHead className="text-right font-semibold w-28">
                  {copy.columns.unitCost}
                </TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Input
                      value={item.name}
                      onChange={(e) => updateMaterial(item.id, 'name', e.target.value)}
                      placeholder="Material name"
                      className="h-8"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.planQuantity}
                      onChange={(e) =>
                        updateMaterial(item.id, 'planQuantity', Number(e.target.value))
                      }
                      className="h-8 text-right"
                      min={1}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.actualQuantity ?? ''}
                      onChange={(e) =>
                        updateMaterial(item.id, 'actualQuantity', Number(e.target.value))
                      }
                      className="h-8 text-right"
                      min={0}
                      placeholder="-"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      step="0.01"
                      value={item.unitCost}
                      onChange={(e) => updateMaterial(item.id, 'unitCost', Number(e.target.value))}
                      className="h-8 text-right"
                      min={0}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive dark:text-destructive/60 hover:text-destructive/90"
                      onClick={() => removeMaterial(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

export function MaterialsTab({ materials, isEditing = false }: MaterialsTabProps) {
  if (isEditing) {
    return <MaterialsEditMode materials={materials} />
  }
  return <MaterialsViewMode materials={materials} />
}
