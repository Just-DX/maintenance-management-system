import type { Control, FieldValues } from 'react-hook-form'

import type { FieldConfig } from './field-config'

export interface AutoFieldProps<TValues extends FieldValues> {
  /** react-hook-form control object */
  control: Control<TValues>
  /** Field configuration with discriminated type */
  field: FieldConfig<TValues>
}
