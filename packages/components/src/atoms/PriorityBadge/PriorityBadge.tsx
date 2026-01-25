import { cn } from '../../lib/utils'
import { Badge } from '../Badge'
import { PRIORITY_CONFIG } from './PriorityBadge.config'
import type { PriorityLevel } from './PriorityBadge.constants'

export interface PriorityBadgeProps {
  priority: PriorityLevel
  className?: string
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = PRIORITY_CONFIG[priority]
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className={cn('gap-1', config.className, className)}>
      <Icon className="size-3" />
      {config.label}
    </Badge>
  )
}
