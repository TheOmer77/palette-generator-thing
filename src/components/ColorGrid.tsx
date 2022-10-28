import { ReactNode } from 'react';
import classNames from 'classnames';

const ColorGrid = ({
  marginBottom = false,
  children,
}: {
  marginBottom?: boolean;
  children: ReactNode;
}) => {
  return (
    <div className={classNames('color-grid', marginBottom && 'margin-bottom')}>
      {children}
    </div>
  );
};

export default ColorGrid;
