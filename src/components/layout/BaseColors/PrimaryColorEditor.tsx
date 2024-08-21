'use client';

import { DebouncedColorPicker } from './DebouncedColorPicker';
import { useBaseColors } from '@/hooks/useBaseColors';
import { useModal } from '@/hooks/useModal';
import { useOptionsDrawer } from '@/store/useOptionsDrawer';
import {
  MODAL_BASECOLORS_EDIT,
  MODAL_BASECOLORS_LIST,
} from '@/constants/modalSearchParams';

export const PrimaryColorEditor = () => {
  const { primary: initialPrimary, setPrimary } = useBaseColors();
  const { setPrimary: setDrawerPrimary } = useOptionsDrawer();

  const { currentModal } = useModal(),
    isDrawerEditor =
      currentModal === MODAL_BASECOLORS_LIST ||
      currentModal?.startsWith(MODAL_BASECOLORS_EDIT);

  return (
    <DebouncedColorPicker
      initialValue={initialPrimary}
      onChange={isDrawerEditor ? setDrawerPrimary : setPrimary}
      autoFocusInput={!isDrawerEditor}
    />
  );
};
