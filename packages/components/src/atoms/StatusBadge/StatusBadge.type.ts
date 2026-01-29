export type StatusType = 'open' | 'in-progress' | 'on-hold' | 'completed' | 'canceled'

export interface StatusBadgeProps {
  status: StatusType
  className?: string
}
