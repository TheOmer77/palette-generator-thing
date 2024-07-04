//@ts-check

import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({ dest: 'public' });
const config = withPWA();
export default config;
