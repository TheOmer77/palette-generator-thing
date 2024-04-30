'use client';

import { Suspense } from 'react';

import { useBaseColors } from '@/hooks/useBaseColors';
import { getPaletteColor } from '@/lib/colorUtils';

const FaviconContent = () => {
  const { primary } = useBaseColors();

  const dataUri =
    `data:image/svg+xml;charset=UTF-8,%3Csvg width='32' height='32'
xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='16' r='16'
fill='${encodeURIComponent(getPaletteColor(primary, 500))}' /%3E%3Cpath d='M16
5c5.951 0 10.962 4.387 10.992 9.834v.006c0 3.598-2.958 6.555-6.555
6.555h-2.013a.624.624 0 00-.65.668c0 .264.028.302.142.416l.043.045a2.7 2.7 0
01.69 1.79C18.648 25.764 17.462 27 16 27 9.955 27 5 22.045 5 16S9.955 5 16
5zm-3.5 4c2 0 2 3 0 3s-2-3 0-3zm5 0c2 0 2 3 0 3s-2-3 0-3zm4 4c2 0 2 3 0 3s-2-3
0-3zm-11 2c2 0 2 3 0 3s-2-3 0-3z' fill-rule='evenodd' fill='%23fff'
/%3E%3C/svg%3E`.replaceAll('\n', ' ');

  return <link rel='icon' href={dataUri} />;
};

export const Favicon = () => (
  <Suspense>
    <FaviconContent />
  </Suspense>
);
