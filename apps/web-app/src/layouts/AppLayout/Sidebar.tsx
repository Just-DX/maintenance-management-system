import { Sidebar as SidebarComponent } from '@justdx/components/atoms/Sidebar'
import { FileText, Home, LayoutDashboard, Settings, Users } from 'lucide-react'

const mockNavigationItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard, isActive: true },
  { label: 'Users', href: '/users', icon: Users },
  { label: 'Documents', href: '/documents', icon: FileText },
  { label: 'Settings', href: '/settings', icon: Settings },
]

const mockAppShellProps = {
  appName: 'Maintenance App',
  appLogo: Home,
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'JD',
  },
}

export function Sidebar() {
  return (
    <SidebarComponent variant="inset">
      <SidebarComponent.Header>
        <SidebarComponent.MenuButton size="lg">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Home className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden!">
            <span className="font-semibold">{mockAppShellProps.appName}</span>
            <span className="text-xs text-muted-foreground">v1.0.0</span>
          </div>
        </SidebarComponent.MenuButton>
      </SidebarComponent.Header>
      <SidebarComponent.Content>
        <SidebarComponent.Group>
          <SidebarComponent.GroupLabel>Navigation</SidebarComponent.GroupLabel>
          <SidebarComponent.GroupContent>
            <SidebarComponent.Menu>
              {mockNavigationItems.map((item) => (
                <SidebarComponent.MenuItem key={item.label}>
                  <SidebarComponent.MenuButton isActive={item.isActive} tooltip={item.label}>
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                  </SidebarComponent.MenuButton>
                </SidebarComponent.MenuItem>
              ))}
            </SidebarComponent.Menu>
          </SidebarComponent.GroupContent>
        </SidebarComponent.Group>
      </SidebarComponent.Content>
      <SidebarComponent.Footer>
        <SidebarComponent.Menu>
          <SidebarComponent.MenuItem>
            <SidebarComponent.MenuButton tooltip={mockAppShellProps.user.name}>
              <div className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                {mockAppShellProps.user.avatar}
              </div>
              <span>{mockAppShellProps.user.name}</span>
            </SidebarComponent.MenuButton>
          </SidebarComponent.MenuItem>
        </SidebarComponent.Menu>
      </SidebarComponent.Footer>
      <SidebarComponent.Rail />
    </SidebarComponent>
  )
}
