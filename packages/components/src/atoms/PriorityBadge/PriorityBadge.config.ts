import { AlertTriangle, ArrowDown, ArrowUp, Minus } from 'lucide-react'
import type { PriorityConfig, PriorityLevel } from './PriorityBadge.constants'

export const PRIORITY_CONFIG: Record<PriorityLevel, PriorityConfig> = {
  low: {
    label: 'Low',
    variant: 'secondary',
    icon: ArrowDown,
    className: 'text-muted-foreground',
  },
  medium: {
    label: 'Medium',
    variant: 'outline',
    icon: Minus,
  },
  high: {
    label: 'High',
    variant: 'default',
    icon: ArrowUp,
    className: 'bg-orange-500 text-white border-transparent [a&]:hover:bg-orange-500/90',
  },
  critical: {
    label: 'Critical',
    variant: 'destructive',
    icon: AlertTriangle,
  },
}
