import { useEffect, useState } from 'react'
import { workOrdersMockData } from '../constants/mock-data'
import type { WorkOrderStats } from '../types'

export function useWorkOrders() {
  const [data, setData] = useState(workOrdersMockData)
  const [stats, setStats] = useState<WorkOrderStats>({ total: 0, critical: 0, overdue: 0 })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      setData(workOrdersMockData)
      setStats(buildWorkOrderStats(workOrdersMockData))
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return { data, stats, isLoading }
}

function buildWorkOrderStats(workOrders: typeof workOrdersMockData): WorkOrderStats {
  const total = workOrders.length
  const critical = workOrders.filter(
    (wo) => wo.priority === 'critical' && wo.status !== 'completed'
  ).length
  const overdue = workOrders.filter((wo) => {
    return new Date(wo.dueDate) < new Date() && wo.status !== 'completed'
  }).length

  return { total, critical, overdue }
}
