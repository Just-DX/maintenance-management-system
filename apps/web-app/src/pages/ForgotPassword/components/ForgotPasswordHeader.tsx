import { CardDescription, CardHeader, CardTitle } from '@justdx/components/atoms/Card'

import { forgotPasswordCopy } from '../constants/copy'

export function ForgotPasswordHeader() {
  return (
    <CardHeader className="space-y-1">
      <CardTitle className="text-2xl font-bold">{forgotPasswordCopy.title}</CardTitle>
      <CardDescription>{forgotPasswordCopy.description}</CardDescription>
    </CardHeader>
  )
}
