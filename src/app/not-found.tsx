import { Error } from '@/components/layout/Error';

const NotFoundPage = () => (
  <Error
    statusCode={404}
    title="I'm not sure what you were looking for, but it's not here."
  />
);

export default NotFoundPage;
