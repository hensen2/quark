import { cn } from 'quark/utils/cn';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'quark/components/primitives/card';
import { Button } from 'quark/components/primitives/button';
import { Input } from 'quark/components/primitives/input';
import { Label } from 'quark/components/primitives/label';
import type { ComponentPropsWithoutRef, JSX } from 'react';

export const SignupForm = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>): JSX.Element => {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>Enter your details below to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required={true} />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required={true} />
              </div>
              <Button type="submit" className="w-full">
                Create account
              </Button>
              <Button variant="outline" className="w-full">
                Continue with Google
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
