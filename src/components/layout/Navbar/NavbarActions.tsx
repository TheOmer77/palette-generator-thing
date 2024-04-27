import Link from 'next/link';

import { NavbarThemeMenu } from './NavbarThemeMenu';
import { GithubLogo } from '../GithubLogo';
import { IconButton } from '@/components/ui/IconButton';
import { Tooltip } from '@/components/ui/Tooltip';
import { REPO_URL } from '@/constants/navbar';

export const NavbarActions = () => (
  <div className='flex flex-row gap-px'>
    <NavbarThemeMenu />
    <Tooltip content='GitHub repo'>
      <IconButton asChild>
        <Link href={REPO_URL}>
          <GithubLogo className='size-em' />
        </Link>
      </IconButton>
    </Tooltip>
  </div>
);
