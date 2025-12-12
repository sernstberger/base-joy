import * as React from 'react';
import { Input as BaseInput } from '@base-ui/react/input';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
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

const inputColorVariants = cva('', {
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
    { variant: 'solid', color: 'primary', className: 'bg-primary-100 text-primary-900 border-transparent focus-within:ring-2 focus-within:ring-primary-500' },
    { variant: 'solid', color: 'neutral', className: 'bg-neutral-100 text-neutral-900 border-transparent focus-within:ring-2 focus-within:ring-neutral-500' },
    { variant: 'solid', color: 'success', className: 'bg-success-100 text-success-900 border-transparent focus-within:ring-2 focus-within:ring-success-500' },
    { variant: 'solid', color: 'warning', className: 'bg-warning-100 text-warning-900 border-transparent focus-within:ring-2 focus-within:ring-warning-500' },
    { variant: 'solid', color: 'danger', className: 'bg-danger-100 text-danger-900 border-transparent focus-within:ring-2 focus-within:ring-danger-500' },

    { variant: 'soft', color: 'primary', className: 'bg-primary-50 text-primary-900 border-transparent focus-within:bg-primary-100 focus-within:ring-2 focus-within:ring-primary-500' },
    { variant: 'soft', color: 'neutral', className: 'bg-neutral-50 text-neutral-900 border-transparent focus-within:bg-neutral-100 focus-within:ring-2 focus-within:ring-neutral-500' },
    { variant: 'soft', color: 'success', className: 'bg-success-50 text-success-900 border-transparent focus-within:bg-success-100 focus-within:ring-2 focus-within:ring-success-500' },
    { variant: 'soft', color: 'warning', className: 'bg-warning-50 text-warning-900 border-transparent focus-within:bg-warning-100 focus-within:ring-2 focus-within:ring-warning-500' },
    { variant: 'soft', color: 'danger', className: 'bg-danger-50 text-danger-900 border-transparent focus-within:bg-danger-100 focus-within:ring-2 focus-within:ring-danger-500' },

    { variant: 'outlined', color: 'primary', className: 'border-primary-300 text-primary-900 bg-transparent focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500' },
    { variant: 'outlined', color: 'neutral', className: 'border-neutral-300 text-neutral-900 bg-transparent focus-within:border-neutral-500 focus-within:ring-2 focus-within:ring-neutral-500' },
    { variant: 'outlined', color: 'success', className: 'border-success-300 text-success-900 bg-transparent focus-within:border-success-500 focus-within:ring-2 focus-within:ring-success-500' },
    { variant: 'outlined', color: 'warning', className: 'border-warning-300 text-warning-900 bg-transparent focus-within:border-warning-500 focus-within:ring-2 focus-within:ring-warning-500' },
    { variant: 'outlined', color: 'danger', className: 'border-danger-500 text-danger-900 bg-transparent focus-within:border-danger-600 focus-within:ring-2 focus-within:ring-danger-500' },

    { variant: 'plain', color: 'primary', className: 'text-primary-900 bg-transparent border-transparent focus-within:bg-primary-50' },
    { variant: 'plain', color: 'neutral', className: 'text-neutral-900 bg-transparent border-transparent focus-within:bg-neutral-50' },
    { variant: 'plain', color: 'success', className: 'text-success-900 bg-transparent border-transparent focus-within:bg-success-50' },
    { variant: 'plain', color: 'warning', className: 'text-warning-900 bg-transparent border-transparent focus-within:bg-warning-50' },
    { variant: 'plain', color: 'danger', className: 'text-danger-900 bg-transparent border-transparent focus-within:bg-danger-50' },
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
      <div
        className={cn(
          'rounded-lg transition-colors',
          variant === 'outlined' && 'border',
          inputVariants({ size, fullWidth, disabled }),
          inputColorVariants({ variant, color: effectiveColor }),
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
      </div>
    );
  }
);

Input.displayName = 'Input';

export { inputVariants };
