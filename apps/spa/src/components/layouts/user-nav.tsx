import { Link } from '@tanstack/react-router';
import { Button } from 'quark/components/primitives/button';
import { Separator } from 'quark/components/primitives/separator';
import { ThemeToggle } from '../ui/theme-toggle';
import CommandNav from './command-nav';

export default function UserNav() {
  return (
    <div className="flex items-center justify-end">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <CommandNav />
          <ThemeToggle />
        </div>
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-8 data-[orientation=vertical]:bg-muted-foreground/50"
        />
        <div className="hidden md:flex md:items-center md:gap-2">
          <Button asChild={true} className="rounded-lg">
            <Link to="/signup">Sign Up</Link>
          </Button>
          <Button asChild={true} variant="ghost" className="rounded-lg">
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
