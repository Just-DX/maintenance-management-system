'use client'

import { Checkbox } from '@justdx/components/atoms/Checkbox'
import { AutoArrayFields } from '@justdx/components/molecules/AutoField'
import { ClipboardList } from 'lucide-react'
import { type UseFormReturn } from 'react-hook-form'

import { type CreateWorkOrderFormData, taskStatusOptions } from '@features/work-orders'
import { createWorkOrderCopy } from '../constants/copy'

interface TasksSectionProps {
  form: UseFormReturn<CreateWorkOrderFormData>
}

export function TasksSection({ form }: TasksSectionProps) {
  return (
    <AutoArrayFields<CreateWorkOrderFormData>
      form={form}
      config={{
        name: 'tasks',
        layout: 'card',
        itemFields: [
          {
            name: 'description',
            type: 'input',
            placeholder: createWorkOrderCopy.tasks.description,
          },
          {
            name: 'details',
            type: 'group',
            className: 'grid grid-cols-2 gap-3',
            children: [
              {
                name: 'status',
                type: 'select',
                options: taskStatusOptions,
                placeholder: createWorkOrderCopy.tasks.status,
              },
              {
                name: 'planTime',
                type: 'input',
                placeholder: createWorkOrderCopy.tasks.planTime,
                props: { type: 'number' },
                rules: { valueAsNumber: true },
              },
            ],
          },
          {
            name: 'required',
            type: 'custom',
            render: ({ form, index }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`task-${index}-required`}
                  checked={!!form.watch(`tasks.${index}.required`)}
                  onCheckedChange={(checked) => form.setValue(`tasks.${index}.required`, !!checked)}
                />
                <label
                  htmlFor={`task-${index}-required`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {createWorkOrderCopy.tasks.required}
                </label>
              </div>
            ),
          },
        ],
        defaultItem: {
          description: '',
          status: 'Pending',
          assignees: [],
          planTime: undefined,
          type: undefined,
          required: false,
        },
        emptyState: {
          icon: ClipboardList,
          title: createWorkOrderCopy.tasks.empty,
          className: 'p-8 border-dashed',
        },
        addButton: { label: createWorkOrderCopy.tasks.add },
        title: createWorkOrderCopy.sections.tasks,
      }}
    />
  )
}
