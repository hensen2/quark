import { authQueryOptions } from '@/lib/auth';
import { createFileRoute, redirect } from '@tanstack/react-router';
import type { JSX } from 'react';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context, location }): Promise<void> => {
    const data = await context.queryClient.ensureQueryData(authQueryOptions);

    if (!data.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent(): JSX.Element {
  return <div>Hello "/_auth"!</div>;
}
