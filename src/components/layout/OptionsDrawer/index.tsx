'use client';

import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEventListener, useMediaQuery } from 'usehooks-ts';
import { SlidersHorizontalIcon, XIcon } from 'lucide-react';
import {
  TransitionSwitch,
  TransitionSwitchItem,
} from '@theomer77/react-transition-switch';

import { ColorListPage } from './ColorListPage';
import { PrimaryColorEditPage } from './PrimaryColorEditPage';
import { NeutralColorEditPage } from './NeutralColorEditPage';
import { DangerColorEditPage } from './DangerColorEditPage';
import { ExtraColorEditPage } from './ExtraColorEditPage';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/Drawer';
import { Fab } from '@/components/ui/Fab';
import { IconButton } from '@/components/ui/IconButton';
import { useTheme } from '@/hooks/useTheme';
import { useOptionsDrawer } from '@/store/useOptionsDrawer';
import {
  MODAL_BASECOLORS_EDIT,
  MODAL_BASECOLORS_LIST,
  MODAL_SEARCH_KEY,
} from '@/constants/modalSearchParams';
import { cn } from '@/lib/utils';

export const OptionsDrawer = () => {
  const searchParams = useSearchParams();
  const modalSearchParam = searchParams.get(MODAL_SEARCH_KEY);

  const { extras } = useTheme();
  const { saveToSearchParams } = useOptionsDrawer();

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
    saveToSearchParams(modalSearchParam === null);
    drawerEl?.style.removeProperty('transition');
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
          icon={<SlidersHorizontalIcon />}
          className='flex md:hidden print:hidden'
        >
          Options
        </Fab>
      </DrawerTrigger>
      <DrawerContent
        className={cn(
          `h-[--children-height] max-h-full md:me-0 md:h-full md:w-80
md:rounded-e-none md:rounded-s-lg print:hidden md:[&>[data-drawer-handle]]:hidden
[&[vaul-drawer]]:[transition-property:transform,height,border-radius]
md:[&[vaul-drawer]]:[transition-property:transform]`,
          modalSearchParam?.startsWith(MODAL_BASECOLORS_EDIT) &&
            `h-full rounded-none [&>[data-drawer-handle]]:mt-0
[&>[data-drawer-handle]]:h-0`
        )}
        ref={drawerRef}
      >
        <DrawerClose asChild className='absolute end-2 top-3 hidden md:flex'>
          <IconButton>
            <XIcon />
          </IconButton>
        </DrawerClose>
        <TransitionSwitch
          value={transitionSwitchValue}
          autoAdjustHeight={
            modalSearchParam === MODAL_BASECOLORS_LIST && !matchesMd
          }
          className='relative h-full w-full duration-300 [&>*]:absolute [&>*]:start-0
[&>*]:top-0 [&>*]:w-full [&>[data-state=active]]:animate-in
[&>[data-state=active]]:fade-in [&>[data-state=inactive]]:animate-out
[&>[data-state=inactive]]:fade-out'
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
        </TransitionSwitch>
      </DrawerContent>
    </Drawer>
  );
};
