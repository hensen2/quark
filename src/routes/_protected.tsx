import { Button } from '@/components/ui/button';
import { authQueryOptions, useLogout } from '@/lib/auth';
import {
  Outlet,
  createFileRoute,
  redirect,
  useRouter,
} from '@tanstack/react-router';
import type { JSX } from 'react';

export const Route = createFileRoute('/_protected')({
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
  component: ProtectedRoutes,
});

function ProtectedRoutes(): JSX.Element {
  const logout = useLogout();
  const router = useRouter();

  async function onClick(): Promise<void> {
    await logout.mutateAsync();
    await router.invalidate();
  }

  return (
    <>
      <div>Hello "/_protected"!</div>
      <hr />
      <Button onClick={onClick}>Logout</Button>
      <Outlet />
    </>
  );
}
