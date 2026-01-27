import { requiredString } from '@justdx/common'
import z from 'zod'

// ============================================================================
// Task Schema
// ============================================================================

export const workOrderTaskSchema = z.object({
  description: requiredString('Task description is required'),
  status: z.enum(['Pending', 'In Progress', 'Done']),
  assignees: z.array(z.string()),
  planTime: z.number().min(0).optional(),
  actualTime: z.number().min(0).optional(),
  type: z.enum(['passed', 'failed']).optional(),
  required: z.boolean(),
})

export type WorkOrderTaskFormData = z.infer<typeof workOrderTaskSchema>

// ============================================================================
// Material Schema
// ============================================================================

export const workOrderMaterialSchema = z.object({
  name: requiredString('Material name is required'),
  planQuantity: z.number().min(1, 'Quantity must be at least 1'),
  actualQuantity: z.number().min(0).optional(),
  unitCost: z.number().min(0, 'Unit cost must be positive'),
  totalPlanCost: z.number().min(0).optional(),
  totalActualCost: z.number().min(0).optional(),
})

export type WorkOrderMaterialFormData = z.infer<typeof workOrderMaterialSchema>

// ============================================================================
// Other Cost Schema
// ============================================================================

export const otherCostSchema = z.object({
  description: requiredString('Description is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  cost: z.number().min(0, 'Cost must be positive'),
})

export type OtherCostFormData = z.infer<typeof otherCostSchema>

// ============================================================================
// Attachment Schema
// ============================================================================

export const workOrderAttachmentSchema = z.object({
  id: z.string(),
  fileName: z.string(),
  fileUrl: z.string(),
  fileType: z.string(),
  fileSize: z.number(),
  uploadedAt: z.string(),
})

export type WorkOrderAttachmentData = z.infer<typeof workOrderAttachmentSchema>

// ============================================================================
// Information Schema
// ============================================================================

export const workOrderInfoSchema = z.object({
  assetId: requiredString('Asset is required'),
  location: z.string().optional(),
  description: requiredString('Description is required').max(1000, 'Description is too long'),
  type: z.enum(['PREVENTIVE', 'CORRECTIVE']),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  status: z.enum(['open', 'in-progress', 'on-hold', 'completed', 'cancelled']),
  expectedStartDate: z.date().optional(),
  expectedEndDate: z.date().optional(),
})

export type WorkOrderInfoFormData = z.infer<typeof workOrderInfoSchema>

// ============================================================================
// Create Work Order Schema (Combined)
// ============================================================================

export const createWorkOrderSchema = z
  .object({
    assetId: requiredString('Asset is required'),
    location: z.string().optional(),
    description: requiredString('Description is required').max(1000, 'Description is too long'),
    type: z.enum(['PREVENTIVE', 'CORRECTIVE']),
    priority: z.enum(['low', 'medium', 'high', 'critical']),
    status: z.enum(['open', 'in-progress', 'on-hold', 'completed', 'cancelled']),
    expectedStartDate: z.date().optional(),
    expectedEndDate: z.date().optional(),
    tasks: z.array(workOrderTaskSchema),
    materials: z.array(workOrderMaterialSchema),
    otherCosts: z.array(otherCostSchema),
  })
  .refine(
    (data) => {
      if (data.expectedStartDate && data.expectedEndDate) {
        return data.expectedEndDate >= data.expectedStartDate
      }
      return true
    },
    {
      message: 'End date must be after start date',
      path: ['expectedEndDate'],
    }
  )

export type CreateWorkOrderFormData = z.infer<typeof createWorkOrderSchema>
