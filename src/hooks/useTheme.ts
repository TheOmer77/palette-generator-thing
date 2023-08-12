import { useMemo } from 'react';
import useGlobalState from './useGlobalState';
import {
  getErrorColorHex,
  getNeutralVariantHex,
  getSecondaryColorHex,
} from 'utils';

const useTheme = () => {
  const [{ baseColor }] = useGlobalState();

  const neutralColor = useMemo(
      () => getNeutralVariantHex(baseColor),
      [baseColor]
    ),
    secondaryColor = useMemo(
      () => getSecondaryColorHex(baseColor),
      [baseColor]
    ),
    errorColor = useMemo(() => getErrorColorHex(baseColor), [baseColor]);

  return [baseColor, neutralColor, secondaryColor, errorColor];
};

export default useTheme;
