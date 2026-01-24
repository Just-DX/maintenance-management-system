import type { FieldConfig } from '@justdx/components/molecules/AutoField'

import type { ForgotPasswordFormData } from './schema'

export const forgotPasswordFields: FieldConfig<ForgotPasswordFormData>[] = [
  {
    name: 'email',
    type: 'input',
    label: 'Email',
    props: {
      type: 'email',
      placeholder: 'Enter your email',
    },
  },
]
