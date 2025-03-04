import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Link, Outlet, createFileRoute } from '@tanstack/react-router';
import type { JSX } from 'react';

export const Route = createFileRoute('/_public')({
  component: PublicRoutes,
});

function PublicRoutes(): JSX.Element {
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
      <div>Hello "/_public" routes!</div>
      <hr />
      <Outlet />
    </>
  );
}
