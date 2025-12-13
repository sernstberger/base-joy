import type { Size } from '@base-joy/tokens';
import { useSizeContext } from './SizeContext';

/**
 * Hook that resolves size prop based on context.
 *
 * Resolution priority:
 * 1. Explicit prop (always wins)
 * 2. Context value (inherited from parent Sheet)
 * 3. Default value
 *
 * @param explicitSize - Explicitly passed size prop
 * @param defaultSize - Default size if nothing else applies
 *
 * @example
 * // Inside a component
 * const size = useResolvedSizeProps(sizeProp, 'md');
 */
export function useResolvedSizeProps(
  explicitSize?: Size,
  defaultSize: Size = 'md'
): Size {
  const ctx = useSizeContext();

  // Size resolution: explicit > context > default
  return explicitSize ?? ctx?.size ?? defaultSize;
}
