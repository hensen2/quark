// @ts-ignore
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import type * as React from 'react';
import { Button } from '../ui/button';
import { TouchTarget } from '../ui/touch-target';

function Navbar({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      className={cn('flex flex-1 items-center gap-4 py-2.5', className)}
      {...props}
    />
  );
}

function NavbarDivider({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      aria-hidden="true"
      className={cn('h-6 w-px bg-zinc-950/10 dark:bg-white/10', className)}
      {...props}
    />
  );
}

function NavbarSection({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex items-center gap-3', className)} {...props} />
  );
}

function NavbarSpacer({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      aria-hidden="true"
      className={cn('-ml-4 flex-1', className)}
      {...props}
    />
  );
}

function NavbarItem({
  className,
  children,
  ...props
}: {
  current?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof Link>, 'className'>) {
  const classes = cn(
    // Base
    'relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base/6 font-medium text-zinc-950 sm:text-sm/5',
    // Leading icon/icon-only
    '*:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:fill-zinc-500 sm:*:data-[slot=icon]:size-5',
    // Trailing icon (down chevron or similar)
    '*:not-nth-2:last:data-[slot=icon]:ml-auto *:not-nth-2:last:data-[slot=icon]:size-5 sm:*:not-nth-2:last:data-[slot=icon]:size-4',
    // Avatar
    '*:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-7 *:data-[slot=avatar]:[--avatar-radius:var(--radius-md)] sm:*:data-[slot=avatar]:size-6',
    // Hover
    'data-hover:bg-zinc-950/5 data-hover:*:data-[slot=icon]:fill-zinc-950',
    // Active
    'data-active:bg-zinc-950/5 data-active:*:data-[slot=icon]:fill-zinc-950',
    // Dark mode
    'dark:text-white dark:*:data-[slot=icon]:fill-zinc-400',
    'dark:data-hover:bg-white/5 dark:data-hover:*:data-[slot=icon]:fill-white',
    'dark:data-active:bg-white/5 dark:data-active:*:data-[slot=icon]:fill-white',
  );

  return (
    <span className={cn('relative', className)}>
      {current && (
        <motion.span
          layoutId="current-indicator"
          className="absolute inset-x-2 -bottom-2.5 h-0.5 rounded-full bg-zinc-950 dark:bg-white"
        />
      )}
      {'href' in props ? (
        <Link
          className={classes}
          data-current={current ? 'true' : undefined}
          {...props}
        >
          <TouchTarget>{children}</TouchTarget>
        </Link>
      ) : (
        <Button
          asChild={true}
          className={cn('cursor-default', classes)}
          data-current={current ? 'true' : undefined}
          {...props}
        >
          <TouchTarget>{children}</TouchTarget>
        </Button>
      )}
    </span>
  );
}

function NavbarLabel({ className, ...props }: React.ComponentProps<'span'>) {
  return <span className={cn('truncate', className)} {...props} />;
}

export {
  Navbar,
  NavbarDivider,
  NavbarSection,
  NavbarSpacer,
  NavbarItem,
  NavbarLabel,
};
