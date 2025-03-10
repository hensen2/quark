import { authQueryOptions } from '@/lib/auth';
import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  Outlet,
  createRootRouteWithContext,
  redirect,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context, location }): Promise<void> => {
    const data = await context.queryClient.ensureQueryData(authQueryOptions);
    if (data.isAuthenticated && location.pathname !== '/dashboard') {
      throw redirect({
        to: '/dashboard',
      });
    }
  },
  component: Root,
});

function Root() {
  return (
    <>
      <Outlet />
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </>
  );
}
