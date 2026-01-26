import { Card, CardContent, CardHeader } from '@justdx/components'
import { Skeleton } from '@justdx/components/atoms/Skeleton'

export function WorkOrdersLoading() {
  return (
    <div className="space-y-6">
      {/* KPI Skeleton */}
      <div className="grid gap-4 md:grid-cols-3">
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

      {/* Table Skeleton */}
      <div className="rounded-md border bg-card shadow-sm overflow-hidden p-0">
        <Skeleton.Table />
      </div>
    </div>
  )
}
