import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import type { JSX, ReactNode } from 'react';
import { api } from './api';

type AuthResponse = {
  isAuthenticated: boolean;
};

export const getAuth = async (): Promise<AuthResponse> => {
  return await api.get('/api/auth');
};

const queryOptions = {
  queryKey: ['auth'],
  queryFn: getAuth,
  // refetchInterval: 1000 * 60 * 10, // refetch every 10min to refresh auth
};

export const useAuth = (): UseQueryResult<AuthResponse> => {
  return useQuery<AuthResponse>(queryOptions);
};

const me = async (): Promise<void> => {
  const res = await api.get('/auth/me');
  auth.status = 'loggedIn';
  auth.username = res.data.username;
};

const login = async (credentials: LoginCredentials): Promise<void> => {
  const res = await api.post('/auth/login', { ...credentials });
  auth.status = 'loggedIn';
  auth.username = res.data.username;
};

const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
  auth.status = 'loggedOut';
  auth.username = undefined;
};

export const auth: Auth = {
  status: 'loggedOut',
  username: undefined,
  me,
  login,
  logout,
};

export type LoginCredentials = {
  username: string;
};

export type Auth = {
  me: () => void;
  login: (credentials: LoginCredentials) => void;
  logout: () => void;
  status: 'loggedOut' | 'loggedIn';
  username?: string;
};

export const AuthLoader = ({
  children,
  // renderLoading,
  // renderUnauthenticated,
  // renderError = (error: Error) => <>{JSON.stringify(error)}</>,
}: {
  children: ReactNode;
  // renderLoading: () => JSX.Element;
  // renderUnauthenticated?: () => JSX.Element;
  // renderError?: (error: Error) => JSX.Element;
}): JSX.Element => {
  const { isSuccess, isFetched, status } = useAuth();

  if (isSuccess) {
    // if (renderUnauthenticated && !data) {
    //   return renderUnauthenticated();
    // }
    return <>{children}</>;
  }

  if (!isFetched) {
    return <>Loading</>;
    // return renderLoading();
  }

  if (status === 'error') {
    return <>Error</>;
    // return renderError(error);
  }

  return <>How did I get here?</>;
};
