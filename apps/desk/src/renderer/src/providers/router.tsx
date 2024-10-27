import { RouterProvider } from '@tanstack/react-router'
import { router } from '@renderer/router'

export const ReactRouterProvider = () => {
  return <RouterProvider router={router} />
}
