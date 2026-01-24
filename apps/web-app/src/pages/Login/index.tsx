import { Card, CardContent } from '@justdx/components/atoms/Card'

import { LoginForm } from './components/LoginForm'
import { LoginHeader } from './components/LoginHeader'
import { Signup } from './components/Signup'
import { loginFields } from './config/fields'
import { loginCopy } from './constants/copy'
import { useLoginForm } from './hooks/use-login-form'

export function LoginPage() {
  const { form, onSubmit, isSubmitting } = useLoginForm()

  return (
    <Card className="w-full max-w-md shadow-xl border-0">
      <LoginHeader />

      <CardContent>
        <LoginForm
          form={form}
          fields={loginFields}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          submitLabel={loginCopy.submit}
        />

        <Signup />
      </CardContent>
    </Card>
  )
}
