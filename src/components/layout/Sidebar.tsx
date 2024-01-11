import { forwardRef, type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/utils';

export const Sidebar = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<'aside'>
>(({ className, children, ...props }, ref) => (
  <>
    <aside
      {...props}
      ref={ref}
      className={cn(
        `fixed flex h-screen w-80 flex-col rounded-lg bg-neutral-50
after:absolute after:end-0 after:top-0 after:-z-10 after:h-inherit
after:w-screen after:bg-inherit md:rounded-none dark:bg-neutral-900`,
        className
      )}
    >
      {children}
    </aside>
  </>
));
Sidebar.displayName = 'Sidebar';
