import { useMemo } from 'react';
import useGlobalState from './useGlobalState';
import { getDangerColor, getNeutralColor, getSecondaryColor } from 'utils';
import {
  dangerColorSuggestionNames,
  dangerColorSuggestions,
  neutralColorSuggestionNames,
  neutralColorSuggestions,
  type DangerColorSuggestion,
  type NeutralColorSuggestion,
} from 'constants/colorSuggestions';

const useTheme = () => {
  const [
    {
      baseColors: { primary, neutral, danger },
    },
  ] = useGlobalState();

  const selectedNeutral = useMemo(
      () =>
        typeof neutral === 'string'
          ? neutralColorSuggestionNames.includes(neutral)
            ? neutralColorSuggestions[neutral as NeutralColorSuggestion]?.(
                primary
              )
            : neutral
          : getNeutralColor(primary),
      [neutral, primary]
    ),
    secondary = useMemo(() => getSecondaryColor(primary), [primary]),
    selectedDanger = useMemo(
      () =>
        typeof danger === 'string'
          ? dangerColorSuggestionNames.includes(danger)
            ? dangerColorSuggestions[danger as DangerColorSuggestion]?.(primary)
            : danger
          : getDangerColor(primary),
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
