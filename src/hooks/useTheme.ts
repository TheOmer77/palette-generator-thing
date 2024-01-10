import { useMemo } from 'react';

import useGlobalState from './useGlobalState';
import { getAutoDangerColor, getAutoNeutralColor } from '@/utils';
import {
  dangerColorSuggestionNames,
  dangerColorSuggestions,
  generalColorSuggestionNames,
  generalColorSuggestions,
  neutralColorSuggestionNames,
  neutralColorSuggestions,
} from '@/constants/colorSuggestions';
import type {
  DangerColorSuggestion,
  GeneralColorSuggestion,
  NeutralColorSuggestion,
} from '@/types';

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
          : getAutoNeutralColor(primary),
      [neutral, primary]
    ),
    selectedDanger = useMemo(
      () =>
        typeof danger === 'string'
          ? dangerColorSuggestionNames.includes(danger)
            ? dangerColorSuggestions[danger as DangerColorSuggestion]?.(primary)
            : danger
          : getAutoDangerColor(primary),
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
