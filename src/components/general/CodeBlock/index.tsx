'use client';

import {
  forwardRef,
  useCallback,
  useState,
  type ComponentPropsWithoutRef,
} from 'react';
import { Highlight, Prism } from 'prism-react-renderer';
import { CheckIcon, CopyIcon } from 'lucide-react';

import { IconButton } from '../IconButton';
import { Tooltip } from '../Tooltip';
import { cn } from '@/utils';

import '@/styles/prism.css';

(typeof global !== 'undefined' ? global : window).Prism = Prism;
require('prismjs/components/prism-scss');
require('prismjs/components/prism-json');

export interface CodeBlockProps
  extends Omit<ComponentPropsWithoutRef<'pre'>, 'children'> {
  children: string;
  language?: string;
}

export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ language = '', style, children, ...props }, ref) => {
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
            {justCopied ? <CheckIcon /> : <CopyIcon />}
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
md:max-h-[calc(100vh-4.5rem)] print:max-h-none md:print:max-h-none`,
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
