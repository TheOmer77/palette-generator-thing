import { DetailedHTMLProps, HTMLAttributes, forwardRef } from 'react';

const H2 = forwardRef<
  HTMLHeadingElement,
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
>(({ children, ...props }, ref) => (
  <h2
    {...props}
    ref={ref}
    className='mb-2 text-3xl font-bold tracking-tight text-slate-900
  dark:text-slate-100'
  >
    {children}
  </h2>
));
H2.displayName = 'H2';

export default H2;
