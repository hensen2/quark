import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/context/ThemeContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import type { JSX } from 'react';
import { AuthProvider } from './lib/auth';
import { queryClient } from './lib/query-client';
import { router } from './lib/router';

export const App = (): JSX.Element => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
      <Toaster />
    </ThemeProvider>
  );
};
