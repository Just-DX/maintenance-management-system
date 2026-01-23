import * as React from 'react'
import { LucideIcon, PackageOpen } from 'lucide-react'

import { cn } from '../../lib/utils'
import { Button } from '../Button'

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

function EmptyState({
  className,
  icon: Icon = PackageOpen,
  title,
  description,
  action,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50',
        className
      )}
      {...props}
    >
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Icon className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      {description && (
        <p className="mb-4 mt-2 text-sm text-muted-foreground max-w-sm mx-auto">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick} className="mt-4">
          {action.label}
        </Button>
      )}
    </div>
  )
}

function EmptyStateTable({
  className,
  title = 'No results found',
  description = 'Try adjusting your filters or search query.',
  ...props
}: Omit<EmptyStateProps, 'icon'>) {
  return (
    <div
      className={cn(
        'flex h-full min-h-[200px] w-full flex-col items-center justify-center space-y-2 p-8 text-center',
        className
      )}
      {...props}
    >
      <div className="text-muted-foreground">
        <PackageOpen className="h-8 w-8 mx-auto opacity-50" />
      </div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

const EmptyStatePage = EmptyState

export { EmptyState, EmptyStatePage, EmptyStateTable }
