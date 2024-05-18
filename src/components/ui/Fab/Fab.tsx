import { forwardRef, type ElementRef } from 'react';

import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '../Button';

type FabProps = Omit<ButtonProps, 'variant' | 'size'>;

export const Fab = forwardRef<ElementRef<typeof Button>, FabProps>(
  ({ className, children, ...props }, ref) => (
    <Button
      {...props}
      ref={ref}
      className={cn(
        `z-20 h-14 min-w-14 gap-3 bg-primary-100 text-base text-primary-800
shadow shadow-primary-800/50 hover:state-layer-primary-500/10
active:bg-primary-200 md:text-sm dark:bg-primary-800 dark:text-primary-200
dark:active:bg-primary-700 [&>*]:z-10 [&>svg]:text-lg md:[&>svg]:text-base`,
        className
      )}
    >
      {children}
    </Button>
  )
);
Fab.displayName = 'Fab';
