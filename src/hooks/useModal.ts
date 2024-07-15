import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
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

  const [lastModal, setLastModal] = useState(currentModal);

  useEffect(() => {
    if (currentModal !== null) setLastModal(currentModal);
  }, [currentModal]);

  const openModal = (modal: ModalValue) => {
    const params = new URLSearchParams(searchParams.toString());
    if (modal === null) params.delete(MODAL_SEARCH_KEY);
    else params.set(MODAL_SEARCH_KEY, modal);
    return window.history.pushState(null, '', `?${params.toString()}`);
  };

  const closeModal = (delta = -1) => window.history.go(delta);

  return { currentModal, lastModal, openModal, closeModal };
};
