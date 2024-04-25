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
      className='fixed inset-x-0 bottom-0 z-20 flex h-16 w-full flex-row
items-center gap-1 bg-card p-1 text-card-foreground shadow-md md:static
md:inset-x-auto md:size-auto md:bg-transparent md:shadow-none [&>*]:size-full
md:[&>*]:h-10 md:[&>*]:w-auto'
    >
      {NAVBAR_LINKS.map(({ href, icon, label }) => {
        const Comp = pathname === href ? 'div' : LinkWithSearchParams;
        return (
          <ToggleGroupItem key={href} value={href} asChild>
            <Button
              variant='flat'
              className='flex-col gap-1 aria-checked:bg-muted/15 md:flex-row
md:gap-2'
              asChild
            >
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
        className='hidden data-[orientation=vertical]:mx-4
data-[orientation=vertical]:h-6 md:block'
      />
    </ToggleGroup>
  );
};
