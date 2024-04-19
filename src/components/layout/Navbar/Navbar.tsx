import { NavbarActions } from './NavbarActions';
import { NavbarHeader } from './NavbarHeader';

export const Navbar = () => (
  <nav
    className='sticky top-0 z-10 mx-auto grid h-16 w-full max-w-screen-2xl
grid-cols-[auto,1fr] items-center bg-background
md:grid-cols-[theme(spacing.80),1fr] md:bg-transparent [&>:first-child]:ps-4
[&>:last-child]:pe-4'
  >
    <NavbarHeader />
    <NavbarActions />
  </nav>
);
