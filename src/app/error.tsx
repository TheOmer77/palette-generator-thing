'use client';

import { Error } from '@/components/layout/Error';

const ErrorPage = () => (
  <Error statusCode={500} title='Well, that was unexpected.' />
);

export default ErrorPage;
