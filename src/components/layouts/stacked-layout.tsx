import { Outlet } from '@tanstack/react-router';
import SiteHeader from './site-header';

export default function StackedLayout() {
  return (
    <div className="flexbox-v relative isolate min-h-svh">
      <SiteHeader />
      {/* Content */}
      <main className="flexbox-v flex-1 pb-2 lg:px-2 ">
        <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:ring-1 lg:shadow-xs lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
