import { NotFound } from '@/components/pages/NotFound';
import { Spinner } from '@/components/ui/spinner';
import type { AuthContext } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { routeTree } from '@/routeTree.gen';
import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { queryClient } from './query-client';

export type RouterContext = {
  queryClient: QueryClient;
  auth: AuthContext;
};

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: null as unknown as AuthContext,
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
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  },
  InnerWrap: ({ children }) => {
    return (
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        {children}
      </ThemeProvider>
    );
  },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
