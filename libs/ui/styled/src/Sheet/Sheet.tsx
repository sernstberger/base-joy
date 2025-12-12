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
      interactive: {
        true: '',
        false: '',
      },
      focusWithin: {
        true: '',
        false: '',
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

      // Interactive focus states - solid variant
      { interactive: true, variant: 'solid', color: 'primary', className: 'focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2' },
      { interactive: true, variant: 'solid', color: 'neutral', className: 'focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2' },
      { interactive: true, variant: 'solid', color: 'success', className: 'focus:outline-none focus:ring-2 focus:ring-success-300 focus:ring-offset-2' },
      { interactive: true, variant: 'solid', color: 'warning', className: 'focus:outline-none focus:ring-2 focus:ring-warning-300 focus:ring-offset-2' },
      { interactive: true, variant: 'solid', color: 'danger', className: 'focus:outline-none focus:ring-2 focus:ring-danger-300 focus:ring-offset-2' },

      // Interactive focus states - soft variant
      { interactive: true, variant: 'soft', color: 'primary', className: 'focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-2' },
      { interactive: true, variant: 'soft', color: 'neutral', className: 'focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:ring-offset-2' },
      { interactive: true, variant: 'soft', color: 'success', className: 'focus:outline-none focus:ring-2 focus:ring-success-200 focus:ring-offset-2' },
      { interactive: true, variant: 'soft', color: 'warning', className: 'focus:outline-none focus:ring-2 focus:ring-warning-200 focus:ring-offset-2' },
      { interactive: true, variant: 'soft', color: 'danger', className: 'focus:outline-none focus:ring-2 focus:ring-danger-200 focus:ring-offset-2' },

      // Interactive focus states - outlined variant
      { interactive: true, variant: 'outlined', color: 'primary', className: 'focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-2' },
      { interactive: true, variant: 'outlined', color: 'neutral', className: 'focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:ring-offset-2' },
      { interactive: true, variant: 'outlined', color: 'success', className: 'focus:outline-none focus:ring-2 focus:ring-success-200 focus:ring-offset-2' },
      { interactive: true, variant: 'outlined', color: 'warning', className: 'focus:outline-none focus:ring-2 focus:ring-warning-200 focus:ring-offset-2' },
      { interactive: true, variant: 'outlined', color: 'danger', className: 'focus:outline-none focus:ring-2 focus:ring-danger-200 focus:ring-offset-2' },

      // Interactive focus states - plain variant
      { interactive: true, variant: 'plain', color: 'primary', className: 'focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-2' },
      { interactive: true, variant: 'plain', color: 'neutral', className: 'focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:ring-offset-2' },
      { interactive: true, variant: 'plain', color: 'success', className: 'focus:outline-none focus:ring-2 focus:ring-success-200 focus:ring-offset-2' },
      { interactive: true, variant: 'plain', color: 'warning', className: 'focus:outline-none focus:ring-2 focus:ring-warning-200 focus:ring-offset-2' },
      { interactive: true, variant: 'plain', color: 'danger', className: 'focus:outline-none focus:ring-2 focus:ring-danger-200 focus:ring-offset-2' },

      // Interactive focus-within states - solid variant (for containers with focusable children)
      { interactive: true, focusWithin: true, variant: 'solid', color: 'primary', className: 'focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-300 focus-within:ring-offset-2' },
      { interactive: true, focusWithin: true, variant: 'solid', color: 'neutral', className: 'focus-within:outline-none focus-within:ring-2 focus-within:ring-neutral-400 focus-within:ring-offset-2' },
      { interactive: true, focusWithin: true, variant: 'solid', color: 'success', className: 'focus-within:outline-none focus-within:ring-2 focus-within:ring-success-300 focus-within:ring-offset-2' },
      { interactive: true, focusWithin: true, variant: 'solid', color: 'warning', className: 'focus-within:outline-none focus-within:ring-2 focus-within:ring-warning-300 focus-within:ring-offset-2' },
      { interactive: true, focusWithin: true, variant: 'solid', color: 'danger', className: 'focus-within:outline-none focus-within:ring-2 focus-within:ring-danger-300 focus-within:ring-offset-2' },

      // Interactive focus-within states - soft variant
      { interactive: true, focusWithin: true, variant: 'soft', color: 'primary', className: 'focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-200 focus-within:ring-offset-2' },
      { interactive: true, focusWithin: true, variant: 'soft', color: 'neutral', className: 'focus-within:outline-none focus-within:ring-2 focus-within:ring-neutral-200 focus-within:ring-offset-2' },
      { interactive: true, focusWithin: true, variant: 'soft', color: 'success', className: 'focus-within:outline-none focus-within:ring-2 focus-within:ring-success-200 focus-within:ring-offset-2' },
      { interactive: true, focusWithin: true, variant: 'soft', color: 'warning', className: 'focus-within:outline-none focus-within:ring-2 focus-within:ring-warning-200 focus-within:ring-offset-2' },
      { interactive: true, focusWithin: true, variant: 'soft', color: 'danger', className: 'focus-within:outline-none focus-within:ring-2 focus-within:ring-danger-200 focus-within:ring-offset-2' },

      // Interactive focus-within states - outlined variant
      { interactive: true, focusWithin: true, variant: 'outlined', color: 'primary', className: 'focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-200 focus-within:ring-offset-2' },
      { interactive: true, focusWithin: true, variant: 'outlined', color: 'neutral', className: 'focus-within:outline-none focus-within:ring-2 focus-within:ring-neutral-200 focus-within:ring-offset-2' },
      { interactive: true, focusWithin: true, variant: 'outlined', color: 'success', className: 'focus-within:outline-none focus-within:ring-2 focus-within:ring-success-200 focus-within:ring-offset-2' },
      { interactive: true, focusWithin: true, variant: 'outlined', color: 'warning', className: 'focus-within:outline-none focus-within:ring-2 focus-within:ring-warning-200 focus-within:ring-offset-2' },
      { interactive: true, focusWithin: true, variant: 'outlined', color: 'danger', className: 'focus-within:outline-none focus-within:ring-2 focus-within:ring-danger-200 focus-within:ring-offset-2' },

      // Interactive focus-within states - plain variant
      { interactive: true, focusWithin: true, variant: 'plain', color: 'primary', className: 'focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-200 focus-within:ring-offset-2' },
      { interactive: true, focusWithin: true, variant: 'plain', color: 'neutral', className: 'focus-within:outline-none focus-within:ring-2 focus-within:ring-neutral-200 focus-within:ring-offset-2' },
      { interactive: true, focusWithin: true, variant: 'plain', color: 'success', className: 'focus-within:outline-none focus-within:ring-2 focus-within:ring-success-200 focus-within:ring-offset-2' },
      { interactive: true, focusWithin: true, variant: 'plain', color: 'warning', className: 'focus-within:outline-none focus-within:ring-2 focus-within:ring-warning-200 focus-within:ring-offset-2' },
      { interactive: true, focusWithin: true, variant: 'plain', color: 'danger', className: 'focus-within:outline-none focus-within:ring-2 focus-within:ring-danger-200 focus-within:ring-offset-2' },

      // Interactive hover states - solid variant
      { interactive: true, variant: 'solid', color: 'primary', className: 'hover:bg-primary-600 active:bg-primary-700' },
      { interactive: true, variant: 'solid', color: 'neutral', className: 'hover:bg-neutral-700 active:bg-neutral-600' },
      { interactive: true, variant: 'solid', color: 'success', className: 'hover:bg-success-600 active:bg-success-700' },
      { interactive: true, variant: 'solid', color: 'warning', className: 'hover:bg-warning-600 active:bg-warning-700' },
      { interactive: true, variant: 'solid', color: 'danger', className: 'hover:bg-danger-600 active:bg-danger-700' },

      // Interactive hover states - soft variant
      { interactive: true, variant: 'soft', color: 'primary', className: 'hover:bg-primary-200 active:bg-primary-300' },
      { interactive: true, variant: 'soft', color: 'neutral', className: 'hover:bg-neutral-200 active:bg-neutral-300' },
      { interactive: true, variant: 'soft', color: 'success', className: 'hover:bg-success-200 active:bg-success-300' },
      { interactive: true, variant: 'soft', color: 'warning', className: 'hover:bg-warning-200 active:bg-warning-300' },
      { interactive: true, variant: 'soft', color: 'danger', className: 'hover:bg-danger-200 active:bg-danger-300' },

      // Interactive hover states - outlined variant
      { interactive: true, variant: 'outlined', color: 'primary', className: 'hover:bg-primary-50 active:bg-primary-100' },
      { interactive: true, variant: 'outlined', color: 'neutral', className: 'hover:bg-neutral-50 active:bg-neutral-100' },
      { interactive: true, variant: 'outlined', color: 'success', className: 'hover:bg-success-50 active:bg-success-100' },
      { interactive: true, variant: 'outlined', color: 'warning', className: 'hover:bg-warning-50 active:bg-warning-100' },
      { interactive: true, variant: 'outlined', color: 'danger', className: 'hover:bg-danger-50 active:bg-danger-100' },

      // Interactive hover states - plain variant
      { interactive: true, variant: 'plain', color: 'primary', className: 'hover:bg-primary-50 active:bg-primary-100' },
      { interactive: true, variant: 'plain', color: 'neutral', className: 'hover:bg-neutral-50 active:bg-neutral-100' },
      { interactive: true, variant: 'plain', color: 'success', className: 'hover:bg-success-50 active:bg-success-100' },
      { interactive: true, variant: 'plain', color: 'warning', className: 'hover:bg-warning-50 active:bg-warning-100' },
      { interactive: true, variant: 'plain', color: 'danger', className: 'hover:bg-danger-50 active:bg-danger-100' },
    ],
    defaultVariants: {
      variant: 'soft',
      color: 'neutral',
      size: 'md',
      interactive: false,
      focusWithin: false,
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
   * Whether the sheet is interactive (adds focus ring styling).
   * Use for clickable cards, buttons, or any focusable element.
   * @default false
   */
  interactive?: boolean;

  /**
   * Use focus-within instead of focus for containers with focusable children.
   * Only works when interactive is true.
   * @default false
   */
  focusWithin?: boolean;

  /**
   * The element type to render as.
   * @default 'div'
   */
  as?: React.ElementType;
}

export const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(
  ({ className, variant, color, size, interactive, focusWithin, as: Component = 'div', ...props }, ref) => {
    // Warn if focusWithin is used without interactive
    if (process.env.NODE_ENV !== 'production' && focusWithin && !interactive) {
      console.error(
        'Sheet: focusWithin prop only works when interactive is true. ' +
        'Please set interactive={true} or remove focusWithin.'
      );
    }

    return (
      <Component
        ref={ref}
        className={cn(sheetVariants({ variant, color, size, interactive, focusWithin }), className)}
        {...props}
      />
    );
  }
);

Sheet.displayName = 'Sheet';

export { sheetVariants };
