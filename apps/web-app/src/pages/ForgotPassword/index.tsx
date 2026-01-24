import { Card, CardContent } from '@justdx/components/atoms/Card'

import { ForgotPasswordForm } from './components/ForgotPasswordForm'
import { ForgotPasswordHeader } from './components/ForgotPasswordHeader'
import { forgotPasswordFields } from './config/fields'
import { useForgotPasswordForm } from './hooks/use-forgot-password-form'

export function ForgotPasswordPage() {
  const { form, onSubmit, isSubmitting } = useForgotPasswordForm()

  return (
    <Card className="w-full max-w-md shadow-xl border-0">
      <ForgotPasswordHeader />

      <CardContent>
        <ForgotPasswordForm
          form={form}
          fields={forgotPasswordFields}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </CardContent>
    </Card>
  )
}
