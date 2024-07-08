import type { PropsWithChildren } from 'react';
import { Figtree, Fira_Code } from 'next/font/google';
import clsx from 'clsx';

import { AppleAssets } from '@/components/layout/AppleAssets';
import { Favicon } from '@/components/layout/Favicon';
import { Navbar } from '@/components/layout/Navbar';
import { ThemeColorMeta } from '@/components/layout/ThemeColorMeta';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { ThemeStyle } from '@/components/layout/ThemeStyle';
import '@/styles/index.css';

export { metadata, viewport } from './metadata';

const font = Figtree({
  subsets: ['latin'],
  variable: '--font-family',
  fallback: ['sans-serif'],
});
const fontMono = Fira_Code({
  subsets: ['latin'],
  variable: '--font-family-mono',
  fallback: ['monospace'],
});

const RootLayout = ({ children }: PropsWithChildren) => (
  <html
    lang='en'
    className={clsx(font.variable, fontMono.variable)}
    suppressHydrationWarning
  >
    <head>
      <Favicon />
      <ThemeStyle />
      <ThemeColorMeta />
      <AppleAssets />
    </head>
    <body>
      <ThemeProvider>
        <Navbar />
        <div className='mx-auto w-full max-w-screen-2xl'>{children}</div>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
