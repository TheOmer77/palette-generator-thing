import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  useBaseColors as OLD_useBaseColors,
  type BaseColorsState,
} from '@/store/useBaseColors';
import { useCallback } from 'react';

export const useBaseColors = () => {
  const router = useRouter(),
    pathname = usePathname(),
    searchParams = useSearchParams();

  // TODO: Get rid of this, once I don't need it anymore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { primary: _0, setPrimary: _1, ...rest } = OLD_useBaseColors();

  const setSearchParam = useCallback(
    (key: string, value: string | null) => {
      const newParams = new URLSearchParams(searchParams.toString());
      if (value === null) newParams.delete(key);
      else newParams.set(key, value);

      router.replace(`${pathname}?${newParams.toString()}`);
    },
    [pathname, router, searchParams]
  );

  const primary = `#${searchParams.get('primary')}`;

  const setPrimary = useCallback(
    (primary: BaseColorsState['primary']) =>
      setSearchParam(
        'primary',
        primary.startsWith('#') ? primary.slice(1) : primary
      ),
    [setSearchParam]
  );

  return { primary, setPrimary, ...rest };
};
