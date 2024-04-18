import { Header } from '../Header';

export const NavbarHeader = () => (
  // TODO: On home page, opacity-0 until scrolling down 16rem.
  <Header className='text-2xl leading-none transition-opacity md:invisible' />
);
