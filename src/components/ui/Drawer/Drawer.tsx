'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

export type DrawerProps = ComponentPropsWithoutRef<typeof DrawerPrimitive.Root>;

export const Drawer = ({
  shouldScaleBackground = false,
  ...props
}: DrawerProps) => (
  <DrawerPrimitive.Root
    {...props}
    shouldScaleBackground={shouldScaleBackground}
  />
);
Drawer.displayName = 'Drawer';
