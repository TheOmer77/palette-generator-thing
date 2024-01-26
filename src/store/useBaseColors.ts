import { create } from 'zustand';

import { generalColorSuggestionNames } from '@/constants';
import type {
  DangerColorSuggestion,
  GeneralColorSuggestion,
  NeutralColorSuggestion,
} from '@/types/defaultSuggestions';
import type { AnyStringWithAutocomplete } from '@/types/utils';

export type BaseColorsState = {
  /** Any hex color. */
  primary: string;
  /** Any of the neutral suggested color names, or any hex color.
   * If undefined, auto choose. */
  neutral?: AnyStringWithAutocomplete<NeutralColorSuggestion>;
  /** Any of the neutral danger color names, or any hex color.
   * If undefined, auto choose. */
  danger?: AnyStringWithAutocomplete<DangerColorSuggestion>;
  /** Extra colors, each can have a name and its value can be any of the
   * general suggested color names, or any hex color. */
  extras: {
    name?: string;
    value: AnyStringWithAutocomplete<GeneralColorSuggestion>;
  }[];
};

export type BaseColorsActions = {
  setPrimary: (primary: BaseColorsState['primary']) => void;
  setNeutral: (neutral: BaseColorsState['neutral']) => void;
  setDanger: (danger: BaseColorsState['danger']) => void;
  addExtraColor: () => void;
  removeExtraColor: (index: number) => void;
  renameExtraColor: (
    index: number,
    newName: NonNullable<BaseColorsState['extras'][number]['name']>
  ) => void;
  setExtraColor: (
    index: number,
    newValue: BaseColorsState['extras'][number]['value']
  ) => void;
};

export type BaseColorsStore = BaseColorsState & BaseColorsActions;

// TODO: Store this state in URL
export const useBaseColors = create<BaseColorsStore>(set => ({
  // TEMPORARY HARDCODED VALUE
  primary: '#1740ea',
  neutral: undefined,
  danger: undefined,
  extras: [],

  setPrimary: primary => set({ primary }),
  setNeutral: neutral => set({ neutral }),
  setDanger: danger => set({ danger }),
  addExtraColor: () =>
    set(state => ({
      extras: [
        ...state.extras,
        {
          name: '',
          value:
            generalColorSuggestionNames[
              state.extras.length % generalColorSuggestionNames.length
            ],
        },
      ],
    })),
  removeExtraColor: index =>
    set(state => ({ extras: state.extras.filter?.((_, i) => i !== index) })),
  renameExtraColor: (index, newName) =>
    set(state => ({
      extras: state.extras.map((color, i) =>
        i === index ? { ...color, name: newName } : color
      ),
    })),
  setExtraColor: (index, newValue) =>
    set(state => ({
      extras: state.extras.map((color, i) =>
        i === index ? { ...color, value: newValue } : color
      ),
    })),
}));
