import {
  ButtonHTMLAttributes,
  Children,
  DetailedHTMLProps,
  forwardRef,
} from 'react';

const IconButton = forwardRef<
  HTMLButtonElement,
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>(({ children, ...props }, ref) => (
  <button
    {...props}
    ref={ref}
    className='flex h-8 w-8 cursor-default items-center justify-center rounded-lg
    text-xl text-slate-700 hover:bg-slate-950/20 focus-visible:bg-slate-950/20
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600
    active:bg-slate-950/30'
  >
    {Children.only(children)}
  </button>
));
IconButton.displayName = 'IconButton';

export default IconButton;
