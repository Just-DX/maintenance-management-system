import { AppLayout } from '@layouts/AppLayout'
import { createRoute, Outlet } from '@tanstack/react-router'
import { rootRoute } from '../root'

export const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'app',
  component: () => {
    return (
      <AppLayout>
        <Outlet />
      </AppLayout>
    )
  },
})
