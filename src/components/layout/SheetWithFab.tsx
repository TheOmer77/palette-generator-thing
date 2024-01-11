'use client';

import { useState, type ReactNode } from 'react';

import { BottomSheet, Fab, type BottomSheetProps } from '@/components/general';

export interface SheetWithFabProps extends BottomSheetProps {
  label: string;
  fabIcon?: ReactNode;
}

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
