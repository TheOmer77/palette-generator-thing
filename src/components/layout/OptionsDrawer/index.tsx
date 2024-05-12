'use client';

import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEventListener, useIsClient, useMediaQuery } from 'usehooks-ts';
import { SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { TransitionSwitchItem } from '@theomer77/react-transition-switch';

import { ColorListPage } from './ColorListPage';
import { PrimaryColorEditPage } from './PrimaryColorEditPage';
import { NeutralColorEditPage } from './NeutralColorEditPage';
import { DangerColorEditPage } from './DangerColorEditPage';
import { ExtraColorEditPage } from './ExtraColorEditPage';
import SharedAxisX from '../SharedAxisX';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/Drawer';
import { Fab } from '@/components/ui/Fab';
import { IconButton } from '@/components/ui/IconButton';
import { useComputedBaseColors } from '@/hooks/useComputedBaseColors';
import { useOptionsDrawer } from '@/store/useOptionsDrawer';
import { cn } from '@/lib/utils';
import {
  MODAL_BASECOLORS_EDIT,
  MODAL_BASECOLORS_LIST,
  MODAL_SEARCH_KEY,
} from '@/constants/modalSearchParams';

export const OptionsDrawer = () => {
  const searchParams = useSearchParams();
  const modalSearchParam = searchParams.get(MODAL_SEARCH_KEY);

  const { extras } = useComputedBaseColors();
  const { saveToSearchParams } = useOptionsDrawer();

  const isClient = useIsClient();
  const matchesMd = useMediaQuery('(min-width: 768px)');

  const [drawerEl, setDrawerEl] = useState<HTMLDivElement>();

  const isDrawerOpen = useMemo(
    () =>
      typeof modalSearchParam === 'string' &&
      (modalSearchParam === MODAL_BASECOLORS_LIST ||
        modalSearchParam.startsWith(MODAL_BASECOLORS_EDIT)),
    [modalSearchParam]
  );
  const transitionSwitchValue = useMemo(
    () =>
      modalSearchParam?.startsWith(MODAL_BASECOLORS_EDIT)
        ? modalSearchParam.split('-')[2]
        : 'list',
    [modalSearchParam]
  );

  const drawerRef = useCallback(
    (node: HTMLDivElement) => setDrawerEl(node),
    []
  );

  const setDrawerOpen = useCallback(
    (open: boolean) => {
      if (open === isDrawerOpen) return;

      if (open) {
        const params = new URLSearchParams(searchParams.toString());
        params.set(MODAL_SEARCH_KEY, MODAL_BASECOLORS_LIST);
        return window.history.pushState(null, '', `?${params.toString()}`);
      }

      if (searchParams.get(MODAL_SEARCH_KEY)?.startsWith(MODAL_BASECOLORS_EDIT))
        return window.history.go(-2);
      window.history.back();
    },
    [isDrawerOpen, searchParams]
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
    NOT THE SAME as the one from useSearchParams! */
    const newModalSearchParam = new URLSearchParams(window.location.search).get(
      MODAL_SEARCH_KEY
    );

    saveToSearchParams(newModalSearchParam === null);
    drawerEl?.style.removeProperty('transition');
    drawerEl?.style.removeProperty('height');
  });

  useLayoutEffect(() => {
    if (!drawerEl || modalSearchParam !== MODAL_BASECOLORS_LIST) return;

    const resizeObserver = new ResizeObserver(updateDrawerHeight);
    resizeObserver.observe(drawerEl);

    const styleObserver = new MutationObserver(mutations =>
      mutations.forEach(mutation => {
        if (!mutation.target || mutation.attributeName !== 'style') return;
        if (!drawerEl.style.transition.startsWith('none'))
          drawerEl.style.removeProperty('transition');
      })
    );
    styleObserver.observe(drawerEl, { attributeFilter: ['style'] });

    return () => {
      resizeObserver.disconnect();
      styleObserver.disconnect();
    };
  }, [drawerEl, extras, modalSearchParam, updateDrawerHeight]);

  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={setDrawerOpen}
      dismissible={modalSearchParam === MODAL_BASECOLORS_LIST && !matchesMd}
      direction={matchesMd ? 'right' : 'bottom'}
    >
      <DrawerTrigger asChild>
        <Fab
          className={cn(
            `fixed bottom-20 end-4 transition-[opacity,transform]
md:hidden print:hidden`,
            !isClient && 'scale-90 opacity-0'
          )}
        >
          <SlidersHorizontalIcon />
          <span>Options</span>
        </Fab>
      </DrawerTrigger>
      <DrawerContent
        className={cn(
          `h-[--children-height] max-h-[--children-height] md:me-0 md:h-full
md:max-h-full md:w-80 md:rounded-e-none md:rounded-s-lg print:hidden
md:[&>[data-drawer-handle]]:hidden
[&[vaul-drawer]]:[transition-property:transform,height,max-height,border-radius]
md:[&[vaul-drawer]]:[transition-property:transform]`,
          modalSearchParam?.startsWith(MODAL_BASECOLORS_EDIT) &&
            `h-full max-h-full rounded-none [&>[data-drawer-handle]]:mt-0
[&>[data-drawer-handle]]:h-0`
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
            modalSearchParam === MODAL_BASECOLORS_LIST && !matchesMd
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
