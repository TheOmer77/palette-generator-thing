import type { Metadata, Viewport } from 'next';

const APP_NAME = 'Palette generator thing';
const APP_TITLE_TEMPLATE = '%s - Palette generator thing';
const APP_DESCRIPTION = 'App to generate color palettes for user interfaces.';

export const metadata = {
  applicationName: APP_NAME,
  title: { default: APP_NAME, template: APP_TITLE_TEMPLATE },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: APP_NAME },
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: { default: APP_NAME, template: APP_TITLE_TEMPLATE },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: { default: APP_NAME, template: APP_TITLE_TEMPLATE },
    description: APP_DESCRIPTION,
  },
} satisfies Metadata;

export const viewport = {
  themeColor: 'rgb(var(--color-background, 255 255 255))',
} satisfies Viewport;
