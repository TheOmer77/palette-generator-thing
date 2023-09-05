import { useMemo } from 'react';
import useGlobalState from './useGlobalState';
import { getDangerColor, getNeutralColor, getSecondaryColor } from 'utils';

const useTheme = () => {
  const [{ baseColor }] = useGlobalState();

  const neutralColor = useMemo(() => getNeutralColor(baseColor), [baseColor]),
    secondaryColor = useMemo(() => getSecondaryColor(baseColor), [baseColor]),
    dangerColor = useMemo(() => getDangerColor(baseColor), [baseColor]);

  return [baseColor, neutralColor, secondaryColor, dangerColor];
};

export default useTheme;
