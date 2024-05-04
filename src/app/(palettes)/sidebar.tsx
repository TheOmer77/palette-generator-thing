import { PalettesSidebarContent } from './sidebar-content';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Sidebar } from '@/components/ui/Sidebar';
import { Header } from '@/components/layout/Header';

export const PalettesSidebar = () => {
  return (
    <Sidebar className='hidden md:flex print:hidden print:md:flex'>
      <Header className='mb-2 px-4 py-2' />
      <ScrollArea className='flex-grow print:hidden'>
        <PalettesSidebarContent />
      </ScrollArea>
    </Sidebar>
  );
};
