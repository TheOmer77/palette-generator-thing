import {
  forwardRef,
  type DetailedHTMLProps,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  startAdornment?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, startAdornment, ...props }, ref) => (
    <div
      className='relative mt-6 flex h-12 items-center gap-2 rounded-lg
    bg-slate-50 px-2 ring-1 ring-slate-300 focus-within:ring-2
    focus-within:ring-blue-600 [&>label]:focus-within:text-blue-600'
    >
      <label
        htmlFor={id}
        className='absolute top-[-1.5rem] select-none text-sm font-medium
      text-slate-600'
      >
        {label}
      </label>
      {startAdornment}
      <input
        {...props}
        ref={ref}
        id={id}
        className='flex-grow bg-transparent text-slate-900
      focus-visible:outline-none'
      />
    </div>
  )
);
Input.displayName = 'Input';

export default Input;
