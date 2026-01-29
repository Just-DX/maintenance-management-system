import type { ArrayPath, FieldValues, UseFormReturn } from 'react-hook-form'

import type { AutoArrayFieldsConfig } from './array-field-config'

export interface AutoArrayFieldsProps<
  TValues extends FieldValues,
  TName extends ArrayPath<TValues> = ArrayPath<TValues>,
> {
  /** react-hook-form form object */
  form: UseFormReturn<TValues>
  /** Array field configuration */
  config: AutoArrayFieldsConfig<TValues, TName>
}
