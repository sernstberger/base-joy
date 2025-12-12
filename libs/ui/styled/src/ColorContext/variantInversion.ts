import type { Variant } from '@base-joy/tokens';

/**
 * Variant inversion map for components inside solid containers.
 * When a component with no explicit variant is placed inside a solid Sheet,
 * its default variant is transformed for better contrast.
 *
 * - solid → plain: Avoid solid-on-solid; use plain text on dark background
 * - soft → plain: Soft backgrounds won't contrast; use plain text
 * - outlined → outlined: Borders work well on dark backgrounds (white/light border)
 * - plain → plain: Already contrast-friendly
 */
export const VARIANT_INVERSION_MAP: Record<Variant, Variant> = {
  solid: 'plain',
  soft: 'plain',
  outlined: 'outlined',
  plain: 'plain',
};

/**
 * Get the inverted variant for use inside a solid container.
 */
export function getInvertedVariant(variant: Variant): Variant {
  return VARIANT_INVERSION_MAP[variant];
}
