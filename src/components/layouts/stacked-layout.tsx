import { Link, Outlet, linkOptions } from '@tanstack/react-router';
import { ThemeToggle } from '../ui/theme-toggle';
import MobileNavbar from './mobile-navbar';

const links = linkOptions([
  {
    to: '/',
    label: 'Home',
    activeOptions: { exact: true },
  },
  {
    to: '/about',
    label: 'About',
  },
  {
    to: '/login',
    label: 'Login',
  },
]);

export default function StackedLayout() {
  return (
    <div className="flex h-screen flex-col">
      <header className="bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
        {/* Sidebar on mobile */}
        <MobileNavbar links={[...links]} />

        <div className="min-w-0 flex-1 hidden justify-between items-center md:block">
          <div className="flex h-14 w-full items-center gap-3 px-4">
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>
            <Link to="/about" className="[&.active]:font-bold">
              About
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Link to="/login" className="[&.active]:font-bold">
              Login
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex flex-1 flex-col pb-2 lg:px-2">
        <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:ring-1 lg:shadow-xs lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
