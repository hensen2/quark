import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { checkAuth, login, logout } from '@/lib/auth';

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthContext = {
  loaded: boolean;
  authClient: boolean;
  onLogin: (credentials: LoginCredentials) => Promise<void>;
  onLogout: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProviderContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children, ...props }: AuthProviderProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [authClient, setAuthClient] = useState<boolean>(false);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const data = await checkAuth();
        setAuthClient(data.isAuthenticated);
        setLoaded(true);
      } catch (error) {
        console.error('Auth loading error:', error);
        setAuthClient(false);
      } finally {
        setLoaded(true);
      }
    };

    loadAuth();
  }, []);

  const onLogin = useCallback(async (credentials: LoginCredentials) => {
    const { isAuthenticated } = await login(credentials);
    setAuthClient(isAuthenticated);
  }, []);

  const onLogout = useCallback(async () => {
    await logout();
    setAuthClient(false);
  }, []);

  const value = useMemo(
    () => ({
      loaded,
      authClient,
      onLogin,
      onLogout,
    }),
    [loaded, authClient, onLogin, onLogout],
  );

  return (
    <AuthProviderContext {...props} value={value}>
      {children}
    </AuthProviderContext>
  );
};

export const useAuth = (): AuthContext => {
  const context = useContext(AuthProviderContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
