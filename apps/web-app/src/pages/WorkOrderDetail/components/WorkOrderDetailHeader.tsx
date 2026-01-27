import { Button } from '@justdx/components/atoms/Button'
import { DropdownMenu } from '@justdx/components/atoms/DropdownMenu'
import { PriorityBadge, type PriorityLevel } from '@justdx/components/atoms/PriorityBadge'
import { StatusBadge, type StatusType } from '@justdx/components/atoms/StatusBadge'
import { Link } from '@tanstack/react-router'
import { ChevronLeft, MoreVertical, Pencil, Printer, Save, Trash2, X } from 'lucide-react'

import type { WorkOrderDetail } from '@features/work-orders'
import { workOrderDetailCopy } from '../constants/copy'

interface WorkOrderDetailHeaderProps {
  workOrder: WorkOrderDetail
  isEditing?: boolean
  isSaving?: boolean
  onEdit?: () => void
  onSave?: () => void
  onCancel?: () => void
  onPrint?: () => void
  onDelete?: () => void
}

export function WorkOrderDetailHeader({
  workOrder,
  isEditing = false,
  isSaving = false,
  onEdit,
  onSave,
  onCancel,
  onPrint,
  onDelete,
}: WorkOrderDetailHeaderProps) {
  // Map status to StatusBadge type
  const statusMap: Record<string, StatusType> = {
    open: 'open',
    'in-progress': 'in-progress',
    'on-hold': 'on-hold',
    completed: 'completed',
    cancelled: 'canceled',
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      {/* Left Section */}
      <div className="space-y-3">
        {/* Back Button */}
        <Link
          to="/work-orders"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          {workOrderDetailCopy.header.backLabel}
        </Link>

        {/* Title and ID */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Work Order #{workOrder.id}
            {isEditing && <span className="ml-2 text-sm font-normal text-primary">(Editing)</span>}
          </h1>
          <p className="text-muted-foreground">{workOrder.assetName}</p>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2">
          <StatusBadge status={statusMap[workOrder.status] || 'open'} />
          <PriorityBadge priority={workOrder.priority as PriorityLevel} />
        </div>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            {/* Edit Mode Actions */}
            <Button variant="outline" size="sm" onClick={onCancel} disabled={isSaving}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button size="sm" onClick={onSave} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </>
        ) : (
          <>
            {/* View Mode Actions */}
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Pencil className="h-4 w-4 mr-2" />
              {workOrderDetailCopy.header.editLabel}
            </Button>

            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="end">
                <DropdownMenu.Item onClick={onPrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  {workOrderDetailCopy.header.printLabel}
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  onClick={onDelete}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {workOrderDetailCopy.header.deleteLabel}
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
          </>
        )}
      </div>
    </div>
  )
}
