import { DetailedHTMLProps, HTMLAttributes, forwardRef } from 'react';

const CodeBlock = forwardRef<
  HTMLPreElement,
  DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>
>(({ children, ...props }, ref) => (
  <div className='overflow-hidden rounded-lg'>
    <pre
      {...props}
      ref={ref}
      className='max-h-[calc(100vh-4rem)] overflow-auto bg-slate-100 p-4 text-sm
    dark:bg-slate-900/40'
    >
      {children}
    </pre>
  </div>
));
CodeBlock.displayName = 'CodeBlock';

export default CodeBlock;
