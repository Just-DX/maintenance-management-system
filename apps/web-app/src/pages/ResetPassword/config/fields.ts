import type { FieldConfig } from '@justdx/components/molecules/AutoField'

import type { ResetPasswordFormData } from './schema'

export const resetPasswordFields: FieldConfig<ResetPasswordFormData>[] = [
  {
    name: 'password',
    type: 'input',
    label: 'New Password',
    props: {
      type: 'password',
      placeholder: 'Enter new password',
    },
  },
  {
    name: 'confirmPassword',
    type: 'input',
    label: 'Confirm Password',
    props: {
      type: 'password',
      placeholder: 'Confirm new password',
    },
  },
]
