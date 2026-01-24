import type { AutoFieldsProps } from '@justdx/components/molecules/AutoField'

import { Lock, Mail } from 'lucide-react'
import { loginCopy } from '../constants/copy'
import type { LoginFormData } from './schema'

const loginFields: AutoFieldsProps<LoginFormData>['fields'] = [
  {
    name: 'email',
    type: 'input-group',
    label: loginCopy.emailLabel,
    props: {
      type: 'email',
      placeholder: loginCopy.emailPlaceholder,
      autoComplete: 'email',
      startIcon: <Mail className="h-4 w-4" />,
    },
  },
  {
    name: 'password',
    type: 'input-group',
    label: loginCopy.passwordLabel,
    props: {
      type: 'password',
      placeholder: loginCopy.passwordPlaceholder,
      autoComplete: 'current-password',
      startIcon: <Lock className="h-4 w-4" />,
    },
  },
  {
    name: 'rememberMe',
    type: 'checkbox',
    checkBoxLabel: loginCopy.rememberMeLabel,
  },
]

export { loginFields }
