import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Link, Outlet, createFileRoute } from '@tanstack/react-router';
import type { JSX } from 'react';

export const Route = createFileRoute('/_public')({
  component: PublicRoutes,
});

function PublicRoutes(): JSX.Element {
  return (
    <>
      <header className="bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
        <div className="flex h-14 w-full items-center gap-3 px-4">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <Link to="/login" className="[&.active]:font-bold">
              Login
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <Outlet />
    </>
  );
}
