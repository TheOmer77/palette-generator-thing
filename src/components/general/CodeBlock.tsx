import { DetailedHTMLProps, HTMLAttributes, forwardRef } from 'react';

const CodeBlock = forwardRef<
  HTMLPreElement,
  DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>
>(({ children, ...props }, ref) => (
  <pre
    {...props}
    ref={ref}
    className='max-h-[calc(100vh-4rem)] overflow-auto rounded-lg bg-slate-100
    p-4 text-sm dark:bg-slate-900'
  >
    {children}
  </pre>
));
CodeBlock.displayName = 'CodeBlock';

export default CodeBlock;
