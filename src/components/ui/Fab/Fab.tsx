import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';

import { cn } from '@/lib/utils';

export type FabProps = ComponentPropsWithoutRef<'button'> & {
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
};

export const Fab = forwardRef<HTMLButtonElement, FabProps>(
  ({ className, children, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={cn(
        `fixed bottom-4 end-4 z-20 flex h-14 min-w-14 cursor-default select-none
items-center justify-center gap-3 self-center overflow-hidden rounded-lg
bg-primary-50 px-4 text-base font-medium text-primary-800 shadow
shadow-primary-800/50 state-layer hover:state-layer-primary-500/10
focus-visible:bg-primary-100 focus-visible:outline-none active:bg-primary-100
md:text-sm dark:bg-primary-800 dark:text-primary-200
dark:focus-visible:bg-primary-700 dark:active:bg-primary-700 [&>svg]:text-lg
md:[&>svg]:text-base`,
        className
      )}
    >
      {children}
    </button>
  )
);
Fab.displayName = 'Fab';
