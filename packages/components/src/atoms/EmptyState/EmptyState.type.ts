import type { HTMLAttributes } from 'react'
import type { LucideIcon } from 'lucide-react'

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}
