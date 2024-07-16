'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { ToggleGroup, ToggleGroupItem } from '@radix-ui/react-toggle-group';

import { LinkWithSearchParams } from '../LinkWithSearchParams';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';
import { NAVBAR_LINKS } from '@/constants/navbar';

const NavbarLinksContent = () => {
  const pathname = usePathname();

  return (
    <ToggleGroup
      type='single'
      value={pathname}
      className='fixed inset-x-0 bottom-0 z-20 flex h-[calc(theme(spacing.16)+env(safe-area-inset-bottom))] w-full flex-row items-center gap-px bg-card px-1 pb-[calc(theme(spacing.1)+env(safe-area-inset-bottom))] pt-1 text-card-foreground shadow-md md:static md:inset-x-auto md:size-auto md:bg-transparent md:pb-1 md:shadow-none [&>*]:size-full md:[&>*]:h-10 md:[&>*]:w-auto'
    >
      {NAVBAR_LINKS.map(({ href, icon, label }) => {
        const Comp = pathname === href ? 'div' : LinkWithSearchParams;
        return (
          <ToggleGroupItem key={href} value={href} asChild>
            <Button
              variant='flat'
              className='flex-col gap-1 aria-checked:bg-muted/15 md:flex-row md:gap-2'
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
        className='hidden data-[orientation=vertical]:mx-4 data-[orientation=vertical]:h-6 md:block'
      />
    </ToggleGroup>
  );
};

export const NavbarLinks = () => (
  <Suspense>
    <NavbarLinksContent />
  </Suspense>
);
