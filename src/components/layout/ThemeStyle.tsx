import { useMemo } from 'react';
import { createPortal } from 'react-dom';

import { useTheme } from 'hooks';
import { generateCssCode } from 'utils';

const ThemeStyle = () => {
  const { primary, neutral, danger } = useTheme();

  const themeCss = useMemo(
    () => generateCssCode({ primary, neutral, danger }, 'rgbRaw'),
    [danger, neutral, primary]
  );

  return createPortal(<style>{themeCss}</style>, document.head);
};

export default ThemeStyle;
