import { WorkOrdersKPISection } from './components/WorkOrdersKpiSection'
import { WorkOrdersLoading } from './components/WorkOrdersLoading'
import { WorkOrdersTable } from './components/WorkOrdersTable'
import { useWorkOrders } from './hooks/use-work-orders'

export function WorkOrdersPage() {
  const { data, stats, isLoading } = useWorkOrders()

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Work Orders</h2>
          <p className="text-muted-foreground">
            Manage and track maintenance tasks across all facilities.
          </p>
        </div>
      </div>

      {isLoading ? (
        <WorkOrdersLoading />
      ) : (
        <>
          <WorkOrdersKPISection stats={stats} />
          <WorkOrdersTable data={data} />
        </>
      )}
    </div>
  )
}
