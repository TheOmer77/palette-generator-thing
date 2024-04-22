'use client';

import { usePathname } from 'next/navigation';
import { ToggleGroup, ToggleGroupItem } from '@radix-ui/react-toggle-group';

import { LinkWithSearchParams } from '../LinkWithSearchParams';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';
import { NAVBAR_LINKS } from '@/constants/navbar';

export const NavbarLinks = () => {
  const pathname = usePathname();

  return (
    <ToggleGroup
      type='single'
      value={pathname}
      className='hidden flex-row items-center gap-px text-sm md:flex'
    >
      {NAVBAR_LINKS.map(({ href, icon, label }) => {
        const Comp = pathname === href ? 'div' : LinkWithSearchParams;
        return (
          <ToggleGroupItem key={href} value={href} asChild>
            <Button variant='flat' className='aria-checked:bg-muted/15' asChild>
              <Comp href={href}>
                {icon}
                <span>{label}</span>
              </Comp>
            </Button>
          </ToggleGroupItem>
        );
      })}
      <Separator
        orientation='vertical'
        className='data-[orientation=vertical]:mx-4
data-[orientation=vertical]:h-6'
      />
    </ToggleGroup>
  );
};
