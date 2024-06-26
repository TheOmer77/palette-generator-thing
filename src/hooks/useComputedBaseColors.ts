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
import { FALLBACK_COLOR } from '@/constants/fallbackColor';
import type {
  DangerColorSuggestion,
  GeneralColorSuggestion,
  NeutralColorSuggestion,
} from '@/types/defaultSuggestions';

export const useComputedBaseColors = () => {
  const { primary, neutral, danger, extras } = useBaseColors();

  const selectedPrimary = primary || FALLBACK_COLOR;
  const selectedNeutral = useMemo(() => {
    if (primary === null) return '';
    if (typeof neutral === 'string')
      return neutralColorSuggestionNames.includes(neutral)
        ? neutralColorSuggestions[neutral as NeutralColorSuggestion]?.(primary)
        : neutral;
    return getAutoNeutralColor(primary);
  }, [neutral, primary]);
  const selectedDanger = useMemo(() => {
    if (primary === null) return '';
    if (typeof danger === 'string')
      return dangerColorSuggestionNames.includes(danger)
        ? dangerColorSuggestions[danger as DangerColorSuggestion]?.(primary)
        : danger;
    return getAutoDangerColor(primary);
  }, [danger, primary]);
  const selectedExtras = useMemo(() => {
    if (primary === null || !Array.isArray(extras)) return [];
    return extras?.map(({ name, value }) => ({
      name,
      value: generalColorSuggestionNames.includes(value)
        ? generalColorSuggestions[value as GeneralColorSuggestion]?.(primary)
        : value,
    }));
  }, [extras, primary]);

  return {
    primary: selectedPrimary,
    neutral: selectedNeutral,
    danger: selectedDanger,
    extras: selectedExtras,
  };
};
