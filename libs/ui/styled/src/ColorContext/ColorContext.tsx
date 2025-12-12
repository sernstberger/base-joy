import * as React from 'react';
import type { ColorScale, Variant } from '@base-joy/tokens';

/**
 * Context value for color inheritance and variant inversion.
 * Provided by Sheet components to enable automatic color adjustment
 * for nested child components.
 */
export interface ColorContextValue {
  /** The color inherited from the parent container */
  color: ColorScale;
  /** Whether the parent container uses solid variant (dark background with white text) */
  isInsideSolid: boolean;
  /** The variant of the parent container */
  parentVariant: Variant;
}

/**
 * Context for automatic color inheritance and variant inversion.
 * When a component is inside a Sheet, it can read this context to:
 * 1. Inherit the parent's color
 * 2. Automatically adjust its variant for contrast on solid backgrounds
 */
export const ColorContext = React.createContext<ColorContextValue | null>(null);

/**
 * Hook to access the color context.
 * Returns null when not inside a Sheet or other color context provider.
 */
export const useColorContext = () => React.useContext(ColorContext);
