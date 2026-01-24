'use client'

import type { FieldValues, UseFormReturn } from 'react-hook-form'

import { AutoField } from './auto-field'
import type { FieldConfig } from './field-config'

export interface AutoFieldsProps<TValues extends FieldValues> {
  /** react-hook-form form object */
  form: UseFormReturn<TValues>
  /** Array of field configurations to render */
  fields: FieldConfig<TValues>[]
}

/**
 * Helper component that renders multiple AutoField components from a config array.
 */
export function AutoFields<TValues extends FieldValues>({
  form,
  fields,
}: AutoFieldsProps<TValues>) {
  return (
    <>
      {fields.map((field) => (
        <AutoField key={String(field.name)} control={form.control} field={field} />
      ))}
    </>
  )
}

AutoFields.displayName = 'AutoFields'
