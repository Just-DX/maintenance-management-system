import type { FieldConfig } from './field-config'

interface FormValues {
  email: string
  bio: string
  notifications: boolean
  role: string
}

export const mockFields: FieldConfig<FormValues>[] = [
  {
    name: 'email',
    type: 'input',
    label: 'Email',
    description: 'Your work email address',
    rules: { required: 'Email is required' },
    props: { type: 'email', placeholder: 'you@company.com' },
  },
  {
    name: 'bio',
    type: 'textarea',
    label: 'Bio',
    description: 'Tell us about yourself',
    props: { placeholder: 'Write a few sentences...' },
  },
  {
    name: 'notifications',
    type: 'switch',
    label: 'Email Notifications',
    description: 'Receive email updates about your account',
  },
  {
    name: 'role',
    type: 'select',
    label: 'Role',
    description: 'Select your role in the organization',
    rules: { required: 'Please select a role' },
    options: [
      { label: 'Administrator', value: 'admin' },
      { label: 'Manager', value: 'manager' },
      { label: 'Technician', value: 'technician' },
    ],
    props: { placeholder: 'Select a role' },
  },
]

export const mockDisabledFields: FieldConfig<{ username: string }>[] = [
  {
    name: 'username',
    type: 'input',
    label: 'Username',
    description: 'This field is disabled',
    disabled: true,
    props: { placeholder: 'johndoe' },
  },
]
