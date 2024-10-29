import {
  RouterProvider,
} from '@tanstack/react-router'

import { router } from '@renderer/router'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const ReactRouterProvider = () => {
  return <RouterProvider router={router} />
}
