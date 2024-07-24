import type { PropsWithChildren } from 'react';

import { RedirectOnOfflineRoute } from './redirect-on-route';

const OfflineFallbackLayout = ({ children }: PropsWithChildren) => (
  <RedirectOnOfflineRoute>{children}</RedirectOnOfflineRoute>
);

export default OfflineFallbackLayout;
