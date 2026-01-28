import type { LucideIcon } from 'lucide-react'
import type {
  ArrayPath,
  FieldArray,
  FieldValues,
  RegisterOptions,
  UseFormReturn,
} from 'react-hook-form'

/**
 * Props passed to the custom render function
 */
export interface CustomRenderProps<TValues extends FieldValues = FieldValues> {
  form: UseFormReturn<TValues>
  index: number
  field: FieldArray<TValues>
}

/**
 * Field configuration for each field within an array item.
 * Uses a simplified approach where `name` is a string representing
 * the field key within the array item.
 */
export interface ArrayItemFieldConfig {
  /** Field name within the array item (e.g., 'name', 'quantity') */
  name: string

  /** Field type - determines which control is rendered */
  type:
    | 'input'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'switch'
    | 'date-picker'
    | 'input-group'
    | 'multi-select'
    | 'radio-group'
    | 'custom'
    | 'group'

  /** Label for table header or card field label */
  label?: string

  /** Placeholder text for input fields */
  placeholder?: string

  /** Width hint for table columns */
  width?: 'auto' | 'sm' | 'md' | 'lg' | 'xl'

  /** Whether the field is disabled */
  disabled?: boolean

  /** Validation rules */
  rules?: RegisterOptions

  /** Options for select, radio-group, multi-select types */
  options?: readonly { value: string; label: string }[]

  /** Additional props passed to the underlying control */
  props?: Record<string, unknown>

  /** Additional className for the field wrapper (or group wrapper) */
  className?: string

  /** For type='group': nested fields */
  children?: ArrayItemFieldConfig[]

  /** For type='custom': custom render function */
  render?: (props: CustomRenderProps) => React.ReactNode
}

/**
 * Configuration for empty state when array has no items.
 */
export interface ArrayEmptyStateConfig {
  /** Icon to display */
  icon?: LucideIcon
  /** Title text */
  title: string
  /** Optional description text */
  description?: string
  /** Usage specific styling */
  className?: string
}

/**
 * Configuration for the add button.
 */
export interface ArrayAddButtonConfig {
  /** Button label */
  label: string
}

/**
 * Main configuration for AutoArrayFields component.
 *
 * @template TValues - The form values type
 * @template TName - The array path type
 */
export interface AutoArrayFieldsConfig<
  TValues extends FieldValues,
  TName extends ArrayPath<TValues> = ArrayPath<TValues>,
> {
  /** Array field path in form (e.g., 'tasks', 'materials') */
  name: TName

  /** Field configurations for each array item */
  itemFields: ArrayItemFieldConfig[]

  /** Default values when adding a new item */
  defaultItem: FieldArray<TValues, TName>

  /** Layout mode - 'table' for tabular data, 'card' for complex items */
  layout?: 'table' | 'card'

  /** Empty state configuration */
  emptyState?: ArrayEmptyStateConfig

  /** Add button configuration */
  addButton?: ArrayAddButtonConfig

  /** Section title */
  title?: string

  /** Additional className for the container */
  className?: string

  /** Footer content (e.g. for totals) */
  footer?: (props: {
    form: UseFormReturn<TValues>
    fields: FieldArray<TValues, TName>[]
  }) => React.ReactNode
}

/**
 * Column width mappings for table layout
 */
export const COLUMN_WIDTH_CLASSES = {
  auto: 'w-auto',
  sm: 'w-20',
  md: 'w-32',
  lg: 'w-48',
  xl: 'w-64',
} as const
