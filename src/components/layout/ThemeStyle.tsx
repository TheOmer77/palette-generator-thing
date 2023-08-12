import { createPortal } from 'react-dom';
import useTheme from 'hooks/useTheme';
import generateVariablesCss from 'utils/generateVariablesCss';
import { useMemo } from 'react';

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
