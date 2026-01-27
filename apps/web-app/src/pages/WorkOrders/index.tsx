import { Dialog } from '@justdx/components/atoms/Dialog'
import { CreateWorkOrderModal } from './components/CreateWorkOrderModal'
import { WorkOrdersHeader } from './components/WorkOrdersHeader'
import { WorkOrdersKPISection } from './components/WorkOrdersKpiSection'
import { WorkOrdersTable } from './components/WorkOrdersTable'
import { useCreateWorkOrderForm } from './hooks/use-create-work-order-form'
import { useWorkOrders } from './hooks/use-work-orders'

export function WorkOrdersPage() {
  const { open, handleOpenChange, form, onSubmit, isSubmitting } = useCreateWorkOrderForm()
  const { data, stats, isLoading } = useWorkOrders()

  return (
    <div className="h-full flex-1 flex-col space-y-8 md:flex">
      <div className="flex flex-col gap-6 spacing-page">
        <WorkOrdersHeader />

        <WorkOrdersKPISection stats={stats} isLoading={isLoading} />
      </div>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <WorkOrdersTable data={data} isLoading={isLoading} />
        <CreateWorkOrderModal
          form={form}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          onOpenChange={handleOpenChange}
        />
      </Dialog>
    </div>
  )
}
