import { ThemeToggle } from '@/components/ui/theme-toggle';
import type { QueryClient } from '@tanstack/react-query';
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import type { JSX } from 'react';

type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
});

function Root(): JSX.Element {
  return (
    <>
      <div className="p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/login" className="[&.active]:font-bold">
            Login
          </Link>
          <ThemeToggle />
        </div>
      </div>
      <hr />
      <Outlet />
    </>
  );
}
