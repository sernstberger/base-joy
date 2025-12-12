import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import { Sheet } from '../Sheet';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';

const badgeVariants = cva(
  'inline-flex items-center font-medium rounded-full',
  {
    variants: {
      size: {
        sm: 'px-2 py-0.5 text-xs gap-1',
        md: 'px-2.5 py-0.5 text-sm gap-1.5',
        lg: 'px-3 py-1 text-base gap-2',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * The visual style of the badge.
   * @default 'soft'
   */
  variant?: Variant;

  /**
   * The color scheme of the badge.
   * @default 'primary'
   */
  color?: ColorScale;

  /**
   * The size of the badge.
   * @default 'md'
   */
  size?: Size;

  /**
   * Element to display before the badge content.
   */
  startDecorator?: React.ReactNode;

  /**
   * Element to display after the badge content.
   */
  endDecorator?: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = 'soft',
      color = 'primary',
      size = 'md',
      startDecorator,
      endDecorator,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Sheet
        ref={ref as React.Ref<HTMLDivElement>}
        as="span"
        variant={variant}
        color={color}
        className={cn('p-0', badgeVariants({ size }), className)}
        {...props}
      >
        {startDecorator && <span className="inline-flex">{startDecorator}</span>}
        {children}
        {endDecorator && <span className="inline-flex">{endDecorator}</span>}
      </Sheet>
    );
  }
);

Badge.displayName = 'Badge';

export { badgeVariants };
