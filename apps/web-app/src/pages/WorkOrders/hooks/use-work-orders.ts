import { useEffect, useState } from 'react'
import type { WorkOrder, WorkOrderStats } from '../types'

const MOCK_DATA: WorkOrder[] = [
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
  {
    id: 'WO-2024-005',
    title: 'Hydraulic Press Maintenance',
    assetId: 'AST-008',
    assetName: 'Press #4',
    location: 'Heavy Machinery Zone',
    priority: 'critical',
    status: 'open',
    dueDate: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days overdue
  },
  {
    id: 'WO-2024-006',
    title: 'Fire Extinguisher Check',
    assetId: 'AST-ALL',
    assetName: 'All Assets',
    location: 'All Zones',
    priority: 'high',
    status: 'open',
    dueDate: new Date(Date.now() + 86400000 * 7).toISOString(), // Next week
  },
]

export function useWorkOrders() {
  const [data, setData] = useState<WorkOrder[]>([])
  const [stats, setStats] = useState<WorkOrderStats>({ total: 0, critical: 0, overdue: 0 })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      setData(MOCK_DATA)

      // Calculate stats
      const total = MOCK_DATA.length
      const critical = MOCK_DATA.filter(
        (wo) => wo.priority === 'critical' && wo.status !== 'completed'
      ).length
      const overdue = MOCK_DATA.filter((wo) => {
        return new Date(wo.dueDate) < new Date() && wo.status !== 'completed'
      }).length

      setStats({ total, critical, overdue })
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return { data, stats, isLoading }
}
