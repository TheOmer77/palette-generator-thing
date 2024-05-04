import { forwardRef, type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

export const Sidebar = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<'aside'>
>(({ className, children, ...props }, ref) => (
  <>
    <aside
      {...props}
      ref={ref}
      className={cn(
        `fixed top-0 flex h-screen w-80 flex-col rounded-lg bg-card
after:absolute after:end-0 after:top-0 after:-z-10 after:h-inherit
after:w-screen after:bg-inherit md:rounded-none print:bg-transparent`,
        className
      )}
    >
      {children}
    </aside>
  </>
));
Sidebar.displayName = 'Sidebar';
