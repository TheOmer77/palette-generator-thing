import {
  ButtonHTMLAttributes,
  Children,
  DetailedHTMLProps,
  forwardRef,
} from 'react';
import cn from 'utils/cn';

const IconButton = forwardRef<
  HTMLButtonElement,
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>(({ children, className, ...props }, ref) => (
  <button
    {...props}
    ref={ref}
    className={cn(
      `flex h-8 w-8 cursor-default items-center justify-center rounded-lg
text-xl text-slate-700 hover:bg-slate-400/20 focus-visible:bg-slate-400/20
focus-visible:outline-none active:bg-slate-400/30 dark:text-slate-400`,
      className
    )}
  >
    {Children.only(children)}
  </button>
));
IconButton.displayName = 'IconButton';

export default IconButton;
