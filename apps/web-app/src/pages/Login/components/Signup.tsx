import { Button } from '@justdx/components/atoms/Button'
import { Google } from '@justdx/components/atoms/Icon'
import { Separator } from '@justdx/components/atoms/Separator'
import { Link } from '@tanstack/react-router'
import { Github } from 'lucide-react'
import { loginCopy } from '../constants/copy'

export function Signup() {
  return (
    <div className="text-sm w-full mt-2">
      <p className="text-center">
        {loginCopy.signup.prompt}{' '}
        <Button variant="link" asChild className="px-0">
          <Link to="/signup">{loginCopy.signup.action}</Link>
        </Button>
      </p>

      <div className="relative flex items-center mt-2">
        <Separator className="flex-1" />
        <span className="mx-3 px-2 text-sm text-muted-foreground">{loginCopy.signup.connect}</span>
        <Separator className="flex-1" />
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <Button variant="outline" size="icon">
          <Google />
        </Button>
        <Button variant="outline" size="icon">
          <Github />
        </Button>
      </div>
    </div>
  )
}
