import { authQueryOptions } from '@/lib/auth';
import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  Outlet,
  createRootRouteWithContext,
  redirect,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import type { JSX } from 'react';

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

function Root(): JSX.Element {
  return (
    <>
      <Outlet />
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </>
  );
}
