import * as React from 'react';
import { Input as BaseInput } from '@base-ui/react/input';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { Sheet } from '../Sheet';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';

const inputVariants = cva(
  'flex items-center w-full p-0 focus-visible:outline-none',
  {
    variants: {
      size: {
        sm: 'h-8 px-2 text-sm gap-1.5',
        md: 'h-10 px-3 text-base gap-2',
        lg: 'h-12 px-4 text-lg gap-2.5',
      },
      fullWidth: {
        true: 'w-full',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      size: 'md',
      fullWidth: false,
      disabled: false,
    },
  }
);

const inputFocusVariants = cva('', {
  variants: {
    variant: {
      solid: '',
      soft: '',
      outlined: '',
      plain: '',
    },
    color: {
      primary: '',
      neutral: '',
      success: '',
      warning: '',
      danger: '',
    },
  },
  compoundVariants: [
    { variant: 'solid', color: 'primary', className: 'focus-within:ring-2 focus-within:ring-primary-500' },
    { variant: 'solid', color: 'neutral', className: 'focus-within:ring-2 focus-within:ring-neutral-500' },
    { variant: 'solid', color: 'success', className: 'focus-within:ring-2 focus-within:ring-success-500' },
    { variant: 'solid', color: 'warning', className: 'focus-within:ring-2 focus-within:ring-warning-500' },
    { variant: 'solid', color: 'danger', className: 'focus-within:ring-2 focus-within:ring-danger-500' },

    { variant: 'soft', color: 'primary', className: 'focus-within:bg-primary-100 focus-within:ring-2 focus-within:ring-primary-500' },
    { variant: 'soft', color: 'neutral', className: 'focus-within:bg-neutral-100 focus-within:ring-2 focus-within:ring-neutral-500' },
    { variant: 'soft', color: 'success', className: 'focus-within:bg-success-100 focus-within:ring-2 focus-within:ring-success-500' },
    { variant: 'soft', color: 'warning', className: 'focus-within:bg-warning-100 focus-within:ring-2 focus-within:ring-warning-500' },
    { variant: 'soft', color: 'danger', className: 'focus-within:bg-danger-100 focus-within:ring-2 focus-within:ring-danger-500' },

    { variant: 'outlined', color: 'primary', className: 'focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500' },
    { variant: 'outlined', color: 'neutral', className: 'focus-within:border-neutral-500 focus-within:ring-2 focus-within:ring-neutral-500' },
    { variant: 'outlined', color: 'success', className: 'focus-within:border-success-500 focus-within:ring-2 focus-within:ring-success-500' },
    { variant: 'outlined', color: 'warning', className: 'focus-within:border-warning-500 focus-within:ring-2 focus-within:ring-warning-500' },
    { variant: 'outlined', color: 'danger', className: 'focus-within:border-danger-600 focus-within:ring-2 focus-within:ring-danger-500' },

    { variant: 'plain', color: 'primary', className: 'focus-within:bg-primary-50' },
    { variant: 'plain', color: 'neutral', className: 'focus-within:bg-neutral-50' },
    { variant: 'plain', color: 'success', className: 'focus-within:bg-success-50' },
    { variant: 'plain', color: 'warning', className: 'focus-within:bg-warning-50' },
    { variant: 'plain', color: 'danger', className: 'focus-within:bg-danger-50' },
  ],
});

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'disabled'>,
    Omit<VariantProps<typeof inputVariants>, 'disabled'> {
  variant?: Variant;
  color?: ColorScale;
  size?: Size;
  fullWidth?: boolean;
  error?: boolean;
  disabled?: boolean;
  startDecorator?: React.ReactNode;
  endDecorator?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = 'outlined',
      color = 'neutral',
      size = 'md',
      fullWidth,
      error,
      disabled,
      startDecorator,
      endDecorator,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const effectiveColor = error ? 'danger' : color;

    return (
      <Sheet
        variant={variant}
        color={effectiveColor}
        className={cn(
          'p-0',
          inputVariants({ size, fullWidth, disabled }),
          inputFocusVariants({ variant, color: effectiveColor }),
          className
        )}
      >
        {startDecorator && <span className="flex-shrink-0">{startDecorator}</span>}
        <BaseInput
          ref={ref}
          type={type}
          disabled={disabled}
          className="flex-1 bg-transparent outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed"
          {...props}
        />
        {endDecorator && <span className="flex-shrink-0">{endDecorator}</span>}
      </Sheet>
    );
  }
);

Input.displayName = 'Input';

export { inputVariants };
