import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from 'react';

import { cn } from '@/lib/utils';

export type ErrorProps = ComponentPropsWithoutRef<'div'> & {
  statusCode: ReactNode;
  title: ReactNode;
};

export const Error = forwardRef<ElementRef<'div'>, ErrorProps>(
  (
    { statusCode = 'Error', title = 'An error occurred.', children, ...props },
    ref
  ) => (
    <div
      {...props}
      ref={ref}
      className={cn(`flex min-h-dvh w-full select-none flex-col items-center
justify-center p-4`)}
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
