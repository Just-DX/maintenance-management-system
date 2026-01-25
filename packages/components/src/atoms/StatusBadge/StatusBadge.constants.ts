import type { CheckCircle2 } from 'lucide-react'

export type StatusType = 'open' | 'in-progress' | 'on-hold' | 'completed' | 'canceled'

export interface StatusConfig {
  label: string
  variant: 'default' | 'secondary' | 'success' | 'destructive' | 'outline'
  icon: typeof CheckCircle2
}
