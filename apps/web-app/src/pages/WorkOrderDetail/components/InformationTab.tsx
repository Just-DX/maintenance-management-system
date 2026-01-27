import { format } from 'date-fns'
import { useState } from 'react'

import { DatePicker } from '@justdx/components/atoms/DatePicker'
import { Input } from '@justdx/components/atoms/Input'
import { Select } from '@justdx/components/atoms/Select'
import { Textarea } from '@justdx/components/atoms/Textarea'

import type { WorkOrderDetail, WorkOrderType } from '@features/work-orders'
import {
  mockAssets,
  workOrderPriorityOptions,
  workOrderStatusOptions,
  workOrderTypeOptions,
} from '@features/work-orders'
import { Label } from '@justdx/components'
import { workOrderDetailCopy } from '../constants/copy'

interface InformationTabProps {
  workOrder: WorkOrderDetail
  isEditing?: boolean
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

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-'
    try {
      return format(new Date(dateString), 'MMM dd, yyyy')
    } catch {
      return dateString
    }
  }

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return '-'
    try {
      return format(new Date(dateString), 'MMM dd, yyyy HH:mm')
    } catch {
      return dateString
    }
  }

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
          <InfoRow label={copy.expectedStartDate} value={formatDate(workOrder.expectedStartDate)} />
          <InfoRow label={copy.expectedEndDate} value={formatDate(workOrder.expectedEndDate)} />
          <InfoRow label={copy.createdAt} value={formatDateTime(workOrder.createdAt)} />
          <InfoRow label={copy.updatedAt} value={formatDateTime(workOrder.updatedAt)} />
        </dl>
      </div>
    </div>
  )
}

// Edit Mode Component
function InformationEditMode({ workOrder }: { workOrder: WorkOrderDetail }) {
  const copy = workOrderDetailCopy.information

  const [assetId, setAssetId] = useState(workOrder.assetId)
  const [description, setDescription] = useState(workOrder.description)
  const [type, setType] = useState(workOrder.type)
  const [priority, setPriority] = useState(workOrder.priority)
  const [status, setStatus] = useState(workOrder.status)
  const [expectedStartDate, setExpectedStartDate] = useState<Date | undefined>(
    workOrder.expectedStartDate ? new Date(workOrder.expectedStartDate) : undefined
  )
  const [expectedEndDate, setExpectedEndDate] = useState<Date | undefined>(
    workOrder.expectedEndDate ? new Date(workOrder.expectedEndDate) : undefined
  )

  const selectedAsset = mockAssets.find((a) => a.value === assetId)

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-sm font-semibold mb-4">{copy.sectionTitle}</h3>
        <div className="space-y-4">
          {/* Asset Select */}
          <div>
            <label className="text-sm font-medium">{copy.asset}</label>
            <Select value={assetId} onValueChange={setAssetId}>
              <Select.Trigger className="mt-1">
                <Select.Value placeholder="Select asset" />
              </Select.Trigger>
              <Select.Content>
                {mockAssets.map((asset) => (
                  <Select.Item key={asset.value} value={asset.value}>
                    {asset.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>

          {/* Location (readonly) */}
          <div>
            <label className="text-sm font-medium">{copy.location}</label>
            <Input
              value={selectedAsset?.location ?? ''}
              disabled
              className="mt-1"
              placeholder="Auto-populated from asset"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">{copy.description}</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1"
              placeholder="Enter work order description"
            />
          </div>

          {/* Type */}
          <div>
            <label className="text-sm font-medium">{copy.type}</label>
            <Select value={type} onValueChange={(val: WorkOrderType) => setType(val)}>
              <Select.Trigger className="mt-1">
                <Select.Value placeholder="Select type" />
              </Select.Trigger>
              <Select.Content>
                {workOrderTypeOptions.map((opt) => (
                  <Select.Item key={opt.value} value={opt.value}>
                    {opt.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>

          {/* Priority */}
          <div>
            <label className="text-sm font-medium">{copy.priority}</label>
            <Select
              value={priority}
              onValueChange={(val) => setPriority(val as 'low' | 'medium' | 'high' | 'critical')}
            >
              <Select.Trigger className="mt-1">
                <Select.Value placeholder="Select priority" />
              </Select.Trigger>
              <Select.Content>
                {workOrderPriorityOptions.map((opt) => (
                  <Select.Item key={opt.value} value={opt.value}>
                    {opt.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium">{copy.status}</label>
            <Select
              value={status}
              onValueChange={(val) =>
                setStatus(val as 'open' | 'in-progress' | 'on-hold' | 'completed' | 'cancelled')
              }
            >
              <Select.Trigger className="mt-1">
                <Select.Value placeholder="Select status" />
              </Select.Trigger>
              <Select.Content>
                {workOrderStatusOptions.map((opt) => (
                  <Select.Item key={opt.value} value={opt.value}>
                    {opt.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-sm font-semibold mb-4">Schedule</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Expected Start Date */}
          <div className="flex gap-2">
            <Label>{copy.expectedStartDate}</Label>
            {/* TODO: Recheck all component using date picker */}
            <DatePicker
              date={expectedStartDate}
              onDateChange={setExpectedStartDate}
              className="mt-1"
            />
          </div>

          {/* Expected End Date */}
          <div className="flex gap-2">
            <Label>{copy.expectedEndDate}</Label>
            <DatePicker date={expectedEndDate} onDateChange={setExpectedEndDate} className="mt-1" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function InformationTab({ workOrder, isEditing = false }: InformationTabProps) {
  if (isEditing) {
    return <InformationEditMode workOrder={workOrder} />
  }
  return <InformationViewMode workOrder={workOrder} />
}
