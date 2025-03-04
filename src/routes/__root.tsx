import { ThemeToggle } from '@/components/ui/theme-toggle';
import { authQueryOptions } from '@/lib/auth';
import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  Link,
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
      <div className="p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/login" className="[&.active]:font-bold">
            Login
          </Link>
          <ThemeToggle />
        </div>
      </div>
      <hr />
      <Outlet />
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </>
  );
}
