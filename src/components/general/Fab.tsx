import { forwardRef, isValidElement } from 'react';
import { cn } from 'utils';
import type { ButtonProps } from './Button';

const Fab = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon, iconPosition = 'start', className, children, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={cn(
        `fixed bottom-4 end-4 z-10 flex h-14 cursor-default select-none
items-center justify-center gap-3 self-center overflow-hidden rounded-lg
bg-slate-200 text-base font-medium text-slate-700 shadow
shadow-slate-500/50 after:absolute after:start-0 after:top-0 after:h-full
after:w-full after:content-[""] hover:after:bg-slate-500/10
focus-visible:bg-slate-300 focus-visible:outline-none active:bg-slate-300
dark:bg-slate-900 dark:text-slate-300 dark:shadow-slate-700/50
dark:focus-visible:bg-slate-800 dark:active:bg-slate-800 [&>.icon]:text-2xl`,
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

export default Fab;
