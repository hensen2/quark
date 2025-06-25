import { createFileRoute } from '@tanstack/react-router';
import { ForgotForm } from '@/components/forms/forgot-form';

export const Route = createFileRoute('/_auth/forgot')({
  component: Forgot,
});

function Forgot() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotForm />
      </div>
    </div>
  );
}
