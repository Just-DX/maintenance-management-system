import * as React from 'react'

import { cn } from '../lib/utils'

const InputGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('relative flex items-center w-full', className)} {...props} />
    )
  }
)
InputGroup.displayName = 'InputGroup'

const InputGroupLeft = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10 flex items-center pointer-events-none',
          className
        )}
        {...props}
      />
    )
  }
)
InputGroupLeft.displayName = 'InputGroupLeft'

const InputGroupRight = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10 flex items-center',
          className
        )}
        {...props}
      />
    )
  }
)
InputGroupRight.displayName = 'InputGroupRight'

export { InputGroup, InputGroupLeft, InputGroupRight }
