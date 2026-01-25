import { WorkOrdersPage } from '@pages/WorkOrders'
import { createRoute } from '@tanstack/react-router'
import { appRoute } from './layout'

export const workOrderRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/work-orders',
  component: WorkOrdersPage,
})
