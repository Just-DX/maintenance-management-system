// Work Order Constants
// Shared options and mock data

// ============================================================================
// Status Options
// ============================================================================

export const workOrderStatusOptions = [
  { value: 'open', label: 'Open' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'on-hold', label: 'On Hold' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
] as const

// ============================================================================
// Priority Options
// ============================================================================

export const workOrderPriorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
] as const

// ============================================================================
// Type Options
// ============================================================================

export const workOrderTypeOptions = [
  { value: 'PREVENTIVE', label: 'Preventive' },
  { value: 'CORRECTIVE', label: 'Corrective' },
] as const

// ============================================================================
// Task Status Options
// ============================================================================

export const taskStatusOptions = [
  { value: 'Pending', label: 'Pending' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Done', label: 'Done' },
] as const

// ============================================================================
// Task Type Options
// ============================================================================

export const taskTypeOptions = [
  { value: 'passed', label: 'Passed' },
  { value: 'failed', label: 'Failed' },
] as const

// ============================================================================
// Mock Assets
// ============================================================================

export const mockAssets = [
  { value: 'asset-1', label: 'HVAC Unit #1', location: 'Building A, Floor 1' },
  { value: 'asset-2', label: 'Elevator #2', location: 'Building A, Main Lobby' },
  { value: 'asset-3', label: 'Generator #3', location: 'Building B, Basement' },
  { value: 'asset-4', label: 'Cooling Tower #4', location: 'Building C, Rooftop' },
]

// ============================================================================
// Mock Assignees
// ============================================================================

export const mockAssignees = [
  { value: 'user-1', label: 'John Smith', avatar: '' },
  { value: 'user-2', label: 'Sarah Johnson', avatar: '' },
  { value: 'user-3', label: 'Mike Chen', avatar: '' },
  { value: 'user-4', label: 'Emily Davis', avatar: '' },
]

// ============================================================================
// Helper function to get asset location
// ============================================================================

export function getAssetLocation(assetId: string): string {
  const asset = mockAssets.find((a) => a.value === assetId)
  return asset?.location ?? ''
}

// ============================================================================
// Helper function to get asset name
// ============================================================================

export function getAssetName(assetId: string): string {
  const asset = mockAssets.find((a) => a.value === assetId)
  return asset?.label ?? ''
}
