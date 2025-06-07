import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/resources')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_public/resources"!</div>;
}
