import { ComponentProps, forwardRef } from 'react';
import { cn } from 'utils';

const ColorGrid = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={cn(
        `mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2
lg:grid-cols-4 xl:grid-cols-5`,
        className
      )}
    >
      {children}
    </div>
  )
);
ColorGrid.displayName = 'ColorGrid';

export default ColorGrid;
