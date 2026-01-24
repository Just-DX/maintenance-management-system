import type * as React from 'react'
import type { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'

import type { Input } from '../../shadcn-primitives/input'
import type { Switch } from '../../shadcn-primitives/switch'
import type { Textarea } from '../../shadcn-primitives/textarea'

/**
 * Base configuration shared by all field types
 */
export interface BaseField<TValues extends FieldValues> {
  /** Field name path matching form schema */
  name: FieldPath<TValues>
  /** Optional label displayed above the control */
  label?: string
  /** Optional helper text below the control */
  description?: string
  /** Whether the field is disabled */
  disabled?: boolean
  /** react-hook-form validation rules */
  rules?: RegisterOptions<TValues, FieldPath<TValues>>
  /** Additional className for the field container */
  className?: string
}

/**
 * Text input field configuration
 */
export interface InputField<TValues extends FieldValues> extends BaseField<TValues> {
  type: 'input'
  /** Optional props passed directly to Input component */
  props?: Omit<
    React.ComponentProps<typeof Input>,
    'disabled' | 'value' | 'onChange' | 'onBlur' | 'name' | 'ref'
  >
}

/**
 * Textarea field configuration
 */
export interface TextareaField<TValues extends FieldValues> extends BaseField<TValues> {
  type: 'textarea'
  /** Optional props passed directly to Textarea component */
  props?: Omit<
    React.ComponentProps<typeof Textarea>,
    'disabled' | 'value' | 'onChange' | 'onBlur' | 'name' | 'ref'
  >
}

/**
 * Switch/toggle field configuration
 */
export interface SwitchField<TValues extends FieldValues> extends BaseField<TValues> {
  type: 'switch'
  /** Optional props passed directly to Switch component */
  props?: Omit<
    React.ComponentProps<typeof Switch>,
    'disabled' | 'checked' | 'onCheckedChange' | 'name' | 'ref'
  >
}

/**
 * Select option type
 */
export interface SelectOption {
  label: string
  value: string
}

/**
 * Select field configuration
 */
export interface SelectField<TValues extends FieldValues> extends BaseField<TValues> {
  type: 'select'
  /** Options to display in the select dropdown */
  options: SelectOption[]
  /** Optional props for select */
  props?: {
    placeholder?: string
  }
}

/**
 * Discriminated union of all field configurations
 */
export type FieldConfig<TValues extends FieldValues> =
  | InputField<TValues>
  | TextareaField<TValues>
  | SwitchField<TValues>
  | SelectField<TValues>
