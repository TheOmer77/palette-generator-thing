import { ComponentProps, forwardRef } from 'react';
import { cn } from 'utils';

export const H2 = forwardRef<HTMLHeadingElement, ComponentProps<'h2'>>(
  ({ children, className, ...props }, ref) => (
    <h2
      {...props}
      ref={ref}
      className={cn(
        `mb-2 select-none text-3xl font-bold tracking-tight`,
        className
      )}
    >
      {children}
    </h2>
  )
);
H2.displayName = 'H2';
