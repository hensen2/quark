import { Link, linkOptions } from '@tanstack/react-router';
import { Hexagon } from 'lucide-react';
import MainNav from './main-nav';
import MobileNav from './mobile-nav';
import UserNav from './user-nav';

const links = linkOptions([
  {
    to: '/',
    label: 'Home',
    // activeOptions: { exact: true },
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

export default function SiteHeader() {
  return (
    <header className="top-0 sticky isolate z-10">
      <div className="fluid-wrapper">
        <div className="flexbox-h h-14 gap-4 md:gap-6">
          <Link to="/" className="mr-4">
            <Hexagon className="size-9 stroke-[1.5] hover:stroke-2" />
          </Link>

          <MainNav />

          <UserNav />

          <MobileNav links={[...links]} />
        </div>
      </div>
    </header>
  );
}
