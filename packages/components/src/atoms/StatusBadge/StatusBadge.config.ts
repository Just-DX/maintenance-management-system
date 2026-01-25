import { CheckCircle2, Circle, Clock, Pause, XCircle } from 'lucide-react'
import type { StatusConfig, StatusType } from './StatusBadge.constants'

export const STATUS_CONFIG: Record<StatusType, StatusConfig> = {
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
