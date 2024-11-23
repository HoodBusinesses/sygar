import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './root-route';
import ProfilePage from '@renderer/containers/profile';

export const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: ProfilePage,
});
