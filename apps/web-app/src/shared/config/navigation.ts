import {
  Building2,
  Calendar,
  CalendarDays,
  ChartColumn,
  ClipboardList,
  LayoutDashboard,
  MapPin,
  Settings,
  Users,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

export interface NavigationItem {
  label: string
  href: string
  icon: LucideIcon
  isActive?: boolean
}

export interface NavigationGroup {
  label: string
  items: NavigationItem[]
}

const MAIN_MENU_ITEMS: NavigationItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Work Orders', href: '/work-orders', icon: ClipboardList },
  { label: 'Calendar', href: '/calendar', icon: CalendarDays },
  { label: 'Locations', href: '/locations', icon: MapPin },
  { label: 'Assets', href: '/assets', icon: Wrench },
  { label: 'PM Schedules', href: '/pm-schedules', icon: Calendar },
  { label: 'Reports', href: '/reports', icon: ChartColumn },
]

const ADMIN_MENU_ITEMS: NavigationItem[] = [
  { label: 'Users', href: '/users', icon: Users },
  { label: 'Sites', href: '/sites', icon: Building2 },
  { label: 'Settings', href: '/settings', icon: Settings },
]

export const NAVIGATION_GROUPS: NavigationGroup[] = [
  { label: 'Main Menu', items: MAIN_MENU_ITEMS },
  { label: 'Administration', items: ADMIN_MENU_ITEMS },
]

export const APP_CONFIG = {
  name: 'JustDX',
  version: 'v1.0.0',
}
