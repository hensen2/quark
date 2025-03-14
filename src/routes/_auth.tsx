import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
} from '@tanstack/react-router';
import { Home } from 'lucide-react';

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context: { auth } }) => {
    if (auth.loaded && auth.authClient) {
      throw redirect({
        to: '/dashboard',
      });
    }
  },
  component: AuthRoutes,
});

function AuthRoutes() {
  return (
    <div className="bg-muted">
      <header className="sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2">
        <div className="flex h-14 w-full items-center justify-between px-4">
          <Button asChild={true} variant="outline" size="icon">
            <Link to="/" className="[&.active]:font-bold">
              <Home className="absolute h-[1.2rem] w-[1.2rem]" />
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </header>
      <Outlet />
    </div>
  );
}
