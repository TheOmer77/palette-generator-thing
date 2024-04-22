import Link from 'next/link';

import { GithubLogo } from '../GithubLogo';
import { IconButton } from '@/components/ui/IconButton';
import { Tooltip } from '@/components/ui/Tooltip';

const REPO_URL = 'https://github.com/TheOmer77/palette-generator-thing';

export const NavbarActions = () => (
  <div className='flex flex-row gap-px'>
    <Tooltip content='GitHub repo'>
      <IconButton asChild>
        <Link href={REPO_URL}>
          <GithubLogo className='size-em' />
        </Link>
      </IconButton>
    </Tooltip>
  </div>
);
