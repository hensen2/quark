import { NotFound } from '@/components/pages/NotFound';
import { Spinner } from '@/components/ui/spinner';
import { routeTree } from '@/routeTree.gen';
import { createRouter } from '@tanstack/react-router';
import type { JSX } from 'react';
import { queryClient } from './query-client';

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  defaultNotFoundComponent: NotFound,
  defaultPendingComponent: (): JSX.Element => {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
