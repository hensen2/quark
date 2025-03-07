import {
  type UseMutationResult,
  type UseQueryResult,
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { JSX, ReactNode } from 'react';
import { toast } from 'sonner';
import { api } from './api';

export type Auth = {
  isAuthenticated: boolean;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export const checkAuth = async (): Promise<Auth> => {
  return await api.get('/auth/status');
};

export const login = (credentials: LoginCredentials): Promise<Auth> => {
  return api.post('/auth/login', { ...credentials });
};

export const logout = (): Promise<void> => {
  return api.post('/auth/logout');
};

export const authQueryOptions = queryOptions({
  queryKey: ['auth'],
  queryFn: checkAuth,
});

export const useAuth = (): UseQueryResult<Auth> => {
  return useQuery(authQueryOptions);
};

export const useLogin = (): UseMutationResult<
  Auth,
  AxiosError,
  LoginCredentials,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: (data): void => {
      queryClient.setQueryData(authQueryOptions.queryKey, data);
    },
  });
};

export const useLogout = (): UseMutationResult<
  void,
  AxiosError,
  void,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: (): void => {
      queryClient.setQueryData(authQueryOptions.queryKey, {
        isAuthenticated: false,
      });
    },
  });
};

// const login = async (credentials: LoginCredentials): Promise<void> => {
//   const res = await api.post('/auth/login', { ...credentials });
//   auth.status = 'loggedIn';
//   auth.username = res.data.username;
// };

// const logout = async (): Promise<void> => {
//   await api.post('/auth/logout');
//   auth.status = 'loggedOut';
//   auth.username = undefined;
// };

// export const auth: Auth = {
//   status: 'loggedOut',
//   username: undefined,
//   me,
//   login,
//   logout,
// };

// export type Auth = {
//   me: () => void;
//   login: (credentials: LoginCredentials) => void;
//   logout: () => void;
//   status: 'loggedOut' | 'loggedIn';
//   username?: string;
// };

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const { error } = useAuth();
  if (error) {
    toast('Event has been created', {
      description: 'Sunday, December 03, 2023 at 9:00 AM',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo'),
      },
    });
  }
  return <>{children}</>;
};
