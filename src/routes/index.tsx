import { createFileRoute } from '@tanstack/react-router';
import type { JSX } from 'react';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index(): JSX.Element {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
