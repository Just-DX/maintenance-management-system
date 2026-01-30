'use client'

import { Plus, Trash2 } from 'lucide-react'
import * as React from 'react'
import {
  type ArrayPath,
  type FieldArray,
  type FieldArrayWithId,
  type FieldValues,
  type Path,
  useFieldArray,
  type UseFormReturn,
} from 'react-hook-form'

import { Button } from '../../atoms/Button/Button'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { DatePicker } from '../../atoms/DatePicker/DatePicker'
import { EmptyState } from '../../atoms/EmptyState/EmptyState'
import { cn } from '../../lib/utils'
import { Input } from '../../shadcn-primitives/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../shadcn-primitives/select'
import { Switch } from '../../shadcn-primitives/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../shadcn-primitives/table'
import { Textarea } from '../../shadcn-primitives/textarea'

import { type ArrayItemFieldConfig, COLUMN_WIDTH_CLASSES } from './array-field-config'
import type { AutoArrayFieldsProps } from './AutoArrayFields.type'

interface FieldRendererProps {
  fieldConfig: ArrayItemFieldConfig
  itemPath: string
  form: UseFormReturn<FieldValues>
  index: number
  field: FieldArrayWithId<FieldValues, ArrayPath<FieldValues>>
  compact?: boolean
}

function FieldRenderer({
  fieldConfig,
  itemPath,
  form,
  index,
  field,
  compact = false,
}: FieldRendererProps) {
  const fieldPath = `${itemPath}.${fieldConfig.name}`
  const inputClassName = cn('w-full', compact && 'h-8', fieldConfig.className)

  // Handle Custom Render
  if (fieldConfig.type === 'custom' && fieldConfig.render) {
    return (
      <div className={cn(fieldConfig.className)}>{fieldConfig.render({ form, index, field })}</div>
    )
  }

  // Handle Group (recursive)
  if (fieldConfig.type === 'group' && fieldConfig.children) {
    return (
      <div className={cn('space-y-4', fieldConfig.className)}>
        {fieldConfig.children.map((child) => (
          <FieldRenderer
            key={child.name}
            fieldConfig={child}
            itemPath={itemPath}
            form={form}
            index={index}
            field={field}
            compact={compact}
          />
        ))}
      </div>
    )
  }

  switch (fieldConfig.type) {
    case 'input':
      return (
        <Input
          {...form.register(fieldPath as Path<FieldValues>, fieldConfig.rules)}
          placeholder={fieldConfig.placeholder}
          disabled={fieldConfig.disabled}
          className={inputClassName}
          {...(fieldConfig.props as React.ComponentProps<typeof Input>)}
        />
      )

    case 'textarea':
      return (
        <Textarea
          {...form.register(fieldPath as Path<FieldValues>, fieldConfig.rules)}
          placeholder={fieldConfig.placeholder}
          disabled={fieldConfig.disabled}
          className={inputClassName}
          {...(fieldConfig.props as React.ComponentProps<typeof Textarea>)}
        />
      )

    case 'select':
      return (
        <Select
          value={form.watch(fieldPath as Path<FieldValues>) as string}
          onValueChange={(value) => form.setValue(fieldPath as Path<FieldValues>, value)}
          disabled={fieldConfig.disabled}
        >
          <SelectTrigger className={inputClassName}>
            <SelectValue placeholder={fieldConfig.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {fieldConfig.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    case 'checkbox':
      return (
        <Checkbox
          checked={!!form.watch(fieldPath as Path<FieldValues>)}
          onCheckedChange={(checked) => form.setValue(fieldPath as Path<FieldValues>, !!checked)}
          disabled={fieldConfig.disabled}
        />
      )

    case 'switch':
      return (
        <Switch
          checked={!!form.watch(fieldPath as Path<FieldValues>)}
          onCheckedChange={(checked) => form.setValue(fieldPath as Path<FieldValues>, checked)}
          disabled={fieldConfig.disabled}
        />
      )

    case 'date-picker':
      return (
        <DatePicker
          date={form.watch(fieldPath as Path<FieldValues>) as Date | undefined}
          onDateChange={(date) => form.setValue(fieldPath as Path<FieldValues>, date)}
          className={inputClassName}
        />
      )

    default:
      return (
        <Input
          {...form.register(fieldPath as Path<FieldValues>, fieldConfig.rules)}
          placeholder={fieldConfig.placeholder}
          disabled={fieldConfig.disabled}
          className={inputClassName}
        />
      )
  }
}

// ============================================================================
// Table Layout
// ============================================================================

interface TableLayoutProps<TValues extends FieldValues, TName extends ArrayPath<TValues>> {
  form: UseFormReturn<TValues>
  fields: FieldArrayWithId<TValues, TName>[]
  itemFields: ArrayItemFieldConfig[]
  name: TName
  remove: (index: number) => void
  footer?: (props: {
    form: UseFormReturn<TValues>
    fields: FieldArrayWithId<TValues, TName>[]
  }) => React.ReactNode
}

function TableLayout<TValues extends FieldValues, TName extends ArrayPath<TValues>>({
  form,
  fields,
  itemFields,
  name,
  remove,
  footer,
}: TableLayoutProps<TValues, TName>) {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            {itemFields.map((field) => (
              <TableHead
                key={field.name}
                className={cn('font-semibold', field.width && COLUMN_WIDTH_CLASSES[field.width])}
              >
                {field.label}
              </TableHead>
            ))}
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => (
            <TableRow key={field.id}>
              {itemFields.map((itemField) => (
                <TableCell key={itemField.name}>
                  <FieldRenderer
                    fieldConfig={itemField}
                    itemPath={`${name}.${index}`}
                    form={form as UseFormReturn<FieldValues>}
                    index={index}
                    field={field}
                    compact
                  />
                </TableCell>
              ))}
              <TableCell>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {footer && footer({ form, fields })}
        </TableBody>
      </Table>
    </div>
  )
}

// ============================================================================
// Card Layout
// ============================================================================

interface CardLayoutProps<TValues extends FieldValues, TName extends ArrayPath<TValues>> {
  form: UseFormReturn<TValues>
  fields: FieldArrayWithId<TValues, TName>[]
  itemFields: ArrayItemFieldConfig[]
  name: TName
  remove: (index: number) => void
  footer?: (props: {
    form: UseFormReturn<TValues>
    fields: FieldArrayWithId<TValues, TName>[]
  }) => React.ReactNode
}

function CardLayout<TValues extends FieldValues, TName extends ArrayPath<TValues>>({
  form,
  fields,
  itemFields,
  name,
  remove,
  footer,
}: CardLayoutProps<TValues, TName>) {
  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="rounded-lg border bg-card p-4 group hover:border-primary/50 transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="flex-1 space-y-4">
              {itemFields.map((itemField) => (
                <div key={itemField.name} className="space-y-1">
                  {itemField.label && (
                    <label className="text-xs text-muted-foreground">{itemField.label}</label>
                  )}
                  <FieldRenderer
                    fieldConfig={itemField}
                    itemPath={`${name}.${index}`}
                    form={form as UseFormReturn<FieldValues>}
                    index={index}
                    field={field}
                  />
                </div>
              ))}
            </div>
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
      {footer && footer({ form, fields })}
    </div>
  )
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * Config-driven array field component.
 * Integrates with react-hook-form's useFieldArray for managing dynamic arrays.
 *
 * Supports two layouts:
 * - `table`: Renders items in a table format (best for uniform data like materials)
 * - `card`: Renders items as stacked cards (best for complex data like tasks)
 *
 * @example
 * ```tsx
 * <AutoArrayFields
 *   form={form}
 *   config={{
 *     name: 'materials',
 *     layout: 'table',
 *     itemFields: [
 *       { name: 'name', type: 'input', label: 'Material Name' },
 *       { name: 'quantity', type: 'input', label: 'Qty', props: { type: 'number' } },
 *     ],
 *     defaultItem: { name: '', quantity: 1 },
 *     emptyState: { icon: Package, title: 'No materials added' },
 *     addButton: { label: 'Add Material' },
 *   }}
 * />
 * ```
 */
export function AutoArrayFields<
  TValues extends FieldValues,
  TName extends ArrayPath<TValues> = ArrayPath<TValues>,
>({ form, config }: AutoArrayFieldsProps<TValues, TName>) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: config.name,
  })

  const handleAdd = React.useCallback(() => {
    append(config.defaultItem as FieldArray<TValues, TName>)
  }, [append, config.defaultItem])

  // Render empty state
  if (fields.length === 0 && config.emptyState) {
    return (
      <div className={cn('space-y-4', config.className)}>
        {config.title && (
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold">{config.title}</h3>
          </div>
        )}
        <EmptyState
          icon={config.emptyState.icon}
          title={config.emptyState.title}
          description={config.emptyState.description}
          className={cn('p-12 border rounded-lg', config.emptyState.className)}
          action={
            config.addButton
              ? {
                  label: config.addButton.label,
                  onClick: handleAdd,
                }
              : undefined
          }
        />
      </div>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Layout = (config.layout === 'table' ? TableLayout : CardLayout) as React.ComponentType<any>

  return (
    <div className={cn('space-y-4', config.className)}>
      <div className="flex justify-between items-center">
        {config.title && <h3 className="text-sm font-semibold">{config.title}</h3>}
        {config.addButton && (
          <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            {config.addButton.label}
          </Button>
        )}
      </div>
      <Layout
        form={form}
        fields={fields}
        itemFields={config.itemFields}
        name={config.name}
        remove={remove}
        footer={config.footer}
      />
    </div>
  )
}

AutoArrayFields.displayName = 'AutoArrayFields'
