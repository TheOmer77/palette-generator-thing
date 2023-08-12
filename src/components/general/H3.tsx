import { ComponentProps, forwardRef } from 'react';
import { cn } from 'utils';

const H3 = forwardRef<HTMLHeadingElement, ComponentProps<'h3'>>(
  ({ children, className, ...props }, ref) => (
    <h3
      {...props}
      ref={ref}
      className={cn(
        'mb-2 select-none text-xl font-medium text-slate-700 dark:text-slate-400',
        className
      )}
    >
      {children}
    </h3>
  )
);
H3.displayName = 'H2';

export default H3;
