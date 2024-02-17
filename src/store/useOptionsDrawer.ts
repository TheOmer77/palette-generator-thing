import { create } from 'zustand';

import type { BaseColorsActions, BaseColorsState } from '@/hooks/useBaseColors';

export type OptionsDrawerActions = Partial<BaseColorsActions> & {
  saveToSearchParams: (resetState?: boolean) => void;
};

export type OptionsDrawerStore = Partial<BaseColorsState> &
  OptionsDrawerActions;

export const useOptionsDrawer = create<OptionsDrawerStore>((set, get) => ({
  setPrimary: primary => set({ primary }),
  saveToSearchParams: (resetState = false) => {
    const { primary } = get();

    const params = new URLSearchParams(window.location.search);
    typeof primary === 'string' && params.set('primary', primary.slice(1));

    window.history.replaceState(null, '', `?${params.toString()}`);

    if (resetState)
      set(
        state =>
          Object.entries(state).reduce(
            (obj, [key, value]) => ({
              ...obj,
              ...(['primary'].includes(key) ? {} : { [key]: value }),
            }),
            {}
          ),
        true
      );
  },
}));
