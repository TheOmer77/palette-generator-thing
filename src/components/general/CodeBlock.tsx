import {
  DetailedHTMLProps,
  HTMLAttributes,
  forwardRef,
  useCallback,
  useState,
} from 'react';

import { IconButton } from 'components/general';
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg';
import { ReactComponent as DoneIcon } from 'assets/icons/done.svg';

interface CodeBlockProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>,
    'children'
  > {
  children: string;
}

const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ children, ...props }, ref) => {
    const [justCopied, setJustCopied] = useState(false);

    const copyCode = useCallback(() => {
      navigator.clipboard.writeText(children);
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 1500);
    }, [children]);

    return (
      <div
        className='relative overflow-hidden rounded-lg bg-slate-100
    dark:bg-slate-900/40'
      >
        <IconButton
          title='Copy code'
          className='absolute end-2 top-2'
          onClick={copyCode}
        >
          {justCopied ? <DoneIcon /> : <CopyIcon />}
        </IconButton>
        <pre
          {...props}
          ref={ref}
          className='max-h-[calc(100vh-6.5rem)] overflow-auto p-4 text-sm
          scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700
          md:max-h-[calc(100vh-4rem)]'
        >
          {children}
        </pre>
      </div>
    );
  }
);
CodeBlock.displayName = 'CodeBlock';

export default CodeBlock;
