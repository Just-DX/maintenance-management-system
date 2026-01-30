import type { FieldConfig } from '@justdx/components/molecules/AutoField'

import type { SignupFormData } from './schema'

export const signupFields: FieldConfig<SignupFormData>[] = [
  {
    name: 'email',
    type: 'input',
    label: 'Email',
    props: {
      type: 'email',
      placeholder: 'Enter your email',
    },
  },
  {
    name: 'fullName',
    type: 'input',
    label: 'Full Name',
    props: {
      placeholder: 'Enter your full name',
    },
  },
  {
    name: 'username',
    type: 'input',
    label: 'Username',
    props: {
      placeholder: 'Choose a username',
    },
  },
  {
    name: 'password',
    type: 'input',
    label: 'Password',
    props: {
      type: 'password',
      placeholder: 'Create a password',
    },
  },
]
