import { requiredString } from '@justdx/common'
import z from 'zod'

// ============================================================================
// Information Tab Schema
// ============================================================================

export const workOrderInfoSchema = z.object({
  assetId: requiredString('Asset is required'),
  location: z.string().optional(), // Auto-populated, readonly
  description: requiredString('Description is required').max(1000, 'Description is too long'),
  type: z.enum(['PREVENTIVE', 'CORRECTIVE']),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  status: z.enum(['open', 'in-progress', 'on-hold', 'completed', 'cancelled']).default('open'),
  expectedStartDate: z.date().optional(),
  expectedEndDate: z.date().optional(),
})

export type WorkOrderInfoFormData = z.infer<typeof workOrderInfoSchema>

// ============================================================================
// Task Schema (for task list)
// ============================================================================

export const workOrderTaskSchema = z.object({
  description: requiredString('Task description is required'),
  status: z.enum(['Pending', 'In Progress', 'Done']).default('Pending'),
  assignees: z.array(z.string()).default([]),
  planTime: z.number().min(0).optional(),
  type: z.enum(['passed', 'failed']).optional(),
  required: z.boolean().default(false),
})

export type WorkOrderTaskFormData = z.infer<typeof workOrderTaskSchema>

// ============================================================================
// Material Schema (for material list)
// ============================================================================

export const workOrderMaterialSchema = z.object({
  name: requiredString('Material name is required'),
  planQuantity: z.number().min(1, 'Quantity must be at least 1'),
  unitCost: z.number().min(0, 'Unit cost must be positive'),
  totalPlanCost: z.number().min(0).optional(), // Computed field
})

export type WorkOrderMaterialFormData = z.infer<typeof workOrderMaterialSchema>

// ============================================================================
// Combined Create Work Order Schema
// ============================================================================

export const createWorkOrderSchema = z
  .object({
    // Information tab fields
    assetId: requiredString('Asset is required'),
    location: z.string().optional(),
    description: requiredString('Description is required').max(1000, 'Description is too long'),
    type: z.enum(['PREVENTIVE', 'CORRECTIVE']),
    priority: z.enum(['low', 'medium', 'high', 'critical']),
    status: z.enum(['open', 'in-progress', 'on-hold', 'completed', 'cancelled']).default('open'),
    expectedStartDate: z.date().optional(),
    expectedEndDate: z.date().optional(),

    // Tasks array
    tasks: z.array(workOrderTaskSchema).default([]),

    // Materials array
    materials: z.array(workOrderMaterialSchema).default([]),
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
