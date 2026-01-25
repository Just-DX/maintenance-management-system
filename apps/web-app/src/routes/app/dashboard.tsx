import { DashboardPage } from '@pages/Dashboard'
import { createRoute } from '@tanstack/react-router'
import { appRoute } from './layout'

export const dashboardRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/dashboard',
  component: DashboardPage,
})
