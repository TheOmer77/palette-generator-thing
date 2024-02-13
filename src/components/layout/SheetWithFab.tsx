'use client';

import type { ReactNode } from 'react';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  type DrawerProps,
} from '@/components/ui/Drawer';
import { Fab } from '@/components/ui/Fab';

export type SheetWithFabProps = DrawerProps & {
  label: string;
  fabIcon?: ReactNode;
};

export const SheetWithFab = ({
  label,
  fabIcon,
  children,
  ...props
}: SheetWithFabProps) => (
  <Drawer {...props}>
    <DrawerTrigger asChild>
      <Fab icon={fabIcon} className='flex md:hidden print:hidden'>
        {label}
      </Fab>
    </DrawerTrigger>
    <DrawerContent className='print:hidden'>
      <DrawerHeader className='py-2.5'>
        <DrawerTitle className='text-xl'>{label}</DrawerTitle>
      </DrawerHeader>
      {children}
    </DrawerContent>
  </Drawer>
);
