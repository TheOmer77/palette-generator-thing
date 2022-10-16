import React, { ReactNode } from 'react';

const ColorGrid = ({ children }: { children: ReactNode }) => {
  return <div className='color-grid'>{children}</div>;
};

export default ColorGrid;
