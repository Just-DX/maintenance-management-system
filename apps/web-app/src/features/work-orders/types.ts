// Work Order Types
// Shared between WorkOrders list and WorkOrderDetail pages

// ============================================================================
// Base Enums / Literals
// ============================================================================

export type WorkOrderType = 'PREVENTIVE' | 'CORRECTIVE'
export type WorkOrderPriority = 'low' | 'medium' | 'high' | 'critical'
export type WorkOrderStatus = 'open' | 'in-progress' | 'on-hold' | 'completed' | 'cancelled'
export type TaskStatus = 'Pending' | 'In Progress' | 'Done'
export type TaskResultType = 'passed' | 'failed'

// ============================================================================
// Assignee
// ============================================================================

export interface Assignee {
  id: string
  name: string
  avatar?: string
}

// ============================================================================
// Work Order Material
// ============================================================================

export interface WorkOrderMaterial {
  id: string
  name: string
  planQuantity: number
  actualQuantity?: number
  unitCost: number
  totalPlanCost: number
  totalActualCost?: number
}

// ============================================================================
// Work Order Task
// ============================================================================

export interface WorkOrderTask {
  id: string
  description: string
  status: TaskStatus
  assignees: Assignee[]
  planTime?: number
  actualTime?: number
  type?: TaskResultType
  required: boolean
}

// ============================================================================
// Other Cost
// ============================================================================

export interface OtherCost {
  id: string
  description: string
  quantity: number
  cost: number
}

// ============================================================================
// Attachment
// ============================================================================

export interface WorkOrderAttachment {
  id: string
  fileName: string
  fileUrl: string
  fileType: string
  fileSize: number
  uploadedAt: string
}

// ============================================================================
// Work Order (Base - for list view)
// ============================================================================

export interface WorkOrder {
  id: string
  title: string
  assetId: string
  assetName: string
  location: string
  description: string
  type: WorkOrderType
  priority: WorkOrderPriority
  status: WorkOrderStatus
  expectedStartDate?: string
  expectedEndDate?: string
  assignedTo?: Assignee
  createdAt: string
  updatedAt: string
}

// ============================================================================
// Work Order Detail (Full - for detail view)
// ============================================================================

export interface WorkOrderDetail extends WorkOrder {
  materials: WorkOrderMaterial[]
  tasks: WorkOrderTask[]
  otherCosts: OtherCost[]
  attachments: WorkOrderAttachment[]
}

// ============================================================================
// Work Order Stats (for dashboard/KPIs)
// ============================================================================

export interface WorkOrderStats {
  total: number
  critical: number
  overdue: number
  open: number
  inProgress: number
  completed: number
}
