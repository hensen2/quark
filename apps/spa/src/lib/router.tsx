import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { Spinner } from '@vite-react-ts/ui';
import { NotFound } from '@/components/pages/NotFound';
import { ThemeProvider } from '@/context/ThemeContext';
import { routeTree } from '@/routeTree.gen';
import { queryClient } from './query-client';

export type RouterContext = {
  queryClient: QueryClient;
};

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
  defaultPendingComponent: () => {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  },
  Wrap: ({ children }) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  },
  InnerWrap: ({ children }) => {
    return <ThemeProvider>{children}</ThemeProvider>;
  },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
