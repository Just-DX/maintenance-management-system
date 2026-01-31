import { LoginPage } from '@pages/Login'
import { createRoute } from '@tanstack/react-router'
import { publicRoute } from './layout'

export const indexRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/auth/login',
  component: LoginPage,
})
