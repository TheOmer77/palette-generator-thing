import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Figtree, Fira_Code } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import clsx from 'clsx';

import { Favicon } from '@/components/layout/Favicon';
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
  <html
    lang='en'
    className={clsx(font.variable, fontMono.variable)}
    suppressHydrationWarning
  >
    <head>
      <meta name='color-scheme' content='light dark' />
      <Favicon />
      <ThemeStyle />
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
