import { createFileRoute } from '@tanstack/react-router';
import StackedLayout from '@/components/layouts/stacked-layout';

export const Route = createFileRoute('/_public')({
  component: PublicRoutes,
});

function PublicRoutes() {
  return (
    <>
      <StackedLayout />
    </>
  );
}
