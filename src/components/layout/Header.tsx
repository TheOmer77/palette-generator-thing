import { ComponentProps, forwardRef } from 'react';
import { cn } from 'utils';

const Header = forwardRef<HTMLElement, ComponentProps<'header'>>(
  ({ className, ...props }, ref) => (
    <header
      {...props}
      ref={ref}
      className={cn(
        `select-none text-5xl font-bold uppercase leading-[3.25rem]
tracking-tighter text-primary-40 dark:text-primary-70 sm:text-6xl`,
        className
      )}
    >
      <h1>Palette generator thing</h1>
    </header>
  )
);
Header.displayName = 'Header';

export default Header;
