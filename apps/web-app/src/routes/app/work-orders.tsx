import { WorkOrderPage } from '@pages/WorkOrder'
import { createRoute } from '@tanstack/react-router'
import { appRoute } from './layout'

export const workOrderRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/work-orders',
  component: WorkOrderPage,
})
