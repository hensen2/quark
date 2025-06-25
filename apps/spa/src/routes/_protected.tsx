import { createFileRoute, Outlet, useRouter } from '@tanstack/react-router';
import { Button } from '@vite-react-ts/ui';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/context/AuthContext';

export const Route = createFileRoute('/_protected')({
  component: ProtectedRoutes,
});

function ProtectedRoutes() {
  const auth = useAuth();
  const router = useRouter();

  async function onClick(): Promise<void> {
    await auth.onLogout();
    await router.invalidate();
  }

  return (
    <>
      <header className="bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
        <div className="flex h-14 w-full items-center gap-3 px-4">
          <div className="ml-auto flex items-center gap-3">
            <Button onClick={onClick}>Logout</Button>

            <ThemeToggle />
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}
