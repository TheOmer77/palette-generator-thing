import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { cn } from 'utils';

export const List = forwardRef<
  HTMLUListElement,
  ComponentPropsWithoutRef<'ul'>
>(({ children, className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      className={cn(`flex w-full flex-col space-y-px rounded-lg`, className)}
      {...props}
    >
      {children}
    </ul>
  );
});
List.displayName = 'List';
