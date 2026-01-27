// Work Order API
// Mock API functions for work orders

import type { WorkOrderDetail, WorkOrderStats } from './types'

// ============================================================================
// Mock Work Order Detail Data
// ============================================================================

const mockWorkOrderDetail: WorkOrderDetail = {
  id: 'wo-001',
  title: 'HVAC Preventive Maintenance',
  assetId: 'asset-1',
  assetName: 'HVAC Unit #1',
  location: 'Building A, Floor 1',
  description:
    'Perform scheduled preventive maintenance on HVAC unit including filter replacement, coil cleaning, and system inspection.',
  type: 'PREVENTIVE',
  priority: 'medium',
  status: 'in-progress',
  expectedStartDate: '2026-01-27',
  expectedEndDate: '2026-01-28',
  assignedTo: {
    id: 'user-1',
    name: 'John Smith',
    avatar: '',
  },
  createdAt: '2026-01-20T08:00:00Z',
  updatedAt: '2026-01-27T10:30:00Z',
  materials: [
    {
      id: 'mat-1',
      name: 'Air Filter 20x25x1',
      planQuantity: 4,
      actualQuantity: 4,
      unitCost: 12.5,
      totalPlanCost: 50,
      totalActualCost: 50,
    },
    {
      id: 'mat-2',
      name: 'Coil Cleaner Spray',
      planQuantity: 2,
      actualQuantity: 3,
      unitCost: 18.0,
      totalPlanCost: 36,
      totalActualCost: 54,
    },
    {
      id: 'mat-3',
      name: 'Lubricant Oil',
      planQuantity: 1,
      actualQuantity: 1,
      unitCost: 25.0,
      totalPlanCost: 25,
      totalActualCost: 25,
    },
  ],
  tasks: [
    {
      id: 'task-1',
      description: 'Replace air filters',
      status: 'Done',
      assignees: [{ id: 'user-1', name: 'John Smith' }],
      planTime: 0.5,
      actualTime: 0.75,
      type: 'passed',
      required: true,
    },
    {
      id: 'task-2',
      description: 'Clean condenser coils',
      status: 'Done',
      assignees: [{ id: 'user-1', name: 'John Smith' }],
      planTime: 1,
      actualTime: 1.25,
      type: 'passed',
      required: true,
    },
    {
      id: 'task-3',
      description: 'Check refrigerant levels',
      status: 'In Progress',
      assignees: [
        { id: 'user-1', name: 'John Smith' },
        { id: 'user-2', name: 'Sarah Johnson' },
      ],
      planTime: 0.5,
      actualTime: undefined,
      type: undefined,
      required: true,
    },
    {
      id: 'task-4',
      description: 'Lubricate moving parts',
      status: 'Pending',
      assignees: [{ id: 'user-2', name: 'Sarah Johnson' }],
      planTime: 0.25,
      actualTime: undefined,
      type: undefined,
      required: false,
    },
  ],
  otherCosts: [
    {
      id: 'oc-1',
      description: 'Equipment rental - Pressure gauge',
      quantity: 1,
      cost: 35.0,
    },
    {
      id: 'oc-2',
      description: 'Disposal fee - Old filters',
      quantity: 1,
      cost: 15.0,
    },
  ],
  attachments: [
    {
      id: 'att-1',
      fileName: 'before-inspection.jpg',
      fileUrl: '/attachments/before-inspection.jpg',
      fileType: 'image/jpeg',
      fileSize: 245000,
      uploadedAt: '2026-01-27T09:00:00Z',
    },
    {
      id: 'att-2',
      fileName: 'maintenance-checklist.pdf',
      fileUrl: '/attachments/maintenance-checklist.pdf',
      fileType: 'application/pdf',
      fileSize: 125000,
      uploadedAt: '2026-01-27T08:30:00Z',
    },
  ],
}

// ============================================================================
// API Functions
// ============================================================================

export async function getWorkOrderDetail(id: string): Promise<WorkOrderDetail> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock data (in real app, fetch from API)
  return {
    ...mockWorkOrderDetail,
    id,
  }
}

export async function getWorkOrderStats(): Promise<WorkOrderStats> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    total: 24,
    critical: 3,
    overdue: 5,
    open: 8,
    inProgress: 10,
    completed: 6,
  }
}
