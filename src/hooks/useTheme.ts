import { useMemo } from 'react';
import useGlobalState from './useGlobalState';
import { getDangerColor, getNeutralColor, getSecondaryColor } from 'utils';

const useTheme = () => {
  const [{ baseColor }] = useGlobalState();

  const neutral = useMemo(() => getNeutralColor(baseColor), [baseColor]),
    secondary = useMemo(() => getSecondaryColor(baseColor), [baseColor]),
    danger = useMemo(() => getDangerColor(baseColor), [baseColor]);

  return { primary: baseColor, neutral, secondary, danger };
};

export default useTheme;
