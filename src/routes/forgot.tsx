import { ForgotForm } from '@/components/forms/forgot-form';
import { createFileRoute } from '@tanstack/react-router';
import type { JSX } from 'react';

export const Route = createFileRoute('/forgot')({
  component: Forgot,
});

function Forgot(): JSX.Element {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotForm />
      </div>
    </div>
  );
}
