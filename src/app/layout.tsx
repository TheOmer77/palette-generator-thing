import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Fira_Code, Plus_Jakarta_Sans } from 'next/font/google';
import clsx from 'clsx';

import GlobalStateProvider from '@/components/providers/GlobalStateProvider';
import { ThemeStyle } from '@/components/layout';
import '@/styles/index.css';

const font = Plus_Jakarta_Sans({
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

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <GlobalStateProvider>
      <html lang='en' className={clsx(font.variable, fontMono.variable)}>
        <head>
          <meta name='color-scheme' content='light dark' />
          <ThemeStyle />
        </head>
        <body>{children}</body>
      </html>
    </GlobalStateProvider>
  );
};

export default RootLayout;
