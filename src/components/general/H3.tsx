import { ComponentProps, forwardRef } from 'react';
import { cn } from 'utils';

const H3 = forwardRef<HTMLHeadingElement, ComponentProps<'h3'>>(
  ({ children, className, ...props }, ref) => (
    <h3
      {...props}
      ref={ref}
      className={cn(
        `text-neutral-30 dark:text-neutral-60 mb-2 select-none text-xl
font-medium`,
        className
      )}
    >
      {children}
    </h3>
  )
);
H3.displayName = 'H2';

export default H3;
