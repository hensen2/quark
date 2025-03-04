import { createFileRoute } from '@tanstack/react-router';
import type { JSX } from 'react';

export const Route = createFileRoute('/_protected/dashboard')({
  component: Dashboard,
});

function Dashboard(): JSX.Element {
  return <div className="p-2">Hello from Dashboard!</div>;
}
