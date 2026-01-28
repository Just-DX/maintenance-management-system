import { Form } from '@justdx/components/atoms/Form'
import { ScrollArea } from '@justdx/components/atoms/ScrollArea'
import { Skeleton } from '@justdx/components/atoms/Skeleton'
import { Tabs } from '@justdx/components/atoms/Tabs'
import { PageLayout } from '@justdx/components/organisms/PageLayout'
import { useParams } from '@tanstack/react-router'
import { ClipboardList, Info, Package, Paperclip, Receipt } from 'lucide-react'

import type { WorkOrderDetail } from '@features/work-orders'
import { AttachmentsTab } from './components/AttachmentsTab'
import { InformationTab } from './components/InformationTab'
import { MaterialsTab } from './components/MaterialsTab'
import { OtherCostsTab } from './components/OtherCostsTab'
import { TasksTab } from './components/TasksTab'
import { WorkOrderDetailHeader } from './components/WorkOrderDetailHeader'
import { workOrderDetailCopy } from './constants/copy'
import { useWorkOrderDetail } from './hooks/useWorkOrderDetail'
import { useWorkOrderEditForm } from './hooks/useWorkOrderEditForm'

function WorkOrderDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-36" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
      <Skeleton className="h-10 w-full" />
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  )
}

interface WorkOrderDetailContentProps {
  workOrder: WorkOrderDetail
}

function WorkOrderDetailContent({ workOrder }: WorkOrderDetailContentProps) {
  const { form, isEditing, startEditing, cancelEditing, handleSubmit } =
    useWorkOrderEditForm(workOrder)

  const handlePrint = () => {
    window.print()
  }

  const handleDelete = () => {
    console.log('Delete work order:', workOrder.id)
  }

  const handleAttachmentDownload = (attachment: { fileUrl: string; fileName: string }) => {
    const link = document.createElement('a')
    link.href = attachment.fileUrl
    link.download = attachment.fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleAttachmentPreview = (attachment: { fileUrl: string }) => {
    window.open(attachment.fileUrl, '_blank')
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <WorkOrderDetailHeader
          workOrder={workOrder}
          isEditing={isEditing}
          isSaving={false}
          onEdit={startEditing}
          onSave={() => handleSubmit()}
          onCancel={cancelEditing}
          onPrint={handlePrint}
          onDelete={handleDelete}
        />

        <Tabs defaultValue="information" className="mt-6">
          <Tabs.List className="w-full grid grid-cols-2 sm:grid-cols-5 gap-1">
            <Tabs.Trigger value="information" className="gap-2">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">{workOrderDetailCopy.tabs.information}</span>
            </Tabs.Trigger>
            <Tabs.Trigger value="materials" className="gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">{workOrderDetailCopy.tabs.materials}</span>
            </Tabs.Trigger>
            <Tabs.Trigger value="tasks" className="gap-2">
              <ClipboardList className="h-4 w-4" />
              <span className="hidden sm:inline">{workOrderDetailCopy.tabs.tasks}</span>
            </Tabs.Trigger>
            <Tabs.Trigger value="otherCosts" className="gap-2">
              <Receipt className="h-4 w-4" />
              <span className="hidden sm:inline">{workOrderDetailCopy.tabs.otherCosts}</span>
            </Tabs.Trigger>
            <Tabs.Trigger value="attachments" className="gap-2">
              <Paperclip className="h-4 w-4" />
              <span className="hidden sm:inline">{workOrderDetailCopy.tabs.attachments}</span>
            </Tabs.Trigger>
          </Tabs.List>

          <ScrollArea className="mt-6">
            <Tabs.Content value="information" className="mt-0">
              <InformationTab workOrder={workOrder} isEditing={isEditing} form={form} />
            </Tabs.Content>

            <Tabs.Content value="materials" className="mt-0">
              <MaterialsTab materials={workOrder.materials} isEditing={isEditing} form={form} />
            </Tabs.Content>

            <Tabs.Content value="tasks" className="mt-0">
              <TasksTab tasks={workOrder.tasks} isEditing={isEditing} form={form} />
            </Tabs.Content>

            <Tabs.Content value="otherCosts" className="mt-0">
              <OtherCostsTab otherCosts={workOrder.otherCosts} isEditing={isEditing} form={form} />
            </Tabs.Content>

            <Tabs.Content value="attachments" className="mt-0">
              <AttachmentsTab
                attachments={workOrder.attachments}
                isEditing={isEditing}
                onDownload={handleAttachmentDownload}
                onPreview={handleAttachmentPreview}
              />
            </Tabs.Content>
          </ScrollArea>
        </Tabs>
      </form>
    </Form>
  )
}

export function WorkOrderDetailPage() {
  const { id } = useParams({ from: '/app/work-orders/$id' })
  const { data: workOrder, isLoading, isError } = useWorkOrderDetail(id)

  if (isLoading) {
    return (
      <PageLayout className="py-6">
        <WorkOrderDetailSkeleton />
      </PageLayout>
    )
  }

  if (isError || !workOrder) {
    return (
      <PageLayout className="py-6">
        <div className="text-center py-12">
          <p className="text-destructive">Failed to load work order details</p>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout className="py-6">
      <WorkOrderDetailContent workOrder={workOrder} />
    </PageLayout>
  )
}
