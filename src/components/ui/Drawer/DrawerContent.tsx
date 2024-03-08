'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/lib/utils';
import { DrawerOverlay } from './DrawerOverlay';

export const DrawerContent = forwardRef<
  ElementRef<typeof DrawerPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPrimitive.Portal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        `fixed inset-x-0 bottom-0 z-50 mx-auto mt-24 flex h-auto w-dvw
max-w-screen-sm flex-col rounded-t-lg bg-background shadow
shadow-neutral-900/50 focus-visible:outline-none dark:bg-card`,
        className
      )}
      {...props}
    >
      <div
        data-drawer-handle=''
        className='mx-auto mt-4 h-1 w-10 rounded-full bg-muted
transition-[height,margin]'
      />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPrimitive.Portal>
));
DrawerContent.displayName = 'DrawerContent';
