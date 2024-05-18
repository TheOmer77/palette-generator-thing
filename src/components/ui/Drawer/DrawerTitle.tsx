'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/lib/utils';

export const DrawerTitle = forwardRef<
  ElementRef<typeof DrawerPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;
