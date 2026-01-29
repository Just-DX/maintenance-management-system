import type { FieldValues, UseFormReturn } from 'react-hook-form'

import type { FieldConfig } from './field-config'

export interface AutoFieldsProps<TValues extends FieldValues> {
  /** react-hook-form form object */
  form: UseFormReturn<TValues>
  /** Array of field configurations to render */
  fields: FieldConfig<TValues>[]
}
