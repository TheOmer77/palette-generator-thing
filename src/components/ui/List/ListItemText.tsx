import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

export type ListItemTextProps = ComponentPropsWithoutRef<'div'> & {
  primary: string;
  secondary: string;
};

export const ListItemText = forwardRef<HTMLDivElement, ListItemTextProps>(
  ({ primary, secondary, className, ...props }, ref) => (
    <div {...props} ref={ref} className={cn(`flex flex-col`, className)}>
      {primary && <span className='text-sm text-foreground'>{primary}</span>}
      {secondary && (
        <span className='text-xs text-muted-foreground'>{secondary}</span>
      )}
    </div>
  )
);
ListItemText.displayName = 'ListItemText';
