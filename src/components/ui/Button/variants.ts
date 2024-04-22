import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  `inline-flex cursor-default select-none items-center justify-center gap-2
  whitespace-nowrap rounded-md font-medium shadow-sm ring-0 ring-ring
  transition-[color,background-color,box-shadow,opacity] state-layer
  hover:state-layer-muted/30 focus-visible:outline-none focus-visible:ring-2
  active:duration-0 disabled:pointer-events-none disabled:opacity-50 [&>*]:z-10
  [&>svg]:shrink-0`,
  {
    variants: {
      variant: {
        default: `bg-background active:bg-muted/30 dark:bg-neutral-800
dark:active:bg-neutral-700`,
        primary: `bg-primary text-primary-foreground
hover:state-layer-primary-foreground/10 active:bg-primary-active`,
        flat: 'bg-transparent shadow-none active:bg-foreground/10',
      },
      size: {
        sm: 'h-8 px-3 text-xs [&>svg]:text-sm',
        md: 'h-10 px-4 text-sm [&>svg]:text-base',
        lg: 'h-12 px-8 text-base [&>svg]:text-lg',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  }
);
