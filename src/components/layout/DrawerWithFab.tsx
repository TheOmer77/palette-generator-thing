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

export type DrawerWithFabProps = DrawerProps & {
  label: string;
  fabIcon?: ReactNode;
};

export const DrawerWithFab = ({
  label,
  fabIcon,
  children,
  ...props
}: DrawerWithFabProps) => (
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
