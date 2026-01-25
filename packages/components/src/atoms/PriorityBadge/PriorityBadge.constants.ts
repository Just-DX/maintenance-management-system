import type { ArrowUp } from 'lucide-react'

export type PriorityLevel = 'low' | 'medium' | 'high' | 'critical'

export interface PriorityConfig {
  label: string
  variant: 'default' | 'secondary' | 'success' | 'destructive' | 'outline'
  icon: typeof ArrowUp
  className?: string
}
