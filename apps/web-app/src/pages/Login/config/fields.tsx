import type { AutoFieldsProps } from '@justdx/components/molecules/AutoField'

import { loginCopy } from '../constants/copy'
import type { LoginFormData } from './schema'

const loginFields: AutoFieldsProps<LoginFormData>['fields'] = [
  {
    name: 'email',
    type: 'input',
    label: loginCopy.emailLabel,
    props: {
      type: 'email',
      placeholder: loginCopy.emailPlaceholder,
      autoComplete: 'email',
    },
  },
  {
    name: 'password',
    type: 'input',
    label: loginCopy.passwordLabel,
    props: {
      type: 'password',
      placeholder: loginCopy.passwordPlaceholder,
      autoComplete: 'current-password',
    },
  },
  {
    name: 'rememberMe',
    type: 'checkbox',
    checkBoxLabel: loginCopy.rememberMeLabel,
  },
]

export { loginFields }
