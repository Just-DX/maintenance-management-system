import { Button } from '@justdx/components/atoms/Button'
import { Form } from '@justdx/components/atoms/Form'
import { AutoFields, type AutoFieldsProps } from '@justdx/components/molecules/AutoField'
import { ArrowRight, Loader2 } from 'lucide-react'
import type { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { Link } from '@tanstack/react-router'
import type { LoginFormData } from '../config/schema'
import { loginCopy } from '../constants/copy'

interface LoginFormProps {
  form: UseFormReturn<LoginFormData>
  fields: AutoFieldsProps<LoginFormData>['fields']
  onSubmit: SubmitHandler<LoginFormData>
  isSubmitting: boolean
  submitLabel: string
}

export function LoginForm({ form, fields, onSubmit, isSubmitting, submitLabel }: LoginFormProps) {
  const rememberMeField: AutoFieldsProps<LoginFormData>['fields'] = fields.filter(
    (field) => field.name === 'rememberMe'
  )

  const otherFields: AutoFieldsProps<LoginFormData>['fields'] = fields.filter(
    (field) => field.name !== 'rememberMe'
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <AutoFields form={form} fields={otherFields} />

        <div className="flex justify-between">
          <AutoFields form={form} fields={rememberMeField} />

          <Button variant="link" asChild className="px-0 text-end">
            <Link to="/forgot-password">{loginCopy.forgotPassword}</Link>
          </Button>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {submitLabel} <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
