import { Button } from '@justdx/components/atoms/Button'
import { Card, CardContent } from '@justdx/components/atoms/Card'
import { Separator } from '@justdx/components/atoms/Separator'
import { Github } from 'lucide-react'

import { Google } from '@justdx/components'
import { LoginForm } from './components/LoginForm'
import { LoginHeader } from './components/LoginHeader'
import { Signup } from './components/Signup'
import { loginFields } from './config/fields'
import { loginCopy } from './constants/copy'
import { useLoginForm } from './hooks/use-login-form'

export function LoginPage() {
  const { form, onSubmit, isSubmitting, signInWithGoogle, signInWithGithub } = useLoginForm()

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

        <div className="my-6 flex items-center gap-2">
          <Separator className="flex-1" />
          <span className="text-xs uppercase text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div>

        <div className="flex flex-col gap-3">
          <Button variant="outline" className="w-full" onClick={() => signInWithGoogle()}>
            <Google className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full" onClick={() => signInWithGithub()}>
            <Github className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>
        </div>

        <Signup />
      </CardContent>
    </Card>
  )
}
