'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useIsClient } from 'usehooks-ts';

import { IconButton } from '@/components/ui/IconButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Tooltip } from '@/components/ui/Tooltip';

const THEMES = { system: 'System', light: 'Light', dark: 'Dark' } as const;

export const NavbarThemeMenu = () => {
  const { setTheme, theme } = useTheme();
  const isClient = useIsClient();

  return (
    <DropdownMenu>
      <Tooltip content='Theme'>
        <IconButton asChild variant='flat' disabled={!isClient}>
          <DropdownMenuTrigger>
            <>
              <MoonIcon className='hidden dark:block' />
              <SunIcon className='dark:hidden' />
            </>
          </DropdownMenuTrigger>
        </IconButton>
      </Tooltip>
      <DropdownMenuContent align='end'>
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          {Object.entries(THEMES).map(([value, displayName]) => (
            <DropdownMenuRadioItem key={value} value={value}>
              {displayName}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
