import type { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  startAdornment?: ReactNode;
}

const Input = ({ id, label, startAdornment, ...props }: InputProps) => {
  return (
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
        id={id}
        className='flex-grow bg-transparent text-slate-900
        focus-visible:outline-none'
      />
    </div>
  );
};

export default Input;
