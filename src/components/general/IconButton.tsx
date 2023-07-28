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
    focus-visible:outline-none active:bg-slate-950/30 dark:text-slate-400
  dark:hover:bg-slate-50/20 dark:focus-visible:bg-slate-50/20
  dark:active:bg-slate-50/30'
  >
    {Children.only(children)}
  </button>
));
IconButton.displayName = 'IconButton';

export default IconButton;
