import type { WorkOrder } from '../types'

export const workOrdersMockData: WorkOrder[] = [
  {
    id: 'WO-2024-001',
    title: 'HVAC Filter Replacement',
    assetId: 'AST-001',
    assetName: 'Main Building HVAC Unit',
    location: 'Roof - Zone A',
    priority: 'medium',
    status: 'open',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
  },
  {
    id: 'WO-2024-002',
    title: 'Emergency Generator Test',
    assetId: 'AST-004',
    assetName: 'Backup Generator',
    location: 'Basement',
    priority: 'critical',
    status: 'open',
    dueDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday (Overdue)
  },
  {
    id: 'WO-2024-003',
    title: 'Conveyor Belt Inspection',
    assetId: 'AST-012',
    assetName: 'Line 3 Conveyor',
    location: 'Production Floor',
    priority: 'high',
    status: 'in-progress',
    dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    assignedTo: {
      id: 'USR-001',
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
    },
  },
  {
    id: 'WO-2024-004',
    title: 'Light Fixture Repair',
    assetId: 'AST-022',
    assetName: 'Hallway Lights',
    location: 'Level 2 Corridor',
    priority: 'low',
    status: 'completed',
    dueDate: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    assignedTo: {
      id: 'USR-002',
      name: 'Mike Ross',
      avatar: 'https://i.pravatar.cc/150?u=mike',
    },
  },
]
