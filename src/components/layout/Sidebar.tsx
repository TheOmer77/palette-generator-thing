import { ComponentProps, forwardRef } from 'react';
import { cn } from 'utils';

const Sidebar = forwardRef<HTMLElement, ComponentProps<'aside'>>(
  ({ className, children, ...props }, ref) => (
    <>
      <aside
        {...props}
        ref={ref}
        className={cn(
          `fixed flex h-screen w-[50vw] max-w-[25rem] flex-col gap-4 rounded-lg
bg-neutral-50 dark:bg-neutral-900 md:rounded-none`,
          className
        )}
      >
        {children}
      </aside>
      <div className='w-[50vw] max-w-[25rem]' />
    </>
  )
);
Sidebar.displayName = 'Sidebar';

export default Sidebar;
