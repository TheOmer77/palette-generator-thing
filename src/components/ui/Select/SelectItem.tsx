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
import { CircleIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export const SelectItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item>
>(({ className, children, ...props }, ref) => (
  <Item
    ref={ref}
    className={cn(
      `relative flex h-10 w-full cursor-default select-none items-center
rounded-sm pe-2 ps-10 text-base outline-none transition-[background-color]
duration-100 state-layer data-[disabled]:pointer-events-none
data-[disabled]:opacity-50 focus:state-layer-muted/30 active:bg-muted/30
active:duration-0 md:h-8 md:ps-8 md:text-sm [&>*]:z-10`,
      className
    )}
    {...props}
  >
    <SelectItemIndicator className='absolute start-3.5'>
      <CircleIcon className='fill-current text-[0.625rem] md:text-[0.5rem]' />
    </SelectItemIndicator>
    <SelectItemText>{children}</SelectItemText>
  </Item>
));
SelectItem.displayName = 'SelectItem';
