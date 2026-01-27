'use client'

import { Button } from '@justdx/components/atoms/Button'
import { Checkbox } from '@justdx/components/atoms/Checkbox'
import { EmptyState } from '@justdx/components/atoms/EmptyState'
import { Input } from '@justdx/components/atoms/Input'
import { Select } from '@justdx/components/atoms/Select'
import { ClipboardList, Plus, Trash2 } from 'lucide-react'
import { useFieldArray, type UseFormReturn } from 'react-hook-form'

import { taskStatusOptions } from '../config/fields'
import type { CreateWorkOrderFormData } from '../config/schema'
import { createWorkOrderCopy } from '../constants/copy'

interface TasksSectionProps {
  form: UseFormReturn<CreateWorkOrderFormData>
}

export function TasksSection({ form }: TasksSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'tasks',
  })

  const handleAddTask = () => {
    append({
      description: '',
      status: 'Pending',
      assignees: [],
      planTime: undefined,
      type: undefined,
      required: false,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <ClipboardList className="h-4 w-4" />
          {createWorkOrderCopy.sections.tasks}
        </h4>
        <Button type="button" variant="outline" size="sm" onClick={handleAddTask}>
          <Plus className="h-4 w-4 mr-1" />
          {createWorkOrderCopy.tasks.add}
        </Button>
      </div>

      {fields.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title={createWorkOrderCopy.tasks.empty}
          className="p-8 border-dashed"
          action={{
            label: createWorkOrderCopy.tasks.add,
            onClick: handleAddTask,
          }}
        />
      ) : (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-lg border p-4 bg-muted/30 space-y-3 group hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 space-y-3">
                  {/* Task Description */}
                  <Input
                    {...form.register(`tasks.${index}.description`)}
                    placeholder={createWorkOrderCopy.tasks.description}
                    className="w-full"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    {/* Status */}
                    <Select
                      value={form.watch(`tasks.${index}.status`)}
                      onValueChange={(value) =>
                        form.setValue(
                          `tasks.${index}.status`,
                          value as 'Pending' | 'In Progress' | 'Done'
                        )
                      }
                    >
                      <Select.Trigger>
                        <Select.Value placeholder={createWorkOrderCopy.tasks.status} />
                      </Select.Trigger>
                      <Select.Content>
                        {taskStatusOptions.map((opt) => (
                          <Select.Item key={opt.value} value={opt.value}>
                            {opt.label}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select>

                    {/* Plan Time */}
                    <Input
                      type="number"
                      {...form.register(`tasks.${index}.planTime`, { valueAsNumber: true })}
                      placeholder={createWorkOrderCopy.tasks.planTime}
                    />
                  </div>

                  {/* Required Checkbox */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`task-${index}-required`}
                      checked={form.watch(`tasks.${index}.required`)}
                      onCheckedChange={(checked) =>
                        form.setValue(`tasks.${index}.required`, !!checked)
                      }
                    />
                    <label
                      htmlFor={`task-${index}-required`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {createWorkOrderCopy.tasks.required}
                    </label>
                  </div>
                </div>

                {/* Delete Button */}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => remove(index)}
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
