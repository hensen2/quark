import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from '@tanstack/react-router';
import { cn } from 'quark/utils/cn';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'quark/components/primitives/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'quark/components/primitives/card';
import { Button } from 'quark/components/primitives/button';
import { Input } from 'quark/components/primitives/input';
import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useLogin } from '@/lib/auth';

const formSchema = z.object({
  email: z.string().min(3, 'Email required.').max(50).email('Invalid email address.'),
  password: z.string().min(8, 'Password required.').max(64),
});

export const LoginForm = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => {
  const login = useLogin();
  const router = useRouter();

  // 1. Defines your form schema for validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Defines a submit handler with validated form values
  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    await login.mutateAsync(values);
    await router.invalidate();
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }): ReactElement => (
                    <FormItem className="grid gap-2 space-y-0">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          required={true}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }): ReactElement => (
                    <FormItem className="grid gap-2 space-y-0">
                      <div className="flex items-center">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link
                          to="/forgot"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input id="password" type="password" required={true} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Continue with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?&nbsp;
                <Link to="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
