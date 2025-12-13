import * as React from 'react';
import { Separator as BaseSeparator } from '@base-ui/react/separator';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { ColorScale } from '@base-joy/tokens';
import { useResolvedColorProps } from '../ColorContext';

const separatorVariants = cva('shrink-0 border-0', {
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'h-full w-px',
    },
    color: {
      primary: 'bg-primary-300',
      neutral: 'bg-neutral-300',
      success: 'bg-success-300',
      warning: 'bg-warning-300',
      danger: 'bg-danger-300',
    },
    inset: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', inset: true, className: 'mx-4' },
    { orientation: 'vertical', inset: true, className: 'my-4' },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    color: 'neutral',
    inset: false,
  },
});

const textColorClasses: Record<ColorScale, string> = {
  primary: 'text-primary-600',
  neutral: 'text-neutral-600',
  success: 'text-success-600',
  warning: 'text-warning-600',
  danger: 'text-danger-600',
};

export interface SeparatorProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseSeparator>, 'children'>,
    VariantProps<typeof separatorVariants> {
  /**
   * The orientation of the separator.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * The color scheme of the separator.
   * @default 'neutral'
   */
  color?: ColorScale;

  /**
   * Adds margin on the ends of the separator.
   * @default false
   */
  inset?: boolean;

  /**
   * Optional text content to display in the center of the separator.
   */
  children?: React.ReactNode;
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = 'horizontal',
      color: colorProp,
      inset,
      children,
      ...props
    },
    ref
  ) => {
    // Resolve color from context (inherits from parent Sheet)
    const { color } = useResolvedColorProps(
      colorProp,
      undefined,
      'neutral',
      undefined
    );

    if (children) {
      return (
        <div
          role="separator"
          aria-orientation={orientation}
          className={cn(
            'flex items-center gap-3',
            orientation === 'horizontal' ? 'w-full' : 'h-full flex-col',
            inset && (orientation === 'horizontal' ? 'mx-4' : 'my-4'),
            className
          )}
        >
          <BaseSeparator
            orientation={orientation}
            className={cn(
              separatorVariants({ orientation, color }),
              orientation === 'horizontal' ? 'flex-1' : 'flex-1'
            )}
            aria-hidden="true"
            render={<hr />}
          />
          <span className={cn('text-sm shrink-0', textColorClasses[color])}>
            {children}
          </span>
          <BaseSeparator
            orientation={orientation}
            className={cn(
              separatorVariants({ orientation, color }),
              orientation === 'horizontal' ? 'flex-1' : 'flex-1'
            )}
            aria-hidden="true"
            render={<hr />}
          />
        </div>
      );
    }

    return (
      <BaseSeparator
        ref={ref}
        orientation={orientation}
        className={cn(separatorVariants({ orientation, color, inset }), className)}
        render={<hr />}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';

export { separatorVariants };
