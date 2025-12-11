/**
 * Variant types for base-joy components.
 *
 * Variants define the visual style of a component (solid, soft, outlined, plain).
 */

export const variants = ['solid', 'soft', 'outlined', 'plain'] as const;

export type Variant = (typeof variants)[number];
