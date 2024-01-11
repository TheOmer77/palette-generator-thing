'use client';

import { useState, type ReactNode } from 'react';

import {
  BottomSheet,
  type BottomSheetProps,
} from '@/components/ui/BottomSheet';
import { Fab } from '@/components/ui/Fab';

export type SheetWithFabProps = BottomSheetProps & {
  label: string;
  fabIcon?: ReactNode;
};

export const SheetWithFab = ({
  label,
  fabIcon,
  onOpenChange,
  children,
  ...props
}: SheetWithFabProps) => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <Fab
        icon={fabIcon}
        onClick={() => setSheetOpen(true)}
        className='flex md:hidden print:hidden'
      >
        {label}
      </Fab>
      <BottomSheet
        {...props}
        title={label}
        open={sheetOpen}
        onOpenChange={open => {
          setSheetOpen(open);
          onOpenChange?.(open);
        }}
        className='print:hidden'
      >
        {children}
      </BottomSheet>
    </>
  );
};
