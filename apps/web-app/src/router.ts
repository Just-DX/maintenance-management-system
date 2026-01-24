import { appRoute } from '@routes/app/layout'
import { indexRoute } from '@routes/public'
import { publicRoute } from '@routes/public/layout'
import { createRouter } from '@tanstack/react-router'
import { rootRoute } from './routes/root'

const routeTree = rootRoute.addChildren([
  publicRoute.addChildren([indexRoute]),
  appRoute.addChildren([]),
])

export const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
