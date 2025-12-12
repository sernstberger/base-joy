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
        interactive
        focusWithin
        className={cn(
          'p-0',
          inputVariants({ size, fullWidth, disabled }),
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
