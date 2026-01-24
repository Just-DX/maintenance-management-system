import { CardDescription, CardHeader, CardTitle } from '@justdx/components/atoms/Card'
import { Wrench } from 'lucide-react'

import { loginCopy } from '../constants/copy'

export function LoginHeader() {
  return (
    <CardHeader className="text-center pb-2">
      <div className="flex items-center justify-center gap-2 mb-4 lg:hidden">
        <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
          <Wrench className="h-6 w-6 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold">{loginCopy.appName}</span>
      </div>
      <CardTitle className="text-2xl">{loginCopy.title}</CardTitle>
      <CardDescription>{loginCopy.description}</CardDescription>
    </CardHeader>
  )
}
