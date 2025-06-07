import StackedLayout from '@/components/layouts/stacked-layout';
import { createFileRoute } from '@tanstack/react-router';

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
