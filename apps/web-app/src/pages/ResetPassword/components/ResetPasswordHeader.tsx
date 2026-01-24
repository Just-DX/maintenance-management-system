import { CardDescription, CardHeader, CardTitle } from '@justdx/components/atoms/Card'

import { resetPasswordCopy } from '../constants/copy'

export function ResetPasswordHeader() {
  return (
    <CardHeader className="space-y-1">
      <CardTitle className="text-2xl font-bold">{resetPasswordCopy.title}</CardTitle>
      <CardDescription>{resetPasswordCopy.description}</CardDescription>
    </CardHeader>
  )
}
