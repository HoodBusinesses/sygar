import { createRouter } from "@tanstack/react-router"
import { homeRoute } from "./home-route"
import { registrationRoute } from "./registration-route"
import { signinRoute } from "./signin-route"
import { rootRoute } from "./root-route"

const routeTree = rootRoute.addChildren([homeRoute, registrationRoute, signinRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}


