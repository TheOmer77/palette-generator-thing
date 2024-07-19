'use client';

import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useEventListener, useIsClient } from 'usehooks-ts';
import { SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { TransitionSwitchItem } from '@theomer77/react-transition-switch';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/Drawer';
import { Fab } from '@/components/ui/Fab';
import { IconButton } from '@/components/ui/IconButton';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { useComputedBaseColors } from '@/hooks/useComputedBaseColors';
import { useModal } from '@/hooks/useModal';
import { useVirtualKeyboardOpen } from '@/hooks/useVirtualKeyboardOpen';
import { useOptionsDrawer } from '@/store/useOptionsDrawer';
import { cn } from '@/lib/utils';
import {
  MODAL_BASECOLORS_EDIT,
  MODAL_BASECOLORS_LIST,
  MODAL_SEARCH_KEY,
} from '@/constants/modalSearchParams';

import { ColorListPage } from './ColorListPage';
import { PrimaryColorEditPage } from './PrimaryColorEditPage';
import { NeutralColorEditPage } from './NeutralColorEditPage';
import { DangerColorEditPage } from './DangerColorEditPage';
import { ExtraColorEditPage } from './ExtraColorEditPage';
import SharedAxisX from '../SharedAxisX';

export const OptionsDrawer = () => {
  const { currentModal, isModalFullHeight, openModal, closeModal } = useModal();
  const { extras } = useComputedBaseColors();
  const { saveToSearchParams } = useOptionsDrawer();
  const virtualKeyboardOpen = useVirtualKeyboardOpen();

  const isClient = useIsClient();
  const matchesMd = useBreakpoint('md');

  const [drawerEl, setDrawerEl] = useState<HTMLDivElement>();

  const isDrawerOpen = useMemo(
    () =>
      typeof currentModal === 'string' &&
      (currentModal === MODAL_BASECOLORS_LIST ||
        currentModal.startsWith(MODAL_BASECOLORS_EDIT)),
    [currentModal]
  );
  const transitionSwitchValue = useMemo(
    () =>
      currentModal?.startsWith(MODAL_BASECOLORS_EDIT)
        ? currentModal.split('-')[2]
        : 'list',
    [currentModal]
  );

  const drawerRef = useCallback(
    (node: HTMLDivElement) => setDrawerEl(node),
    []
  );

  const setDrawerOpen = useCallback(
    (open: boolean) => {
      if (open === isDrawerOpen) return;

      if (open) return openModal(MODAL_BASECOLORS_LIST);
      closeModal(currentModal?.startsWith(MODAL_BASECOLORS_EDIT) ? -2 : -1);
    },
    [closeModal, currentModal, isDrawerOpen, openModal]
  );

  const updateDrawerHeight = useCallback(() => {
    if (!drawerEl) return;
    const childrenHeight = [...drawerEl.children]
      .slice(1)
      .reduce((height, node) => {
        const nodeHeight =
          node.clientHeight +
          Number(getComputedStyle(node).marginTop.slice(0, -2)) +
          Number(getComputedStyle(node).marginBottom.slice(0, -2));
        const nodeChildrenHeight = [...node.children]
          .filter(
            childNode => childNode.getAttribute('data-state') !== 'inactive'
          )
          .reduce(
            (height, childNode) =>
              height +
              childNode.clientHeight +
              Number(getComputedStyle(childNode).marginTop.slice(0, -2)) +
              Number(getComputedStyle(childNode).marginBottom.slice(0, -2)),
            0
          );

        return height + (nodeChildrenHeight || nodeHeight);
      }, 20);
    drawerEl.style.setProperty('--children-height', `${childrenHeight}px`);
  }, [drawerEl]);

  useEventListener('popstate', () => {
    /* Modal search param at the time this event is called,
    NOT THE SAME as the one from useModal! */
    const newModalSearchParam = new URLSearchParams(window.location.search).get(
      MODAL_SEARCH_KEY
    );

    saveToSearchParams(newModalSearchParam === null);
    drawerEl?.style.removeProperty('transition');
    drawerEl?.style.removeProperty('height');
  });

  useLayoutEffect(() => {
    if (!drawerEl) return;

    const resizeObserver = new ResizeObserver(updateDrawerHeight);
    resizeObserver.observe(drawerEl);

    const styleObserver = new MutationObserver(mutations =>
      mutations.forEach(mutation => {
        if (!mutation.target || mutation.attributeName !== 'style') return;

        const mutationEl = mutation.target as HTMLDivElement;
        if (!mutationEl.style.transition.startsWith('none'))
          mutationEl.style.removeProperty('transition');

        // Disable the below so avoid weirdness on tablets
        if (matchesMd) return;
        /* Make sure virtual keyboard behavior is consistent between Android
        Chrome and iOS Safari */
        if (mutationEl.style.height) mutationEl.style.removeProperty('height');
        if (mutationEl.style.bottom) {
          const keyboardHeight = visualViewport
            ? window.innerHeight - visualViewport.height
            : 0;

          if (!visualViewport || visualViewport.height === window.innerHeight)
            mutationEl.style.removeProperty('bottom');
          else mutationEl.style.setProperty('bottom', `${keyboardHeight}px`);
        }
      })
    );
    styleObserver.observe(drawerEl, { attributeFilter: ['style'] });

    return () => {
      resizeObserver.disconnect();
      styleObserver.disconnect();
    };
  }, [drawerEl, extras, currentModal, updateDrawerHeight]);

  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={setDrawerOpen}
      dismissible={currentModal === MODAL_BASECOLORS_LIST && !matchesMd}
      direction={matchesMd ? 'right' : 'bottom'}
    >
      <DrawerTrigger asChild>
        <Fab
          className={cn(
            `fixed bottom-[calc(theme(spacing.20)+env(safe-area-inset-bottom))]
            end-4 transition-[opacity,transform] md:hidden print:hidden`,
            !isClient && 'scale-90 opacity-0'
          )}
        >
          <SlidersHorizontalIcon />
          <span>Options</span>
        </Fab>
      </DrawerTrigger>
      <DrawerContent
        className={cn(
          `h-[calc(var(--children-height)+env(safe-area-inset-bottom))]
max-h-[calc(var(--children-height)+env(safe-area-inset-bottom))] md:me-0
md:h-full md:max-h-full md:w-80 md:rounded-e-none md:rounded-s-lg print:hidden
md:[&>[data-drawer-handle]]:hidden
[&[vaul-drawer]]:[transition-property:transform,height,max-height,border-radius]
md:[&[vaul-drawer]]:[transition-property:transform]`,
          isModalFullHeight &&
            `h-full max-h-full rounded-none sm:rounded-t-lg
[&>[data-drawer-handle]]:mt-0 [&>[data-drawer-handle]]:h-0`,
          virtualKeyboardOpen && 'pb-0'
        )}
        ref={drawerRef}
      >
        <DrawerClose asChild className='absolute end-2 top-3 hidden md:flex'>
          <IconButton variant='flat'>
            <XIcon />
          </IconButton>
        </DrawerClose>
        <SharedAxisX
          value={transitionSwitchValue}
          autoAdjustHeight={
            currentModal === MODAL_BASECOLORS_LIST && !matchesMd
          }
          className='h-full w-full [&>*]:w-full'
        >
          <TransitionSwitchItem value='list'>
            <ColorListPage />
          </TransitionSwitchItem>
          <TransitionSwitchItem value='primary'>
            <PrimaryColorEditPage />
          </TransitionSwitchItem>
          <TransitionSwitchItem value='neutral'>
            <NeutralColorEditPage />
          </TransitionSwitchItem>
          <TransitionSwitchItem value='danger'>
            <DangerColorEditPage />
          </TransitionSwitchItem>
          {[...Array(extras.length).keys()].map(index => (
            <TransitionSwitchItem key={`extra${index}`} value={`extra${index}`}>
              <ExtraColorEditPage index={index} />
            </TransitionSwitchItem>
          ))}
        </SharedAxisX>
      </DrawerContent>
    </Drawer>
  );
};
