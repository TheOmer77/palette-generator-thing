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
      `relative flex cursor-default select-none items-center rounded-sm px-2
py-1.5 text-sm outline-none transition-colors
data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent
focus:text-accent-foreground`,
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = Item.displayName;
