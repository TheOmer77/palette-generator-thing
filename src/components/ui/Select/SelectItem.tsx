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
      `relative flex h-9 w-full cursor-default select-none items-center
rounded-sm pl-8 pr-2 text-sm outline-none transition-[background-color]
duration-100 state-layer data-[disabled]:pointer-events-none
data-[disabled]:opacity-50 focus:state-layer-muted/30 active:bg-muted/30
active:duration-0 [&>*]:z-10`,
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
