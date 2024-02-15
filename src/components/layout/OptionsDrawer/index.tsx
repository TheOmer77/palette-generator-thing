'use client';

import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontalIcon } from 'lucide-react';

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/Drawer';
import { Fab } from '@/components/ui/Fab';
import { ColorListPage } from './ColorListPage';

const MODAL_LIST_SEARCH = 'baseColors-list',
  MODAL_EDIT_SEARCH = 'baseColors-edit-';

export const OptionsDrawer = () => {
  const searchParams = useSearchParams();

  const isDrawerOpen = useMemo(() => {
    const modalSearchParam = searchParams.get('modal');
    if (typeof modalSearchParam !== 'string') return false;
    return (
      modalSearchParam === MODAL_LIST_SEARCH ||
      modalSearchParam.startsWith(MODAL_EDIT_SEARCH)
    );
  }, [searchParams]);

  const setDrawerOpen = useCallback(
    (open: boolean) => {
      if (open === isDrawerOpen) return;

      const params = new URLSearchParams(searchParams.toString());
      if (open) {
        params.set('modal', MODAL_LIST_SEARCH);
        return window.history.pushState(null, '', `?${params.toString()}`);
      }
      // TODO: Close when in submenu - go(-2)
      window.history.back();
    },
    [isDrawerOpen, searchParams]
  );

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger asChild>
        <Fab
          icon={<SlidersHorizontalIcon />}
          className='flex md:hidden print:hidden'
        >
          Options
        </Fab>
      </DrawerTrigger>
      <DrawerContent className='print:hidden'>
        <ColorListPage />
      </DrawerContent>
    </Drawer>
  );
};
