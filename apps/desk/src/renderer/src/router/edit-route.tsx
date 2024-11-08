import { rootRoute } from './root-route';
import { createRoute } from '@tanstack/react-router';
import EditPage from '@renderer/containers/edit';

export const editRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/edit',
  component: EditPage,
});
