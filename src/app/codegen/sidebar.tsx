import { CodeGenSidebarContent } from './sidebar-content';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Sidebar } from '@/components/ui/Sidebar';
import { Header } from '@/components/layout/Header';

export const CodeGenSidebar = () => (
  <Sidebar className='hidden md:flex print:hidden'>
    <Header className='mb-2 px-4 py-2' />
    <ScrollArea className='flex-grow pb-2 print:hidden'>
      <CodeGenSidebarContent />
    </ScrollArea>
  </Sidebar>
);
