import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { cn } from '@/lib/utils';

const RADIUS = 10,
  CIRCUMFERENCE = RADIUS * 2 * Math.PI;

export const Spinner = forwardRef<
  ElementRef<'svg'>,
  ComponentPropsWithoutRef<'svg'>
>(({ className, ...props }, ref) => (
  <svg
    {...props}
    ref={ref}
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={cn('lucide lucide-spinner', className)}
  >
    <circle cx='12' cy='12' r={RADIUS} opacity={0.25} />
    <circle
      cx='12'
      cy='12'
      r={RADIUS}
      className='origin-center animate-spin'
      strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
      strokeDashoffset={CIRCUMFERENCE - 0.25 * CIRCUMFERENCE}
    />
  </svg>
));
Spinner.displayName = 'Spinner';
