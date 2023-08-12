import { useMemo } from 'react';
import { createPortal } from 'react-dom';

import { useTheme } from 'hooks';
import { generateVariablesCss } from 'utils';

const ThemeStyle = () => {
  const [primary, neutral, secondary, error] = useTheme();

  const themeCss = useMemo(
    () =>
      generateVariablesCss(
        {
          primary,
          neutral,
          secondary,
          error,
        },
        { format: 'rgbValues' }
      ),

    [error, neutral, primary, secondary]
  );

  return createPortal(<style>{themeCss}</style>, document.head);
};

export default ThemeStyle;
