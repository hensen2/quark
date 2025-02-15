// import { useAuth } from '@/lib/auth';
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
  // useAuth();
  return (
    <>
      <div className="p-2 flex justify-between">
        <div className="flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
        </div>
        <div>
          <Link to="/dashboard" className="[&.active]:font-bold">
            Dashboard
          </Link>
        </div>
      </div>
      <hr />
      <Outlet />
    </>
  );
}
