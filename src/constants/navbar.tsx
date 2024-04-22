import type { ReactNode } from 'react';
import { CodeIcon, PaletteIcon } from 'lucide-react';

export const NAVBAR_LINKS = [
  { href: '/', label: 'Palettes', icon: <PaletteIcon /> },
  { href: '/codegen', label: 'Code', icon: <CodeIcon /> },
] satisfies { href: string; label: string; icon: ReactNode }[];

export const REPO_URL = 'https://github.com/TheOmer77/palette-generator-thing';
