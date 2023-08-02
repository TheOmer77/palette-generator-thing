import { ComponentProps, forwardRef, useCallback, useState } from 'react';
import { Highlight } from 'prism-react-renderer';

import { IconButton } from 'components/general';
import useDarkTheme from 'hooks/useDarkTheme';
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg';
import { ReactComponent as DoneIcon } from 'assets/icons/done.svg';
import cn from 'utils/cn';
import { prismThemes } from 'constants';

interface CodeBlockProps extends Omit<ComponentProps<'pre'>, 'children'> {
  children: string;
  language?: string;
}

const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ children, language = '', style, ...props }, ref) => {
    const darkTheme = useDarkTheme();
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
        <Highlight
          language={language}
          code={children}
          theme={prismThemes[darkTheme ? 'dark' : 'light']}
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
                `max-h-[calc(100vh-6.5rem)] overflow-auto p-4 text-sm
scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700
md:max-h-[calc(100vh-4rem)]`,
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

export default CodeBlock;
