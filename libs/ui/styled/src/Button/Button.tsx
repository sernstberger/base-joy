import * as React from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { sheetVariants } from '../Sheet';
import { ItemContext, ItemIcon } from '@base-joy/ui-unstyled';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';
import { useResolvedColorProps, getSolidContainerStyles } from '../ColorContext';
import { useResolvedSizeProps } from '../SizeContext';

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
  /**
   * The visual style of the button.
   * @default 'solid'
   */
  variant?: Variant;
  /**
   * The color scheme of the button.
   * @default 'primary'
   */
  color?: ColorScale;
  /**
   * The size of the button.
   * @default 'md'
   */
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
      // NOTE: Do NOT add destructuring defaults for variant/color/size (e.g., variant: variantProp = 'solid')
      // This breaks context inheritance - the hooks need undefined to detect "not explicitly set"
      // Defaults are documented via JSDoc @default tags on the interface for props generation
      variant: variantProp,
      color: colorProp,
      size: sizeProp,
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
    // Resolve color and variant from context (inherits from parent Sheet)
    const { color, variant, isInsideSolid } = useResolvedColorProps(
      colorProp,
      variantProp,
      'primary', // defaultColor
      'solid' // defaultVariant
    );

    // Resolve size from context (inherits from parent Sheet)
    const size = useResolvedSizeProps(sizeProp, 'md');

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
            // Apply solid container styles when inside a solid Sheet
            isInsideSolid && getSolidContainerStyles(variant, true),
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
