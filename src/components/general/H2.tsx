import { ComponentProps, forwardRef } from 'react';
import { cn } from 'utils';

const H2 = forwardRef<HTMLHeadingElement, ComponentProps<'h2'>>(
  ({ children, className, ...props }, ref) => (
    <h2
      {...props}
      ref={ref}
      className={cn(
        `mb-2 select-none text-3xl font-bold tracking-tight text-neutral-10
dark:text-neutral-90`,
        className
      )}
    >
      {children}
    </h2>
  )
);
H2.displayName = 'H2';

export default H2;
