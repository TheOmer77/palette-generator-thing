import { useMemo } from 'react';

import { useBaseColors } from '@/hooks/useBaseColors';
import { getAutoDangerColor, getAutoNeutralColor } from '@/lib/colorUtils';
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
} from '@/types/defaultSuggestions';

export const useTheme = () => {
  const { primary, neutral, danger, extras } = useBaseColors();

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
