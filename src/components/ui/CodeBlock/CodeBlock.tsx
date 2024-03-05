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
import { ScrollArea, ScrollBar } from '../ScrollArea';
import { Tooltip } from '../Tooltip';
import { cn } from '@/lib/utils';

import '@/styles/prism.css';

(typeof global !== 'undefined' ? global : window).Prism = Prism;
require('prismjs/components/prism-scss');
require('prismjs/components/prism-json');

export type CodeBlockProps = Omit<
  ComponentPropsWithoutRef<'pre'>,
  'children'
> & {
  children: string;
  language?: string;
};

export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ language = '', style, children, ...props }, ref) => {
    const [justCopied, setJustCopied] = useState(false);

    const copyCode = useCallback(() => {
      if (justCopied) return;

      navigator.clipboard.writeText(children);
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 1500);
    }, [children, justCopied]);

    return (
      <div className='relative overflow-hidden rounded-lg bg-card'>
        <Tooltip content='Copy code'>
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
            <ScrollArea
              className='[&>[data-radix-scroll-area-viewport]]:max-h-[calc(100dvh-6.5rem)]
md:[&>[data-radix-scroll-area-viewport]]:max-h-[calc(100dvh-5rem)]'
            >
              <pre
                {...props}
                style={{ ...prismStyle, ...style }}
                ref={ref}
                className={cn(`p-4 text-sm leading-relaxed`, className)}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
              <ScrollBar orientation='vertical' />
              <ScrollBar orientation='horizontal' />
            </ScrollArea>
          )}
        </Highlight>
      </div>
    );
  }
);
CodeBlock.displayName = 'CodeBlock';
