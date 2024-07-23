import {
  Serwist,
  type PrecacheEntry,
  type PrecacheFallbackEntry,
  type SerwistGlobalConfig,
} from 'serwist';
import { defaultCache } from '@serwist/next/worker';

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const fallbackEntries = [
  {
    url: '/~offline',
    matcher: ({ request }) => request.destination === 'document',
  },
] satisfies PrecacheFallbackEntry[];

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
  fallbacks: { entries: fallbackEntries },
});

serwist.addToPrecacheList([{ url: '/~offline' }]);

serwist.addEventListeners();
