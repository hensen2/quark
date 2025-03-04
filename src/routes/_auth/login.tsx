import { LoginForm } from '@/components/forms/login-form';
import { authQueryOptions } from '@/lib/auth';
import { createFileRoute, redirect } from '@tanstack/react-router';
import type { JSX } from 'react';
import { z } from 'zod';

const loginSearchSchema = z.object({
  redirect: z.string().optional().catch(''),
});

export const Route = createFileRoute('/_auth/login')({
  // validateSearch accepts an object that has a parse method and passes search params to it
  validateSearch: loginSearchSchema,
  beforeLoad: async ({ context, search }): Promise<void> => {
    const data = await context.queryClient.ensureQueryData(authQueryOptions);
    if (data.isAuthenticated) {
      throw redirect({ to: search.redirect || '/dashboard' });
    }
  },
  component: Login,
});

function Login(): JSX.Element {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
