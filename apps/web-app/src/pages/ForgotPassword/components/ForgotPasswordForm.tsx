import { Button } from '@justdx/components/atoms/Button'
import { Form } from '@justdx/components/atoms/Form'
import { AutoFields, type AutoFieldsProps } from '@justdx/components/molecules/AutoField'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, Loader2 } from 'lucide-react'
import type { SubmitHandler, UseFormReturn } from 'react-hook-form'

import type { ForgotPasswordFormData } from '../config/schema'
import { forgotPasswordCopy } from '../constants/copy'

interface ForgotPasswordFormProps {
  form: UseFormReturn<ForgotPasswordFormData>
  fields: AutoFieldsProps<ForgotPasswordFormData>['fields']
  onSubmit: SubmitHandler<ForgotPasswordFormData>
  isSubmitting: boolean
}

export function ForgotPasswordForm({
  form,
  fields,
  onSubmit,
  isSubmitting,
}: ForgotPasswordFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <AutoFields form={form} fields={fields} />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>{forgotPasswordCopy.submitLabel}</>
          )}
        </Button>

        <div className="text-center text-sm">
          <Button variant="link" asChild className="px-0">
            <Link to="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {forgotPasswordCopy.backToLogin}
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  )
}
