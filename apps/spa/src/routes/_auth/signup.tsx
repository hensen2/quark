import { createFileRoute } from '@tanstack/react-router';
import { SignupForm } from '@/components/forms/signup-form';

export const Route = createFileRoute('/_auth/signup')({
  component: Signup,
});

function Signup() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
