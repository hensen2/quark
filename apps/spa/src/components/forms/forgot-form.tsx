import { cn } from '@utils';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '@vite-react-ts/ui';
import type { ComponentPropsWithoutRef, JSX } from 'react';

export const ForgotForm = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>): JSX.Element => {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Forgot password</CardTitle>
          <CardDescription>
            Enter your email below and reset instructions will be sent to you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required={true} />
              </div>
              <Button type="submit" className="w-full">
                Reset password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
