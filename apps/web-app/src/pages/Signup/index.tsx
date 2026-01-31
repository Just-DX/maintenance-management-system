import { Button } from '@justdx/components/atoms/Button'
import { Card, CardContent } from '@justdx/components/atoms/Card'
import { Separator } from '@justdx/components/atoms/Separator'
import { Google } from '@justdx/components'
import { Github } from 'lucide-react'

import { SignupForm } from './components/SignupForm'
import { SignupHeader } from './components/SignupHeader'
import { signupFields } from './config/fields'
import { useSignupForm } from './hooks/use-signup-form'
import { signupCopy } from './constants/copy'

export function SignupPage() {
  const { form, onSubmit, isSubmitting, signInWithGoogle, signInWithGithub } = useSignupForm()

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

        <div className="my-6 flex items-center gap-2">
          <Separator className="flex-1" />
          <span className="text-xs uppercase text-muted-foreground">{signupCopy.separator}</span>
          <Separator className="flex-1" />
        </div>

        <div className="flex flex-col gap-3">
          <Button variant="outline" className="w-full" onClick={() => signInWithGoogle()}>
            <Google className="mr-2 h-4 w-4" />
            {signupCopy.googleCta}
          </Button>
          <Button variant="outline" className="w-full" onClick={() => signInWithGithub()}>
            <Github className="mr-2 h-4 w-4" />
            {signupCopy.githubCta}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
