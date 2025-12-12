import { cva } from 'class-variance-authority';
import type { Variant } from '@base-joy/tokens';

/**
 * Additional styles for interactive components inside solid containers.
 * These styles ensure proper contrast for hover/active/focus states
 * when a component is placed inside a solid Sheet.
 *
 * - Plain variant: White text with subtle white hover/active backgrounds
 * - Outlined variant: White border and text with subtle hover/active backgrounds
 */
export const solidContainerStyles = cva('', {
  variants: {
    variant: {
      solid: '',
      soft: '',
      outlined: '',
      plain: '',
    },
    interactive: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    // Plain variant inside solid container
    {
      variant: 'plain',
      className: 'text-white bg-transparent',
    },
    // Plain variant interactive states inside solid container
    {
      variant: 'plain',
      interactive: true,
      className: 'hover:bg-white/10 active:bg-white/20',
    },
    // Outlined variant inside solid container
    {
      variant: 'outlined',
      className: 'border-white/70 text-white bg-transparent',
    },
    // Outlined variant interactive states inside solid container
    {
      variant: 'outlined',
      interactive: true,
      className: 'hover:bg-white/10 active:bg-white/20',
    },
  ],
});

/**
 * Get solid container styles for a given variant.
 * Returns class names only when the component should have adjusted styles.
 */
export function getSolidContainerStyles(
  variant: Variant,
  interactive: boolean = false
): string {
  return solidContainerStyles({ variant, interactive });
}
