import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { type JSX, useState } from 'react';
import { AuthLoader } from './lib/auth';
import { router } from './lib/router';

export const App = (): JSX.Element => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthLoader>
        <RouterProvider router={router} />
        <TanStackRouterDevtools router={router} />
      </AuthLoader>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
