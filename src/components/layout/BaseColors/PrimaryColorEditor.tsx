'use client';

import { useSearchParams } from 'next/navigation';

import { DebouncedColorPicker } from './DebouncedColorPicker';
import { useBaseColors } from '@/hooks/useBaseColors';
import { useOptionsDrawer } from '@/store/useOptionsDrawer';
import {
  MODAL_BASECOLORS_EDIT,
  MODAL_BASECOLORS_LIST,
  MODAL_SEARCH_KEY,
} from '@/constants/modalSearchParams';

export const PrimaryColorEditor = () => {
  const { primary: initialPrimary, setPrimary } = useBaseColors();
  const { setPrimary: setDrawerPrimary } = useOptionsDrawer();

  const searchParams = useSearchParams(),
    isDrawerEditor =
      searchParams.get(MODAL_SEARCH_KEY) === MODAL_BASECOLORS_LIST ||
      searchParams.get(MODAL_SEARCH_KEY)?.startsWith(MODAL_BASECOLORS_EDIT);

  return (
    <DebouncedColorPicker
      initialValue={initialPrimary}
      onChange={isDrawerEditor ? setDrawerPrimary : setPrimary}
      autoFocusInput={!isDrawerEditor}
    />
  );
};
