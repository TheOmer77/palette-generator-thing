import { useMemo } from 'react';
import { createPortal } from 'react-dom';

import { useTheme } from 'hooks';
import { generateVariablesCss } from 'utils';

const ThemeStyle = () => {
  const [primary, neutral] = useTheme();

  const themeCss = useMemo(
    () => generateVariablesCss({ primary, neutral }),
    [neutral, primary]
  );

  return createPortal(<style>{themeCss}</style>, document.head);
};

export default ThemeStyle;
