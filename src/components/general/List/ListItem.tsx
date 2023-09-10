import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { cn } from 'utils';

export const ListItem = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'>
>(({ children, className, ...props }, ref) => (
  <li className='p-0'>
    <button
      ref={ref}
      className={cn(
        `relative flex h-12 w-full cursor-default select-none items-center p-4
outline-none transition-[background-color] after:absolute after:start-0
after:top-0 after:h-full after:w-full after:rounded-lg after:content-[""]
hover:after:bg-neutral-500/20 focus-visible:outline-none
focus-visible:after:bg-neutral-500/20 active:after:bg-neutral-500/30`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  </li>
));
ListItem.displayName = 'ListItem';
