import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import {
  Item,
  SelectItemIndicator,
  SelectItemText,
} from '@radix-ui/react-select';
import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export const SelectItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item>
>(({ className, children, ...props }, ref) => (
  <Item
    ref={ref}
    className={cn(
      `relative flex w-full cursor-default select-none items-center rounded-sm
py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none
data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground`,
      className
    )}
    {...props}
  >
    <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
      <SelectItemIndicator>
        <CheckIcon className='text-base' />
      </SelectItemIndicator>
    </span>

    <SelectItemText>{children}</SelectItemText>
  </Item>
));
SelectItem.displayName = 'SelectItem';
