import type { Meta, StoryFn } from '@storybook/react-vite'
import * as React from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '../../shadcn-primitives/button/button'
import { Form } from '../../shadcn-primitives/form'
import { AutoField } from './auto-field'
import { autoFieldStyles } from './auto-field.constants'
import { mockDisabledFields, mockFields } from './auto-field.fixtures'
import { AutoFields } from './auto-fields'
import type { FieldConfig } from './field-config'

const meta = {
  title: 'Molecules/AutoField',
  component: AutoField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Config-driven form field component. Define fields as config objects and render via AutoField.',
      },
    },
  },
} satisfies Meta<typeof AutoField>

export default meta

// Full form with all field types
interface FullFormValues {
  email: string
  bio: string
  notifications: boolean
  role: string
}

function FullFormDemo() {
  const [output, setOutput] = React.useState<string>('')

  const form = useForm<FullFormValues>({
    defaultValues: {
      email: '',
      bio: '',
      notifications: false,
      role: '',
    },
  })

  const onSubmit = (data: FullFormValues) => {
    setOutput(JSON.stringify(data, null, 2))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={autoFieldStyles.form}>
        <AutoFields form={form} fields={mockFields as FieldConfig<FullFormValues>[]} />
        <Button type="submit">Submit</Button>
      </form>
      {output && (
        <div className={autoFieldStyles.output}>
          <p className={autoFieldStyles.outputTitle}>Form Output:</p>
          <code className={autoFieldStyles.outputCode}>{output}</code>
        </div>
      )}
    </Form>
  )
}

export const FullForm: StoryFn = () => <FullFormDemo />
FullForm.parameters = {
  docs: {
    description: {
      story:
        'Complete form with input, textarea, switch, and select fields using AutoFields helper.',
    },
  },
}

// Single AutoField usage
interface SingleFieldValues {
  username: string
}

function SingleFieldDemo() {
  const [output, setOutput] = React.useState<string>('')

  const form = useForm<SingleFieldValues>({
    defaultValues: { username: '' },
  })

  const onSubmit = (data: SingleFieldValues) => {
    setOutput(JSON.stringify(data, null, 2))
  }

  const usernameField: FieldConfig<SingleFieldValues> = {
    name: 'username',
    type: 'input',
    label: 'Username',
    description: 'Choose a unique username',
    rules: {
      required: 'Username is required',
      minLength: { value: 3, message: 'Min 3 characters' },
    },
    props: { placeholder: 'johndoe' },
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={autoFieldStyles.form}>
        <AutoField control={form.control} field={usernameField} />
        <Button type="submit">Submit</Button>
      </form>
      {output && (
        <div className={autoFieldStyles.output}>
          <p className={autoFieldStyles.outputTitle}>Form Output:</p>
          <code className={autoFieldStyles.outputCode}>{output}</code>
        </div>
      )}
    </Form>
  )
}

export const SingleField: StoryFn = () => <SingleFieldDemo />
SingleField.parameters = {
  docs: {
    description: {
      story: 'Single AutoField usage with validation.',
    },
  },
}

// Validation example
function ValidationDemo() {
  const form = useForm<{ email: string }>({
    defaultValues: { email: '' },
    mode: 'onBlur',
  })

  const emailField: FieldConfig<{ email: string }> = {
    name: 'email',
    type: 'input',
    label: 'Email',
    rules: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address',
      },
    },
    props: { type: 'email', placeholder: 'you@example.com' },
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)} className={autoFieldStyles.form}>
        <AutoField control={form.control} field={emailField} />
        <Button type="submit">Submit</Button>
      </form>
      <p className="text-sm text-muted-foreground mt-4">
        Try submitting with an invalid email to see validation.
      </p>
    </Form>
  )
}

export const WithValidation: StoryFn = () => <ValidationDemo />
WithValidation.parameters = {
  docs: {
    description: {
      story:
        'Field with required and pattern validation. Blur the field or submit to trigger validation.',
    },
  },
}

// Disabled field
function DisabledDemo() {
  const form = useForm<{ username: string }>({
    defaultValues: { username: 'readonly_user' },
  })

  return (
    <Form {...form}>
      <form className={autoFieldStyles.form}>
        <AutoFields
          form={form}
          fields={mockDisabledFields as FieldConfig<{ username: string }>[]}
        />
      </form>
    </Form>
  )
}

export const Disabled: StoryFn = () => <DisabledDemo />
Disabled.parameters = {
  docs: {
    description: {
      story: 'Disabled field state.',
    },
  },
}

// Switch field standalone
function SwitchDemo() {
  const [output, setOutput] = React.useState<string>('')

  const form = useForm<{ darkMode: boolean }>({
    defaultValues: { darkMode: false },
  })

  const onSubmit = (data: { darkMode: boolean }) => {
    setOutput(JSON.stringify(data, null, 2))
  }

  const switchField: FieldConfig<{ darkMode: boolean }> = {
    name: 'darkMode',
    type: 'switch',
    label: 'Dark Mode',
    description: 'Enable dark mode for the application',
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={autoFieldStyles.form}>
        <AutoField control={form.control} field={switchField} />
        <Button type="submit">Submit</Button>
      </form>
      {output && (
        <div className={autoFieldStyles.output}>
          <p className={autoFieldStyles.outputTitle}>Form Output:</p>
          <code className={autoFieldStyles.outputCode}>{output}</code>
        </div>
      )}
    </Form>
  )
}

export const SwitchFieldDemo: StoryFn = () => <SwitchDemo />
SwitchFieldDemo.parameters = {
  docs: {
    description: {
      story: 'Switch/toggle field with proper checked/onCheckedChange wiring.',
    },
  },
}

// Select field standalone
function SelectDemo() {
  const [output, setOutput] = React.useState<string>('')

  const form = useForm<{ priority: string }>({
    defaultValues: { priority: '' },
  })

  const onSubmit = (data: { priority: string }) => {
    setOutput(JSON.stringify(data, null, 2))
  }

  const selectField: FieldConfig<{ priority: string }> = {
    name: 'priority',
    type: 'select',
    label: 'Priority',
    description: 'Select task priority level',
    rules: { required: 'Priority is required' },
    options: [
      { label: 'Low', value: 'low' },
      { label: 'Medium', value: 'medium' },
      { label: 'High', value: 'high' },
      { label: 'Critical', value: 'critical' },
    ],
    props: { placeholder: 'Select priority' },
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={autoFieldStyles.form}>
        <AutoField control={form.control} field={selectField} />
        <Button type="submit">Submit</Button>
      </form>
      {output && (
        <div className={autoFieldStyles.output}>
          <p className={autoFieldStyles.outputTitle}>Form Output:</p>
          <code className={autoFieldStyles.outputCode}>{output}</code>
        </div>
      )}
    </Form>
  )
}

export const SelectFieldDemo: StoryFn = () => <SelectDemo />
SelectFieldDemo.parameters = {
  docs: {
    description: {
      story: 'Select field with value/onValueChange wiring.',
    },
  },
}

// Zod validation with individual AutoFields
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const signupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Please select a role'),
})

type SignupFormValues = z.infer<typeof signupSchema>

function ZodValidationDemo() {
  const [output, setOutput] = React.useState<string>('')

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      role: '',
    },
  })

  const onSubmit = (data: SignupFormValues) => {
    setOutput(JSON.stringify(data, null, 2))
  }

  // Define fields individually for full styling control
  const usernameField: FieldConfig<SignupFormValues> = {
    name: 'username',
    type: 'input',
    label: 'Username',
    description: 'Choose a unique username',
    props: { placeholder: 'johndoe' },
  }

  const emailField: FieldConfig<SignupFormValues> = {
    name: 'email',
    type: 'input',
    label: 'Email',
    props: { type: 'email', placeholder: 'you@example.com' },
  }

  const roleField: FieldConfig<SignupFormValues> = {
    name: 'role',
    type: 'select',
    label: 'Role',
    options: [
      { label: 'Administrator', value: 'admin' },
      { label: 'Manager', value: 'manager' },
      { label: 'Technician', value: 'technician' },
    ],
    props: { placeholder: 'Select a role' },
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Each AutoField rendered individually for full styling control */}
        <div className="space-y-4">
          <AutoField control={form.control} field={usernameField} />
        </div>

        <div className="space-y-4">
          <AutoField control={form.control} field={emailField} />
        </div>

        <div className="space-y-4">
          <AutoField control={form.control} field={roleField} />
        </div>

        <Button type="submit">Sign Up</Button>
      </form>
      {output && (
        <div className={autoFieldStyles.output}>
          <p className={autoFieldStyles.outputTitle}>Form Output:</p>
          <code className={autoFieldStyles.outputCode}>{output}</code>
        </div>
      )}
    </Form>
  )
}

export const ZodValidation: StoryFn = () => <ZodValidationDemo />
ZodValidation.parameters = {
  docs: {
    description: {
      story:
        'Using Zod schema validation with individual AutoField components. Each field is rendered separately for full styling control.',
    },
  },
}

// Input Group examples
function InputGroupDemo() {
  const form = useForm<{ search: string; website: string; password: string }>({
    defaultValues: { search: '', website: '', password: '' },
  })

  // Input Group with icons using 'input-group' type
  const websiteField: FieldConfig<{ search: string; website: string; password: string }> = {
    name: 'website',
    type: 'input-group',
    label: 'Website',
    props: {
      placeholder: 'example.com',
      startIcon: <span className="text-xs">https://</span>,
    },
  }

  return (
    <Form {...form}>
      <form className="space-y-6">
        <AutoField control={form.control} field={websiteField} />
      </form>
    </Form>
  )
}

export const InputGroupFields: StoryFn = () => <InputGroupDemo />
InputGroupFields.parameters = {
  docs: {
    description: {
      story: 'Demonstration of Search, InputGroup, and Password field types.',
    },
  },
}

// Checkbox and Radio examples
function SelectionControlsDemo() {
  const form = useForm<{ terms: boolean; plan: string }>({
    defaultValues: { terms: false, plan: 'free' },
  })

  const termsField: FieldConfig<{ terms: boolean; plan: string }> = {
    name: 'terms',
    type: 'checkbox',
    label: 'Terms of Service',
    description: 'Please review our terms',
    checkBoxLabel: 'I accept the terms and conditions',
    rules: { required: 'You must accept the terms' },
  }

  const planField: FieldConfig<{ terms: boolean; plan: string }> = {
    name: 'plan',
    type: 'radio-group',
    label: 'Subscription Plan',
    orientation: 'vertical',
    options: [
      { label: 'Free - $0/mo', value: 'free' },
      { label: 'Pro - $29/mo', value: 'pro' },
      { label: 'Enterprise - Custom', value: 'enterprise' },
    ],
    rules: { required: 'Please select a plan' },
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)} className="space-y-8">
        <AutoField control={form.control} field={termsField} />
        <AutoField control={form.control} field={planField} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export const SelectionControls: StoryFn = () => <SelectionControlsDemo />
SelectionControls.parameters = {
  docs: {
    description: {
      story: 'Checkbox and RadioGroup examples. Checkbox uses checkBoxLabel for inline labeling.',
    },
  },
}
