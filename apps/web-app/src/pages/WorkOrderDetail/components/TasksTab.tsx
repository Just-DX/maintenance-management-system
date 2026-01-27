import { Avatar, AvatarFallback } from '@justdx/components/atoms/Avatar'
import { Badge } from '@justdx/components/atoms/Badge'
import { Button } from '@justdx/components/atoms/Button'
import { Checkbox } from '@justdx/components/atoms/Checkbox'
import { EmptyState } from '@justdx/components/atoms/EmptyState'
import { Input } from '@justdx/components/atoms/Input'
import { Select } from '@justdx/components/atoms/Select'
import { StatusBadge, type StatusType } from '@justdx/components/atoms/StatusBadge'
import { CheckCircle2, ClipboardList, Plus, Trash2, XCircle } from 'lucide-react'
import { useState } from 'react'

import type { WorkOrderTask } from '@features/work-orders'
import { taskStatusOptions } from '@features/work-orders'
import { getInitials } from '@justdx/common'
import { workOrderDetailCopy } from '../constants/copy'

interface TasksTabProps {
  tasks: WorkOrderTask[]
  isEditing?: boolean
}

// View Mode Component
function TasksViewMode({ tasks }: { tasks: WorkOrderTask[] }) {
  const copy = workOrderDetailCopy.tasks

  if (tasks.length === 0) {
    return <EmptyState icon={ClipboardList} title={copy.empty} className="p-12 border rounded-lg" />
  }

  const taskStatusMap: Record<string, StatusType> = {
    Pending: 'open',
    'In Progress': 'in-progress',
    Done: 'completed',
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="rounded-lg border bg-card p-4 hover:border-primary/50 transition-colors"
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex-1 space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="font-medium">{task.description}</p>
                  {task.required && (
                    <Badge variant="outline" className="mt-1 text-xs">
                      Required
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{copy.columns.status}:</span>
                  <StatusBadge status={taskStatusMap[task.status] || 'open'} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{copy.columns.planTime}:</span>
                  <span>{task.planTime ? `${task.planTime}h` : '-'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{copy.columns.actualTime}:</span>
                  <span>{task.actualTime ? `${task.actualTime}h` : '-'}</span>
                </div>
                {task.type && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{copy.columns.type}:</span>
                    {task.type === 'passed' ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle2 className="h-4 w-4" /> Passed
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-destructive">
                        <XCircle className="h-4 w-4" /> Failed
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            {task.assignees.length > 0 && (
              <div className="flex -space-x-2">
                {task.assignees.slice(0, 3).map((assignee) => (
                  <Avatar key={assignee.id} className="h-8 w-8 border-2 border-background">
                    <AvatarFallback className="text-xs">
                      {getInitials(assignee.name)}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {task.assignees.length > 3 && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                    +{task.assignees.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

interface EditableTask {
  id: string
  description: string
  status: 'Pending' | 'In Progress' | 'Done'
  planTime?: number
  actualTime?: number
  required: boolean
}

// Edit Mode Component
function TasksEditMode({ tasks }: { tasks: WorkOrderTask[] }) {
  const copy = workOrderDetailCopy.tasks
  const [items, setItems] = useState<EditableTask[]>(
    tasks.map((t) => ({
      id: t.id,
      description: t.description,
      status: t.status,
      planTime: t.planTime,
      actualTime: t.actualTime,
      required: t.required,
    }))
  )

  const addTask = () => {
    setItems([
      ...items,
      {
        id: `new-${Date.now()}`,
        description: '',
        status: 'Pending',
        planTime: undefined,
        actualTime: undefined,
        required: false,
      },
    ])
  }

  const removeTask = (id: string) => {
    setItems(items.filter((t) => t.id !== id))
  }

  const updateTask = (
    id: string,
    field: keyof EditableTask,
    value: string | number | boolean | undefined
  ) => {
    setItems(items.map((t) => (t.id === id ? { ...t, [field]: value } : t)))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold">{copy.sectionTitle}</h3>
        <Button type="button" variant="outline" size="sm" onClick={addTask}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {items.length === 0 ? (
        <EmptyState icon={ClipboardList} title={copy.empty} className="p-12 border rounded-lg" />
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-lg border bg-card p-4">
              <div className="flex items-start gap-4">
                <div className="flex-1 space-y-4">
                  <Input
                    value={item.description}
                    onChange={(e) => updateTask(item.id, 'description', e.target.value)}
                    placeholder="Task description"
                  />

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground">{copy.columns.status}</label>
                      <Select
                        value={item.status}
                        onValueChange={(val) => updateTask(item.id, 'status', val)}
                      >
                        <Select.Trigger className="mt-1 h-8">
                          <Select.Value />
                        </Select.Trigger>
                        <Select.Content>
                          {taskStatusOptions.map((opt) => (
                            <Select.Item key={opt.value} value={opt.value}>
                              {opt.label}
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select>
                    </div>

                    <div>
                      <label className="text-xs text-muted-foreground">
                        {copy.columns.planTime}
                      </label>
                      <Input
                        type="number"
                        step="0.25"
                        min={0}
                        value={item.planTime ?? ''}
                        onChange={(e) =>
                          updateTask(
                            item.id,
                            'planTime',
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                        className="mt-1 h-8"
                        placeholder="Hours"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-muted-foreground">
                        {copy.columns.actualTime}
                      </label>
                      <Input
                        type="number"
                        step="0.25"
                        min={0}
                        value={item.actualTime ?? ''}
                        onChange={(e) =>
                          updateTask(
                            item.id,
                            'actualTime',
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                        className="mt-1 h-8"
                        placeholder="Hours"
                      />
                    </div>

                    <div className="flex items-end pb-1">
                      <label className="flex items-center gap-2 text-sm">
                        <Checkbox
                          checked={item.required}
                          onCheckedChange={(checked) => updateTask(item.id, 'required', !!checked)}
                        />
                        Required
                      </label>
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() => removeTask(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function TasksTab({ tasks, isEditing = false }: TasksTabProps) {
  if (isEditing) {
    return <TasksEditMode tasks={tasks} />
  }
  return <TasksViewMode tasks={tasks} />
}
