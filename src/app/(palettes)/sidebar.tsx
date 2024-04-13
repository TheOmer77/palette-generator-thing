import { PalettesSidebarContent } from './sidebar-content';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Sidebar } from '@/components/ui/Sidebar';
import { Header } from '@/components/layout/Header';

export const PalettesSidebar = () => {
  return (
    <Sidebar className='hidden md:flex print:hidden print:md:flex'>
      <Header className='mb-2 px-4 py-2' />
      <ScrollArea
        // TODO: Remove second row of classnames when removing the code gen bottom item
        className='flex-grow pb-2 print:hidden
[&_[data-radix-scroll-area-viewport]]:pb-[3rem] [&_[data-scroll-bar]]:z-10'
      >
        <PalettesSidebarContent />
      </ScrollArea>
    </Sidebar>
  );
};
