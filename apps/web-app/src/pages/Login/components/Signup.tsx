import { Button } from '@justdx/components/atoms/Button'
import { Google } from '@justdx/components/atoms/Icon'
import { Separator } from '@justdx/components/atoms/Separator'
import { Link } from '@tanstack/react-router'
import { Github } from 'lucide-react'

export function Signup() {
  return (
    <div className="text-sm w-full mt-2">
      <p className="text-center">
        Don't have an account?{' '}
        <Button variant="link" asChild className="px-0">
          <Link to="/signup">Sign up</Link>
        </Button>
      </p>

      <div className="relative flex items-center mt-2">
        <Separator className="flex-1" />
        <span className="mx-3 bg-background px-2 text-sm text-muted-foreground">
          or connect with
        </span>
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
