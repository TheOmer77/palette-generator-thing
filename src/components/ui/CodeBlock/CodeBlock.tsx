'use client';

import { forwardRef, useCallback, useState, type ElementRef } from 'react';
import type { ScrollAreaProps } from '@radix-ui/react-scroll-area';
import { Highlight, Prism } from 'prism-react-renderer';
import { useIsClient } from 'usehooks-ts';
import { CheckIcon, CopyIcon } from 'lucide-react';

import { IconButton } from '../IconButton';
import { ScrollArea, ScrollBar } from '../ScrollArea';
import { Tooltip } from '../Tooltip';
import { cn } from '@/lib/utils';

import '@/styles/prism.css';

(typeof global !== 'undefined' ? global : window).Prism = Prism;
require('prismjs/components/prism-scss');
require('prismjs/components/prism-json');

export type CodeBlockProps = Omit<ScrollAreaProps, 'children'> & {
  children: string;
  language?: string;
};

export const CodeBlock = forwardRef<
  ElementRef<typeof ScrollArea>,
  CodeBlockProps
>(({ language = '', className, children, ...props }, ref) => {
  const isClient = useIsClient();
  const [justCopied, setJustCopied] = useState(false);

  const copyCode = useCallback(() => {
    if (justCopied) return;

    navigator.clipboard.writeText(children);
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 1500);
  }, [children, justCopied]);

  return (
    <Highlight
      language={language}
      code={children}
      theme={{ plain: {}, styles: [] }}
    >
      {({ className: preClassname, tokens, getLineProps, getTokenProps }) => (
        <ScrollArea
          {...props}
          ref={ref}
          className={cn('relative grid rounded-lg bg-card', className)}
        >
          <Tooltip content='Copy code'>
            <IconButton
              variant='flat'
              aria-label='Copy code'
              className={cn(
                'absolute end-2 top-2 transition-opacity print:hidden',
                !isClient && 'pointer-events-none opacity-0'
              )}
              onClick={copyCode}
            >
              {justCopied ? <CheckIcon /> : <CopyIcon />}
            </IconButton>
          </Tooltip>
          <pre className={cn('p-4 text-sm leading-relaxed', preClassname)}>
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
  );
});
CodeBlock.displayName = 'CodeBlock';
