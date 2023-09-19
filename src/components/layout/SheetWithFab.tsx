import { ReactNode, useState } from 'react';
import { BottomSheet, Fab } from 'components/general';

export interface SheetWithFabProps {
  label: string;
  fabIcon?: ReactNode;
  children?: ReactNode;
}

const SheetWithFab = ({ label, fabIcon, children }: SheetWithFabProps) => {
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
      <BottomSheet title={label} open={sheetOpen} onOpenChange={setSheetOpen}>
        {children}
      </BottomSheet>
    </>
  );
};

export default SheetWithFab;
