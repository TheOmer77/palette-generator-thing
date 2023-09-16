import { useMemo } from 'react';
import useGlobalState from './useGlobalState';
import { getDangerColor, getNeutralColor } from 'utils';
import {
  dangerColorSuggestionNames,
  dangerColorSuggestions,
  neutralColorSuggestionNames,
  neutralColorSuggestions,
  type DangerColorSuggestion,
  type NeutralColorSuggestion,
  generalColorSuggestionNames,
  GeneralColorSuggestion,
  generalColorSuggestions,
} from 'constants/colorSuggestions';

const useTheme = () => {
  const [
    {
      baseColors: { primary, neutral, danger, extras },
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
    selectedDanger = useMemo(
      () =>
        typeof danger === 'string'
          ? dangerColorSuggestionNames.includes(danger)
            ? dangerColorSuggestions[danger as DangerColorSuggestion]?.(primary)
            : danger
          : getDangerColor(primary),
      [danger, primary]
    ),
    selectedExtras = useMemo(
      () =>
        extras?.map(({ name, value }) => ({
          name,
          value: generalColorSuggestionNames.includes(value)
            ? generalColorSuggestions[value as GeneralColorSuggestion]?.(
                primary
              )
            : value,
        })) || [],
      [extras, primary]
    );

  return {
    primary,
    neutral: selectedNeutral,
    danger: selectedDanger,
    extras: selectedExtras,
  };
};

export default useTheme;
