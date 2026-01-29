import type { ReactNode } from 'react'

export interface AppShellProps {
  sidebar: ReactNode
  header?: ReactNode
  sidebarCollapsible?: 'offcanvas' | 'icon' | 'none'
  defaultSidebarOpen?: boolean
  sidebarOpen?: boolean
  onSidebarOpenChange?: (open: boolean) => void
  children: ReactNode
  className?: string
}

export interface AppShellHeaderProps {
  className?: string
  children?: ReactNode
}
