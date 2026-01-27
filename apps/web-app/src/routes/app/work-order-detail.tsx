import { createRoute } from '@tanstack/react-router'

import { WorkOrderDetailPage } from '@pages/WorkOrderDetail'
import { appRoute } from './layout'

export const workOrderDetailRoute = createRoute({
  getParentRoute: () => appRoute,
  path: 'work-orders/$id',
  component: WorkOrderDetailPage,
})
