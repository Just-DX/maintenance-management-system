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
import { Plus, Receipt, Trash2 } from 'lucide-react'
import { useState } from 'react'

import type { OtherCost } from '@features/work-orders'
import { workOrderDetailCopy } from '../constants/copy'

interface OtherCostsTabProps {
  otherCosts: OtherCost[]
  isEditing?: boolean
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

// View Mode Component
function OtherCostsViewMode({ otherCosts }: { otherCosts: OtherCost[] }) {
  const copy = workOrderDetailCopy.otherCosts

  if (otherCosts.length === 0) {
    return <EmptyState icon={Receipt} title={copy.empty} className="p-12 border rounded-lg" />
  }

  const total = otherCosts.reduce((sum, c) => sum + c.quantity * c.cost, 0)

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">{copy.columns.description}</TableHead>
            <TableHead className="text-right font-semibold">{copy.columns.quantity}</TableHead>
            <TableHead className="text-right font-semibold">{copy.columns.cost}</TableHead>
            <TableHead className="text-right font-semibold">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {otherCosts.map((cost) => (
            <TableRow key={cost.id}>
              <TableCell className="font-medium">{cost.description}</TableCell>
              <TableCell className="text-right">{cost.quantity}</TableCell>
              <TableCell className="text-right">{formatCurrency(cost.cost)}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(cost.quantity * cost.cost)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-muted/30 font-semibold">
            <TableCell colSpan={3} className="text-right">
              {copy.totalLabel}
            </TableCell>
            <TableCell className="text-right text-primary">{formatCurrency(total)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

interface EditableCost {
  id: string
  description: string
  quantity: number
  cost: number
}

// Edit Mode Component
function OtherCostsEditMode({ otherCosts }: { otherCosts: OtherCost[] }) {
  const copy = workOrderDetailCopy.otherCosts
  const [items, setItems] = useState<EditableCost[]>(
    otherCosts.map((c) => ({
      id: c.id,
      description: c.description,
      quantity: c.quantity,
      cost: c.cost,
    }))
  )

  const addCost = () => {
    setItems([
      ...items,
      {
        id: `new-${Date.now()}`,
        description: '',
        quantity: 1,
        cost: 0,
      },
    ])
  }

  const removeCost = (id: string) => {
    setItems(items.filter((c) => c.id !== id))
  }

  const updateCost = (id: string, field: keyof EditableCost, value: string | number) => {
    setItems(items.map((c) => (c.id === id ? { ...c, [field]: value } : c)))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold">{copy.sectionTitle}</h3>
        <Button type="button" variant="outline" size="sm" onClick={addCost}>
          <Plus className="h-4 w-4 mr-2" />
          Add Cost
        </Button>
      </div>

      {items.length === 0 ? (
        <EmptyState icon={Receipt} title={copy.empty} className="p-12 border rounded-lg" />
      ) : (
        <div className="rounded-lg border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">{copy.columns.description}</TableHead>
                <TableHead className="text-right font-semibold w-24">
                  {copy.columns.quantity}
                </TableHead>
                <TableHead className="text-right font-semibold w-28">{copy.columns.cost}</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Input
                      value={item.description}
                      onChange={(e) => updateCost(item.id, 'description', e.target.value)}
                      placeholder="Cost description"
                      className="h-8"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateCost(item.id, 'quantity', Number(e.target.value))}
                      className="h-8 text-right"
                      min={1}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      step="0.01"
                      value={item.cost}
                      onChange={(e) => updateCost(item.id, 'cost', Number(e.target.value))}
                      className="h-8 text-right"
                      min={0}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => removeCost(item.id)}
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

export function OtherCostsTab({ otherCosts, isEditing = false }: OtherCostsTabProps) {
  if (isEditing) {
    return <OtherCostsEditMode otherCosts={otherCosts} />
  }
  return <OtherCostsViewMode otherCosts={otherCosts} />
}
