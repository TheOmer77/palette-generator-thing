import { DetailedHTMLProps, HTMLAttributes, forwardRef } from 'react';

const H3 = forwardRef<
  HTMLHeadingElement,
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
>(({ children, ...props }, ref) => (
  <h3
    {...props}
    ref={ref}
    className='text-xl font-medium text-slate-700 dark:text-slate-400'
  >
    {children}
  </h3>
));
H3.displayName = 'H2';

export default H3;
