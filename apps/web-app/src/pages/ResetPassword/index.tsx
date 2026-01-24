import { Card, CardContent } from '@justdx/components/atoms/Card'

import { ResetPasswordForm } from './components/ResetPasswordForm'
import { ResetPasswordHeader } from './components/ResetPasswordHeader'
import { resetPasswordFields } from './config/fields'
import { useResetPasswordForm } from './hooks/use-reset-password-form'

export function ResetPasswordPage() {
  const { form, onSubmit, isSubmitting } = useResetPasswordForm()

  return (
    <Card className="w-full max-w-md shadow-xl border-0">
      <ResetPasswordHeader />

      <CardContent>
        <ResetPasswordForm
          form={form}
          fields={resetPasswordFields}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </CardContent>
    </Card>
  )
}
