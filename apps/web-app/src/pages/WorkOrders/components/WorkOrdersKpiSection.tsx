import { Card, CardContent, CardHeader, CardTitle, Skeleton } from '@justdx/components'
import { Activity, AlertOctagon } from 'lucide-react'
import type { WorkOrderStats } from '../types'

interface WorkOrdersKPISectionProps {
  stats: WorkOrderStats
  isLoading?: boolean
}

export function WorkOrdersKPISection({ stats, isLoading }: WorkOrdersKPISectionProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-3 mb-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="shadow-sm border-border/50">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-2">
      <Card className="shadow-sm border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Work Orders
          </CardTitle>
          <Activity className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground mt-1">Active maintenance tasks</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-border/50 bg-warning/5 dark:bg-warning/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-warning">Critical Priority</CardTitle>
          <AlertOctagon className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warning">{stats.critical}</div>
          <p className="text-xs text-warning/80 mt-1">Requires immediate attention</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-border/50 bg-destructive/5 dark:bg-destructive/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-destructive">Overdue Tasks</CardTitle>
          <div className="h-4 w-4 rounded-full bg-destructive/20 text-destructive flex items-center justify-center text-[10px] font-bold">
            !
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive dark:text-destructive">
            {stats.overdue}
          </div>
          <p className="text-xs text-destructive mt-1">Exceeded due date</p>
        </CardContent>
      </Card>
    </div>
  )
}
