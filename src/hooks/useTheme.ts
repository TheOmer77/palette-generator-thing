import { useMemo } from 'react';
import useGlobalState from './useGlobalState';
import { getDangerColor, getNeutralColor, getSecondaryColor } from 'utils';

const useTheme = () => {
  const [
    {
      baseColors: { primary, neutral },
    },
  ] = useGlobalState();

  const selectedNeutral = useMemo(
      () => neutral || getNeutralColor(primary),
      [neutral, primary]
    ),
    secondary = useMemo(() => getSecondaryColor(primary), [primary]),
    danger = useMemo(() => getDangerColor(primary), [primary]);

  return { primary, neutral: selectedNeutral, secondary, danger };
};

export default useTheme;
