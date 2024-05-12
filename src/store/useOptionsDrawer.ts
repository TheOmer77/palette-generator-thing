import { create } from 'zustand';

import type { BaseColorsActions, BaseColorsState } from '@/hooks/useBaseColors';
import {
  colorFromSearchParam,
  colorToSearchParam,
} from '@/lib/parseSearchParams';
import { generalColorSuggestionNames } from '@/constants/colorSuggestions';

export type OptionsDrawerActions = BaseColorsActions & {
  saveToSearchParams: (resetState?: boolean) => void;
};

export type OptionsDrawerStore = Partial<BaseColorsState> &
  OptionsDrawerActions;

const getCurrentExtras = (state: OptionsDrawerStore) => {
  const paramsExtras = new URLSearchParams(window.location.search)
    .getAll('extra')
    .map(value => ({
      name: value.split('-')[0],
      value: colorFromSearchParam(value.split('-')[1]) || '',
    }));
  return state.extras || paramsExtras;
};

export const useOptionsDrawer = create<OptionsDrawerStore>((set, get) => ({
  setPrimary: primary => set({ primary }),
  setNeutral: neutral => set({ neutral }),
  setDanger: danger => set({ danger }),

  addExtraColor: () =>
    set(state => {
      const currentExtras = getCurrentExtras(state);
      return {
        extras: [
          ...currentExtras,
          {
            name: '',
            value:
              generalColorSuggestionNames[
                currentExtras.length % generalColorSuggestionNames.length
              ],
          },
        ],
      };
    }),
  removeExtraColor: index =>
    set(state => ({
      extras: getCurrentExtras(state).filter?.((_, i) => i !== index),
    })),
  renameExtraColor: (index, newName) =>
    set(state => ({
      extras: getCurrentExtras(state).map((color, i) =>
        i === index ? { ...color, name: newName } : color
      ),
    })),
  setExtraColor: (index, newValue) =>
    set(state => ({
      extras: getCurrentExtras(state).map((color, i) =>
        i === index ? { ...color, value: newValue } : color
      ),
    })),

  saveToSearchParams: (resetState = false) => {
    const { primary, neutral, danger, extras } = get();
    const params = new URLSearchParams(window.location.search);

    if (typeof primary === 'string') params.set('primary', primary.slice(1));

    if (typeof neutral === 'string')
      params.set('neutral', colorToSearchParam(neutral) as string);
    if (neutral === null) params.delete('neutral');

    if (typeof danger === 'string')
      params.set('danger', colorToSearchParam(danger) as string);
    if (danger === null) params.delete('danger');

    const drawerExtrasStr = extras
        ?.map(
          ({ name, value }) =>
            `extra=${name || ''}-${colorToSearchParam(value)}`
        )
        .join('&'),
      paramsExtrasStr = params
        .getAll('extra')
        .map(value => `extra=${value}`)
        .join('&');
    if (Array.isArray(extras) && drawerExtrasStr !== paramsExtrasStr) {
      params.delete('extra');
      extras.forEach(({ name, value }) =>
        params.append('extra', `${name || ''}-${colorToSearchParam(value)}`)
      );
    }

    window.history.replaceState(null, '', `?${params.toString()}`);

    if (resetState)
      set(
        state =>
          Object.entries(state).reduce(
            (obj, [key, value]) => ({
              ...obj,
              ...(['primary', 'neutral', 'danger', 'extras'].includes(key)
                ? {}
                : { [key]: value }),
            }),
            {}
          ),
        true
      );
  },
}));
