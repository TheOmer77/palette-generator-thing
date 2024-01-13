import {
  forwardRef,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';

import { cn } from '@/lib/utils';

export type FabProps = ComponentPropsWithoutRef<'button'> & {
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
};

export const Fab = forwardRef<HTMLButtonElement, FabProps>(
  ({ icon, iconPosition = 'start', className, children, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={cn(
        `fixed bottom-4 end-4 z-10 flex h-14 cursor-default select-none
items-center justify-center gap-3 self-center overflow-hidden rounded-lg
bg-primary-50 text-sm font-medium text-primary-800 shadow shadow-primary-800/50
state-layer hover:state-layer-primary-500/10 focus-visible:bg-primary-100
focus-visible:outline-none active:bg-primary-100 dark:bg-primary-800
dark:text-primary-200 dark:focus-visible:bg-primary-700 dark:active:bg-primary-700
[&>.icon]:text-xl`,
        isValidElement(icon) && !children ? 'w-14' : 'px-4',
        className
      )}
    >
      {isValidElement(icon) && iconPosition === 'start' && (
        <span className='icon'>{icon}</span>
      )}
      {children}
      {isValidElement(icon) && iconPosition === 'end' && (
        <span className='icon'>{icon}</span>
      )}
    </button>
  )
);
Fab.displayName = 'Fab';
