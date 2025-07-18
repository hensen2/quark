import type { JSX } from 'react';
import { cn } from '../../utils/cn';

const sizes = {
  sm: 'size-4',
  md: 'size-8',
  lg: 'size-16',
  xl: 'size-24',
};

const variants = {
  light: 'text-white',
  primary: 'text-foreground',
};

export type SpinnerProps = {
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  className?: string;
};

export const Spinner = ({
  size = 'md',
  variant = 'primary',
  className = '',
}: SpinnerProps): JSX.Element => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn('animate-spin', sizes[size], variants[variant], className)}
      >
        <title>Loading</title>
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <span className="sr-only">Loading</span>
    </>
  );
};
