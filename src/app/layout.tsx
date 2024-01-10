import type { Metadata } from 'next';
import { Figtree, Fira_Code } from 'next/font/google';
import clsx from 'clsx';

import GlobalStateProvider from '@/components/providers/GlobalStateProvider';
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalStateProvider>
      <html lang='en' className={clsx(font.variable, fontMono.variable)}>
        <body>{children}</body>
      </html>
    </GlobalStateProvider>
  );
}
