import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import type { ErrorProps as NextErrorProps } from 'next/error';

import { cn } from '@/lib/utils';

export type ErrorProps = ComponentPropsWithoutRef<'div'> &
  Omit<NextErrorProps, 'withDarkMode'>;

export const Error = forwardRef<ElementRef<'div'>, ErrorProps>(
  (
    {
      statusCode = 500,
      title = 'An error occurred.',
      className,
      children,
      ...props
    },
    ref
  ) => (
    <div
      {...props}
      ref={ref}
      className={cn(
        `absolute start-0 top-0 flex min-h-dvh w-full select-none flex-col
items-center justify-center p-4`,
        className
      )}
    >
      <h1
        className='m-0 text-9xl font-extrabold leading-none tracking-tight
text-danger-800 sm:text-[16rem] md:text-[12rem] lg:text-[16rem]
dark:text-danger-200'
      >
        {statusCode}
      </h1>
      <p
        className='m-0 text-center text-xl text-neutral-700
dark:text-neutral-300'
      >
        {title}
      </p>
      {children}
    </div>
  )
);
Error.displayName = 'Error';
