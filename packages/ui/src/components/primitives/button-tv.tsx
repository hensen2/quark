import { Slot } from '@radix-ui/react-slot';
import type * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative overflow-hidden isolate",
  variants: {
    variant: {
      primary:
        'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 active:bg-primary/80',
      destructive:
        'bg-destructive text-white shadow-xs hover:bg-destructive/90 active:bg-destructive/80 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
      outline:
        'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground active:bg-accent/80 dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
      secondary:
        'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 active:bg-secondary/70',
      ghost:
        'hover:bg-accent hover:text-accent-foreground active:bg-accent/80 dark:hover:bg-accent/50',
      link: 'text-primary underline-offset-4 hover:underline active:text-primary/80',
    },
    size: {
      xs: 'h-6 rounded-md px-2 text-xs gap-1',
      sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
      md: 'h-9 px-4 py-2 has-[>svg]:px-3',
      lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
      xl: 'h-12 rounded-md px-8 text-base gap-2.5',
      icon: 'size-9',
    },
    fullWidth: {
      true: 'w-full',
    },
    loading: {
      true: 'cursor-wait',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
  compoundVariants: [
    {
      loading: true,
      className: 'text-transparent select-none',
    },
  ],
});

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  // success?: boolean;
  // ripple?: boolean;
  // iconPosition?: 'left' | 'right';
  // icon?: React.ReactNode;
  // Analytics props
  // trackingId?: string;
  // trackingData?: Record<string, string>;
  // onTrack?: (event: 'click' | 'hover', data?: Record<string, string>) => void;
  // Accessibility props
  // pressed?: boolean;
  // expanded?: boolean;
  // controls?: string;
  // describedBy?: string;
  // popup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  // Testing
  // testId?: string;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  fullWidth = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  const isDisabled = disabled || loading;

  return (
    <Comp
      data-slot="button"
      className={buttonVariants({ className, variant, size, fullWidth })}
      disabled={isDisabled}
      {...props}
    />
  );
}

Button.displayName = 'Button';

export { Button, buttonVariants };
