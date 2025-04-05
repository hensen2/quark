import { Toaster } from '@/components/ui/sonner';
import { authQueryOptions } from '@/lib/auth';
import type { RouterContext } from '@/lib/router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(authQueryOptions),
  component: Root,
});

function Root() {
  return (
    <>
      <Toaster />
      <Outlet />
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </>
  );
}
