import { AuthLayout } from '@layouts/AuthLayout'
import { createRoute, Outlet } from '@tanstack/react-router'
import { rootRoute } from '../root'

export const publicRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public',
  component: () => (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ),
})
