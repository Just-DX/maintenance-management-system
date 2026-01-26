import { WorkOrdersHeader } from './components/WorkOrdersHeader'
import { WorkOrdersKPISection } from './components/WorkOrdersKpiSection'
import { WorkOrdersTable } from './components/WorkOrdersTable'
import { useWorkOrders } from './hooks/use-work-orders'

export function WorkOrdersPage() {
  const { data, stats, isLoading } = useWorkOrders()

  return (
    <div className="h-full flex-1 flex-col space-y-8 md:flex">
      <div className="flex flex-col gap-6 spacing-page">
        <WorkOrdersHeader />

        <WorkOrdersKPISection stats={stats} isLoading={isLoading} />
      </div>

      <WorkOrdersTable data={data} isLoading={isLoading} />
    </div>
  )
}
