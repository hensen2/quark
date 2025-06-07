import { QueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError;
  }
}

export const queryClient = new QueryClient();
