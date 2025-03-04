import { Outlet, createFileRoute } from '@tanstack/react-router';
import type { JSX } from 'react';

export const Route = createFileRoute('/_auth')({
  component: AuthRoutes,
});

function AuthRoutes(): JSX.Element {
  return (
    <>
      <div>Hello "/_auth"!</div>
      <hr />
      <Outlet />
    </>
  );
}
