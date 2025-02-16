import { Spinner } from '@/components/ui/spinner';
import {
  type UseQueryResult,
  queryOptions,
  useQuery,
} from '@tanstack/react-query';
import type { JSX, ReactNode } from 'react';
import { api } from './api';

type Auth = {
  isAuthenticated: boolean;
};

export const getAuth = async (): Promise<Auth> => {
  return await api.get('/auth/me');
};

const authQuery = queryOptions({
  queryKey: ['auth'],
  queryFn: getAuth,
  // refetchInterval: 1000 * 60 * 10, // refetch every 10min to refresh auth
});

export const useAuth = (): UseQueryResult<Auth> => {
  return useQuery(authQuery);
};

// const me = async (): Promise<void> => {
//   const res = await api.get('/auth/me');
//   auth.status = 'loggedIn';
//   auth.username = res.data.username;
// };

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

export type LoginCredentials = {
  username: string;
};

// export type Auth = {
//   me: () => void;
//   login: (credentials: LoginCredentials) => void;
//   logout: () => void;
//   status: 'loggedOut' | 'loggedIn';
//   username?: string;
// };

export const AuthLoader = ({
  children,
  // renderUnauthenticated,
  // renderError = (error: Error) => <>{JSON.stringify(error)}</>,
}: {
  children: ReactNode;
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
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (status === 'error') {
    return <>Error</>;
    // return renderError(error);
  }

  return <>How did I get here?</>;
};
