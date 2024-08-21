import {
  Serwist,
  Strategy,
  type PrecacheEntry,
  type PrecacheFallbackEntry,
  type SerwistGlobalConfig,
} from 'serwist';
import { defaultCache } from '@serwist/next/worker';
import { validateSearchParams } from './lib/validateSearchParams';

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

class RedirectToValidSearch extends Strategy {
  _handle(request: Request) {
    const { pathname, searchParams } = new URL(request.url);
    // isValid should be false if this is called
    const { validSearch } = validateSearchParams(searchParams);
    return new Promise<Response>(resolve =>
      resolve(Response.redirect(`${pathname}?${validSearch}`))
    );
  }
}

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      matcher: ({ request }) => {
        const { searchParams } = new URL(request.url);
        const { isValid } = validateSearchParams(searchParams);
        return request.destination === 'document' && !isValid;
      },
      handler: new RedirectToValidSearch(),
    },
    ...defaultCache,
  ],
  fallbacks: { entries: fallbackEntries },
});

serwist.addToPrecacheList([{ url: '/~offline' }]);

serwist.addEventListeners();
