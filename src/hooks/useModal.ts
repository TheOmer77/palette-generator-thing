import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts';

import {
  FULLSCREEN_MODALS,
  MODAL_BASECOLORS_EDIT,
  MODAL_BASECOLORS_LIST,
  MODAL_SEARCH_KEY,
} from '@/constants/modalSearchParams';

type ModalValue =
  | null
  | typeof MODAL_BASECOLORS_LIST
  | `${typeof MODAL_BASECOLORS_EDIT}${string}`;

export const useModal = () => {
  const searchParams = useSearchParams(),
    currentModal = searchParams.get(MODAL_SEARCH_KEY) as ModalValue;
  const matchesSm = useMediaQuery('(min-width: 640px)');

  const [lastModal, setLastModal] = useState(currentModal);

  useEffect(() => {
    if (currentModal !== null) setLastModal(currentModal);
  }, [currentModal]);

  const isModalFullscreen =
    !matchesSm &&
    typeof currentModal === 'string' &&
    FULLSCREEN_MODALS.some(
      modal =>
        (modal.endsWith('-') && currentModal.startsWith(modal)) ||
        modal === currentModal
    );

  const openModal = (modal: ModalValue) => {
    const params = new URLSearchParams(searchParams.toString());
    if (modal === null) params.delete(MODAL_SEARCH_KEY);
    else params.set(MODAL_SEARCH_KEY, modal);
    return window.history.pushState(null, '', `?${params.toString()}`);
  };

  const closeModal = (delta = -1) => window.history.go(delta);

  return { currentModal, lastModal, isModalFullscreen, openModal, closeModal };
};
