import { Link } from '@tanstack/react-router';
import { type CSSProperties, useState } from 'react';
import { Button } from '../ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerTrigger,
} from '../ui/drawer';

export default function MobileNav({
  links,
}: {
  links: Array<{ to: string; label: string }>;
}) {
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <Drawer open={showNavbar} onOpenChange={setShowNavbar} direction="left">
      <DrawerTrigger asChild={true}>
        <Button
          variant="ghost"
          className="h-8 w-full gap-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="!size-6"
          >
            <title>Menu Icon</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay className="fixed inset-0 bg-black/40" />
        <DrawerContent
          className="right-2 top-2 bottom-2 fixed z-10 outline-none w-[310px] flex"
          // The gap between the edge of the screen and the drawer is 8px in this case.
          style={{ '--initial-transform': 'calc(100% + 8px)' } as CSSProperties}
        >
          <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col rounded-[16px]">
            <div className="max-w-md mx-auto">
              {links.map((option) => {
                return (
                  <Link
                    {...option}
                    key={option.to}
                    activeProps={{ className: 'font-bold' }}
                    className="p-2"
                  >
                    {option.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}
