import { Button } from '@justdx/components/atoms/Button'
import { Form } from '@justdx/components/atoms/Form'
import { AutoFields, type AutoFieldsProps } from '@justdx/components/molecules/AutoField'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Loader2 } from 'lucide-react'
import type { SubmitHandler, UseFormReturn } from 'react-hook-form'

import type { SignupFormData } from '../config/schema'
import { signupCopy } from '../constants/copy'

interface SignupFormProps {
  form: UseFormReturn<SignupFormData>
  fields: AutoFieldsProps<SignupFormData>['fields']
  onSubmit: SubmitHandler<SignupFormData>
  isSubmitting: boolean
}

export function SignupForm({ form, fields, onSubmit, isSubmitting }: SignupFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <AutoFields form={form} fields={fields} />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {signupCopy.submitLabel} <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">{signupCopy.alreadyHaveAccount} </span>
          <Button variant="link" asChild className="px-0">
            <Link to="/">{signupCopy.login}</Link>
          </Button>
        </div>
      </form>
    </Form>
  )
}
