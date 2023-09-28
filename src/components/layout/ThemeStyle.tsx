import { useMemo } from 'react';
import { createPortal } from 'react-dom';

import { useTheme } from 'hooks';
import { generateVariablesCss } from 'utils';

const ThemeStyle = () => {
  const { primary, neutral, danger } = useTheme();

  const themeCss = useMemo(
    () => generateVariablesCss({ primary, neutral, danger }),
    [danger, neutral, primary]
  );

  return createPortal(<style>{themeCss}</style>, document.head);
};

export default ThemeStyle;
