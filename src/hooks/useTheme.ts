import { useMemo } from 'react';
import useGlobalState from './useGlobalState';
import { getDangerColor, getNeutralColor, getSecondaryColor } from 'utils';

const useTheme = () => {
  const [
    {
      baseColors: { primary, neutral, danger },
    },
  ] = useGlobalState();

  const selectedNeutral = useMemo(
      () => neutral || getNeutralColor(primary),
      [neutral, primary]
    ),
    secondary = useMemo(() => getSecondaryColor(primary), [primary]),
    selectedDanger = useMemo(
      () => danger || getDangerColor(primary),
      [danger, primary]
    );

  return {
    primary,
    neutral: selectedNeutral,
    secondary,
    danger: selectedDanger,
  };
};

export default useTheme;
