'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Item } from '@radix-ui/react-dropdown-menu';

import { cn } from '@/lib/utils';

export const DropdownMenuItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <Item
    ref={ref}
    className={cn(
      `relative flex h-10 w-full cursor-default select-none items-center
rounded-sm px-2 text-base outline-none transition-[background-color]
duration-100 state-layer data-[disabled]:pointer-events-none
data-[disabled]:opacity-50 focus:state-layer-muted/30 active:bg-muted/30
active:duration-0 md:h-8 md:text-sm [&>*]:z-10`,
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = Item.displayName;
