'use client';

import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontalIcon } from 'lucide-react';
import {
  TransitionSwitch,
  TransitionSwitchItem,
} from '@theomer77/react-transition-switch';

import { ColorListPage } from './ColorListPage';
import { ColorEditPage } from './ColorEditPage';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/Drawer';
import { Fab } from '@/components/ui/Fab';
import { useTheme } from '@/hooks/useTheme';
import {
  MODAL_BASECOLORS_EDIT,
  MODAL_BASECOLORS_LIST,
  MODAL_SEARCH_KEY,
} from '@/constants/modalSearchParams';

export const OptionsDrawer = () => {
  const searchParams = useSearchParams();
  const modalSearchParam = searchParams.get(MODAL_SEARCH_KEY);

  const { primary, neutral, danger, extras } = useTheme();

  const isDrawerOpen = useMemo(
    () =>
      typeof modalSearchParam === 'string' &&
      (modalSearchParam === MODAL_BASECOLORS_LIST ||
        modalSearchParam.startsWith(MODAL_BASECOLORS_EDIT)),
    [modalSearchParam]
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

  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={setDrawerOpen}
      dismissible={modalSearchParam === MODAL_BASECOLORS_LIST}
    >
      <DrawerTrigger asChild>
        <Fab
          icon={<SlidersHorizontalIcon />}
          className='flex md:hidden print:hidden'
        >
          Options
        </Fab>
      </DrawerTrigger>
      <DrawerContent className='print:hidden'>
        <TransitionSwitch
          value={
            modalSearchParam?.startsWith(MODAL_BASECOLORS_EDIT)
              ? modalSearchParam.split('-')[2]
              : 'list'
          }
          autoAdjustHeight
          className='w-full'
        >
          <TransitionSwitchItem value='list'>
            <ColorListPage />
          </TransitionSwitchItem>
          {/* Pages below are dummy pages for now
            TODO: Replace dummy drawer pages with the actual pages */}
          <TransitionSwitchItem value='primary'>
            <ColorEditPage title='Primary' color={primary}>
              Primary edit page TBD
            </ColorEditPage>
          </TransitionSwitchItem>
          <TransitionSwitchItem value='neutral'>
            <ColorEditPage title='Neutral' color={neutral}>
              Neutral edit page TBD
            </ColorEditPage>
          </TransitionSwitchItem>
          <TransitionSwitchItem value='danger'>
            <ColorEditPage title='Danger' color={danger}>
              Danger edit page TBD
            </ColorEditPage>
          </TransitionSwitchItem>
          {extras.map(({ name, value }, index) => {
            const title = name || `Extra ${index + 1}`;
            return (
              <TransitionSwitchItem
                key={`extra${index}`}
                value={`extra${index}`}
              >
                <ColorEditPage title={title} color={value}>
                  {title} edit page TBD
                </ColorEditPage>
              </TransitionSwitchItem>
            );
          })}
        </TransitionSwitch>
      </DrawerContent>
    </Drawer>
  );
};
