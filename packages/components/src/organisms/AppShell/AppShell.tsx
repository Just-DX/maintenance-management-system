import * as React from 'react'

import { cn } from '../../lib/utils'
import { Separator } from '../../shadcn-primitives/separator'
import { Sidebar } from '../../atoms/Sidebar'
import { appShellStyles } from './AppShell.constants'

export interface AppShellProps {
  sidebar: React.ReactNode
  header?: React.ReactNode
  sidebarCollapsible?: 'offcanvas' | 'icon' | 'none'
  defaultSidebarOpen?: boolean
  sidebarOpen?: boolean
  onSidebarOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function AppShellRoot({
  sidebar,
  header,
  sidebarCollapsible = 'offcanvas',
  defaultSidebarOpen = true,
  sidebarOpen,
  onSidebarOpenChange,
  children,
  className,
}: AppShellProps) {
  return (
    <Sidebar.Provider
      defaultOpen={defaultSidebarOpen}
      open={sidebarOpen}
      onOpenChange={onSidebarOpenChange}
    >
      {React.isValidElement(sidebar)
        ? React.cloneElement(sidebar as React.ReactElement<{ collapsible?: string }>, {
            collapsible: sidebarCollapsible,
          })
        : sidebar}
      <Sidebar.Inset
        className={cn('md:peer-data-[variant=inset]:border', appShellStyles.content, className)}
      >
        {header}
        <main className={appShellStyles.main}>{children}</main>
      </Sidebar.Inset>
    </Sidebar.Provider>
  )
}

// Header sub-component with sidebar trigger built-in
function AppShellHeader({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <header className={cn(appShellStyles.header, className)}>
      <Sidebar.Trigger className={appShellStyles.headerTrigger} />
      <Separator orientation="vertical" className={appShellStyles.headerSeparator} />
      <div className={appShellStyles.headerContent}>{children}</div>
    </header>
  )
}

// Export as compound component
export const AppShell = Object.assign(AppShellRoot, {
  Header: AppShellHeader,
})

AppShellRoot.displayName = 'AppShell'
AppShellHeader.displayName = 'AppShell.Header'
