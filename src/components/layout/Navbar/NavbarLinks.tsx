'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { ToggleGroup, ToggleGroupItem } from '@radix-ui/react-toggle-group';
import { CodeIcon, PaletteIcon } from 'lucide-react';

import { LinkWithSearchParams } from '../LinkWithSearchParams';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';

const TEMPORARY_PAGES_LIST_PLS_MOVE_ME_SOMEWHERE_ELSE = [
  { href: '/', label: 'Palettes', icon: <PaletteIcon /> },
  { href: '/codegen', label: 'Code', icon: <CodeIcon /> },
] satisfies { href: string; label: string; icon: ReactNode }[];

export const NavbarLinks = () => {
  const pathname = usePathname();

  return (
    <ToggleGroup
      type='single'
      value={pathname}
      className='hidden flex-row items-center gap-px text-sm md:flex'
    >
      {TEMPORARY_PAGES_LIST_PLS_MOVE_ME_SOMEWHERE_ELSE.map(
        ({ href, icon, label }) => (
          <ToggleGroupItem key={href} value={href} asChild>
            <Button variant='flat' className='aria-checked:bg-muted/15' asChild>
              <LinkWithSearchParams href={href}>
                {icon}
                <span>{label}</span>
              </LinkWithSearchParams>
            </Button>
          </ToggleGroupItem>
        )
      )}
      <Separator
        orientation='vertical'
        className='data-[orientation=vertical]:mx-4
data-[orientation=vertical]:h-6'
      />
    </ToggleGroup>
  );
};
