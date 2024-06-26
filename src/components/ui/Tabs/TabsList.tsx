'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { List } from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

export const TabsList = forwardRef<
  ElementRef<typeof List>,
  ComponentPropsWithoutRef<typeof List>
>(({ className, ...props }, ref) => (
  <List
    ref={ref}
    className={cn(
      `inline-flex h-10 items-center justify-center gap-1 rounded-md
bg-secondary p-1 text-muted-foreground`,
      className
    )}
    {...props}
  />
));
TabsList.displayName = 'TabsList';
