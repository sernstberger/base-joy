import * as React from 'react';
import type { Size } from '@base-joy/tokens';

/**
 * Context value for size inheritance.
 * Provided by Sheet components to enable automatic size adjustment
 * for nested child components.
 */
export interface SizeContextValue {
  /** The size inherited from the parent container */
  size: Size;
}

/**
 * Context for automatic size inheritance.
 * When a component is inside a Sheet with a size prop,
 * it can read this context to inherit the parent's size.
 */
export const SizeContext = React.createContext<SizeContextValue | null>(null);

/**
 * Hook to access the size context.
 * Returns null when not inside a Sheet or other size context provider.
 */
export const useSizeContext = () => React.useContext(SizeContext);
