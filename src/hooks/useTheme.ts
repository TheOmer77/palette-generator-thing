import useGlobalState from './useGlobalState';
import { getNeutralColor } from 'utils';

const useTheme = () => {
  const [{ baseColor }] = useGlobalState();

  const neutralColor = getNeutralColor(baseColor);

  return [baseColor, neutralColor];
};

export default useTheme;
