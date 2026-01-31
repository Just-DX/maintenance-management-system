import { AuthCallbackPage } from '@pages/AuthCallback'
import { createRoute } from '@tanstack/react-router'
import { publicRoute } from './layout'

export const authCallbackRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/auth/callback',
  component: AuthCallbackPage,
})
