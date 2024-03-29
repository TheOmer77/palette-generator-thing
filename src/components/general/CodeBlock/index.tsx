import { ComponentProps, forwardRef, useCallback, useState } from 'react';
import { Highlight, Prism } from 'prism-react-renderer';

import { IconButton } from '../Buttons';
import { Tooltip } from '../Tooltip';
import { CopyIcon, DoneIcon } from 'assets/icons';
import { cn } from 'utils';

import 'styles/prism.css';

window.Prism = Prism;
//@ts-expect-error Import SCSS language
await import('prismjs/components/prism-scss');
//@ts-expect-error Import JSON language
await import('prismjs/components/prism-json');

export interface CodeBlockProps
  extends Omit<ComponentProps<'pre'>, 'children'> {
  children: string;
  language?: string;
}

export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ children, language = '', style, ...props }, ref) => {
    const [justCopied, setJustCopied] = useState(false);

    const copyCode = useCallback(() => {
      navigator.clipboard.writeText(children);
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 1500);
    }, [children]);

    return (
      <div
        className='relative overflow-hidden rounded-lg bg-neutral-50
dark:bg-neutral-900'
      >
        <Tooltip title='Copy code'>
          <IconButton
            aria-label='Copy code'
            className='absolute end-2 top-2 print:hidden'
            onClick={copyCode}
          >
            {justCopied ? <DoneIcon /> : <CopyIcon />}
          </IconButton>
        </Tooltip>
        <Highlight
          language={language}
          code={children}
          theme={{ plain: {}, styles: [] }}
        >
          {({
            className,
            style: prismStyle,
            tokens,
            getLineProps,
            getTokenProps,
          }) => (
            <pre
              {...props}
              style={{ ...prismStyle, ...style }}
              ref={ref}
              className={cn(
                `max-h-[calc(100vh-6.5rem)]
overflow-auto p-4 text-sm scrollbar-thin scrollbar-thumb-neutral-500/30
print:max-h-none md:max-h-[calc(100vh-4.5rem)] md:print:max-h-none`,
                className
              )}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    );
  }
);
CodeBlock.displayName = 'CodeBlock';
