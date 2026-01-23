import * as React from 'react'
import { Eye, EyeOff, Search } from 'lucide-react'

import { cn } from '../../lib/utils'
import { Button } from '../Button'
import { Input } from '../Input'

export interface InputGroupProps extends React.ComponentProps<typeof Input> {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

const InputGroup = React.forwardRef<HTMLInputElement, InputGroupProps>(
  ({ className, startIcon, endIcon, ...props }, ref) => {
    return (
      <div className="relative">
        {startIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {startIcon}
          </div>
        )}
        <Input
          ref={ref}
          className={cn(startIcon && 'pl-10', endIcon && 'pr-10', className)}
          {...props}
        />
        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {endIcon}
          </div>
        )}
      </div>
    )
  }
)
InputGroup.displayName = 'InputGroup'

const InputSearch = React.forwardRef<HTMLInputElement, React.ComponentProps<typeof Input>>(
  ({ className, ...props }, ref) => {
    return (
      <InputGroup
        ref={ref}
        startIcon={<Search className="h-4 w-4" />}
        className={className}
        {...props}
      />
    )
  }
)
InputSearch.displayName = 'InputSearch'

const InputPassword = React.forwardRef<HTMLInputElement, React.ComponentProps<typeof Input>>(
  ({ className, ...props }, ref) => {
    const [show, setShow] = React.useState(false)

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={show ? 'text' : 'password'}
          className={cn('pr-10', className)}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShow(!show)}
        >
          {show ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="sr-only">{show ? 'Hide password' : 'Show password'}</span>
        </Button>
      </div>
    )
  }
)
InputPassword.displayName = 'InputPassword'

export { InputGroup, InputSearch, InputPassword }
