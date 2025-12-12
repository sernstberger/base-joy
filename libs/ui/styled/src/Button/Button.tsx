import * as React from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import { ItemContext, ItemIcon } from '@base-joy/ui-unstyled';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium cursor-pointer transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 px-3 py-1.5 text-sm gap-1.5',
        md: 'h-10 px-4 py-2 text-base gap-2',
        lg: 'h-12 px-6 py-3 text-lg gap-2.5',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      size: 'md',
      fullWidth: false,
    },
  }
);

const spinnerVariants = cva('animate-spin rounded-full border-2 border-current', {
  variants: {
    size: {
      sm: 'h-3 w-3 border-t-transparent',
      md: 'h-4 w-4 border-t-transparent',
      lg: 'h-5 w-5 border-t-transparent',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  variant?: Variant;
  color?: ColorScale;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
  startDecorator?: React.ReactNode;
  endDecorator?: React.ReactNode;
  /**
   * Replaces the button element with a different tag or component.
   * Use Base UI's render prop pattern for polymorphism.
   * @example <Button render={<a href="/page" />}>Link</Button>
   */
  render?: React.ReactElement;
}

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  (
    {
      className,
      variant = 'solid',
      color = 'primary',
      size = 'md',
      fullWidth,
      loading,
      startDecorator,
      endDecorator,
      disabled,
      children,
      type = 'button',
      render,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <ItemContext.Provider value={{ size, loading }}>
        <BaseButton
          ref={ref}
          type={render ? undefined : type}
          disabled={isDisabled}
          render={render}
          nativeButton={!render}
          className={cn(
            sheetVariants({ variant, color, interactive: true }),
            buttonVariants({ size, fullWidth }),
            className
          )}
          {...props}
        >
          {loading && <span className={spinnerVariants({ size })} />}
          {startDecorator && <ItemIcon>{startDecorator}</ItemIcon>}
          {children}
          {endDecorator && <ItemIcon>{endDecorator}</ItemIcon>}
        </BaseButton>
      </ItemContext.Provider>
    );
  }
);

Button.displayName = 'Button';

export { buttonVariants };
