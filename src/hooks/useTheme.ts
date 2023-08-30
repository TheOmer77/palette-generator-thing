import useGlobalState from './useGlobalState';
import { getDangerColor, getNeutralColor, getSecondaryColor } from 'utils';

const useTheme = () => {
  const [{ baseColor }] = useGlobalState();

  const neutralColor = getNeutralColor(baseColor);
  const secondaryColor = getSecondaryColor(baseColor);
  const dangerColor = getDangerColor(baseColor);

  return [baseColor, neutralColor, secondaryColor, dangerColor];
};

export default useTheme;
