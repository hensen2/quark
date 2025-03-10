import { type ReactNode, createContext, useContext, useState } from 'react';

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContext = {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
};

const initialState: AuthContext = {
  isAuth: false,
  setIsAuth: () => null,
};

const AuthProviderContext = createContext<AuthContext>(initialState);

export const AuthProvider = ({ children, ...props }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const value = {
    isAuth,
    setIsAuth: (isAuth: boolean): void => {
      setIsAuth(isAuth);
    },
  };

  return (
    <AuthProviderContext {...props} value={value}>
      {children}
    </AuthProviderContext>
  );
};

export const useAuth = (): AuthContext => {
  const context = useContext(AuthProviderContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
