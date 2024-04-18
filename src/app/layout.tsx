import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Figtree, Fira_Code } from 'next/font/google';
import clsx from 'clsx';

import { Navbar } from '@/components/layout/Navbar';
import { ThemeStyle } from '@/components/layout/ThemeStyle';
import '@/styles/index.css';

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

export const metadata: Metadata = {
  title: 'Palette generator thing',
  description: 'App to generate color palettes.',
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang='en' className={clsx(font.variable, fontMono.variable)}>
    <head>
      <meta name='color-scheme' content='light dark' />
      <ThemeStyle />
    </head>
    <body>
      <Navbar />
      <div className='mx-auto w-full max-w-screen-2xl'>{children}</div>
    </body>
  </html>
);

export default RootLayout;
