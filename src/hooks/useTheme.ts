import { useMemo } from 'react';
import useGlobalState from './useGlobalState';
import { getDangerColor, getNeutralColor, getSecondaryColor } from 'utils';

const useTheme = () => {
  const [
    {
      baseColors: { primary },
    },
  ] = useGlobalState();

  const neutral = useMemo(() => getNeutralColor(primary), [primary]),
    secondary = useMemo(() => getSecondaryColor(primary), [primary]),
    danger = useMemo(() => getDangerColor(primary), [primary]);

  return { primary, neutral, secondary, danger };
};

export default useTheme;
