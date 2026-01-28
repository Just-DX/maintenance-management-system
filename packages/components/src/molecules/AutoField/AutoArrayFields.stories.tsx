import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { ClipboardList, Package } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../atoms/Button'
import { Form } from '../../atoms/Form'
import { AutoArrayFields } from './AutoArrayFields'

// ============================================================================
// Schema and Types for Stories
// ============================================================================

const materialSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().min(1),
  unitCost: z.number().min(0),
})

const taskSchema = z.object({
  description: z.string().min(1),
  status: z.enum(['Pending', 'In Progress', 'Done']),
  priority: z.enum(['low', 'medium', 'high']),
  required: z.boolean(),
})

const formSchema = z.object({
  materials: z.array(materialSchema),
  tasks: z.array(taskSchema),
})

type FormData = z.infer<typeof formSchema>

// ============================================================================
// Meta
// ============================================================================

const meta: Meta<typeof AutoArrayFields> = {
  title: 'Molecules/AutoArrayFields',
  component: AutoArrayFields,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Config-driven array field component that integrates with react-hook-form's useFieldArray.

Supports two layouts:
- **Table**: Best for uniform data like materials, costs
- **Card**: Best for complex data like tasks with multiple fields

### Features
- Add/remove items with built-in buttons
- Empty state with action button
- Type-safe field configuration
- Automatic form integration
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

// ============================================================================
// Table Layout Story
// ============================================================================

export const TableLayout: StoryObj = {
  render: function TableLayoutStory() {
    const form = useForm<FormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        materials: [
          { name: 'Steel Bolts', quantity: 50, unitCost: 2.5 },
          { name: 'Copper Wire', quantity: 100, unitCost: 1.2 },
        ],
        tasks: [],
      },
    })

    const onSubmit = (data: FormData) => {
      console.log('Submitted:', data)
      alert(JSON.stringify(data.materials, null, 2))
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
          <AutoArrayFields<FormData>
            form={form}
            config={{
              name: 'materials',
              layout: 'table',
              title: 'Materials',
              itemFields: [
                {
                  name: 'name',
                  type: 'input',
                  label: 'Material Name',
                  placeholder: 'Enter material name',
                  width: 'lg',
                },
                {
                  name: 'quantity',
                  type: 'input',
                  label: 'Qty',
                  placeholder: '0',
                  width: 'sm',
                  props: { type: 'number' },
                },
                {
                  name: 'unitCost',
                  type: 'input',
                  label: 'Unit Cost ($)',
                  placeholder: '0.00',
                  width: 'md',
                  props: { type: 'number', step: '0.01' },
                },
              ],
              defaultItem: { name: '', quantity: 1, unitCost: 0 },
              emptyState: {
                icon: Package,
                title: 'No materials added',
                description: 'Add materials to track costs',
              },
              addButton: { label: 'Add Material' },
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
  },
}

// ============================================================================
// Card Layout Story
// ============================================================================

export const CardLayout: StoryObj = {
  render: function CardLayoutStory() {
    const form = useForm<FormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        materials: [],
        tasks: [
          {
            description: 'Inspect equipment',
            status: 'Pending',
            priority: 'high',
            required: true,
          },
          {
            description: 'Replace filters',
            status: 'In Progress',
            priority: 'medium',
            required: false,
          },
        ],
      },
    })

    const onSubmit = (data: FormData) => {
      console.log('Submitted:', data)
      alert(JSON.stringify(data.tasks, null, 2))
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
          <AutoArrayFields<FormData>
            form={form}
            config={{
              name: 'tasks',
              layout: 'card',
              title: 'Tasks',
              itemFields: [
                {
                  name: 'description',
                  type: 'input',
                  label: 'Description',
                  placeholder: 'Enter task description',
                },
                {
                  name: 'status',
                  type: 'select',
                  label: 'Status',
                  placeholder: 'Select status',
                  options: [
                    { value: 'Pending', label: 'Pending' },
                    { value: 'In Progress', label: 'In Progress' },
                    { value: 'Done', label: 'Done' },
                  ],
                },
                {
                  name: 'priority',
                  type: 'select',
                  label: 'Priority',
                  placeholder: 'Select priority',
                  options: [
                    { value: 'low', label: 'Low' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'high', label: 'High' },
                  ],
                },
                {
                  name: 'required',
                  type: 'checkbox',
                  label: 'Required Task',
                },
              ],
              defaultItem: {
                description: '',
                status: 'Pending',
                priority: 'medium',
                required: false,
              },
              emptyState: {
                icon: ClipboardList,
                title: 'No tasks added',
                description: 'Add tasks to track work',
              },
              addButton: { label: 'Add Task' },
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
  },
}

// ============================================================================
// Empty State Story
// ============================================================================

export const EmptyState: StoryObj = {
  render: function EmptyStateStory() {
    const form = useForm<FormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        materials: [],
        tasks: [],
      },
    })

    return (
      <Form {...form}>
        <form className="space-y-6 max-w-2xl">
          <AutoArrayFields<FormData>
            form={form}
            config={{
              name: 'materials',
              layout: 'table',
              title: 'Materials',
              itemFields: [
                { name: 'name', type: 'input', label: 'Name' },
                { name: 'quantity', type: 'input', label: 'Qty', props: { type: 'number' } },
              ],
              defaultItem: { name: '', quantity: 1, unitCost: 0 },
              emptyState: {
                icon: Package,
                title: 'No materials yet',
                description: 'Click the button below to add your first material',
              },
              addButton: { label: 'Add Material' },
            }}
          />
        </form>
      </Form>
    )
  },
}
