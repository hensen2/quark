import { Link } from '@tanstack/react-router';
import { Button, NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@vite-react-ts/ui';

export default function MainNav() {
  return (
    <div className="hidden mr-4 md:flexbox-h md:flex-1">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Button
              asChild={true}
              variant="link"
              className="transition-none hover:no-underline hover:bg-muted [&.active]:underline [&.active]:underline-offset-20 hover:[&.active]:bg-background"
            >
              <Link to="/products">Products</Link>
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button
              asChild={true}
              variant="link"
              className="transition-none hover:no-underline hover:bg-muted [&.active]:underline [&.active]:underline-offset-20 hover:[&.active]:bg-background"
            >
              <Link to="/pricing">Pricing</Link>
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button
              asChild={true}
              variant="link"
              className="transition-none hover:no-underline hover:bg-muted [&.active]:underline [&.active]:underline-offset-20 hover:[&.active]:bg-background"
            >
              <Link to="/resources">Resources</Link>
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button
              asChild={true}
              variant="link"
              className="transition-none hover:no-underline hover:bg-muted [&.active]:underline [&.active]:underline-offset-20 hover:[&.active]:bg-background"
            >
              <Link to="/about">About</Link>
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
