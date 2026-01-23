import { Bell, FileText, Home, LayoutDashboard, Settings, Users } from 'lucide-react'

export const mockNavigationItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard, isActive: true },
  { label: 'Users', href: '/users', icon: Users },
  { label: 'Documents', href: '/documents', icon: FileText },
  { label: 'Settings', href: '/settings', icon: Settings },
]

export const mockNavigationGroups = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', href: '/', icon: LayoutDashboard, isActive: true },
      { label: 'Users', href: '/users', icon: Users },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Documents', href: '/documents', icon: FileText },
      { label: 'Settings', href: '/settings', icon: Settings },
    ],
  },
]

export const mockAppShellProps = {
  appName: 'Maintenance App',
  appLogo: Home,
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'JD',
  },
}

export { Bell, FileText, Home, LayoutDashboard, Settings, Users }
