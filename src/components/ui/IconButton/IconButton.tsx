import { Children, forwardRef, type ElementRef } from 'react';

import { Button, type ButtonProps } from '../Button';
import { cn } from '@/lib/utils';

export const IconButton = forwardRef<ElementRef<typeof Button>, ButtonProps>(
  ({ children, className, ...props }, ref) => (
    <Button {...props} ref={ref} className={cn('aspect-square p-0', className)}>
      {children && Children.only(children)}
    </Button>
  )
);
IconButton.displayName = 'IconButton';
