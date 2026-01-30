import { CheckCircle2, Circle, Clock, Pause, XCircle } from 'lucide-react'
import { Badge } from '../Badge'
import type { StatusBadgeProps, StatusType } from './StatusBadge.type'

const statusConfig: Record<
  StatusType,
  {
    label: string
    variant: 'default' | 'secondary' | 'success' | 'destructive' | 'outline'
    icon: typeof Clock
  }
> = {
  open: {
    label: 'Open',
    variant: 'default',
    icon: Clock,
  },
  'in-progress': {
    label: 'In Progress',
    variant: 'outline',
    icon: Circle,
  },
  'on-hold': {
    label: 'On Hold',
    variant: 'outline',
    icon: Pause,
  },
  completed: {
    label: 'Completed',
    variant: 'success',
    icon: CheckCircle2,
  },
  canceled: {
    label: 'Canceled',
    variant: 'secondary',
    icon: XCircle,
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className={className ? className : 'gap-1'}>
      <Icon className="size-3 mr-1" />
      {config.label}
    </Badge>
  )
}
