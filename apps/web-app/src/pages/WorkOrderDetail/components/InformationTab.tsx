import {
  type CreateWorkOrderFormData,
  informationFields,
  type WorkOrderDetail,
} from '@features/work-orders'
import { DATE_FORMAT, DATE_TIME_FORMAT, formatDate } from '@justdx/common'
import { AutoFields } from '@justdx/components/molecules/AutoField'
import type { UseFormReturn } from 'react-hook-form'
import { workOrderDetailCopy } from '../constants/copy'

interface InformationTabProps {
  workOrder: WorkOrderDetail
  isEditing?: boolean
  form?: UseFormReturn<CreateWorkOrderFormData>
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 border-b last:border-b-0">
      <dt className="text-sm font-medium text-muted-foreground sm:w-40 shrink-0">{label}</dt>
      <dd className="text-sm">{value || '-'}</dd>
    </div>
  )
}

// View Mode Component
function InformationViewMode({ workOrder }: { workOrder: WorkOrderDetail }) {
  const copy = workOrderDetailCopy.information

  const typeLabels: Record<string, string> = {
    PREVENTIVE: 'Preventive Maintenance',
    CORRECTIVE: 'Corrective Maintenance',
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-sm font-semibold mb-4">{copy.sectionTitle}</h3>
        <dl>
          <InfoRow label={copy.asset} value={workOrder.assetName} />
          <InfoRow label={copy.location} value={workOrder.location} />
          <InfoRow
            label={copy.description}
            value={<p className="whitespace-pre-wrap">{workOrder.description}</p>}
          />
          <InfoRow label={copy.type} value={typeLabels[workOrder.type] || workOrder.type} />
          <InfoRow
            label={copy.priority}
            value={<span className="capitalize">{workOrder.priority}</span>}
          />
          <InfoRow
            label={copy.status}
            value={<span className="capitalize">{workOrder.status.replace('-', ' ')}</span>}
          />
        </dl>
      </div>

      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-sm font-semibold mb-4">Schedule</h3>
        <dl>
          <InfoRow
            label={copy.expectedStartDate}
            value={formatDate(workOrder.expectedStartDate, DATE_FORMAT)}
          />
          <InfoRow
            label={copy.expectedEndDate}
            value={formatDate(workOrder.expectedEndDate, DATE_FORMAT)}
          />
          <InfoRow
            label={copy.createdAt}
            value={formatDate(workOrder.createdAt, DATE_TIME_FORMAT)}
          />
          <InfoRow
            label={copy.updatedAt}
            value={formatDate(workOrder.updatedAt, DATE_TIME_FORMAT)}
          />
        </dl>
      </div>
    </div>
  )
}

// Edit Mode Component
function InformationEditMode({ form }: { form: UseFormReturn<CreateWorkOrderFormData> }) {
  const copy = workOrderDetailCopy.information

  return (
    <div className="space-y-6">
      {/* Basic Information Section */}
      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-sm font-semibold mb-4">{copy.sectionTitle}</h3>
        <div className="grid gap-4">
          <AutoFields<CreateWorkOrderFormData> form={form} fields={informationFields.slice(0, 6)} />
        </div>
      </div>

      {/* Schedule Section */}
      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-sm font-semibold mb-4">Schedule</h3>
        <div className="grid grid-cols-2 gap-4">
          <AutoFields<CreateWorkOrderFormData> form={form} fields={informationFields.slice(6)} />
        </div>
      </div>
    </div>
  )
}

export function InformationTab({ workOrder, isEditing = false, form }: InformationTabProps) {
  if (isEditing && form) {
    return <InformationEditMode form={form} />
  }
  return <InformationViewMode workOrder={workOrder} />
}
