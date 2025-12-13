import * as React from 'react';
import { ColorSchemeContext, type ColorSchemeContextValue } from './ColorSchemeProvider';

/**
 * Hook to access and control the color scheme.
 *
 * Must be used within a ColorSchemeProvider.
 *
 * @returns ColorSchemeContextValue with colorScheme, resolvedColorScheme, and setColorScheme
 *
 * @throws Error if used outside ColorSchemeProvider
 *
 * @example
 * ```tsx
 * import { useColorScheme } from '@base-joy/ui-styled';
 *
 * function ThemeToggle() {
 *   const { colorScheme, setColorScheme, resolvedColorScheme } = useColorScheme();
 *
 *   return (
 *     <button onClick={() => setColorScheme(resolvedColorScheme === 'light' ? 'dark' : 'light')}>
 *       Current: {resolvedColorScheme}
 *     </button>
 *   );
 * }
 * ```
 *
 * @example
 * Cycle through all schemes
 * ```tsx
 * function SchemeToggle() {
 *   const { colorScheme, setColorScheme } = useColorScheme();
 *
 *   const cycleScheme = () => {
 *     const schemes: ColorScheme[] = ['light', 'dark', 'system'];
 *     const currentIndex = schemes.indexOf(colorScheme);
 *     const nextIndex = (currentIndex + 1) % schemes.length;
 *     setColorScheme(schemes[nextIndex]);
 *   };
 *
 *   return <button onClick={cycleScheme}>{colorScheme}</button>;
 * }
 * ```
 */
export function useColorScheme(): ColorSchemeContextValue {
  const context = React.useContext(ColorSchemeContext);

  if (context === undefined) {
    throw new Error(
      'useColorScheme must be used within a ColorSchemeProvider. ' +
        'Wrap your app with <ColorSchemeProvider> to use this hook.'
    );
  }

  return context;
}
