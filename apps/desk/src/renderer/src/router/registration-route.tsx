import Registration from "@renderer/containers/Registration";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root-route";

export const registrationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/registration',
  component: Registration
})


