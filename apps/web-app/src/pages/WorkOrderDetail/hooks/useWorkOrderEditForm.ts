import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  createWorkOrderSchema,
  type CreateWorkOrderFormData,
  type WorkOrderDetail,
} from '@features/work-orders'

// Transform WorkOrderDetail to form data
function transformToFormData(workOrder: WorkOrderDetail): CreateWorkOrderFormData {
  return {
    assetId: workOrder.assetId,
    location: workOrder.location,
    description: workOrder.description,
    type: workOrder.type,
    priority: workOrder.priority,
    status: workOrder.status,
    expectedStartDate: workOrder.expectedStartDate
      ? new Date(workOrder.expectedStartDate)
      : undefined,
    expectedEndDate: workOrder.expectedEndDate ? new Date(workOrder.expectedEndDate) : undefined,
    tasks: workOrder.tasks.map((t) => ({
      description: t.description,
      status: t.status,
      assignees: t.assignees.map((a) => a.id),
      planTime: t.planTime,
      actualTime: t.actualTime,
      type: t.type,
      required: t.required,
    })),
    materials: workOrder.materials.map((m) => ({
      name: m.name,
      planQuantity: m.planQuantity,
      actualQuantity: m.actualQuantity,
      unitCost: m.unitCost,
      totalPlanCost: m.totalPlanCost,
      totalActualCost: m.totalActualCost,
    })),
    otherCosts: workOrder.otherCosts.map((c) => ({
      description: c.description,
      quantity: c.quantity,
      cost: c.cost,
    })),
  }
}

export function useWorkOrderEditForm(workOrder: WorkOrderDetail) {
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<CreateWorkOrderFormData>({
    resolver: zodResolver(createWorkOrderSchema),
    defaultValues: transformToFormData(workOrder),
  })

  const startEditing = useCallback(() => {
    form.reset(transformToFormData(workOrder))
    setIsEditing(true)
  }, [form, workOrder])

  const cancelEditing = useCallback(() => {
    form.reset(transformToFormData(workOrder))
    setIsEditing(false)
  }, [form, workOrder])

  const saveChanges = useCallback(async (data: CreateWorkOrderFormData) => {
    try {
      console.log('Saving work order changes:', data)
      // TODO: Call API to save changes
      setIsEditing(false)
      return true
    } catch (error) {
      console.error('Failed to save work order:', error)
      return false
    }
  }, [])

  return {
    form,
    isEditing,
    startEditing,
    cancelEditing,
    saveChanges,
    handleSubmit: form.handleSubmit(saveChanges),
  }
}
