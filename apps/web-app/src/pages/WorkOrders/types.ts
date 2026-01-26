export interface WorkOrder {
  id: string
  title: string
  assetId: string
  assetName: string
  location: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'in-progress' | 'completed' | 'on-hold'
  dueDate: string // ISO string
  assignedTo?: {
    id: string
    name: string
    avatar: string
  }
}

export interface WorkOrderStats {
  total: number
  critical: number
  overdue: number
}
