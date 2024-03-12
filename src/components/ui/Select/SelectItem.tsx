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
      `relative flex h-11 w-full cursor-default select-none items-center
rounded-sm pe-2 ps-10 text-base outline-none transition-[background-color]
duration-100 state-layer data-[disabled]:pointer-events-none
data-[disabled]:opacity-50 focus:state-layer-muted/30 active:bg-muted/30
active:duration-0 md:h-9 md:ps-8 md:text-sm [&>*]:z-10`,
      className
    )}
    {...props}
  >
    <span
      className='absolute start-0 flex size-10 items-center justify-center
md:size-8'
    >
      <SelectItemIndicator>
        <CheckIcon className='text-lg md:text-base' />
      </SelectItemIndicator>
    </span>

    <SelectItemText>{children}</SelectItemText>
  </Item>
));
SelectItem.displayName = 'SelectItem';
