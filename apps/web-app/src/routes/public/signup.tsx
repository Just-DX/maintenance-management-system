import { SignupPage } from '@pages/Signup'
import { createRoute } from '@tanstack/react-router'

import { publicRoute } from './layout'

export const signupRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/signup',
  component: SignupPage,
})
