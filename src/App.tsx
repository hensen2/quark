import { RouterProvider } from '@tanstack/react-router';
import { useAuth } from './context/AuthContext';
import { router } from './lib/router';

export const App = () => {
  const auth = useAuth();

  return <RouterProvider router={router} context={{ auth }} />;
};
