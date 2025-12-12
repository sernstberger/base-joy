import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/utils';
import type { Variant, Size, ColorScale } from '@base-joy/tokens';

/**
 * Sheet component - A styled container with CVA variants.
 *
 * The Sheet is a foundational surface component that provides consistent
 * styling for cards, panels, and containers throughout the design system.
 */

const sheetVariants = cva(
  // Base styles
  'rounded-lg transition-colors',
  {
    variants: {
      variant: {
        solid: '',
        soft: '',
        outlined: 'border',
        plain: '',
      },
      color: {
        primary: '',
        neutral: '',
        success: '',
        warning: '',
        danger: '',
      },
      size: {
        sm: 'p-2',
        md: 'p-4',
        lg: 'p-6',
      },
    },
    compoundVariants: [
      // Solid variants
      { variant: 'solid', color: 'primary', className: 'bg-primary-500 text-white' },
      { variant: 'solid', color: 'neutral', className: 'bg-neutral-800 text-white' },
      { variant: 'solid', color: 'success', className: 'bg-success-500 text-white' },
      { variant: 'solid', color: 'warning', className: 'bg-warning-500 text-white' },
      { variant: 'solid', color: 'danger', className: 'bg-danger-500 text-white' },

      // Soft variants
      { variant: 'soft', color: 'primary', className: 'bg-primary-100 text-primary-900' },
      { variant: 'soft', color: 'neutral', className: 'bg-neutral-100 text-neutral-900' },
      { variant: 'soft', color: 'success', className: 'bg-success-100 text-success-900' },
      { variant: 'soft', color: 'warning', className: 'bg-warning-100 text-warning-900' },
      { variant: 'soft', color: 'danger', className: 'bg-danger-100 text-danger-900' },

      // Outlined variants
      {
        variant: 'outlined',
        color: 'primary',
        className: 'border-primary-500 text-primary-700 bg-transparent',
      },
      {
        variant: 'outlined',
        color: 'neutral',
        className: 'border-neutral-300 text-neutral-700 bg-transparent',
      },
      {
        variant: 'outlined',
        color: 'success',
        className: 'border-success-500 text-success-700 bg-transparent',
      },
      {
        variant: 'outlined',
        color: 'warning',
        className: 'border-warning-500 text-warning-700 bg-transparent',
      },
      {
        variant: 'outlined',
        color: 'danger',
        className: 'border-danger-500 text-danger-700 bg-transparent',
      },

      // Plain variants
      { variant: 'plain', color: 'primary', className: 'text-primary-700 bg-transparent' },
      { variant: 'plain', color: 'neutral', className: 'text-neutral-700 bg-transparent' },
      { variant: 'plain', color: 'success', className: 'text-success-700 bg-transparent' },
      { variant: 'plain', color: 'warning', className: 'text-warning-700 bg-transparent' },
      { variant: 'plain', color: 'danger', className: 'text-danger-700 bg-transparent' },
    ],
    defaultVariants: {
      variant: 'soft',
      color: 'neutral',
      size: 'md',
    },
  }
);

export interface SheetProps
  extends Omit<React.AllHTMLAttributes<HTMLElement>, 'color' | 'size' | 'as'>,
    VariantProps<typeof sheetVariants> {
  /**
   * The visual style of the sheet.
   * @default 'soft'
   */
  variant?: Variant;

  /**
   * The color scheme of the sheet.
   * @default 'neutral'
   */
  color?: ColorScale;

  /**
   * The size (padding) of the sheet.
   * @default 'md'
   */
  size?: Size;

  /**
   * The element type to render as.
   * @default 'div'
   */
  as?: React.ElementType;
}

export const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(
  ({ className, variant, color, size, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(sheetVariants({ variant, color, size }), className)}
        {...props}
      />
    );
  }
);

Sheet.displayName = 'Sheet';

export { sheetVariants };
