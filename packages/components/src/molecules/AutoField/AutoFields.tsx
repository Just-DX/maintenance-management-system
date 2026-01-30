'use client'

import type { FieldValues } from 'react-hook-form'

import { AutoField } from './AutoField'
import type { AutoFieldsProps } from './AutoFields.type'

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
