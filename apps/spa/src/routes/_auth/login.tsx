import { LoginForm } from '@/components/forms/login-form';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

const loginSearchSchema = z.object({
  redirect: z.string().optional().catch(''),
});

export const Route = createFileRoute('/_auth/login')({
  // validateSearch accepts an object that has a parse method and passes search params to it
  validateSearch: loginSearchSchema,
  // beforeLoad: ({ context, search }) => {
  //   if (context.auth.authClient) {
  //     throw redirect({ to: search.redirect || '/dashboard' });
  //   }
  // },
  component: Login,
});

function Login() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
