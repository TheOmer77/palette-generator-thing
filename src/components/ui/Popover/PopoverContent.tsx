'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Content, Portal } from '@radix-ui/react-popover';

import { cn } from '@/lib/utils';

export const PopoverContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <Portal>
    <Content
      {...props}
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        `z-50 w-72 rounded-md bg-popover p-4 text-popover-foreground shadow-md
outline-none data-[side=bottom]:origin-top data-[side=left]:origin-right
data-[side=right]:origin-left data-[side=top]:origin-bottom
data-[state=closed]:animate-fade-out
data-[state=open]:data-[side=bottom]:animate-scale-y-in
data-[state=open]:data-[side=left]:animate-scale-x-in
data-[state=open]:data-[side=right]:animate-scale-x-in
data-[state=open]:data-[side=top]:animate-scale-y-in print:hidden`,
        className
      )}
    />
  </Portal>
));
PopoverContent.displayName = Content.displayName;
