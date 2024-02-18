import { create } from 'zustand';

import type { BaseColorsActions, BaseColorsState } from '@/hooks/useBaseColors';

// This Pick is temporary as not everything is implemented yet
export type OptionsDrawerActions = Pick<
  BaseColorsActions,
  'setPrimary' | 'setNeutral'
> & {
  saveToSearchParams: (resetState?: boolean) => void;
};

export type OptionsDrawerStore = Partial<BaseColorsState> &
  OptionsDrawerActions;

export const useOptionsDrawer = create<OptionsDrawerStore>((set, get) => ({
  setPrimary: primary => set({ primary }),
  setNeutral: neutral => set({ neutral }),

  saveToSearchParams: (resetState = false) => {
    const { primary, neutral } = get();
    const params = new URLSearchParams(window.location.search);

    if (typeof primary === 'string') params.set('primary', primary.slice(1));

    if (typeof neutral === 'string')
      params.set(
        'neutral',
        neutral.startsWith('#') ? neutral.slice(1) : neutral
      );
    if (neutral === null) params.delete('neutral');

    window.history.replaceState(null, '', `?${params.toString()}`);

    if (resetState)
      set(
        state =>
          Object.entries(state).reduce(
            (obj, [key, value]) => ({
              ...obj,
              ...(['primary', 'neutral'].includes(key) ? {} : { [key]: value }),
            }),
            {}
          ),
        true
      );
  },
}));
