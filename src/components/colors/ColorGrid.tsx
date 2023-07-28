import { forwardRef } from 'react';

const ColorGrid = forwardRef<
  HTMLDivElement,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>(({ children, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className='mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
  >
    {children}
  </div>
));
ColorGrid.displayName = 'ColorGrid';

export default ColorGrid;
