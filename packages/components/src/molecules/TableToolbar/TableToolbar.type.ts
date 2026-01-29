import type { HTMLAttributes, ReactNode } from 'react'

export interface TableToolbarProps extends HTMLAttributes<HTMLDivElement> {
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  showSearch?: boolean
  filters?: ReactNode
  actions?: ReactNode
}
