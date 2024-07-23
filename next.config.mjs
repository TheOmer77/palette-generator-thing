import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'src/sw.ts',
  swDest: 'public/sw.js',
});

/** @type {import('next').NextConfig} */
const config = withSerwist();
export default config;
