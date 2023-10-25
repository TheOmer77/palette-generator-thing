import { ReactNode, useState } from 'react';
import { BottomSheet, BottomSheetProps, Fab } from 'components/general';

export interface SheetWithFabProps extends BottomSheetProps {
  label: string;
  fabIcon?: ReactNode;
}

const SheetWithFab = ({
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
        className='print:hidden'
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

export default SheetWithFab;
