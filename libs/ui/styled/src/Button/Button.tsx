import * as React from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import { ItemContext, ItemIcon } from '@base-joy/ui-unstyled';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
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
      color: {
        primary: 'focus-visible:ring-primary-500',
        neutral: 'focus-visible:ring-neutral-500',
        success: 'focus-visible:ring-success-500',
        warning: 'focus-visible:ring-warning-500',
        danger: 'focus-visible:ring-danger-500',
      },
    },
    defaultVariants: {
      size: 'md',
      fullWidth: false,
      color: 'primary',
    },
  }
);

const hoverVariants = cva('', {
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
    { variant: 'solid', color: 'primary', className: 'hover:bg-primary-600' },
    { variant: 'solid', color: 'neutral', className: 'hover:bg-neutral-900' },
    { variant: 'solid', color: 'success', className: 'hover:bg-success-600' },
    { variant: 'solid', color: 'warning', className: 'hover:bg-warning-600' },
    { variant: 'solid', color: 'danger', className: 'hover:bg-danger-600' },
    { variant: 'soft', color: 'primary', className: 'hover:bg-primary-200' },
    { variant: 'soft', color: 'neutral', className: 'hover:bg-neutral-200' },
    { variant: 'soft', color: 'success', className: 'hover:bg-success-200' },
    { variant: 'soft', color: 'warning', className: 'hover:bg-warning-200' },
    { variant: 'soft', color: 'danger', className: 'hover:bg-danger-200' },
    { variant: 'outlined', color: 'primary', className: 'hover:bg-primary-50' },
    { variant: 'outlined', color: 'neutral', className: 'hover:bg-neutral-50' },
    { variant: 'outlined', color: 'success', className: 'hover:bg-success-50' },
    { variant: 'outlined', color: 'warning', className: 'hover:bg-warning-50' },
    { variant: 'outlined', color: 'danger', className: 'hover:bg-danger-50' },
    { variant: 'plain', color: 'primary', className: 'hover:bg-primary-50' },
    { variant: 'plain', color: 'neutral', className: 'hover:bg-neutral-100' },
    { variant: 'plain', color: 'success', className: 'hover:bg-success-50' },
    { variant: 'plain', color: 'warning', className: 'hover:bg-warning-50' },
    { variant: 'plain', color: 'danger', className: 'hover:bg-danger-50' },
  ],
});

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
            sheetVariants({ variant, color }),
            buttonVariants({ size, fullWidth, color }),
            hoverVariants({ variant, color }),
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
