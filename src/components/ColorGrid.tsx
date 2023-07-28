import { ReactNode } from 'react';
import clsx from 'clsx';

const ColorGrid = ({
  marginBottom = false,
  children,
}: {
  marginBottom?: boolean;
  children: ReactNode;
}) => {
  return (
    <div className={clsx('color-grid', marginBottom && 'margin-bottom')}>
      {children}
    </div>
  );
};

export default ColorGrid;
