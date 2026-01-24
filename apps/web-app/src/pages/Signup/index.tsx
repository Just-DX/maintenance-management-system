import { Card, CardContent } from '@justdx/components/atoms/Card'

import { SignupForm } from './components/SignupForm'
import { SignupHeader } from './components/SignupHeader'
import { signupFields } from './config/fields'
import { useSignupForm } from './hooks/use-signup-form'

export function SignupPage() {
  const { form, onSubmit, isSubmitting } = useSignupForm()

  return (
    <Card className="w-full max-w-md shadow-xl border-0">
      <SignupHeader />

      <CardContent>
        <SignupForm
          form={form}
          fields={signupFields}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </CardContent>
    </Card>
  )
}
