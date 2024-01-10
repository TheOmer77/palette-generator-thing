import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils';

const Header = forwardRef<HTMLElement, ComponentPropsWithoutRef<'header'>>(
  ({ className, ...props }, ref) => (
    <header
      {...props}
      ref={ref}
      className={cn(
        `select-none text-5xl font-bold uppercase leading-[3.25rem]
tracking-tighter text-primary-500 [print-color-adjust:exact]
sm:text-6xl dark:text-primary-300 print:text-primary-800`,
        className
      )}
    >
      <h1>Palette generator thing</h1>
    </header>
  )
);
Header.displayName = 'Header';

export default Header;
