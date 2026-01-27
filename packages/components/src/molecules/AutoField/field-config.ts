import type * as React from 'react'
import type { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'

import type { InputGroup } from '../../atoms/InputGroup/InputGroup'
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
 * Input Group field configuration
 */
export interface InputGroupField<TValues extends FieldValues> extends BaseField<TValues> {
  type: 'input-group'
  /** Optional props passed to InputGroup component */
  props?: Omit<
    React.ComponentProps<typeof InputGroup>,
    'disabled' | 'value' | 'onChange' | 'onBlur' | 'name' | 'ref'
  >
}

import type { Checkbox } from '../../atoms/Checkbox/Checkbox'
import type { MultiSelect, MultiSelectOption } from '../../atoms/MultiSelect/MultiSelect'
import type { RadioGroup } from '../../atoms/RadioGroup/RadioGroup'

/**
 * Checkbox field configuration
 */
export interface CheckboxField<TValues extends FieldValues> extends BaseField<TValues> {
  type: 'checkbox'
  /** Optional content/label displayed next to the checkbox */
  checkBoxLabel?: string
  /** Optional props passed to Checkbox component */
  props?: Omit<
    React.ComponentProps<typeof Checkbox>,
    'disabled' | 'checked' | 'onCheckedChange' | 'name' | 'ref' | 'value'
  >
}

/**
 * Radio Group option type
 */
export interface RadioOption {
  label: string
  value: string
}

/**
 * Radio Group field configuration
 */
export interface RadioGroupField<TValues extends FieldValues> extends BaseField<TValues> {
  type: 'radio-group'
  /** Options to display in the radio group */
  options: RadioOption[]
  /** Orientation of the radio group */
  orientation?: 'horizontal' | 'vertical'
  /** Optional props passed to RadioGroup component */
  props?: Omit<
    React.ComponentProps<typeof RadioGroup>,
    'disabled' | 'value' | 'onValueChange' | 'name' | 'ref'
  >
}

/**
 * DatePicker field configuration
 */
export interface DatePickerField<TValues extends FieldValues> extends BaseField<TValues> {
  type: 'date-picker'
  /** Optional props for date picker */
  props?: {
    placeholder?: string
  }
}

/**
 * MultiSelect field configuration
 */
export interface MultiSelectField<TValues extends FieldValues> extends BaseField<TValues> {
  type: 'multi-select'
  /** Options to display in the multi-select dropdown */
  options: MultiSelectOption[]
  /** Optional props passed to MultiSelect component */
  props?: Omit<
    React.ComponentProps<typeof MultiSelect>,
    'disabled' | 'value' | 'onValueChange' | 'options'
  >
}

/**
 * Discriminated union of all field configurations
 */
export type FieldConfig<TValues extends FieldValues> =
  | InputField<TValues>
  | TextareaField<TValues>
  | SwitchField<TValues>
  | SelectField<TValues>
  | InputGroupField<TValues>
  | CheckboxField<TValues>
  | RadioGroupField<TValues>
  | DatePickerField<TValues>
  | MultiSelectField<TValues>
