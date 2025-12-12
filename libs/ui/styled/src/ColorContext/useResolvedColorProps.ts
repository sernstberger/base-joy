import type { ColorScale, Variant } from '@base-joy/tokens';
import { useColorContext } from './ColorContext';
import { getInvertedVariant } from './variantInversion';

export interface ResolvedColorProps {
  color: ColorScale;
  variant: Variant;
  /** Whether the component is inside a solid container */
  isInsideSolid: boolean;
}

/**
 * Hook that resolves color and variant props based on context.
 *
 * Resolution priority:
 * 1. Explicit props (always win)
 * 2. Context values (inherited from parent Sheet)
 * 3. Default values
 *
 * When inside a solid container and no explicit variant is set,
 * the variant is automatically inverted for better contrast.
 *
 * @param explicitColor - Explicitly passed color prop
 * @param explicitVariant - Explicitly passed variant prop
 * @param defaultColor - Default color if nothing else applies
 * @param defaultVariant - Default variant if nothing else applies
 *
 * @example
 * // Inside a component
 * const { color, variant, isInsideSolid } = useResolvedColorProps(
 *   colorProp,
 *   variantProp,
 *   'primary',
 *   'solid'
 * );
 */
export function useResolvedColorProps(
  explicitColor?: ColorScale,
  explicitVariant?: Variant,
  defaultColor: ColorScale = 'primary',
  defaultVariant: Variant = 'solid'
): ResolvedColorProps {
  const ctx = useColorContext();

  // Color resolution: explicit > context > default
  const color = explicitColor ?? ctx?.color ?? defaultColor;

  // Variant resolution with automatic inversion
  let variant: Variant;
  if (explicitVariant !== undefined) {
    // Explicit variant always wins
    variant = explicitVariant;
  } else if (ctx?.isInsideSolid) {
    // Inside solid container: invert the default variant
    variant = getInvertedVariant(defaultVariant);
  } else {
    // Use default
    variant = defaultVariant;
  }

  return {
    color,
    variant,
    isInsideSolid: ctx?.isInsideSolid ?? false,
  };
}
