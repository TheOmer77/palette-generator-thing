import { DetailedHTMLProps, HTMLAttributes, forwardRef } from 'react';
import cn from 'utils/cn';

const H2 = forwardRef<
  HTMLHeadingElement,
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
>(({ children, className, ...props }, ref) => (
  <h2
    {...props}
    ref={ref}
    className={cn(
      `mb-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100`,
      className
    )}
  >
    {children}
  </h2>
));
H2.displayName = 'H2';

export default H2;
