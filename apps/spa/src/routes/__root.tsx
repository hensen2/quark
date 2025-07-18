import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Toaster } from 'quark/components/primitives/sonner';
import { authQueryOptions } from '@/lib/auth';
import type { RouterContext } from '@/lib/router';

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: ({ context: { queryClient } }) => queryClient.ensureQueryData(authQueryOptions),
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
