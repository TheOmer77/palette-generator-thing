import { ComponentProps, forwardRef } from 'react';
import { cn } from 'utils';

const Header = forwardRef<HTMLElement, ComponentProps<'header'>>(
  ({ className, ...props }, ref) => (
    <header
      {...props}
      ref={ref}
      className={cn(
        `select-none text-5xl font-bold uppercase leading-[3.25rem]
tracking-tighter text-primary-500 [print-color-adjust:exact]
dark:text-primary-300 print:text-primary-800 sm:text-6xl`,
        className
      )}
    >
      <h1>Palette generator thing</h1>
    </header>
  )
);
Header.displayName = 'Header';

export default Header;
