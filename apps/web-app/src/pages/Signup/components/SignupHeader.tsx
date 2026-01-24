import { CardDescription, CardHeader, CardTitle } from '@justdx/components/atoms/Card'

import { signupCopy } from '../constants/copy'

export function SignupHeader() {
  return (
    <CardHeader className="space-y-1">
      <CardTitle className="text-2xl font-bold">{signupCopy.title}</CardTitle>
      <CardDescription>{signupCopy.description}</CardDescription>
    </CardHeader>
  )
}
