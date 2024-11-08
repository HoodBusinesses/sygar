import { Layout } from '@renderer/containers/layout';
import { NotFound } from '@renderer/containers/not-found';
import { createRootRoute } from '@tanstack/react-router';

export const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: NotFound,
});
