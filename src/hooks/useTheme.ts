import useGlobalState from './useGlobalState';
import { getDangerColor, getNeutralColor } from 'utils';

const useTheme = () => {
  const [{ baseColor }] = useGlobalState();

  const neutralColor = getNeutralColor(baseColor);
  const dangerColor = getDangerColor(baseColor);

  return [baseColor, neutralColor, dangerColor];
};

export default useTheme;
