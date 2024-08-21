import type { Metadata, Viewport } from 'next';

import manifest from './manifest.json';

const APP_NAME = manifest.name;
const APP_TITLE_TEMPLATE = `%s - ${manifest.name}`;
const APP_DESCRIPTION = manifest.description;

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
  colorScheme: 'light dark',
  userScalable: false,
  viewportFit: 'cover',
} satisfies Viewport;
